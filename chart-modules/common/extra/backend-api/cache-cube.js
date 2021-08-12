/**
 * @exports assets/objects/backend-api/cache-cube
 * @expose module:assets/objects/cache-cube/cache-cube~CacheCube
 *
 */
import extend from 'extend';
import Class from '../class';
import EngineThrottle from './engine-throttle';
import CubeSlicer from './cube-slicer';
import StackedCubeSlicer from './stacked-cube-slicer';
import PivotCubeSlicer from './pivot-cube-slicer';

const defaultOptions = {
  mode: 'S',
  enabled: true,
  debouncing: {
    enabled: true,
    delay: 50,
  },
  height: 250,
  width: 250,
  maxTotalArea: 10000,
};

const Cache = Class.extend(
  'CacheCube',
  /** @lends module:assets/objects/cache-cube/cache-cube~CacheCube */ {
    /**
     * @constructs
     * @param {module:assets/objects/backend-api/backend-api~BackendApi} model
     * @param {String} responseProperty
     * @param {String} path
     */
    init(model, responseProperty, path, opts) {
      this.model = model;
      this.responseProperty = responseProperty;
      this.options = {};

      this.cubeHeight = 0;
      this.cubeWidth = 0;

      this.setOptions(opts || {});

      this.setPath(path);
      if (this.options.mode === 'K') {
        this.cube = new StackedCubeSlicer();
      } else if (this.options.mode === 'P') {
        this.cube = new PivotCubeSlicer();
      } else {
        this.cube = new CubeSlicer();
      }
      this.throttle = new EngineThrottle({
        onSend: (areas, dfd) => {
          const directions = this._getDirections(
            this.throttle.recentRequests.map((q) => ({ top: q.data[0].qTop, left: q.data[0].qLeft }))
          );
          const areasToCache = this._getAreasToCache(areas, directions.vertical, directions.horizontal);
          this.cacheData(areasToCache, areas).then(
            (subset) => {
              if (this.cube) {
                dfd.resolve(subset);
              } else {
                dfd.reject();
              }
            },
            () => {
              dfd.reject();
            }
          );
        },
      });

      this._modelBinding = () => {
        this.clear();
      };

      this.model.Invalidated.bind(this._modelBinding);
    },
    destroy() {
      this.cube.destroy();
      this.throttle.destroy();
      if (this.model && this.model.Invalidated) {
        this.model.Invalidated.unbind(this._modelBinding);
      }
      this._modelBinding = null;
      delete this.model;
      delete this.throttle;
      delete this.cube;
    },
    setMethodName(s) {
      this.method = s;
    },
    setPath(s) {
      this.path = s;
    },
    setCubeSize(size) {
      this.cubeHeight = size.qcy;
      this.cubeWidth = size.qcx;
    },
    setOptions(opts) {
      if (!opts) {
        return;
      }
      this.options = extend(true, {}, defaultOptions, this.options, opts);

      this.cacheHeight = this.options.height;
      this.cacheWidth = this.options.width;
      this.enabled = this.options.enabled || false;
      this.debouncing = {
        enabled: this.options.debouncing.enabled || false,
        delay: this.options.debouncing.delay || -1,
      };
    },
    clear() {
      if (this.cube) {
        this.cube.clear();
      }
      if (this.throttle) {
        this.throttle.clear();
      }
    },
    set(dataPages) {
      this.clear();
      if (!dataPages || !dataPages.length) {
        return;
      }
      this.cube.store(dataPages);
    },
    cacheData(areasToCache, subset) {
      const fn = function (pages) {
        if (this.cube) {
          this.cube.store(pages);
          return this.cube.get(subset);
        }
        return pages;
      };
      if (this.method === 'getHyperCubeStackData' && this.options.maxStackedValues) {
        return this.model[this.method](this.path, areasToCache, this.options.maxStackedValues).then(fn.bind(this));
      }

      return this.model[this.method](this.path, areasToCache).then(fn.bind(this));
    },
    getData(srcAreas) {
      if (!this.model) {
        return Promise.reject();
      }
      if (!this.enabled || !this.cubeHeight || !this.cubeWidth) {
        if (this.method === 'getHyperCubeStackData' && this.options.maxStackedValues) {
          return this.model[this.method](this.path, srcAreas, this.options.maxStackedValues);
        }
        return this.model[this.method](this.path, srcAreas);
      }
      let i;
      let area;
      const areas = [];
      for (i = 0; i < srcAreas.length; ++i) {
        area = srcAreas[i];
        areas.push({
          // areas objects must be unique -> copy page values into new object
          qTop: Math.max(Math.floor(area.qTop), 0),
          qLeft: Math.max(area.qLeft, 0),
          qHeight: Math.min(area.qHeight, this.cubeHeight - Math.floor(area.qTop)),
          qWidth: Math.min(area.qWidth, this.cubeWidth - area.qLeft),
        });
      }
      if (this.cube.contains(areas)) {
        this.throttle.updateResolutionTime();
        return Promise.resolve(this.cube.get(areas));
      }
      if (
        areas[0].qTop === 0 &&
        this.cube.isEmpty() &&
        this.throttle.ongoingRequests.length + this.throttle.queuedRequests.length === 0
      ) {
        // to avoid caching on first call to getData
        this.throttle.updateResolutionTime();
        return this.cacheData(areas, areas);
      }

      return this.throttle.queue(areas);
    },
    _getDirections(lastRequests) {
      if (!lastRequests || lastRequests.length < 2) {
        return { vertical: 0, horizontal: 0 };
      }

      const lastCouple = lastRequests.slice(-2);
      const diffY = lastCouple[1].top - lastCouple[0].top;
      const diffX = lastCouple[1].left - lastCouple[0].left;
      return {
        vertical: diffY < 0 ? -1 : diffY > 0 ? 1 : 0,
        horizontal: diffX < 0 ? -1 : diffX > 0 ? 1 : 0,
      };
    },
    _getAreasToCache(areas, h, w) {
      let i;
      let wiggleHeight;
      let wiggleWidth;
      let offsetTop;
      let offsetLeft;
      let height;
      let width;
      let top;
      let left;
      const cacheAreas = [];
      let adjustedCacheHeight = this.cacheHeight;
      if (typeof h === 'undefined') {
        h = 0;
      }
      if (typeof w === 'undefined') {
        w = 0;
      }

      // Adjust the cache height if needed to keep the amount of data we request inside the limits of the
      // engine.  If the height*width*length exceeds the engine limit, adjust height down to the largest
      // valid value it can be.
      if (this.cacheHeight * this.cacheWidth * areas.length > this.options.maxTotalArea) {
        adjustedCacheHeight = Math.floor(this.options.maxTotalArea / (areas.length * this.cacheWidth));
      }

      for (i = 0; i < areas.length; ++i) {
        wiggleHeight = h !== 0 ? Math.floor(Math.max(0, adjustedCacheHeight - areas[i].qHeight) * 0.5) : 0;
        wiggleWidth = w !== 0 ? Math.floor(Math.max(0, this.cacheWidth - areas[i].qWidth) * 0.5) : 0;
        offsetTop = wiggleHeight * h - wiggleHeight;
        offsetLeft = wiggleWidth * w - wiggleWidth;
        height =
          h !== 0
            ? Math.max(0, Math.min(Math.max(areas[i].qHeight, adjustedCacheHeight), this.cubeHeight))
            : areas[i].qHeight;
        width =
          w !== 0 ? Math.max(0, Math.min(Math.max(areas[i].qWidth, this.cacheWidth), this.cubeWidth)) : areas[i].qWidth;
        top = Math.max(0, Math.min(areas[i].qTop + offsetTop, this.cubeHeight - height));
        left = Math.max(0, Math.min(areas[i].qLeft + offsetLeft, this.cubeWidth - width));

        cacheAreas.push({
          qTop: top,
          qHeight: height,
          qLeft: left,
          qWidth: width,
        });
      }

      // console.log( "directions x:" + w + " y:" + h + ", cacheAerea: t:" + cacheAreas[0].qTop + ", l:" + cacheAreas[0].qLeft + ", w:" + cacheAreas[0].qWidth + ", h:" + cacheAreas[0].qHeight );

      return cacheAreas;
    },
  }
);

export default Cache;
