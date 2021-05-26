import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import legendUtils from '../legend-utils';

const expect = chai.expect;

describe('Legend utils', () => {
  let colorMap;
  let colorDataInfo;
  beforeEach(() => {
    const color = {
      isInvalid: sinon.stub().returns(false),
      toRGBA: sinon.stub().returns('rgba(255, 0, 0, 0)'),
    };
    colorDataInfo = {
      legendMode: {
        discrete: true,
        colorMode: 'dimension',
      },
      valid: true,
    };
    colorMap = {
      getColorDataInfo: sinon.stub().returns(colorDataInfo),
      getColorFromPreScaledValue: sinon.stub().returns(color),
      getLegendDataProvider: sinon.stub().returns(null),
      getLegendTitle: sinon.stub().returns('legend title'),
    };
  });

  it('should not return any legend data when color info is invalid', () => {
    colorDataInfo.valid = false;
    const legendSettings = legendUtils.getLegendData({
      colorMap,
      legendData: null,
    });

    expect(legendSettings).to.be.undefined;
  });

  it('should not return any legend data when the legend is empty', () => {
    const legendSettings = legendUtils.getLegendData({
      colorMap,
      legendData: [],
    });

    expect(legendSettings).to.be.undefined;
  });

  it('should return categorical-legend for discrete legends', () => {
    const row = [{ qText: 'label' }, { qNum: 0 }];
    const legendItems = [row];
    const legendSettings = legendUtils.getLegendData({
      colorMap,
      legendData: legendItems,
    });

    expect(legendSettings.type).to.equals('categorical-legend');
  });
});
