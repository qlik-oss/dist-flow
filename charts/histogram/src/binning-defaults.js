const BINNING_DEFAULTS = {
  AUTO: true, // True means we calculate the BIN_SIZE to generate BIN_COUNT number of bins
  BIN_COUNT: 10, // The number of bins the user wants when AUTO = true
  BIN_SIZE: 10, // The size(width) of the bins the user wants when AUTO = false
  LABEL: 'x', // The label parameter to the Class function
  OFFSET: 0, // The offset parameter to the Class function
  COUNT_DISTINCT: false, // True means we only count distinct values
  BIN_MODE: 'maxCount', // "maxCount" means that we can only adjust the maximum amount of bins. "size" mean that we can adjust the width and offset
};

Object.freeze(BINNING_DEFAULTS);

export default BINNING_DEFAULTS;
