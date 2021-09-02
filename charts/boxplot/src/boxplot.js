/* eslint-disable import/no-unresolved, prefer-rest-params */
import HyperCubePropertyHandler from '../../../assets/objects/utils/data-properties/hypercube-handler';
import propertyMapper from '../../../assets/client/utils/property-mapper';

import BoxPlotApi from './boxplot-api';
import template from './boxplot.ng.html';
import './boxplot-tooltip/boxplot-tooltip-picture-directive';

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
