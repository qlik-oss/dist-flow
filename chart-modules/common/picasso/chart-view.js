import extend from 'extend';
import { getValue, debouncer } from '@qlik/chart-modules';

import BaseView from '../extra/base-view';
import ChartBuilder from './chart-builder/chart-builder';
// import Disclaimer from './disclaimer/disclaimer';
// import InteractionStates from '../utils/interaction-states';
// import ColorMap from '../views/charts/representation/combo-color-map';
// import States from '../utils/states';

function getData(backendApi, hyperCube, rect) {
  let page = {
    qTop: 0,
    qLeft: 0,
    qWidth: hyperCube.qSize.qcx,
    qHeight: 10000 / hyperCube.qSize.qcx,
  };
  let dataPagesPath;

  if (rect) {
    const width = rect.width || hyperCube.qSize.qcx;
    const maxHeight = Math.floor(10000 / width);
    page = {
      qTop: rect.top || 0,
      qLeft: rect.left || 0,
      qWidth: width,
      qHeight: rect.height ? Math.min(rect.height, maxHeight) : maxHeight,
    };
  } else {
    page = {
      qTop: 0,
      qLeft: 0,
      qWidth: hyperCube.qSize.qcx,
      qHeight: 10000 / hyperCube.qSize.qcx,
    };
  }

  switch (hyperCube.qMode) {
    case 'K': // Stacked mode
      dataPagesPath = 'qStackedDataPages';
      break;
    case 'S': // Straight table mode
    default:
      dataPagesPath = 'qDataPages';
      break;
  }

  return backendApi.getData([page], null, hyperCube).then((pages) => {
    hyperCube[dataPagesPath] = pages; // eslint-disable-line no-param-reassign
  });
}

const ChartView = BaseView.extend({
  defaultOptions: {
    navigation: false,
    selections: false,
    tooltips: false,
  },

  init(picasso, $scope, $element, options, backendApi, selectionsApi /* , tooltipApi */) {
    this._super($scope, $element, extend({}, this.defaultOptions, options), backendApi);

    this._selectionsApi = selectionsApi;
    this._on = false;
    // TODO: new Disclaimer
    // this._disclaimer = new Disclaimer(options);
    this._disclaimer = { set: () => {}, display: () => {} };
    this._updateDisclaimerDebounce = debouncer(this.updateDisclaimer.bind(this), 250);
    // this._colorMap = new ColorMap({ autoMode: 'primary' }, backendApi.model.app);
    this._dataPaths = ['qHyperCube'];

    const self = this;

    // Set properties that should be available in subclasses

    // this.picassoElement = $element.find('.picasso-chart')[0];
    this.picassoElement = $element[0];
    // Paint a visually empty Picasso chart containing an event-area component
    this.chartInstance = picasso.chart({
      element: this.picassoElement,
      settings: {
        components: [
          ChartBuilder.createComponent('event-area', {
            mounted(element) {
              // Mounted is run synchronously so this.dataAreaElem will be available in subclass constructors
              self.dataAreaElem = element;
            },
          }),
        ],
      },
    });
  },

  setDataPaths(dataPaths) {
    this._dataPaths = dataPaths;
  },

  hasOption(key) {
    return !!this.options[key];
  },

  on() {
    if (this._on) {
      return;
    }

    this._on = true;
  },
  off() {
    if (!this._on) {
      return;
    }
    this._on = false;
  },

  getColoringMap() {
    return this._colorMap;
  },

  setFreeResize(freeResize) {
    this._super(freeResize);
  },

  getData(backendApi, hyperCube, rect) {
    return getData(backendApi, hyperCube, rect);
  },

  hasValidData() {
    return true;
  },

  paint($element /* , layout */) {
    // Use this.layout
    if (this.hasValidData()) {
      this.updateDisclaimer(this.layout);

      const chartSettings = this.createChartSettings(this.layout);
      ChartBuilder.validateComponentKeys(chartSettings.components).forEach((errorMsg) => {
        console.error(errorMsg);
      });

      this.updateChart(this.layout, chartSettings);
      this._painted = true;
    }
    return this._super($element, this.layout);
  },

  resize($element /* , layout */) {
    // Use this.layout
    if (!this.layout) {
      // There are cases where resize is run before updateData, therefore layout is undefined
      return undefined;
    }
    return this.paint($element, this.layout);
  },

  createChartSettings() {
    throw new Error('Subclass must implement "createChartSettings" function');
  },

  addSnapshotChartSettings(settings, layout) {
    if (!this.options.freeResize && layout.snapshotData) {
      settings.dockLayout.logicalSize = {
        // eslint-disable-line no-param-reassign
        width: layout.snapshotData.content.size.w,
        height: layout.snapshotData.content.size.h,
      };
      if (this.options.maximizeSnapshot) {
        settings.dockLayout.logicalSize.preserveAspectRatio = true; // eslint-disable-line no-param-reassign
      }
    }
  },

  updateData(layout) {
    // clone the layout so that updates ignored by suppressOnPaint does not affect it.
    if (this._destroyed) {
      return Promise.reject();
    }

    this.layout = extend(true, {}, layout);
    this.layout.permissions = layout.permissions;
    return Promise.resolve();
  },

  updateChart(layout, settings, isPartialData) {
    const self = this;
    this._updateDisclaimerDebounce(this.layout);
    const data = this._dataPaths.map((path) => ({
      type: 'q',
      key: path,
      config: {
        localeInfo: self.backendApi ? self.backendApi.localeInfo : {},
      },
      data: getValue(layout, path.replace(/\//g, '.')),
    }));
    if (this.colorService) {
      data.push(...this.colorService.getData());
    }

    this.chartInstance.update({
      data,
      settings,
      partialData: isPartialData,
    });
    // this.chartInstance.interactions[this.options.interactionState === InteractionStates.STATIC ? 'off' : 'on']();
    // this.picassoElement.setAttribute('data-state', States.DATA.UPDATED); // For integration test
  },

  updateDisclaimer(layout) {
    if (layout) {
      this._disclaimer.set(this.getDisclaimerAttributes(layout));
      this._disclaimer.display(this.picassoElement);
    }
  },

  destroy() {
    this._super();
    this.off();
    this.chartInstance.destroy();
    this._colorMap.release();
  },

  isLassoDisabled() {
    return true;
  },

  setSnapshotData(snapshotLayout) {
    snapshotLayout.snapshotData.content = {
      // eslint-disable-line no-param-reassign
      chartData: {},
      size: {
        w: this.$element.width(),
        h: this.$element.height(),
      },
    };
  },

  getDisclaimerAttributes(layout) {
    return {
      data: layout,
    };
  },

  suppressOnPaint(layout) {
    if (this.$scope.object._forcePaint) {
      this.$scope.object._forcePaint = false;
      return false;
    }
    return layout.qSelectionInfo && layout.qSelectionInfo.qInSelections;
  },
});

export default ChartView;
