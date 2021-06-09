import sinon from 'sinon';
import chai from 'chai';
import * as util from '@qlik/chart-modules';
import histogramUtils from '../../histogram-utils';
import binSizeCalculator from '../bin-size-calculator';
import histogramMappings from '../histogram-mappings';

const expect = chai.expect;

describe('Histogram derived properties expression generator mappings ', () => {
  describe('getMappings', () => {
    const expectedMappingNames = ['BinSize', 'Label', 'Offset', 'Distinct'];

    function verifyExpectedMappings(mappings) {
      expectedMappingNames.forEach((name) => {
        const mapping = mappings[name];

        expect(mapping).to.be.an('object', `Mapping ${name} to be object`);
        // eslint-disable-next-line no-prototype-builtins
        expect(mapping.hasOwnProperty('value')).to.equal(true, `Mapping ${name} object to have .value property`);
      });
    }

    function verifyNoUnexpectedMappings(mappings) {
      Object.keys(mappings).forEach((key) => {
        const message = `Unexpected mapping found '${key}', update unit tests`;
        expect(expectedMappingNames.indexOf(key)).to.not.equal(-1, message);
      });
    }

    function verifyMappings(mappings) {
      verifyExpectedMappings(mappings);
      verifyNoUnexpectedMappings(mappings);
    }

    it('should return the correct mappings with a non 0 binOffset', () => {
      const mappingValues = {
        binSize: 200,
        binOffset: 500,
        distinct: false,
      };

      const mappings = histogramMappings.getMappings(mappingValues);

      verifyMappings(mappings);

      expect(mappings.BinSize.value).to.equal(`,${mappingValues.binSize}`, 'BinSize');
      expect(mappings.Label.value).to.equal(",'x'", 'Label');
      expect(mappings.Offset.value).to.equal(`,${mappingValues.binOffset}`, 'Offset');
      expect(mappings.Distinct.value).to.equal('', 'Distinct');
    });

    it('should return the correct mappings with a 0 binOffset', () => {
      const mappingValues = {
        binSize: 2000,
        binOffset: 0,
        distinct: false,
      };

      const mappings = histogramMappings.getMappings(mappingValues);

      verifyMappings(mappings);

      expect(mappings.BinSize.value).to.equal(`,${mappingValues.binSize}`, 'BinSize');
      expect(mappings.Label.value).to.equal('', 'Label');
      expect(mappings.Offset.value).to.equal('', 'Offset');
      expect(mappings.Distinct.value).to.equal('', 'Distinct');
    });

    it('should return the correct mappings with truthy distinct', () => {
      const mappingValues = {
        binSize: 500,
        binOffset: 0,
        distinct: true,
      };

      const mappings = histogramMappings.getMappings(mappingValues);

      verifyMappings(mappings);

      expect(mappings.BinSize.value).to.equal(`,${mappingValues.binSize}`, 'BinSize');
      expect(mappings.Label.value).to.equal('', 'Label');
      expect(mappings.Offset.value).to.equal('', 'Offset');
      expect(mappings.Distinct.value).to.equal('Distinct ', 'Distinct');
    });
  });

  describe('getMappingValues', () => {
    const sandbox = sinon.createSandbox();

    const layout = {
      fake: 'fake, fake and fake!',
    };

    afterEach(() => {
      sandbox.restore();
    });

    it('should return the correct values in auto bin mode', () => {
      const binCount = 10;

      const binInfo = {
        binSize: 2000,
        offset: 200,
      };

      const dimInfo = {
        qMin: 199,
        qMax: 20100,
      };

      const histogramUtilsMock = sandbox.mock(histogramUtils);
      const utilMock = sandbox.mock(util);
      const binSizeCalculatorMock = sandbox.mock(binSizeCalculator);

      histogramUtilsMock.expects('isAutoBin').once().returns(true);

      histogramUtilsMock.expects('getDerivedBinCount').once().returns(binCount);

      histogramUtilsMock.expects('getBinSize').never();

      histogramUtilsMock.expects('getBinOffset').never();

      histogramUtilsMock.expects('isCountDistinct').once().returns(false);

      histogramUtilsMock.expects('getBinMode').once().returns('size');

      utilMock.expects('getValue').once().withExactArgs(layout, 'qHyperCube.qDimensionInfo.0', {}).returns(dimInfo);

      binSizeCalculatorMock
        .expects('calculateBinSize')
        .once()
        .withExactArgs(dimInfo.qMin, dimInfo.qMax, binCount)
        .returns(binInfo);

      const mappingValues = histogramMappings.getMappingValues(layout);

      histogramUtilsMock.verify();
      // utilMock.verify();
      binSizeCalculatorMock.verify();

      expect(mappingValues.binSize).to.equal(binInfo.binSize, 'binSize');
      expect(mappingValues.binOffset).to.equal(binInfo.offset, 'binOffset');
      expect(mappingValues.distinct).to.equal(false, 'distinct');
    });

    it('should return the correct values in custom bin mode', () => {
      const binSize = 125;
      const binOffset = 25;
      const distinct = true;
      const histogramUtilsMock = sandbox.mock(histogramUtils);
      const binSizeCalculatorMock = sandbox.mock(binSizeCalculator);

      histogramUtilsMock.expects('isAutoBin').once().returns(false);

      histogramUtilsMock.expects('getBinMode').once().returns('size');

      histogramUtilsMock.expects('getBinSize').once().returns(binSize);

      histogramUtilsMock.expects('getBinOffset').once().returns(binOffset);

      histogramUtilsMock.expects('isCountDistinct').once().returns(distinct);

      binSizeCalculatorMock.expects('calculateBinSize').never();

      const mappingValues = histogramMappings.getMappingValues(layout);

      histogramUtilsMock.verify();

      expect(mappingValues.binSize).to.equal(binSize, 'binSize');
      expect(mappingValues.binOffset).to.equal(binOffset, 'binOffset');
      expect(mappingValues.distinct).to.equal(distinct, 'distinct');
    });
  });
});
