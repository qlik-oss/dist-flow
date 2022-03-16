import conversion from 'qlik-object-conversion';
import pp from './histogram-properties';
import exploreProperties from './histogram-explore-properties';
import histogramExport from './histogram-export';
import data from './histogram-data';

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
      const layoutService = { layout: { templateId: initialProperties.templateId } };
      extension.mapProperties(layoutService);
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
      return conversion.hypercube.exportProperties({ propertyTree, hyperCubePath, viewDataMode });
    },
    requireNumericDimension: true,
    exportTableProperties(propertyTree) {
      // the hypercube that will be used for "building" the table is under `qUndoExclude.box.qHyperCubeDef`
      const hypercubePath = 'qUndoExclude.box';
      return conversion.hypercube.exportProperties({ propertyTree, hypercubePath });
    },
    getExportRawDataOptions: histogramExport.getExportRawDataOptions,
  };
}
