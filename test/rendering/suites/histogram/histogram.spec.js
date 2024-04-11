import path from 'path';
import { TestGenerator } from '../../../utils';

TestGenerator.fromFixtures({
  suiteName: 'Histogram',
  serveConfig: {
    type: 'histogram',
    entry: path.resolve(__dirname, '../../../../charts/histogram/dist/sn-histogram.js'),
    flags: {
      SENSECLIENT_IM_2021_HISTOGRAM_BG: true,
      SENSECLIENT_IM_2021_STYLINGPANEL_HISTOGRAM: true,
    },
    port: 8016,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'histogram_theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'histogram_theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
