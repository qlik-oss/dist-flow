import pp from './histogram-properties';
import exploreProperties from './histogram-explore-properties';
// import histogramNumericValuesHandler from './histogram-numeric-values-handler';
// import histogramExport from './histogram-export';
// import propertyMapper from '../../../assets/client/utils/property-mapper';
// import objectConversion from '../../../assets/objects/conversion/object-conversion';
// import HyperCubePropertyHandler from '../../../assets/objects/utils/data-properties/hypercube-handler';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  let objectConversion;
  // eslint-disable-next-line import/no-dynamic-require, global-require
  require(['objects.extension/object-conversion'], (conversion) => {
    objectConversion = conversion;
  });

  // const { translator } = env;
  return {
    definition: pp(env),
    softDefinition: exploreProperties,
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    importProperties: null, // Prevent conversion to and from this object
    exportProperties: null,
    requireNumericDimension: true,
    exportTableProperties(propertyTree) {
      // the hypercube that will be used for "building" the table is under `qUndoExclude.box.qHyperCubeDef`
      const hyperCubePath = 'qUndoExclude.box';
      return objectConversion.hypercube.exportProperties(propertyTree, hyperCubePath);
    },
    // getDropFieldOptions: histogramNumericValuesHandler.getDropFieldOptions,
    // getDropDimensionOptions: histogramNumericValuesHandler.getDropDimensionOptions,
    // getExportRawDataOptions: histogramExport.getExportRawDataOptions,
    // getCreatePropertyHandler(app) {
    //   const mappedDefinition = this.mappedDefinition;
    //   const globalChange = this.globalChangeListeners;
    //   let dimensionProperties;
    //   let measureProperties;

    //   if (this.dimensionDefinition) {
    //     dimensionProperties = propertyMapper.mapProperties(
    //       mappedDefinition.items.data.items.innerData.items.dimensions
    //     );
    //   }
    //   if (this.measureDefinition) {
    //     measureProperties = propertyMapper.mapProperties(mappedDefinition.items.data.items.innerData.items.measures);
    //   }

    //   return new HyperCubePropertyHandler({
    //     app,
    //     dimensionDefinition: this.dimensionDefinition,
    //     measureDefinition: this.measureDefinition,
    //     dimensionProperties,
    //     measureProperties,
    //     globalChangeListeners: globalChange,
    //     addDimensionLabel: translator.get('Visualization.Requirements.AddField'),
    //   });
    // },
  };
}
