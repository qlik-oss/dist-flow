import { getValue } from '@qlik/chart-modules'
import SETTINGS from './distributionplot-sorting-settings';

//
// Implementation details
//
function getSettings(layout) {
  const cardinality = getValue(layout, 'qHyperCube.qDimensionInfo.1.qCardinal', 1);

  if (cardinality > 10) {
    return SETTINGS.DIST_MAX;
  }

  return SETTINGS.ASCII;
}

const settingsRetriever = {
  getSettings,
};

export default settingsRetriever;
