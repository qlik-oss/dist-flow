import pp from './histogram-properties';
import exploreProperties from './histogram-explore-properties';
// import histogramExport from './histogram-export';
// import objectConversion from '../../../assets/objects/conversion/object-conversion';

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
    // getExportRawDataOptions: histogramExport.getExportRawDataOptions,
  };
}
