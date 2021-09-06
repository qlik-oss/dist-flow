import pp from './distributionplot-properties';
import softDefinition from './distributionplot-explore-properties';
import propsLogic from './distributionplot-properties-logic';
import data from './distributionplot-data';
import { importProperties, exportProperties } from './distributionplot-import-export';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  return {
    definition: pp(env),
    softDefinition,
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    options: {
      usingDerivedProperties: true,
      colorByPath: 'color.point',
    },
    onSoftPropertyChange(prevProperties, nextProperties) {
      propsLogic.onGlobalChangeColors(nextProperties);
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
  };
}
