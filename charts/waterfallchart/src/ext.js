import extend from 'extend';
import conversion from 'qlik-object-conversion';
import pp from './waterfallchart-properties';
import dataDefinition from './waterfallchart-data-definition';

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
    importProperties(exportFormat, initialProperties, extension, hypercubePath) {
      const layoutService = { layout: { templateId: initialProperties.templateId } };
      extension.mapProperties(layoutService);

      const defaultPropertyValues = {
        defaultDimension: extension.getDefaultDimensionProperties(),
        defaultMeasure: extension.getDefaultMeasureProperties(),
      };
      const propTree = conversion.hypercube.importProperties({
        exportFormat,
        initialProperties,
        dataDefinition: dataDefinition(env).targets[0],
        defaultPropertyValues,
        hypercubePath,
      });

      const props = propTree.qProperty;
      if (props.dimensionAxis.show === 'all') {
        props.dimensionAxis.show = 'labels';
      } else if (props.dimensionAxis.show === 'title') {
        props.dimensionAxis.show = 'none';
      }
      if (props.measureAxis.show === 'all') {
        props.measureAxis.show = 'labels';
      } else if (props.measureAxis.show === 'title') {
        props.measureAxis.show = 'none';
      }

      if (props.qHyperCubeDef.qMeasures.length > 0) {
        props.qDef.numFormatFromTemplate = props.qHyperCubeDef.qMeasures[0].qDef.numFormatFromTemplate;
        props.qDef.qNumFormat = props.qHyperCubeDef.qMeasures[0].qDef.qNumFormat;
        props.qHyperCubeDef.qMeasures.forEach((measure) => {
          measure.qDef.numFormatFromTemplate = props.qDef.numFormatFromTemplate;
          measure.qDef.qNumFormat = extend(true, {}, props.qDef.qNumFormat);
        });
      }

      return propTree;
    },
    exportProperties: (propertyTree, hyperCubePath, viewDataMode) => {
      const exportFormat = conversion.hypercube.exportProperties({
        propertyTree,
        hyperCubePath,
        viewDataMode,
      });

      return exportFormat;
    },
  };
}
