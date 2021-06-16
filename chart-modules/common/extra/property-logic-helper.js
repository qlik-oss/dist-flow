function getColorByDefinition(columnType, isAttribute, target, colorByActiveMeasure) {
  const ret = {};
  let qDef;
  let hasLabelExpression;
  let hasLabel;

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
    default:
      throw new Error('Default-property-logic.js: getColorByDefinition: Illegal input');
  }
  return ret;
}

export default {
  getColorByDefinition,
};
