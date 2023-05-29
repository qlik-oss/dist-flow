import chai from 'chai';
import sinon from 'sinon';
import * as d3Scale from 'd3-scale';
import tickGenerator from '../waterfallchart-tick-generator';

jest.mock('d3-scale');

const expect = chai.expect;

describe('getMinorTicks', () => {
  let minorTickCount;

  describe('count 1', () => {
    beforeEach(() => {
      minorTickCount = 1;
    });

    it('should return correct minor ticks when major ticks are positive', () => {
      expect(tickGenerator.getMinorTicks({ majorTicks: [1, 2, 3], minorTickCount })).to.deep.equal([1.5, 2.5]);
    });

    it('should return correct minor ticks when major ticks are negative', () => {
      expect(tickGenerator.getMinorTicks({ majorTicks: [-1, -2, -3], minorTickCount })).to.deep.equal([-1.5, -2.5]);
    });

    it('should return correct minor ticks when major ticks are in reversed order', () => {
      expect(tickGenerator.getMinorTicks({ majorTicks: [3, 2, 1], minorTickCount })).to.deep.equal([2.5, 1.5]);
    });
  });
});

describe('adjustTicks', () => {
  let ticks;
  let majorTicks;
  let minorTicks;
  let autoMinMax;
  let minMax;

  beforeEach(() => {
    majorTicks = [-1, 0, 1, 2];
    minorTicks = [-0.5, 0.5, 1.5];
    ticks = [
      { value: -1, isMinor: false },
      { value: -0.5, isMinor: true },
      { value: 0, isMinor: false },
      { value: 0.5, isMinor: true },
      { value: 1, isMinor: false },
      { value: 1.5, isMinor: true },
      { value: 2, isMinor: false },
    ];
  });

  describe('when autoMinMax is true', () => {
    beforeEach(() => {
      autoMinMax = true;
    });
    it('should add correct minor ticks when necessary', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax,
        min: -1.6,
        max: 2.55,
      });
      expect(result).to.deep.equal([
        { value: -1.5, isMinor: true },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.5, isMinor: true },
      ]);
    });
    it('should not add minor ticks if not necessary', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax,
        min: -1.4,
        max: 2.45,
      });
      expect(result).to.deep.equal([
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
      ]);
    });
  });

  describe('when autoMinMax is false', () => {
    beforeEach(() => {
      autoMinMax = false;
    });
    it('should add set min when minMax is min, case 1', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax: 'min',
        min: -1.6,
        max: 2.55,
      });
      expect(result).to.deep.equal([
        { value: -1.6, isMinor: false },
        { value: -1.5, isMinor: true },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.5, isMinor: true },
      ]);
    });
    it('should add set min when minMax is min, case 2', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax: 'min',
        min: -1.3,
        max: 2.55,
      });
      expect(result).to.deep.equal([
        { value: -1.3, isMinor: false },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.5, isMinor: true },
      ]);
    });
    it('should add set max when minMax is max, case 1', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax: 'max',
        min: -1.6,
        max: 2.55,
      });
      expect(result).to.deep.equal([
        { value: -1.5, isMinor: true },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.5, isMinor: true },
        { value: 2.55, isMinor: false },
      ]);
    });
    it('should add set max when minMax is max, case 2', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax: 'max',
        min: -1.6,
        max: 2.05,
      });
      expect(result).to.deep.equal([
        { value: -1.5, isMinor: true },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.05, isMinor: false },
      ]);
    });

    it('should add set min and set max when minMax is minMax, case 1', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax: 'minMax',
        min: -1.6,
        max: 2.55,
      });
      expect(result).to.deep.equal([
        { value: -1.6, isMinor: false },
        { value: -1.5, isMinor: true },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.5, isMinor: true },
        { value: 2.55, isMinor: false },
      ]);
    });
    it('should add set max when minMax is max, case 2', () => {
      const result = tickGenerator.adjustTicks({
        ticks,
        majorTicks,
        minorTicks,
        autoMinMax,
        minMax: 'minMax',
        min: -1.1,
        max: 2.15,
      });
      expect(result).to.deep.equal([
        { value: -1.1, isMinor: false },
        { value: -1, isMinor: false },
        { value: -0.5, isMinor: true },
        { value: 0, isMinor: false },
        { value: 0.5, isMinor: true },
        { value: 1, isMinor: false },
        { value: 1.5, isMinor: true },
        { value: 2, isMinor: false },
        { value: 2.15, isMinor: false },
      ]);
    });
  });
});

describe('getTicks', () => {
  let layout;
  let height;
  let sandbox;
  let linearScale;
  let domainedScale;
  beforeEach(() => {
    height = 400;
    layout = {
      measureAxis: {
        autoMinMax: true,
        minMax: 'minMax',
        min: -2.1,
        max: 4.1,
        spacing: 1,
      },
      generated: {
        qHyperCube: {
          qMeasureInfo: [
            { qMin: 0, qMax: 1 },
            { qMin: 1, qMax: 2.1 },
            { qMin: -1.8, qMax: 1.5 },
          ],
        },
      },
    };
    sandbox = sinon.createSandbox();
    domainedScale = { ticks: sandbox.stub() };
    linearScale = { domain: sandbox.stub() };
    sandbox.stub(d3Scale, 'scaleLinear');
    d3Scale.scaleLinear.returns(linearScale);
    sandbox.stub(tickGenerator, 'adjustTicks');
    sandbox.stub(tickGenerator, 'getMinorTicks');
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('getTicks', () => {
    it('should return correct ticks when autoMinMax is true', () => {
      linearScale.domain.withArgs([-1.8, 2.1]).returns(domainedScale);
      domainedScale.ticks.withArgs(4).returns([-1, 0, 1, 2]);
      tickGenerator.getMinorTicks.withArgs({ majorTicks: [-1, 0, 1, 2], minorTickCount: 1 }).returns([-0.5, 0.5, 1.5]);
      tickGenerator.getTicks({ layout, height });
      expect(tickGenerator.adjustTicks).to.have.been.called.calledWithExactly({
        ticks: [
          { value: -1, isMinor: false },
          { value: -0.5, isMinor: true },
          { value: 0, isMinor: false },
          { value: 0.5, isMinor: true },
          { value: 1, isMinor: false },
          { value: 1.5, isMinor: true },
          { value: 2, isMinor: false },
        ],
        majorTicks: [-1, 0, 1, 2],
        minorTicks: [-0.5, 0.5, 1.5],
        autoMinMax: true,
        minMax: 'minMax',
        min: -1.8,
        max: 2.1,
      });
    });
    it('should return correct ticks when autoMinMax is false, minMax is minMax', () => {
      layout.measureAxis.autoMinMax = false;
      linearScale.domain.withArgs([-2.1, 4.1]).returns(domainedScale);
      domainedScale.ticks.withArgs(4).returns([-2, 0, 2, 4]);
      tickGenerator.getMinorTicks.withArgs({ majorTicks: [-2, 0, 2, 4], minorTickCount: 1 }).returns([-1, 1, 3]);
      tickGenerator.getTicks({ layout, height });
      expect(tickGenerator.adjustTicks).to.have.been.called.calledWithExactly({
        ticks: [
          { value: -2, isMinor: false },
          { value: -1, isMinor: true },
          { value: 0, isMinor: false },
          { value: 1, isMinor: true },
          { value: 2, isMinor: false },
          { value: 3, isMinor: true },
          { value: 4, isMinor: false },
        ],
        majorTicks: [-2, 0, 2, 4],
        minorTicks: [-1, 1, 3],
        autoMinMax: false,
        minMax: 'minMax',
        min: -2.1,
        max: 4.1,
      });
    });
    it('should return correct ticks when autoMinMax is false, minMax is min', () => {
      layout.measureAxis.autoMinMax = false;
      layout.measureAxis.minMax = 'min';
      linearScale.domain.withArgs([-2.1, 2.1]).returns(domainedScale);
      domainedScale.ticks.withArgs(4).returns([-2, 0, 2]);
      tickGenerator.getMinorTicks.withArgs({ majorTicks: [-2, 0, 2], minorTickCount: 1 }).returns([-1, 1]);
      tickGenerator.getTicks({ layout, height });
      expect(tickGenerator.adjustTicks).to.have.been.called.calledWithExactly({
        ticks: [
          { value: -2, isMinor: false },
          { value: -1, isMinor: true },
          { value: 0, isMinor: false },
          { value: 1, isMinor: true },
          { value: 2, isMinor: false },
        ],
        majorTicks: [-2, 0, 2],
        minorTicks: [-1, 1],
        autoMinMax: false,
        minMax: 'min',
        min: -2.1,
        max: 2.1,
      });
    });
    it('should return correct ticks when autoMinMax is false, minMax is max', () => {
      layout.measureAxis.autoMinMax = false;
      layout.measureAxis.minMax = 'max';
      linearScale.domain.withArgs([-1.8, 4.1]).returns(domainedScale);
      domainedScale.ticks.withArgs(4).returns([0, 2, 4]);
      tickGenerator.getMinorTicks.withArgs({ majorTicks: [0, 2, 4], minorTickCount: 1 }).returns([1, 3]);
      tickGenerator.getTicks({ layout, height });
      expect(tickGenerator.adjustTicks).to.have.been.called.calledWithExactly({
        ticks: [
          { value: 0, isMinor: false },
          { value: 1, isMinor: true },
          { value: 2, isMinor: false },
          { value: 3, isMinor: true },
          { value: 4, isMinor: false },
        ],
        majorTicks: [0, 2, 4],
        minorTicks: [1, 3],
        autoMinMax: false,
        minMax: 'max',
        min: -1.8,
        max: 4.1,
      });
    });
  });
});
