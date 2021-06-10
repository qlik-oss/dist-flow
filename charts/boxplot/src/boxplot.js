/* eslint no-param-reassign: ["error", { "props": true }] */
import HyperCubePropertyHandler from '../../../assets/objects/utils/data-properties/hypercube-handler';
import propertyMapper from '../../../assets/client/utils/property-mapper';
import objectConversion from '../../../assets/objects/conversion/object-conversion';

import BoxPlotApi from './boxplot-api';
import template from './boxplot.ng.html';
import './boxplot-tooltip/boxplot-tooltip-picture-directive';

const dataPath = 'qUndoExclude';
const HYPERCUBE_PATH = 'boxplotDef';

export default {
  type: 'boxplot',
  BackendApi: BoxPlotApi,
  template,
  initialProperties: {
    boxplotDef: {
      sorting: {
        autoSort: true,
      },
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
        qMode: 'S',
        qAlwaysFullyExpanded: true,
        qSuppressZero: false,
        qSuppressMissing: true,
      },
    },
  },
  importProperties() {
    const propTree = objectConversion.hypercube.importProperties.apply(
      objectConversion.hypercube.importProperties,
      arguments
    );
    const props = propTree.qProperty;
    // Turn off dimension limits, not supported in boxplot
    props.boxplotDef.qHyperCubeDef.qDimensions.forEach((dim) => {
      dim.qOtherTotalSpec.qOtherMode = 'OTHER_OFF'; // eslint-disable-line no-param-reassign
    });
    return propTree;
  },
  exportProperties: objectConversion.hypercube.exportProperties,
  exportTableProperties(propertyTree) {
    const boxHyperCubePath = `${dataPath}.box`;
    return objectConversion.hypercube.exportProperties(propertyTree, boxHyperCubePath);
  },
  getCreatePropertyHandler(app) {
    const mappedDefinition = this.mappedDefinition;
    const globalChange = this.globalChangeListeners;
    let dimensionProperties;
    let measureProperties;

    if (this.dimensionDefinition) {
      dimensionProperties = propertyMapper.mapProperties(mappedDefinition.items.data.items.innerData.items.dimensions);
    }
    if (this.measureDefinition) {
      measureProperties = propertyMapper.mapProperties(mappedDefinition.items.data.items.innerData.items.measures);
    }

    const handler = new HyperCubePropertyHandler({
      app,
      dimensionDefinition: this.dimensionDefinition,
      measureDefinition: this.measureDefinition,
      dimensionProperties,
      measureProperties,
      globalChangeListeners: globalChange,
      path: HYPERCUBE_PATH,
    });
    // Don't mark expressions (in color by) refering to the measure label as valid as the original measure is not in the hypercube
    handler.getLabels = function () {
      return [];
    };
    return handler;
  },
};
