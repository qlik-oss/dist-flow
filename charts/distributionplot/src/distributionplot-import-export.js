import conversion from 'qlik-object-conversion';
import distributionPlotColorBy from './distributionplot-color-by';

export function importProperties({ dataDefinition, defaultPropertyValues, exportFormat, initialProperties }) {
  const propTree = conversion.axisChart.importProperties({
    exportFormat,
    initialProperties,
    dataDefinition,
    defaultPropertyValues,
  });

  const props = propTree.qProperty;
  if (props.qHyperCubeDef.qInterColumnSortOrder.length === 3) {
    props.qHyperCubeDef.qInterColumnSortOrder = [1, 2, 0]; // Since the distribution plot does not allow re-ordering of sorting prioritizes we must set this manually on conversion
  }
  distributionPlotColorBy.importColors(props);

  return propTree;
}

export function exportProperties({ propertyTree, viewDataMode }) {
  const exportFormat = conversion.axisChart.exportProperties({
    propertyTree,
    viewDataMode,
  });

  distributionPlotColorBy.exportColors(propertyTree.qProperty);

  return exportFormat;
}
