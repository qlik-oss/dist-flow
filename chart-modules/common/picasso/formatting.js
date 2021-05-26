export default {
  formatMeasureValue,
};

function formatMeasureValue(field, measureContent) {
  if (field.raw().isCustomFormatted) {
    return field.formatter()(measureContent.value.qText);
  }
  const value = measureContent.value.qNum !== undefined ? measureContent.value.qNum : measureContent.value.qValue;
  return field.formatter()(value);
}
