import data from './boxplot-data';
import softDefinition from './boxplot-explore-properties';
import pp from './boxplot-properties';
import { importProperties, exportProperties } from './boxplot-import-export';

const HYPERCUBE_PATH = 'boxplotDef';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  return {
    definition: pp(env),
    softDefinition: softDefinition.get(HYPERCUBE_PATH),
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    options: {
      hyperCubePath: HYPERCUBE_PATH,
      usingDerivedProperties: true,
    },
    importProperties: (exportFormat, initialProperties, extension) => {
      const dataDefinition = data(env);
      extension.mapProperties();
      const defaultPropertyValues = {
        defaultDimension: extension.getDefaultDimensionProperties(),
        defaultMeasure: extension.getDefaultMeasureProperties(),
      };
      return importProperties({
        dataDefinition,
        defaultPropertyValues,
        exportFormat,
        initialProperties,
      });
    },
    exportProperties(propertyTree, hyperCubePath, viewDataMode) {
      return exportProperties({ propertyTree, viewDataMode });
    },
    exportTableProperties(propertyTree) {
      return exportProperties({ propertyTree, viewDataMode: true });
    },
  };
}
