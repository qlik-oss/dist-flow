// import encoder from '@qlik/encoder';
// import translator from '../../../../js/lib/translator';

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

export const createContent = (tooltipInfo) => ({ h, data, style }) => {
  const content = extractContent(tooltipInfo, data);
  return render(content, h, style, tooltipInfo.chartView.translator);
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
  const colorSettings = tooltipInfo.chartView.colorService?.getSettings?.();

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

  const label = colorSettings.label;
  const color = shape.attrs?.fill;
  const value =
    othersIndex !== -1 ? tooltipInfo.chartView.translator.get('properties.dimensionLimits.others') : colorData.label;
  return { color, label, value };
}

// function rowContent(inputRow, { h, style }) {
//   return inputRow.map((cell) => {
//     const attributes = {
//       style: { ...(style.cell || {}), ...(cell.style || {}) },
//       class: cell.class,
//     };
//     if (cell.colspan) {
//       attributes.colspan = cell.colspan;
//     }
//     return h('td', attributes, cell.content);
//   });
// }

/* <div qva-direction x-dir-text="{{item.title}}" x-dir-setting="{{options.direction}}" class='qv-tp-title' ng-if="item.title !== undefined">
  <strong>{{item.title}}</strong>
</div>
<div qva-direction x-dir-text="{{item.description}}" x-dir-setting="{{options.direction}}" class='qv-tp-description' ng-if="item.description !== undefined">
  <span class='qv-tp-description-row'>{{item.description}}</span>
</div>
<div qva-direction x-dir-text="{{item.header}}" x-dir-setting="{{options.direction}}" class='qv-tp-header' ng-if="item.header !== undefined">
  <strong>{{item.header}}</strong>
</div>
<table>
  <tr ng-repeat="row in item.rows" class="qv-tp-row">
    <td class='qv-tp-item' ng-if="row.hasOwnProperty('label')">
      <span qva-direction x-dir-text="{{row.label}}" class="qv-tp-rowPart" ng-class="{'qv-tp-single' : (content.length + item.rows.length) <= 3}">{{row.label}}</span>
      <span>:&nbsp;</span>
    </td>
    <td ng-if="!row.template" class='qv-tp-value'>
      <div class="qv-tp-rowPart" dir="ltr">{{row.value}}</div>
    </td>
    <td ng-if="row.template" class='qv-tp-template qv-tp-value' ng-bind-html="row.template" ng-attr-colspan="{{row.hasOwnProperty('label') && 1 || 2 }}">
    </td>
  </tr>
</table>
<div class="qv-chart-tooltip-excess" ng-if="numberInExcess > 0" q-translation="Object.ChartTooltip.NMore,{{numberInExcess}}">More</div>
*/

/*
<tr>
  <td colspan=\"2\" style=\"max-width: 180px; word-break: break-word; overflow-wrap: break-word; hyphens: auto; font-weight: bold; text-align: left; direction: ltr;\">e</td>
  <td style=\"max-width: 180px; word-break: break-word; overflow-wrap: break-word; hyphens: auto;\"></td>
</tr>
<tr>
  <td style=\"max-width: 180px; word-break: break-word; overflow-wrap: break-word; hyphens: auto; text-align: left; direction: ltr;\">Avg(Expression3):</td>
  <td style=\"max-width: 180px; word-break: break-word; overflow-wrap: break-word; hyphens: auto; text-align: right; direction: ltr; vertical-align: middle;\">0,37</td>
</tr>"
*/

// TODO: direction: ltr/rtl
function render(content, h, style, translator) {
  const result = [];
  content.forEach((item) => {
    if (item.header) {
      const attributes = {
        style: { ...style.cell, fontWeight: 'bold' },
        colspan: 2,
      };
      const cell = h('td', attributes, item.header);
      const row = h('tr', {}, [cell]);
      result.push(row);
    }
    item.rows.forEach((row) => {
      const labelCell = h('td', { style: style.cell }, [row.label, ':']);
      let valueContent = row.value;
      if (row.color) {
        const symbol = h('div', {
          style: {
            display: 'inline-block',
            width: 10,
            height: 10,
            'background-color': row.color,
            margin: '0 8px',
          },
        });
        valueContent = [symbol, row.value];
      }
      const valueCell = h('td', { style: { ...style.cell, textAlign: 'right' } }, valueContent);
      result.push(h('tr', {}, [labelCell, valueCell]));
    });
  });
  if (content.numberInExcess) {
    const attributes = {
      style: style.cell,
      colspan: 2,
    };
    const cell = h('td', attributes, translator.get('Object.ChartTooltip.NMore', content.numberInExcess));
    const row = h('tr', {}, [cell]);
    result.push(row);
  }
  return result;
}
