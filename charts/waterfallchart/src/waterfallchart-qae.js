import properties from './object-properties';
import data from './waterfallchart-data-definition';
import { importProperties, exportProperties } from './waterfallchart-import-export';

export default (env) => {
  const dataDefinition = data(env);
  return {
    properties,
    data: {
      targets: [dataDefinition],
    },
    importProperties({ exportFormat, initialProperties }) {
      return importProperties({ dataDefinition, exportFormat, initialProperties });
    },
    exportProperties,
  };
};
