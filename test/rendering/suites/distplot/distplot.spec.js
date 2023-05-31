import path from 'path';
import { TestGenerator } from '../../../utils';

TestGenerator.fromFixtures({
  suiteName: 'Distplot',
  serveConfig: {
    type: 'distributionplot',
    entry: path.resolve(__dirname, '../../../../charts/distributionplot/dist/sn-distplot.js'),
    port: 8015,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'distplot_theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'distplot_theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
