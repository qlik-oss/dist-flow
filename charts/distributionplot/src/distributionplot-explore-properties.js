import extend from 'extend';
import sortingDefinitionBuilder from '../../../assets/objects/picasso/sorting/base-derived/explore-properties-sorting-definition-builder';
import settingsRetriever from './sorting/distributionplot-sorting-settings-retriever';
import elementsRetriever from './sorting/distributionplot-sorting-elements-retriever';
import propertyLogicModule from '../../../assets/client/utils/default-property-logic';
import propsLogic from './distributionplot-properties-logic';

const propertyLogic = propertyLogicModule.getLogicFor('explore', 'distributionplot');

const sorting = sortingDefinitionBuilder.buildDefinition(
  'qHyperCubeDef',
  'sorting',
  'qUndoExclude.qHyperCubeDef.qDimensions.0',
  settingsRetriever.getSettings,
  elementsRetriever.getElementIds
);

const settings = {
  type: 'items',
  component: 'accordion',
  items: {
    data: {
      uses: 'data',
    },
    sorting,
    presentation: {
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
        bubbleScales: {
          type: 'integer',
          component: 'slider',
          ref: 'dataPoint.bubbleScales',
          translation: 'properties.dataPoints.bubbleSizes', // we may need translation for bubbleScales instead
          min: 20,
          max: 100,
          step: 5,
          defaultValue: 100,
          show(data) {
            return data.qHyperCubeDef.qMeasures.length < 2 && data.presentation.visibleComponents !== 'box';
          },
        },
        jitter: {
          type: 'string',
          component: 'switch',
          ref: 'dataPoint.displacement',
          translation: 'properties.distributionPlot.jitter',
          defaultValue: 'none',
          options: [
            {
              value: 'none',
              translation: 'properties.off',
            },
            {
              value: 'jitter',
              translation: 'properties.on',
            },
          ],
          show(data) {
            return data.presentation.visibleComponents !== 'box';
          },
        },
      },
    },
  },
};
// Add color by features
const color = {
  items: {
    color: {
      uses: 'color',
      items: {
        mode: {
          options: propertyLogic.color.colorMode.options,
          diffs: ['color.point.mode', 'color.point.auto'],
          setPropertyValue(data, v) {
            if (v === 'auto') {
              data.color.point.auto = true;
            } else {
              data.color.point.auto = false;
              data.color.point.mode = v;
            }
          },
          getValue(data) {
            return propsLogic.isColorAuto(data) ? 'auto' : data.color.point.mode;
          },
        },
        dimension: {
          show(data) {
            return propsLogic.isColorByDimension(data);
          },
          items: {
            colorScheme: {
              ref: 'color.point.dimensionScheme',
            },
            persistentColors: {
              ref: 'color.point.persistent',
            },
          },
        },
        measure: {
          show(data) {
            return propsLogic.isColorByMeasure(data);
          },
          items: {
            sequential: {
              ref: 'color.point.measureScheme',
            },
          },
        },
        legend: {
          show: propsLogic.showLegend,
        },
      },
    },
  },
};
extend(true, settings, color);
export default settings;
