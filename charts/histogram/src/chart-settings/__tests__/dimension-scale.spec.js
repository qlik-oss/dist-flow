// import chai from 'chai';
import sinon from 'sinon';
import util from '../../../../../js/lib/util';
import histogramUtils from '../../histogram-utils';
import DimensionScale from '../dimension-scale';

const expect = chai.expect;

describe('Histogram picasso component - dimension scale', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should adjust the dimension scale to hold the desired number of bars in 'auto' mode", () => {
    const histogramUtilsMock = sandbox.mock(histogramUtils);
    const binSize = 13;
    const binOffset = 625;
    const binCount = 5;

    histogramUtilsMock.expects('isAutoBin').once().returns(true);

    histogramUtilsMock.expects('getBinMode').once().returns('notMaxMode');

    histogramUtilsMock.expects('getDerivedBinSize').once().returns(binSize);

    histogramUtilsMock.expects('getDerivedBinOffset').once().returns(binOffset);

    histogramUtilsMock.expects('getDerivedBinCount').once().returns(binCount);

    const dimensionScaleSettings = DimensionScale.createSettings({});

    expect(dimensionScaleSettings.component.min).to.equal(binOffset);
    expect(dimensionScaleSettings.component.max).to.equal(binOffset + binCount * binSize);
  });

  it("should adjust the dimension scale to hold desired number of bars in 'maxCount' mode", () => {
    const histogramUtilsMock = sandbox.mock(histogramUtils);
    const binSize = 0.13;
    const binOffset = 12;
    const binCount = 134;

    histogramUtilsMock.expects('isAutoBin').once().returns(false);

    histogramUtilsMock.expects('getBinMode').once().returns('maxCount');

    histogramUtilsMock.expects('getDerivedBinSize').once().returns(binSize);

    histogramUtilsMock.expects('getDerivedBinOffset').once().returns(binOffset);

    histogramUtilsMock.expects('getDerivedBinCount').once().returns(binCount);

    const dimensionScaleSettings = DimensionScale.createSettings({});

    expect(dimensionScaleSettings.component.min).to.equal(binOffset);
    expect(dimensionScaleSettings.component.max).to.equal(binOffset + binCount * binSize);
  });

  it("should use the dimension min/max value to adjust the dimension scale in 'size' mode", () => {
    const histogramUtilsMock = sandbox.mock(histogramUtils);
    const binSize = 378;

    const dimInfo = {
      qMin: -40,
      qMax: 7142,
    };

    const layout = {};

    util.setValue(layout, 'qUndoExclude.box.qHyperCube.qDimensionInfo.0', dimInfo);

    histogramUtilsMock.expects('isAutoBin').once().returns(false);

    histogramUtilsMock.expects('getBinMode').once().returns('size');

    histogramUtilsMock.expects('getDerivedBinSize').once().returns(binSize);

    histogramUtilsMock.expects('getDerivedBinOffset').never();

    histogramUtilsMock.expects('getDerivedBinCount').never();

    const dimensionScaleSettings = DimensionScale.createSettings(layout);

    expect(dimensionScaleSettings.component.min).to.equal(dimInfo.qMin);
    expect(dimensionScaleSettings.component.max).to.equal(dimInfo.qMax + binSize);
  });
});
