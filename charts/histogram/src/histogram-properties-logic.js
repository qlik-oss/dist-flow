function onChangeCalcCond(data) {
  const baseCube = data?.qHyperCubeDef;
  const generatedCube = data?.qUndoExclude?.box?.qHyperCubeDef;
  if (baseCube && generatedCube) {
    generatedCube.qCalcCond = baseCube.qCalcCond;
    generatedCube.qCalcCondition = baseCube.qCalcCondition;
  }
}

export default {
  onChangeCalcCond,
};
