import conversion from 'qlik-object-conversion';

const HYPERCUBE_PATH = 'boxplotDef';
const VIEW_DATA_HYPERCUBE_PATH = 'qUndoExclude.box';

export function importProperties({ dataDefinition, defaultPropertyValues, exportFormat, initialProperties }) {
  const propTree = conversion.hypercube.importProperties({
    exportFormat,
    initialProperties,
    dataDefinition,
    defaultPropertyValues,
    hypercubePath: HYPERCUBE_PATH,
    supportedFilters: false,
    isHCModifierSupported: false,
  });

  const props = propTree.qProperty;
  // Turn off dimension limits, not supported in boxplot
  props.boxplotDef.qHyperCubeDef.qDimensions.forEach((dim) => {
    dim.qOtherTotalSpec.qOtherMode = 'OTHER_OFF'; // eslint-disable-line no-param-reassign
  });

  return propTree;
}

export function exportProperties({ propertyTree, hypercubePath = HYPERCUBE_PATH, viewDataMode }) {
  if (viewDataMode && propertyTree.qProperty.qLayoutExclude?.quarantine?.storedFilters) {
    delete propertyTree.qProperty.qLayoutExclude.quarantine.storedFilters;
  }
  const exportFormat = conversion.hypercube.exportProperties({
    propertyTree,
    hypercubePath: viewDataMode ? VIEW_DATA_HYPERCUBE_PATH : hypercubePath,
    viewDataMode,
  });

  return exportFormat;
}
