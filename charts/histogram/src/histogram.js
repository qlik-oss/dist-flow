/* eslint-disable import/no-unresolved */
import translator from '../../../js/lib/translator';
import HistogramView from './histogram-view';
import histogramPropertiesDefinition from './histogram-properties';
import histogramDataDefinition from './histogram-data';
import histogramExplorePropertiesDefinition from './histogram-explore-properties';
import histogramNumericValuesHandler from './histogram-numeric-values-handler';
import histogramExport from './histogram-export';
import HyperCubePropertyHandler from '../../../assets/objects/utils/data-properties/hypercube-handler';
import HypercubeApi from '../../../assets/objects/backend-api/hypercube-api';
import template from './histogram.ng.html';
import propertyMapper from '../../../assets/client/utils/property-mapper';
import objectConversion from '../../../assets/objects/conversion/object-conversion';

export default {
  type: 'histogram',
  BackendApi: HypercubeApi,
  template,
  View: HistogramView,
  definition: histogramPropertiesDefinition,
  softDefinition: histogramExplorePropertiesDefinition,
  support: {
    cssScaling: false,
    snapshot: true,
    export: true,
    exportData: true,
    sharing: true,
    viewData: true,
  },
  data: histogramDataDefinition,
  importProperties: null, // Prevent conversion to and from this object
  exportProperties: null,
  exportTableProperties(propertyTree) {
    // the hypercube that will be used for "building" the table is under `qUndoExclude.box.qHyperCubeDef`
    const hyperCubePath = 'qUndoExclude.box';
    return objectConversion.hypercube.exportProperties(propertyTree, hyperCubePath);
  },
  getDropFieldOptions: histogramNumericValuesHandler.getDropFieldOptions,
  getDropDimensionOptions: histogramNumericValuesHandler.getDropDimensionOptions,
  addDimensionPopoverComponent: histogramNumericValuesHandler.addDimensionPopoverComponent,
  getExportRawDataOptions: histogramExport.getExportRawDataOptions,
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

    return new HyperCubePropertyHandler({
      app,
      dimensionDefinition: this.dimensionDefinition,
      measureDefinition: this.measureDefinition,
      dimensionProperties,
      measureProperties,
      globalChangeListeners: globalChange,
      addDimensionLabel: translator.get('Visualization.Requirements.AddField'),
    });
  },
};
