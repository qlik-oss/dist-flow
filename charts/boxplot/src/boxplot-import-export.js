import conversion from 'qlik-object-conversion';

const HYPERCUBE_PATH = 'boxplotDef';

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
  const exportFormat = conversion.hypercube.exportProperties({
    propertyTree,
    hypercubePath,
    viewDataMode,
  });

  return exportFormat;
}
