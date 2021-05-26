function useMasterNumberFormat(formatting) {
  formatting.quarantine = {
    qNumFormat: formatting.qNumFormat || {},
    isCustomFormatted: formatting.isCustomFormatted || false,
  };
  formatting.qNumFormat = null;
  formatting.isCustomFormatted = undefined;
}
function useLocalFormat(formatting) {
  formatting.qNumFormat = formatting.quarantine?.qNumFormat || {};
  formatting.isCustomFormatted = formatting.quarantine?.isCustomFormatted || false;
  formatting.quarantine = undefined;
}
function isUsingMasterNumberFormat(formatting) {
  return !!formatting?.quarantine?.qNumFormat ?? false;
}

export default {
  useMasterNumberFormat,
  useLocalFormat,
  isUsingMasterNumberFormat,
};
