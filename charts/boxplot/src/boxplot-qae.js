import properties from './boxplot-object-properties';
import data from './boxplot-data';
import { importProperties, exportProperties, exportTableProperties } from './boxplot-import-export';

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
    exportTableProperties,
  };
};
