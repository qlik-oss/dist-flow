import properties from './object-properties';
import data from './distributionplot-data';
import { importProperties, exportProperties } from './distributionplot-import-export';

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
