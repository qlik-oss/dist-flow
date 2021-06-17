import { getValue } from 'qlik-chart-modules';

const COMMON_COLOR_PROPS = [
  'altLabel',
  'auto',
  'autoMinMax',
  'byDimDef',
  'byMeasureDef',
  'dimensionScheme',
  'expressionIsColor',
  'expressionLabel',
  'measureMax',
  'measureMin',
  'measureScheme',
  'mode',
  'paletteColor',
  'persistent',
  'reverseScheme',
  'useBaseColors',
  'useDimColVal',
];

function move(from, to, list) {
  for (let i = 0; i < list.length; ++i) {
    const name = list[i];
    if (from[name] !== undefined) {
      to[name] = from[name];
      delete from[name];
    }
  }
}

function importColors(properties) {
  properties.color.point = properties.color.point || {};
  move(properties.color, properties.color.point, COMMON_COLOR_PROPS);
  if (properties.color.colorExpression) {
    properties.color.point.expression = {
      qValueExpression: { qExpr: properties.color.colorExpression },
    };
    delete properties.color.colorExpression;
  }
  // TODO: Change byExpression and not expressionIsColor to byMeasure when supported
  properties.color.point.expressionIsColor = true;
}
function exportColors(properties) {
  move(properties.color.point, properties.color, COMMON_COLOR_PROPS);
  properties.color.colorExpression = getValue(properties, 'color.point.expression.qValueExpression.qExpr', '');
  delete properties.color.point.expression;
}

export default {
  importColors,
  exportColors,
};
