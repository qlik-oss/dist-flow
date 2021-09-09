const MAX_VISIBLE_ITEMS = 5;
const OTHERS_ELEMNO = -3;
const NULL_ELEMNO = -2;

// TODO: The function getAffectedShapes returns duplicate shapes.
// Remove when this is fixed on picasso
function filterDuplicateShapes(shapes) {
  const uniques = [];

  shapes.forEach((shape) => {
    if (uniques.indexOf(shape) === -1 && shape.type !== 'container') {
      uniques.push(shape);
    }
  });

  return uniques;
}

export const createFilter = (filterShapes) => (shapes) =>
  filterShapes ? filterShapes(shapes) : filterDuplicateShapes(shapes);

export const createContent =
  (context) =>
  ({ h, data, style }) => {
    const content = extractContent(context, data);
    const renderSettings = {
      h,
      style,
      rtl: context.direction === 'rtl',
      translator: context.translator,
    };
    return context.renderer(renderSettings, content);
  };

function extractContent(tooltipInfo, uniqueShapes) {
  const dataset = tooltipInfo.chartInstance.dataset(tooltipInfo.dataPath);

  // Create content + header
  const content = [];

  const numberInExcess = uniqueShapes.length - MAX_VISIBLE_ITEMS;
  const numItems = Math.min(MAX_VISIBLE_ITEMS, uniqueShapes.length);
  for (let j = 0; j < numItems; j++) {
    const shape = uniqueShapes[j];
    const localContent = {
      rows: [],
    };

    if (tooltipInfo.labelData) {
      const labels = [];
      const refPaths = tooltipInfo.labelData;
      let isNullValue = false;
      for (let i = 0; i < refPaths.length; i++) {
        const currentNode = shape.data[refPaths[i]].value;
        if (currentNode.qElemNo === NULL_ELEMNO || currentNode.qElemNumber === NULL_ELEMNO) {
          // The node is null
          isNullValue = true;
          break;
        }
        labels.push(shape.data[refPaths[i]].value.qText);
      }

      if (isNullValue) {
        return undefined;
      }

      localContent.header = tooltipInfo.headerResolver(labels);
      localContent.rows = tooltipInfo.measureRows
        .map((measureRow) => {
          const rowData = shape.data;
          return tooltipInfo.rowResolver(dataset.field(rowData[measureRow].source.field), rowData[measureRow], rowData);
        })
        .filter((row) => !!row);

      const colorByData = getColorByDimData(tooltipInfo, shape);
      if (colorByData) {
        localContent.rows.unshift(colorByData);
      }
      content.push(localContent);
    }
  }
  if (numberInExcess > 0) {
    content.numberInExcess = numberInExcess;
  }

  content.rowCount = content[0] ? content.length * content[0].rows.length : 0;
  return content;
}

function getOthersIndex(values) {
  let index = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] === OTHERS_ELEMNO) {
      index = i;
    }
  }
  return index;
}

/**
 * Get the information of how the color by row should look like.
 * The data for color by is fetched directly from the shape and it's key value mapping called
 * colorByDim, which contains the label and the elemNo
 * @param tooltipInfo - an object containing the chart view
 * @param shape - an object representing the shape currently hovered upon
 * @returns {{label: string - legendTitle, value: (*|String) - color by value, template: string - html template}}
 */
function getColorByDimData(tooltipInfo, shape) {
  const colorData = shape.data.color;
  const colorSettings = tooltipInfo.colorService?.getSettings?.();

  if (!colorSettings || colorSettings.type === 'color' || !colorData || !colorSettings.fieldType) {
    return undefined;
  }

  const ids = [];
  tooltipInfo.data.forEach((mapping) => {
    const elemNoObj = shape.data[mapping];
    if (elemNoObj) {
      ids.push(elemNoObj.value);
    }
  });
  const othersIndex = getOthersIndex(ids);

  const { translator } = tooltipInfo;
  const label = colorSettings.label;
  const color = shape.attrs?.fill;
  const value = othersIndex !== -1 ? translator.get('properties.dimensionLimits.others') : colorData.label;
  return { color, label, value };
}
