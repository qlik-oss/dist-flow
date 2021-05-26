import extend from 'extend';
import hypercubeApi from '../../../assets/objects/backend-api/hypercube-api';
import template from './waterfallchart.ng.html';
import view from './waterfallchart-view';
import properties from './waterfallchart-properties';
import objectConversion from '../../../assets/objects/conversion/object-conversion';

const waterfallChart = {
  type: 'waterfallchart',
  BackendApi: hypercubeApi,
  template,
  View: view,
  definition: properties,
  initialProperties: {
    qHyperCubeDef: {
      qDimensions: [],
      qMeasures: [],
      qInitialDataFetch: [{ qWidth: 200, qHeight: 10 }],
      qSuppressMissing: true,
    },
  },
  support: {
    cssScaling: false,
    snapshot: true,
    export: true,
    exportData: true,
    sharing: true,
    viewData: true,
  },
  importProperties(exportedFmt, initialProperties, definition) {
    const propTree = objectConversion.hypercube.importProperties.apply(objectConversion, [
      exportedFmt,
      initialProperties,
      definition,
    ]);
    const props = propTree.qProperty;
    if (props.dimensionAxis.show === 'all') {
      props.dimensionAxis.show = 'labels';
    } else if (props.dimensionAxis.show === 'title') {
      props.dimensionAxis.show = 'none';
    }
    if (props.measureAxis.show === 'all') {
      props.measureAxis.show = 'labels';
    } else if (props.measureAxis.show === 'title') {
      props.measureAxis.show = 'none';
    }

    if (props.qHyperCubeDef.qMeasures.length > 0) {
      props.qDef.numFormatFromTemplate = props.qHyperCubeDef.qMeasures[0].qDef.numFormatFromTemplate;
      props.qDef.qNumFormat = props.qHyperCubeDef.qMeasures[0].qDef.qNumFormat;
      props.qHyperCubeDef.qMeasures.forEach((measure) => {
        measure.qDef.numFormatFromTemplate = props.qDef.numFormatFromTemplate;
        measure.qDef.qNumFormat = extend(true, {}, props.qDef.qNumFormat);
      });
    }

    return propTree;
  },
  exportProperties: objectConversion.hypercube.exportProperties,
};

export default waterfallChart;
