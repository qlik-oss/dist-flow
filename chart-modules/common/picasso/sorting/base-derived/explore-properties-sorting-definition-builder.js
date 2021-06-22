import { getValue } from 'qlik-chart-modules';

const explorePropertiesSortingDefinitionBuilder = {
  buildDefinition,
};

export default explorePropertiesSortingDefinitionBuilder;

function buildDefinition(baseHyperCubeDefPath, chartSortingPath, sortedDimensionPath, getSettingsFn, getElementIdsFn) {
  const dimensionSortCriteriaPath = `${sortedDimensionPath}.qDef.qSortCriterias.0.`;

  const sortingDefinition = {
    type: 'items',
    translation: 'properties.sorting',
    icon: 'ascending',
    show(data) {
      return getValue(data, `${baseHyperCubeDefPath}.qDimensions.length`, 0) > 1;
    },
    items: {
      sortingOptions: {
        component: 'radio-list',
        type: 'number',
        diffs: [
          `${dimensionSortCriteriaPath}qSortByExpression`,
          `${dimensionSortCriteriaPath}qSortByNumeric`,
          `${dimensionSortCriteriaPath}qSortByAscii`,
        ],
        options: [
          {
            value: 1,
            translation: 'properties.sorting.ascending',
          },
          {
            value: -1,
            translation: 'properties.sorting.descending',
          },
        ],
        setPropertyValue(properties, value, args) {
          const layout = args.layout;
          let currentChartSortProperty = getCurrentSortPropertyInfo(properties, dimensionSortCriteriaPath).chart;

          if (!currentChartSortProperty) {
            currentChartSortProperty = 'sortByAscii';
          }

          const chartSorting = getValue(properties, chartSortingPath);

          if (!chartSorting.sortCriteria) {
            chartSorting.sortCriteria = {};
          }

          if (chartSorting.autoSort) {
            const settings = getSettingsFn(layout);

            if (settings.ELEMENT) {
              chartSorting.elementId = settings.ELEMENT;
            } else {
              const elementIds = getElementIdsFn(properties, layout);

              chartSorting.elementId = elementIds[0];
            }
          }

          chartSorting.autoSort = false;

          cleanChartSorting(chartSorting, currentChartSortProperty);

          chartSorting.sortCriteria[currentChartSortProperty] = value;
        },
        getValue(data) {
          const currentDimensionSortProperty = getCurrentSortPropertyInfo(data, dimensionSortCriteriaPath).dimension;

          if (!currentDimensionSortProperty) {
            return 0;
          }

          return getValue(data, dimensionSortCriteriaPath + currentDimensionSortProperty);
        },
      },
    },
  };

  return sortingDefinition;
}

function getCurrentSortPropertyInfo(data, dimensionSortCriteriaPath) {
  const currentSortPropertyInfo = {
    chart: '',
    dimension: '',
  };

  if (getValue(data, `${dimensionSortCriteriaPath}qSortByExpression`, 0) !== 0) {
    currentSortPropertyInfo.chart = 'sortByExpression';
    currentSortPropertyInfo.dimension = 'qSortByExpression';
  } else if (getValue(data, `${dimensionSortCriteriaPath}qSortByNumeric`, 0) !== 0) {
    currentSortPropertyInfo.chart = 'sortByNumeric';
    currentSortPropertyInfo.dimension = 'qSortByNumeric';
  } else if (getValue(data, `${dimensionSortCriteriaPath}qSortByAscii`, 0) !== 0) {
    currentSortPropertyInfo.chart = 'sortByAscii';
    currentSortPropertyInfo.dimension = 'qSortByAscii';
  }

  return currentSortPropertyInfo;
}

function cleanChartSorting(chartSorting, currentChartSortProperty) {
  const sortCriteria = chartSorting.sortCriteria;

  if (currentChartSortProperty === 'sortByNumeric' || currentChartSortProperty === 'sortByAscii') {
    sortCriteria.sortByExpression = 0;
  }

  if (currentChartSortProperty === 'sortByAscii') {
    sortCriteria.sortByNumeric = 0;
  }
}
