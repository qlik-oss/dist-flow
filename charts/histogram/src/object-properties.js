import BINNING_DEFAULTS from './binning-defaults';

const properties = {
  sorting: {
    autoSort: true,
  },
  qHyperCubeDef: {
    qDimensions: [],
    qMeasures: [],
    qMode: 'S',
    qAlwaysFullyExpanded: true,
    qSuppressZero: false,
    qSuppressMissing: true,
  },
  bins: {
    auto: BINNING_DEFAULTS.AUTO,
    binCount: undefined,
    binSize: BINNING_DEFAULTS.BIN_SIZE,
    offset: BINNING_DEFAULTS.OFFSET,
    countDistinct: BINNING_DEFAULTS.COUNT_DISTINCT,
    binMode: BINNING_DEFAULTS.BIN_MODE,
  },
  showTitles: true,
  title: '',
  subtitle: '',
  footnote: '',
};

export default properties;
