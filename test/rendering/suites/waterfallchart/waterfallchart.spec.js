import path from 'path';
import { TestGenerator } from '../../../utils';

TestGenerator.fromFixtures({
  suiteName: 'Waterfall',
  serveConfig: {
    type: 'waterfallchart',
    entry: path.resolve(__dirname, '../../../../charts/waterfallchart/dist/sn-waterfall.js'),
    flags: {
      SENSECLIENT_IM_2020_STYLINGPANEL_WATERFALLCHART: true,
      SENSECLIENT_IM_2020_WATERFALLCHART_BG: true,
      CLIENT_IM_3051: true,
    },
    port: 8017,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'waterfall_theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'waterfall_theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
