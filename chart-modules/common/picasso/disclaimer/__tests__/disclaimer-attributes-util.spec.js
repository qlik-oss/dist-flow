import chai from 'chai';
import AttributesUtil from '../disclaimer-attributes-util';
import DisclaimersConfig from '../disclaimers-config';

const expect = chai.expect;

describe('Disclaimer Attributes Util:', () => {
  let dataAttributes;
  let options;
  let data;

  describe('Apply disclaimer attributes', () => {
    beforeEach(() => {
      options = {};
      data = {
        title: 'Hey',
        qHyperCube: {
          qSize: {
            qcx: 1,
            qcy: 5,
          },
          qMeasureInfo: [
            {
              qMin: 0,
              qMax: 10,
            },
          ],
        },
      };
    });

    it('should handle no data object', () => {
      dataAttributes = AttributesUtil.applyAttributes(options, undefined);
      const anyValidAttribute = DisclaimersConfig.DISCLAIMERS.some((disclaimer) => dataAttributes[disclaimer.label]);
      expect(anyValidAttribute).to.equal(false);
    });

    it('should handle no hypercube', () => {
      delete data.qHyperCube;
      dataAttributes = AttributesUtil.applyAttributes(options, data);
      const anyValidAttribute = DisclaimersConfig.DISCLAIMERS.some((disclaimer) => dataAttributes[disclaimer.label]);
      expect(anyValidAttribute).to.equal(false);
      expect(data.title).to.equal('Hey');
    });

    it('should have no attributes valid', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = 1;
      data.qHyperCube.qMeasureInfo[0].qMax = 10;
      dataAttributes = AttributesUtil.applyAttributes(options, data);
      const anyValidAttribute = DisclaimersConfig.DISCLAIMERS.some((disclaimer) => dataAttributes[disclaimer.label]);
      expect(anyValidAttribute).to.equal(false);
      expect(data.title).to.equal('Hey');
    });
  });

  describe('NoDataExist', () => {
    beforeEach(() => {
      options = {};
      data = {
        qHyperCube: {
          qSize: {
            qcx: 1,
            qcy: 5,
          },
        },
      };
    });

    it('not valid', () => {
      expect(AttributesUtil.getNoDataExistAttribute(data.qHyperCube)).to.equal(false);
    });

    it('valid', () => {
      data.qHyperCube.qSize.qcx = 0;
      expect(AttributesUtil.getNoDataExistAttribute(data.qHyperCube)).to.equal(true);
    });
  });

  describe('LimitedData', () => {
    beforeEach(() => {
      options = {};
      data = {
        qHyperCube: {
          qSize: {
            qcx: 1,
            qcy: 25,
          },
        },
      };
    });

    it('not valid using explicitLimitedData', () => {
      options.explicitLimitedData = false;
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid using explicitLimitedData', () => {
      options.explicitLimitedData = true;
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('not valid for a hypercube with qDataPages', () => {
      data.qHyperCube.qDataPages = [
        {
          qMatrix: {
            length: 25,
          },
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid for a hypercube with qDataPages', () => {
      data.qHyperCube.qDataPages = [
        {
          qMatrix: {
            length: 25,
          },
        },
      ];
      data.qHyperCube.qSize.qcy = 50;
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('valid for a hypercube with qStackedDataPages (1 dim)', () => {
      data.qHyperCube.qDimensionInfo = [{}];
      data.qHyperCube.qStackedDataPages = [
        {
          qArea: {
            qHeight: 2,
          },
          qData: [
            {
              qSubNodes: [{}],
            },
          ],
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('not valid for a hypercube with qStackedDataPages (1 dim)', () => {
      data.qHyperCube.qDimensionInfo = [{}];
      data.qHyperCube.qStackedDataPages = [
        {
          qArea: {
            qHeight: 2,
          },
          qData: [
            {
              qSubNodes: [{}, {}],
            },
          ],
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid for a hypercube with qStackedDataPages (2 dims)', () => {
      data.qHyperCube.qDimensionInfo = [{}, {}];
      data.qHyperCube.qStackedDataPages = [
        {
          qData: [
            {
              qSubNodes: [
                {
                  qDown: 0,
                },
                {
                  qDown: 2,
                },
              ],
            },
          ],
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('not valid for a hypercube with qStackedDataPages (2 dims)', () => {
      data.qHyperCube.qDimensionInfo = [{}, {}];
      data.qHyperCube.qStackedDataPages = [
        {
          qData: [
            {
              qSubNodes: [
                {
                  qDown: 0,
                },
                {
                  qDown: 0,
                },
              ],
            },
          ],
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid for a 2 dim hypercube with qStackedDataPages using maxNbrOfDimensions (like boxplot)', () => {
      options.maxNbrOfDimensions = 3;
      data.qHyperCube.qDimensionInfo = [{}, {}, {}];
      data.qHyperCube.qStackedDataPages = [
        {
          qData: [
            {
              qSubNodes: [
                {
                  qDown: 0,
                },
                {
                  qDown: 2,
                },
              ],
            },
          ],
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('valid for a 1 dim hypercube with qStackedDataPages using maxNbrOfDimensions (like boxplot)', () => {
      options.maxNbrOfDimensions = 3;
      data.qHyperCube.qDimensionInfo = [{}, {}];
      data.qHyperCube.qStackedDataPages = [
        {
          qArea: {
            qHeight: 2,
          },
          qData: [
            {
              qSubNodes: [{}],
            },
          ],
        },
      ];
      expect(AttributesUtil.getLimitedDataAttribute(data.qHyperCube, options)).to.equal(true);
    });
  });

  describe('NegativeOrZeroValues', () => {
    beforeEach(() => {
      options = {};
      data = {
        measureAxis: {
          autoMinMax: true,
        },
        qHyperCube: {
          qSize: {
            qcy: 25,
          },
          qDataPages: [
            {
              qMatrix: {
                length: 25,
              },
            },
          ],
          qMeasureInfo: [
            {
              qMin: -1,
              qMax: 0,
            },
          ],
        },
      };
    });

    it('not valid using supportNegative', () => {
      options.supportNegative = true;
      expect(AttributesUtil.getNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('not valid', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = 1;
      data.qHyperCube.qMeasureInfo[0].qMax = 10;
      expect(AttributesUtil.getNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = -1;
      data.qHyperCube.qMeasureInfo[0].qMax = 0;
      expect(AttributesUtil.getNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(true);
    });
  });

  describe('NegativeOrZeroValues', () => {
    beforeEach(() => {
      options = {};
      data = {
        measureAxis: {
          autoMinMax: true,
        },
        qHyperCube: {
          qSize: {
            qcy: 25,
          },
          qDataPages: [
            {
              qMatrix: {
                length: 25,
              },
            },
          ],
          qMeasureInfo: [
            {
              qMin: -1,
              qMax: 0,
            },
          ],
        },
      };
    });

    it('not valid using supportNegative', () => {
      options.supportNegative = true;
      expect(AttributesUtil.getOnlyNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('not valid with only positive values', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = 1;
      data.qHyperCube.qMeasureInfo[0].qMax = 10;
      expect(AttributesUtil.getOnlyNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('not valid if there are some positive values', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = -1;
      data.qHyperCube.qMeasureInfo[0].qMax = 1;
      expect(AttributesUtil.getOnlyNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = -1;
      data.qHyperCube.qMeasureInfo[0].qMax = 0;
      expect(AttributesUtil.getOnlyNegativeOrZeroValuesAttribute(data.qHyperCube, options)).to.equal(true);
    });
  });

  describe('OnlyNanData', () => {
    beforeEach(() => {
      options = {};
      data = {
        qHyperCube: {
          qMeasureInfo: [
            {
              qMin: 0,
              qMax: 10,
            },
          ],
        },
      };
    });

    it('not valid', () => {
      expect(AttributesUtil.getOnlyNanDataAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid because qMax < qMin', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = 10;
      data.qHyperCube.qMeasureInfo[0].qMax = 0;
      expect(AttributesUtil.getOnlyNanDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('valid because NaN data', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = 'NaN';
      data.qHyperCube.qMeasureInfo[0].qMax = 'NaN';
      expect(AttributesUtil.getOnlyNanDataAttribute(data.qHyperCube, options)).to.equal(true);
    });

    it('not valid using explicitOnlyNanData', () => {
      options.explicitOnlyNanData = false;
      expect(AttributesUtil.getOnlyNanDataAttribute(data.qHyperCube, options)).to.equal(false);
    });

    it('valid using explicitOnlyNanData', () => {
      options.explicitOnlyNanData = true;
      expect(AttributesUtil.getOnlyNanDataAttribute(data, options)).to.equal(true);
    });
  });

  describe('DataRangeIncludingZero', () => {
    beforeEach(() => {
      options = {};
      data = {
        measureAxis: {
          autoMinMax: true,
        },
        qHyperCube: {
          qSize: {
            qcy: 25,
          },
          qDataPages: [
            {
              qMatrix: {
                length: 25,
              },
            },
          ],
          qMeasureInfo: [
            {
              qMin: -1,
              qMax: 0,
            },
          ],
        },
      };
    });

    it('not valid', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = 1;
      data.qHyperCube.qMeasureInfo[0].qMax = 10;
      expect(AttributesUtil.getDataRangeIncludingZeroAttribute(data, options)).to.equal(false);
    });

    it('not valid using supportRangeOverZero', () => {
      options.supportRangeOverZero = true;
      expect(AttributesUtil.getDataRangeIncludingZeroAttribute(data, options)).to.equal(false);
    });

    it('valid', () => {
      data.qHyperCube.qMeasureInfo[0].qMin = -10;
      data.qHyperCube.qMeasureInfo[0].qMax = 10;
      expect(AttributesUtil.getDataRangeIncludingZeroAttribute(data, options)).to.equal(true);
    });
  });
});
