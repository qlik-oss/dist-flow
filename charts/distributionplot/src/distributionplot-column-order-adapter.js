// Adapt the layout to the new format after SUI-3119
function toAfter(layout) {
  const hyperCube = layout.qUndoExclude.qHyperCube;
  if (hyperCube.qEffectiveInterColumnSortOrder.length === 2 && hyperCube.qEffectiveInterColumnSortOrder[0] === 1) {
    hyperCube.qEffectiveInterColumnSortOrder = [0, 1];
    hyperCube.qDimensionInfo.reverse();
  }
}

// Adapt the layout to the old format from before SUI-3119
function toBefore(layout) {
  const hyperCube = layout.qUndoExclude.qHyperCube;
  if (hyperCube.qEffectiveInterColumnSortOrder.length === 2 && hyperCube.qEffectiveInterColumnSortOrder[0] === 0) {
    hyperCube.qEffectiveInterColumnSortOrder = [1, 0];
    hyperCube.qDimensionInfo.reverse();
  }
}

export default {
  toBefore,
  toAfter,
};
