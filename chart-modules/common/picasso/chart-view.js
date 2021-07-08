import extend from 'extend';
import { getValue } from 'qlik-chart-modules';

import Class from '../extra/class';
import ChartBuilder from './chart-builder/chart-builder';
import Disclaimer from './disclaimer/disclaimer';

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
    hyperCube[dataPagesPath] = pages;
  });
}

const ChartView = Class.extend({
  init(picasso, $element, environment, backendApi, selectionsApi) {
    this.$element = $element;
    this.environment = environment;
    this.backendApi = backendApi;

    this._selectionsApi = selectionsApi;
    this._on = false;
    this._disclaimer = new Disclaimer(environment);
    this._dataPaths = ['qHyperCube'];

    const self = this;

    // Set properties that should be available in subclasses

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

  updateEnvironment(environment) {
    this.environment = environment;
  },

  isRtl() {
    return this.environment.options?.direction === 'rtl';
  },

  setDataPaths(dataPaths) {
    this._dataPaths = dataPaths;
  },

  getData(backendApi, hyperCube, rect) {
    return getData(backendApi, hyperCube, rect);
  },

  hasValidData() {
    return true;
  },

  paint() {
    // Use this.layout
    if (this.hasValidData()) {
      this._disclaimer.set(this.getDisclaimerAttributes(this.layout));
      const disclaimerComponent = this._disclaimer.getComponentSettings();
      const isSuppressingDisc = disclaimerComponent?.layout?.dock === 'center';

      const chartSettings = this.createChartSettings(this.layout);
      if (isSuppressingDisc) {
        chartSettings.components = [disclaimerComponent];
      } else if (disclaimerComponent) {
        chartSettings.components.push(disclaimerComponent);
      }
      ChartBuilder.validateComponentKeys(chartSettings.components).forEach((errorMsg) => {
        console.error(errorMsg);
      });

      this.updateChart(this.layout, chartSettings);
      this._painted = true;
    }
    return Promise.resolve();
  },

  resize() {
    // Use this.layout
    if (!this.layout) {
      // There are cases where resize is run before updateData, therefore layout is undefined
      return undefined;
    }
    return this.paint();
  },

  createChartSettings() {
    throw new Error('Subclass must implement "createChartSettings" function');
  },

  addSnapshotChartSettings(settings, layout) {
    const { freeResize, maximizeSnapshot } = this.environment.options;
    if (!freeResize && layout.snapshotData) {
      settings.dockLayout.logicalSize = {
        width: layout.snapshotData.content.size.w,
        height: layout.snapshotData.content.size.h,
      };
      if (maximizeSnapshot) {
        settings.dockLayout.logicalSize.preserveAspectRatio = true;
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
    const localeInfo = this.environment.appLayout?.qLocaleInfo ?? {};
    const data = this._dataPaths.map((path) => ({
      type: 'q',
      key: path,
      config: {
        localeInfo,
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
    // this.picassoElement.setAttribute('data-state', States.DATA.UPDATED); // For integration test
  },

  destroy() {
    this._destroyed = true;
    this.off();
    this.chartInstance.destroy();
  },

  getViewState() {
    return {};
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
});

export default ChartView;
