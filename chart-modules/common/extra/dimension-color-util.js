export default {
  isByNthDimension,
  useFallback,
};

function validActiveDimensionIndex(index) {
  return index !== undefined && index !== -1;
}
function isByNthDimension(colorProperties) {
  return (
    colorProperties.mode === 'byDimension' &&
    colorProperties.byDimDef &&
    validActiveDimensionIndex(colorProperties.byDimDef.activeDimensionIndex)
  );
}
function useFallback(attrInfo, colorProperties) {
  const wantFallback = true;
  const canFallback = colorProperties.auto || isByNthDimension(colorProperties);
  return wantFallback && canFallback;
}
