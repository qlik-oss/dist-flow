import { getValue } from 'qlik-chart-modules';
import ChartView from '@qlik/common/picasso/chart-view';
import SelectionHandler from '@qlik/common/picasso/selections/selections-handler';
import TooltipHandler from '@qlik/common/picasso/tooltip/tooltips-handler';
import DerivedProperties from '@qlik/common/picasso/derived-properties/derived-properties';
import cubesGenerator from './derived-properties/histogram-cubes-generator';
import histogramMappings from './derived-properties/histogram-mappings';
import ChartSettings from './chart-settings/chart-settings';

const namespace = '.histogram';
const chartID = 'object.histogram';

//
// Implementation details
//

function init({ environment, flags, lasso, picasso, $element, backendApi, selectionsApi, renderState }) {
  this._super(picasso, $element, environment, backendApi, selectionsApi);

  this.flags = flags;
  this.renderState = renderState;

  this.picassoElement.__do_not_use_findShapes = this.chartInstance.findShapes.bind(this.chartInstance); // to allow access to renderered content via DOM

  this._derivedProperties = new DerivedProperties();

  this._selectionHandler = SelectionHandler.create({
    model: backendApi.model,
    chartInstance: this.chartInstance,
    selectionsApi,
    selectPaths: ['/qUndoExclude/box/qHyperCubeDef'],
    lasso,
  });
  this._tooltipHandler = TooltipHandler.create(this.chartInstance, $element, chartID);

  this.setDataPaths(['qUndoExclude/box/qHyperCube']);
}

function updateConstraints(constraints) {
  const tooltip = !constraints.passive;
  const selection = !constraints.select && !constraints.active;

  this._tooltipHandler[tooltip ? 'on' : 'off']();
  this._selectionHandler[selection ? 'on' : 'off']();
}
function off() {
  this._tooltipHandler.off();
  this._selectionHandler.off();
}

function setSnapshotData(snapshotLayout) {
  this._super(snapshotLayout);

  snapshotLayout.qUndoExclude.box.qHyperCube.qDataPages = this.layout.qUndoExclude.box.qHyperCube.qDataPages; // eslint-disable-line no-param-reassign

  return Promise.resolve(snapshotLayout);
}

function getRequireNumericDimensionAttribute(qHyperCube) {
  return qHyperCube.qDimensionInfo.length > 0 && qHyperCube.qDimensionInfo[0].qTags.indexOf('$numeric') === -1;
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
      RequireNumericDimension: true,
    },
    options: {
      bottom: true,
      supportNegative: false,
      explicitOnlyNanData: onlyNanData,
      explicitRequireNumericDimension: getRequireNumericDimensionAttribute(layout.qHyperCube),
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

    const isSnapshot = !!this.layout.snapshotData;
    if (isSnapshot) {
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
          self.environment.app,
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
              return cubesGenerator.generateHyperCubes(layout, properties, self.environment);
            },
          };

          if (!self._derivedProperties.isDerivedUpToDate(settings)) {
            self.renderState.pending();
            return self._derivedProperties.updateDerivedProperties(settings);
          }
          if (!layout.qUndoExclude) {
            // Have seen a couple of console errors because qUndoExclude did not exist when calling backendApi.updateCache bellow
            return Promise.resolve();
          }

          self.renderState.restore();
          self.backendApi.updateCache(layout.qUndoExclude.box);

          return self.getData(self.backendApi, layout.qUndoExclude.box.qHyperCube, rect);
        });
    });
  });
}

function paint() {
  const undoExclude = this.layout.qUndoExclude;
  if (!undoExclude) {
    return Promise.resolve(false);
  }
  const haveBoxData = undoExclude.box && undoExclude.box.qHyperCube.qDataPages.length;
  if (haveBoxData) {
    return this._super();
  }
  return Promise.resolve(false);
}

function isLassoDisabled() {
  return false;
}

const HistogramView = ChartView.extend('Histogram', {
  namespace,
  init,
  updateConstraints,
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
