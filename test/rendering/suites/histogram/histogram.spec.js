import path from 'path';
import { TestGenerator } from '../../../utils';

TestGenerator.fromFixtures({
  suiteName: 'Histogram',
  serveConfig: {
    type: 'histogram',
    entry: path.resolve(__dirname, '../../../../charts/histogram/dist/sn-histogram.js'),
    port: 8016,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
