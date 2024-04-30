import path from 'path';
import { TestGenerator } from '../../../utils';

TestGenerator.fromFixtures({
  suiteName: 'Boxplot',
  serveConfig: {
    type: 'boxplot',
    entry: path.resolve(__dirname, '../../../../charts/boxplot/dist/sn-boxplot.js'),
    flags: {
      SENSECLIENT_IM_2019_BOXPLOT_BG: true,
      SENSECLIENT_IM_2019_STYLINGPANEL_BOXPLOT: true,
    },
    port: 8014,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'boxplot_theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'boxplot_theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
