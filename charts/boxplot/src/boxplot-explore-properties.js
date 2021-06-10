import sortingDefinitionBuilder from '@qlik/common/picasso/sorting/base-derived/explore-properties-sorting-definition-builder';
import settingsRetriever from './sorting/boxplot-sorting-settings-retriever';
import elementsRetriever from './sorting/boxplot-sorting-elements-retriever';

const boxDataSettings = {
  type: 'items',
  items: {
    outliers: {
      ref: 'boxplotDef.elements.outliers.include',
      translation: 'properties.boxplot.includeOutliers',
      type: 'boolean',
    },
  },
};

const presentation = {
  uses: 'presentation',
  items: {
    orientation: {
      ref: 'orientation',
      type: 'string',
      component: 'item-selection-list',
      horizontal: true,
      items: [
        {
          component: 'icon-item',
          icon: 'direction_up_down',
          labelPlacement: 'bottom',
          translation: 'properties.orientation.vertical',
          value: 'vertical',
        },
        {
          icon: 'direction_left_right',
          component: 'icon-item',
          labelPlacement: 'bottom',
          translation: 'Common.Horizontal',
          value: 'horizontal',
        },
      ],
    },
  },
};

const sorting = sortingDefinitionBuilder.buildDefinition(
  'boxplotDef.qHyperCubeDef',
  'boxplotDef.sorting',
  'qUndoExclude.box.qHyperCubeDef.qDimensions.0',
  settingsRetriever.getSettings,
  elementsRetriever.getElementIds
);

//
// Implementation details
//
function getInnerData(hyperCubePath) {
  return {
    uses: 'data',
    hyperCubePath,
    items: {
      dimensions: {
        ref: 'boxplotDef.qHyperCubeDef.qDimensions',
        alternativeRef: 'boxplotDef.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions',
        type: 'items',
      },
      measures: {
        ref: 'boxplotDef.qHyperCubeDef.qMeasures',
        alternativeRef: 'boxplotDef.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures',
        type: 'items',
      },
    },
  };
}

const softProperties = {
  get(hyperCubePath) {
    return {
      type: 'items',
      component: 'accordion',
      items: {
        data: {
          translation: 'Common.Data',
          icon: 'database',
          type: 'items',
          items: {
            innerData: getInnerData(hyperCubePath),
            boxDataSettings,
          },
        },
        sorting,
        presentation,
      },
    };
  },
};

export default softProperties;
