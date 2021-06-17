import { getValue } from 'qlik-chart-modules';
import SETTINGS from './boxplot-sorting-settings';

//
// Implementation details
//
function getSettings(layout) {
  const cardinality = getValue(layout, 'boxplotDef.qHyperCube.qDimensionInfo.1.qCardinal', 1);

  if (cardinality > 10) {
    return SETTINGS.BOX_MIDDLE;
  }

  return SETTINGS.ASCII;
}

const boxplotSortingSettingsRetriever = {
  getSettings,
};

export default boxplotSortingSettingsRetriever;
