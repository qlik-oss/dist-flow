import Modifiers from 'qlik-modifiers';

function getExpression(measure, colorByActiveMeasure) {
  const hasActiveModifiers = Modifiers.hasActiveModifiers({ measures: [measure] });
  // Only when a modifier is applied to a master measure and color by 'Measure 1' (or 'Measure 2', etc.)
  return hasActiveModifiers && colorByActiveMeasure ? measure.qDef.qDef : undefined;
}

function getColorByDefinition(columnType, isAttribute, target, colorByActiveMeasure) {
  const ret = {};
  let qDef;
  let hasLabelExpression;
  let hasLabel;
  let qLibraryId;
  let expression;

  switch (columnType) {
    case 'dimension':
      if (target.qLibraryId) {
        ret.type = 'dimension';
        ret.name = target.qLibraryId;
        ret.id = target.qLibraryId;
      } else {
        ret.type = 'field';
        if (isAttribute) {
          ret.name = target.label || target.qDef;
          ret.id = target.qDef;
        } else {
          qDef = target.qDef;
          hasLabelExpression = !!qDef.qLabelExpression;
          hasLabel = qDef.qFieldLabels && qDef.qFieldLabels[0];

          ret.name = qDef.qFieldDefs[0];

          if (hasLabelExpression) {
            ret.label = qDef.qLabelExpression;
          } else if (hasLabel) {
            ret.label = qDef.qFieldLabels[0];
          } else {
            ret.label = qDef.qFieldDefs[0];
          }
        }
      }
      break;
    case 'measure':
      qLibraryId = isAttribute ? target.qLibraryId : Modifiers.measureBase.getLibraryId(target);
      if (qLibraryId) {
        ret.type = 'measure';
        ret.name = qLibraryId;
        ret.id = qLibraryId;
        expression = getExpression(target, colorByActiveMeasure);
        if (expression) {
          ret.expression = expression;
        }
      } else {
        ret.type = 'expression';
        if (isAttribute) {
          ret.name = target.label || target.qExpression;
          ret.id = target.qExpression;
        } else {
          qDef = target.qDef;
          hasLabelExpression = !!qDef.qLabelExpression;
          hasLabel = !!qDef.qLabel;

          ret.name = qDef.qDef;

          if (hasLabelExpression) {
            ret.label = qDef.qLabelExpression;
          } else if (hasLabel) {
            ret.label = qDef.qLabel;
          } else {
            ret.label = qDef.qDef;
          }
        }
      }
      break;
    default:
      throw new Error('Default-property-logic.js: getColorByDefinition: Illegal input');
  }
  return ret;
}

export default {
  getColorByDefinition,
};
