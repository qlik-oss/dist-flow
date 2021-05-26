function onChangeCalcCond(data) {
  const baseCube = data?.boxplotDef?.qHyperCubeDef;
  if (!baseCube) {
    return;
  }
  const boxCube = data?.qUndoExclude?.box?.qHyperCubeDef;
  const outlierCube = data?.qUndoExclude?.outliers?.qHyperCubeDef;
  if (boxCube) {
    boxCube.qCalcCond = baseCube.qCalcCond;
    boxCube.qCalcCondition = baseCube.qCalcCondition;
  }
  if (outlierCube) {
    outlierCube.qCalcCond = baseCube.qCalcCond;
    outlierCube.qCalcCondition = baseCube.qCalcCondition;
  }
}

export default {
  onChangeCalcCond,
};
