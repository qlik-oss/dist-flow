const reverseMap = {
  cellBackgroundColor: true,
  cellForegroundColor: true,
  colorByAlternative: true,
  colorByExpression: true,
  tooltip: true,
  urlLabel: true,
  url: true,
};

export default {
  create(id, props) {
    if (!id || !reverseMap[id]) {
      throw new Error('Attribute Expressions Util: ID required');
    }
    const ret = {};
    if (props) {
      Object.keys(props).forEach((key) => {
        ret[key] = props[key];
      });
    }
    ret.id = id;
    ret.qAttribute = true;

    return ret;
  },
  getById(attributeExpressions, id, idProp) {
    if (attributeExpressions) {
      idProp = idProp || 'id';
      return attributeExpressions.filter((aE) => aE[idProp] === id)[0];
    }
    return false;
  },
  getIndexById(attributeExpressions, id, idProp) {
    let index = -1;
    if (attributeExpressions) {
      idProp = idProp || 'id';
      attributeExpressions.forEach((aE, i) => {
        if (aE[idProp] === id) {
          index = i;
        }
      });
    }
    return index;
  },
  moveById(fromArray, toArray, id, idProp) {
    const expsIndex = this.getIndexById(fromArray, id, idProp);
    toArray = toArray || [];
    const targetIndex = this.getIndexById(toArray, id, idProp);
    if (expsIndex !== -1 && targetIndex === -1) {
      const attribExps = fromArray.splice(expsIndex, 1);
      toArray.push(attribExps[0]);
    }
    return toArray;
  },
  moveAllById(fromArray, toArray, id, idProp) {
    const fromAttribExps = fromArray.filter((obj) => obj.id === id);
    const toAttribExps = toArray.filter((obj) => obj.id === id);
    const newAttribExps = fromAttribExps.filter((fromObj) => {
      const existingAttr = toAttribExps.filter((toObj) => toObj[idProp] === fromObj[idProp]);
      if (existingAttr.length > 0) {
        return false;
      }
      return true;
    });
    return [...toArray, ...newAttribExps];
  },
  moveByIdFromGroup(fromGroup, toArray, attributeProp, id, idProp) {
    attributeProp = attributeProp || 'qAttributeExpressions';
    idProp = idProp || 'id';
    for (let i = 0; i < fromGroup.length; i++) {
      const fromArray = fromGroup[i][attributeProp];
      const l = toArray.length;
      this.moveById(fromArray, toArray, id, idProp);
      if (l !== toArray.length) {
        return toArray;
      }
    }
    return toArray;
  },
  clean(attributeExpressions) {
    return attributeExpressions.filter((aE) => aE && aE.id);
  },
  IDMAP: {
    CELL_BACKGROUND_COLOR: 'cellBackgroundColor',
    CELL_FOREGROUND_COLOR: 'cellForegroundColor',
    COLOR_BY_ALTERNATIVE: 'colorByAlternative',
    COLOR_BY_EXPRESSION: 'colorByExpression',
    TOOLTIP: 'tooltip',
    CELL_LINK_LABEL: 'urlLabel',
    CELL_LINK_URL: 'url',
  },
};
