import $ from 'jquery';
import encoder from '@qlik/encoder';
// import translator from '../../../../js/lib/translator';
// import Support from '../../../general/utils/support';
import Rect from '../../../general/utils/shapes/rect';
import tooltipUtils from '../../views/charts/tooltip/tooltip-utils';
import chartTooltipService from '../../views/charts/tooltip/chart-tooltip-service';
import chartStyleUtils from '../../extra/chart-style-utils';

// TODO: useDeviceType
const Support = { treatAsDesktop: () => false };

const MAX_VISIBLE_ITEMS = 5;
const OTHERS_ELEMNO = -3;
const NULL_ELEMNO = -2;

/**
 * Create a new tooltip action context
 *
 * @param {Object} chartInstance Picasso chart instance
 * @param {String} dataPath Path to hypercube used in picasso
 * @returns {Object} The tooltip actions handler instance
 */
function TooltipActions(chartView, chartInstance, componentKey, data, dataPath, context, template, chartType) {
  let hasOpen = false;
  const styling = { 'font-family': chartStyleUtils.getStyle(chartType, 'tooltip', 'fontFamily') };
  const delay = Support.treatAsDesktop() ? 250 : 0;

  context = context || 'tooltip';
  data = data || ['self'];

  const brush = chartInstance.brush(context);

  const fn = {};

  // Exposed here for test stub purposes
  fn.getElementOffset = function (element) {
    const r = $(element).offset();
    r.right = r.left + $(element).width();
    r.bottom = r.top + $(element).height();
    return r;
  };
  fn.isOpen = function () {
    return hasOpen;
  };

  function openTooltip(positions, content, direction, template) {
    hasOpen = true;
    chartTooltipService.open(
      {
        position: positions,
        content,
        direction: ['top', 'right', 'left', 'bottom'],
        dir: direction,
        template,
        numberInExcess: content.numberInExcess,
        styling,
      },
      tooltipUtils.getDuration(content.rowCount),
      delay
    );
  }

  function closeTooltip() {
    if (hasOpen) {
      chartTooltipService.close();
    }
    hasOpen = false;
  }

  fn.closeTooltip = closeTooltip;

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

  /**
   * Updates the contents in tooltip. Requires an array of tooltipInfo.labelData and
   * an array of tooltipInfo.measureRows for the tooltip to display content, otherwise
   * it will show nothing. These key value mappings should be sent in from the charts.
   * @param added - object describing added content to tooltip
   * @param removed - object describing removed content to tooltip
   * @param tooltipInfo - object containing info about header, rows etc.
   */
  function update(added, removed, tooltipInfo) {
    const brushes = brush.brushes();
    let content;
    let positions;

    const dataset = chartInstance.dataset(dataPath);

    // Fetches only the shapes that we are hovering over
    const shapes = chartInstance.getAffectedShapes(context, 'and', data, componentKey);
    const uniqueShapes = tooltipInfo.filterShapes ? tooltipInfo.filterShapes(shapes) : filterDuplicateShapes(shapes);

    if (brushes.length >= 1) {
      // Create content + header
      content = [];

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
            return;
          }

          localContent.header = tooltipInfo.headerResolver(labels);
          localContent.rows = tooltipInfo.measureRows
            .map((measureRow) => {
              const rowData = shape.data;
              return tooltipInfo.rowResolver(
                dataset.field(rowData[measureRow].source.field),
                rowData[measureRow],
                rowData
              );
            })
            .filter((row) => !!row);

          if (tooltipInfo.chartView) {
            const colorByData = getColorByDimData(tooltipInfo, shape);
            if (colorByData) {
              localContent.rows.unshift(colorByData);
            }
          }
          content.push(localContent);
        }
      }
      if (numberInExcess > 0) {
        content.numberInExcess = numberInExcess;
      }

      content.rowCount = content[0] ? content.length * content[0].rows.length : 0;

      // Find the correct shape
      if (uniqueShapes[0] && content.length) {
        positions = getTooltipPos(shapes, fn.getElementOffset(uniqueShapes[0].element));
        openTooltip(positions, content, tooltipInfo.direction, template);
      } else {
        closeTooltip();
      }
    } else {
      closeTooltip();
    }
  }

  function toggleInterceptor(items) {
    // Remove duplicates if we have multiple dimensions to aoivd a toggle
    // ex: set(2006 ) ->2006 is on, followed by set(2006 ) ->2006 is off
    if (data.length > 1) {
      const check = {};
      const ret = [];
      items.forEach((item) => {
        if (!check[item.key]) {
          check[item.key] = {};
        }
        if (!check[item.key][item.value]) {
          check[item.key][item.value] = true;
          ret.push(item);
        }
      });
      return ret;
    }
    return items;
  }

  fn.update = update;
  fn.toggleInterceptor = toggleInterceptor;
  return fn;
}

export default {
  create(chartView, chartInstance, componentKey, data, dataPath, context, template, chartType) {
    return TooltipActions(chartView, chartInstance, componentKey, data, dataPath, context, template, chartType);
  },
  // Test purposes
  _getColorByDimData: getColorByDimData,
};

// Internal Utils
function getTooltipPos(shapes, parentRect) {
  const b = getUnionBounds(shapes);
  const positions = [];
  // top
  positions.push({
    x: b.x + b.width / 2 + parentRect.left,
    y: b.y - 2 + parentRect.top,
  });

  // right
  positions.push({
    x: b.x + 2 + b.width + parentRect.left,
    y: b.y + b.height / 2 + parentRect.top,
  });

  // left
  positions.push({
    x: b.x - 2 + parentRect.left,
    y: b.y + b.height / 2 + parentRect.top,
  });

  // bottom
  positions.push({
    x: b.x + b.width / 2 + parentRect.left,
    y: b.y + 2 + b.height + parentRect.top,
  });

  function cropToContainer(p) {
    p.x = Math.min(Math.max(p.x, parentRect.left), parentRect.right); // eslint-disable-line no-param-reassign
    p.y = Math.min(Math.max(p.y, parentRect.top), parentRect.bottom); // eslint-disable-line no-param-reassign
  }

  positions.forEach(cropToContainer);

  return positions;
}

function getUnionBounds(shapes) {
  let b = shapes[0].bounds;
  let rect = new Rect(b.x, b.y, b.width, b.height);
  if (shapes.length > 1) {
    for (let i = 1; i < shapes.length; i++) {
      b = shapes[i].bounds;
      rect = rect.combineWith(new Rect(b.x, b.y, b.width, b.height));
    }
  }
  return rect;
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
  const colorByData = shape.data.colorByDim && shape.data.colorByDim.value;
  if (colorByData) {
    const currentElement = colorByData;
    const ids = [];

    tooltipInfo.data.forEach((mapping) => {
      const elemNoObj = shape.data[mapping];
      if (elemNoObj) {
        ids.push(elemNoObj.value);
      }
    });
    const othersIndex = getOthersIndex(ids);
    let color;
    if (othersIndex > -1) {
      color = tooltipInfo.chartView.getColoringMap().getColor(ids, undefined, 0, shape.data.row.value);
    } else {
      color = tooltipInfo.chartView.getColoringMap().getColorFromPreScaledValue(colorByData.qElemNo);
    }
    if (color.isInvalid()) {
      return undefined;
    }
    const label =
      othersIndex > -1
        ? translator.get('properties.dimensionLimits.others')
        : currentElement.qElemNo === NULL_ELEMNO
        ? '-'
        : currentElement.qText;
    const colorByValue = encoder.encodeForHTML(label);

    return {
      label: tooltipInfo.chartView.getColoringMap().getColorDataInfo().legendTitle,
      value: colorByValue,
      template: `<div class="color-template-wrapper"><div class="color-dot" style="background:${color}"></div><span dir="ltr">${colorByValue}</span></div>`,
    };
  }
  return undefined;
}
