import { getValue } from '@qlik/chart-modules';
import ChartView from '@qlik/common/picasso/chart-view';
import SelectionHandler from '@qlik/common/picasso/selections/selections-handler';
// import TooltipHandler from '@qlik/common/picasso/tooltip/tooltips-handler';
import DerivedProperties from '@qlik/common/picasso/derived-properties/derived-properties';
import cubesGenerator from './derived-properties/histogram-cubes-generator';
import histogramMappings from './derived-properties/histogram-mappings';
import ChartSettings from './chart-settings/chart-settings';

const namespace = '.histogram';
const chartID = 'object.histogram';

//
// Implementation details
//

function init(
  flags,
  layout,
  picasso,
  translator,
  theme,
  $scope,
  $element,
  options,
  backendApi,
  selectionsApi,
  tooltipApi
) {
  this._super(picasso, $scope, $element, options, backendApi, selectionsApi, tooltipApi);
  this.flags = flags;
  this.translator = translator;
  this.theme = theme;

  // TODO: add __do_not_use_findShapes for tests
  // const chartElement = $element.find('.picasso-chart')[0];
  // chartElement.__do_not_use_findShapes = this.chartInstance.findShapes.bind(this.chartInstance); // to allow access to renderered content via DOM

  this._derivedProperties = new DerivedProperties();

  if (this.hasOption('selections')) {
    this._selectionHandler = SelectionHandler.create({
      model: backendApi.model,
      chartInstance: this.chartInstance,
      selectionsApi,
      selectPaths: ['/qUndoExclude/box/qHyperCubeDef'],
    });
  }

  if (this.hasOption('tooltips')) {
    // TODO: fix tooltip
    // this._tooltipHandler = TooltipHandler.create(this.chartInstance, tooltipApi, $element, chartID);
    this._tooltipHandler = { on: () => {}, off: () => {}, setUp: () => {}, closeTooltip: () => {} };
  }

  this.setDataPaths(['qUndoExclude/box/qHyperCube']);
}

function updateConstraints(constraints) {
  const tooltip = !constraints.passive;
  const selection = !constraints.select && !constraints.active;

  this._tooltipHandler[tooltip ? 'on' : 'off']();
  this._selectionHandler[selection ? 'on' : 'off']();
}
function on() {
  if (this._on) {
    return;
  }

  if (this.hasOption('tooltips')) {
    this._tooltipHandler.on();
  }

  if (this.hasOption('selections')) {
    this._selectionHandler.on();
  }

  // Prevents the html body from moving when panning in ipad
  this.$element.on(`touchstart${namespace}`, (event) => {
    event.preventDefault();
  });

  this._on = true;
}

function off() {
  if (!this._on) {
    return;
  }

  if (this.hasOption('tooltips')) {
    this._tooltipHandler.off();
  }

  if (this.hasOption('selections')) {
    this._selectionHandler.off();
  }

  this.$element.off(namespace);

  this._on = false;
}

function setSnapshotData(snapshotLayout) {
  this._super(snapshotLayout);

  snapshotLayout.qUndoExclude.box.qHyperCube.qDataPages = this.layout.qUndoExclude.box.qHyperCube.qDataPages; // eslint-disable-line no-param-reassign

  return Promise.resolve(snapshotLayout);
}

function getDisclaimerAttributes(layout) {
  function isOnlyNanData() {
    const rows = getValue(layout, 'qUndoExclude.box.qHyperCube.qDataPages.0.qMatrix', []);

    // There is only one row and the dimension value on that row is null, then we only have NaN data
    return rows.length === 1 && rows[0][0] && rows[0][0].qIsNull;
  }

  const onlyNanData = isOnlyNanData();

  return {
    data: layout.qUndoExclude && layout.qUndoExclude.box,
    supportedDisclaimers: {
      LimitedData: true,
      OnlyNanData: true,
      OnlyNegativeOrZeroValues: !onlyNanData,
    },
    options: {
      bottom: true,
      supportNegative: false,
      explicitOnlyNanData: onlyNanData,
    },
  };
}

function updateChart(layout, settings) {
  if (!layout.qUndoExclude) {
    // Console error when undefined data is sent to picasso
    return Promise.resolve();
  }
  this._super(layout, settings);
  return undefined;
}

function getHashData(layout, properties) {
  return {
    box: properties.qHyperCubeDef,
    binMappings: histogramMappings.getMappingValues(layout),
    binProperties: properties.bins,
    measureAxis: properties.measureAxis,
    version: '2.0', // Added to trigger update because of logic changes in generateHyperCubes
  };
}

function updateData(layout) {
  const self = this;

  return self._super(layout).then(() => {
    if (self._destroyed) {
      return Promise.reject();
    }
    layout = self.layout; // eslint-disable-line no-param-reassign

    const rect = {
      height: Math.min(layout.qHyperCube.qSize.qcy, 1000),
      width: 2,
    };

    const model = self.backendApi.model;

    if (self.backendApi.isSnapshot) {
      return Promise.resolve();
    }

    return model.getEffectiveProperties().then((properties) => {
      if (self._destroyed) {
        return Promise.reject();
      }
      return self._derivedProperties
        .addDefaultHyperCubeHash(
          properties.qHyperCubeDef,
          layout.qHyperCube,
          model.app,
          getHashData(layout, properties)
        )
        .then((hashData) => {
          if (self._destroyed) {
            return Promise.reject();
          }
          const settings = {
            layout,
            properties,
            model,
            hashData,
            generateDerivedProperties(layout, properties) {
              return cubesGenerator.generateHyperCubes(layout, properties, model.app, self.translator);
            },
          };

          if (!self._derivedProperties.isDerivedUpToDate(settings)) {
            return self._derivedProperties.updateDerivedProperties(settings);
          }
          if (!layout.qUndoExclude) {
            // Have seen a couple of console errors because qUndoExclude did not exist when calling backendApi.updateCache bellow
            return Promise.resolve();
          }

          self.backendApi.setPath('/qUndoExclude/box/qHyperCubeDef');
          self.backendApi.updateCache(layout.qUndoExclude.box);

          return self.getData(self.backendApi, layout.qUndoExclude.box.qHyperCube, rect);
        });
    });
  });
}

function paint($element) {
  const undoExclude = this.layout.qUndoExclude;
  if (!undoExclude) {
    return Promise.resolve(false);
  }
  const haveBoxData = undoExclude.box && undoExclude.box.qHyperCube.qDataPages.length;
  if (haveBoxData) {
    return this._super($element);
  }
  return Promise.resolve(false);
}

function isLassoDisabled() {
  return false;
}

const HistogramView = ChartView.extend('Histogram', {
  namespace,
  defaultOptions: {
    navigation: false,
    selections: true,
    tooltips: true,
  },
  init,
  updateConstraints,
  on,
  off,
  createChartSettings: function createChartSettings(layout) {
    return ChartSettings.createChartSettings(this, layout);
  },
  setSnapshotData,
  getDisclaimerAttributes,
  updateChart,
  updateData,
  paint,
  isLassoDisabled,
});

export default HistogramView;
