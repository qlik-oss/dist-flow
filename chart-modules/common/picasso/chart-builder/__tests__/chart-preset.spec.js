import chai from 'chai';
import ChartPresets from '../chart-presets';

const expect = chai.expect;

describe('Chart presets', () => {
  const exceptionPattern = /There is no chart preset with that type/;

  it('should not throw an exception when called with a valid preset type', () => {
    const chartBuilderMock = {
      getSettings() {
        return {};
      },
      addComponent() {},
      addScale() {},
    };

    const options = {};

    function fn() {
      // Would have liked to be able to stub the DimensionMeasureChart function but it's not possible with sinon
      ChartPresets('dimension-measure-chart', chartBuilderMock, options);
    }

    expect(fn).to.not.throw(exceptionPattern);
  });

  it('should throw exception if the preset type is not registered', () => {
    const chartBuilderMock = {};
    const options = {};

    function fn() {
      ChartPresets('obviously-bogus-chart-preset-type', chartBuilderMock, options);
    }

    expect(fn).to.throw(exceptionPattern);
  });
});
