import pp from './waterfallchart-properties';
import dataDefinition from './waterfallchart-data-definition';
import { importProperties, exportProperties } from './waterfallchart-import-export';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  return {
    definition: pp(env),
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    importProperties(exportFormat, initialProperties, extension) {
      extension.mapProperties();

      const defaultPropertyValues = {
        defaultDimension: extension.getDefaultDimensionProperties(),
        defaultMeasure: extension.getDefaultMeasureProperties(),
      };
      return importProperties({
        dataDefinition: dataDefinition(env),
        defaultPropertyValues,
        exportFormat,
        initialProperties,
      });
    },
    exportProperties(propertyTree, hyperCubePath, viewDataMode) {
      exportProperties({ propertyTree, viewDataMode });
    },
  };
}
