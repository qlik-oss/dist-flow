import conversion from 'qlik-object-conversion';
import pp from './histogram-properties';
import exploreProperties from './histogram-explore-properties';
import histogramExport from './histogram-export';
import data from './histogram-data';

const VIEW_DATA_HYPERCUBE_PATH = 'qUndoExclude.box';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

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
    importProperties: (exportFormat, initialProperties, extension, hypercubePath) => {
      const dataDefinition = data(env);
      extension.mapProperties();
      const defaultPropertyValues = {
        defaultDimension: extension.getDefaultDimensionProperties(),
        defaultMeasure: extension.getDefaultMeasureProperties(),
      };
      return conversion.hypercube.importProperties({
        exportFormat,
        initialProperties,
        dataDefinition,
        defaultPropertyValues,
        hypercubePath,
      });
    },
    exportProperties(propertyTree, hyperCubePath, viewDataMode) {
      return conversion.hypercube.exportProperties({
        propertyTree,
        hyperCubePath: viewDataMode ? VIEW_DATA_HYPERCUBE_PATH : hyperCubePath,
        viewDataMode,
      });
    },
    requireNumericDimension: true,
    exportTableProperties(propertyTree) {
      // the hypercube that will be used for "building" the table is under `qUndoExclude.box.qHyperCubeDef`
      const hypercubePath = VIEW_DATA_HYPERCUBE_PATH;
      return conversion.hypercube.exportProperties({ propertyTree, hypercubePath, viewData: true });
    },
    getExportRawDataOptions: histogramExport.getExportRawDataOptions,
  };
}
