import chai from 'chai';
import sinon from 'sinon';
// import chartStyleUtils from '../../../../../assets/objects/utils/chart-style-utils';
import histogramUtils from '../../histogram-utils';
import BoxMarker from '../box-marker';

const expect = chai.expect;

describe('Histogram picasso component - box-marker', () => {
  let layout;
  let chartView;
  let basicSelectionSettings;
  let dimensionSelectionSettings;
  let measureSelectionSettings;
  let tooltipSettings;
  let theme;
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    theme = {
      getStyle: jest.fn(),
      getColorPickerColor: jest.fn().mockReturnValue('theme color'),
    };

    layout = {
      color: {
        bar: {
          paletteColor: {
            index: 1,
          },
        },
      },
      qUndoExclude: {
        bins: {
          binSize: 10,
        },
      },
    };

    chartView = {
      hasOption() {
        return true;
      },
      theme,
    };

    basicSelectionSettings = {
      trigger: {},
      consume: {},
    };

    dimensionSelectionSettings = {
      trigger: {},
      consume: {},
    };

    measureSelectionSettings = {
      trigger: {},
      consume: {},
    };

    tooltipSettings = {
      box: {
        trigger: {},
      },
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should have the box-marker key', () => {
    const boxMarker = BoxMarker.createSettings(
      chartView,
      layout,
      basicSelectionSettings,
      dimensionSelectionSettings,
      measureSelectionSettings,
      tooltipSettings
    );

    expect(boxMarker.key).to.equal('box-marker');
  });

  it('should have the correct fil color', () => {
    const fillColor = '#000000';
    theme.getColorPickerColor = sinon.mock().once().withArgs(layout.color.bar.paletteColor).returns(fillColor);

    const boxMarker = BoxMarker.createSettings(
      chartView,
      layout,
      basicSelectionSettings,
      dimensionSelectionSettings,
      measureSelectionSettings,
      tooltipSettings
    );

    theme.getColorPickerColor.verify();

    expect(boxMarker.settings.box.fill).to.equal(fillColor);
  });

  it('should have a light grey stroke color when the fill color is dark', () => {
    const fillColor = '#000000';
    theme.getColorPickerColor = sinon.mock().once().withArgs(layout.color.bar.paletteColor).returns(fillColor);

    const boxMarker = BoxMarker.createSettings(
      chartView,
      layout,
      basicSelectionSettings,
      dimensionSelectionSettings,
      measureSelectionSettings,
      tooltipSettings
    );

    theme.getColorPickerColor.verify();

    expect(boxMarker.settings.box.stroke).to.equal('#cccccc');
  });

  it('should have a dark grey stroke color when the fill color is light', () => {
    const themeMock = sinon.mock(chartView.theme);
    const fillColor = '#ffffff';

    themeMock.expects('getColorPickerColor').once().withArgs(layout.color.bar.paletteColor).returns(fillColor);

    const boxMarker = BoxMarker.createSettings(
      chartView,
      layout,
      basicSelectionSettings,
      dimensionSelectionSettings,
      measureSelectionSettings,
      tooltipSettings
    );

    themeMock.verify();

    expect(boxMarker.settings.box.stroke).to.equal('#666666');
  });

  it('should have a binEnd value function that returns the correct end value', () => {
    const histogramUtilsMock = sinon.mock(histogramUtils);
    const binSize = 22;

    histogramUtilsMock.expects('getDerivedBinSize').once().withArgs(layout).returns(binSize);

    const boxMarker = BoxMarker.createSettings(
      chartView,
      layout,
      basicSelectionSettings,
      dimensionSelectionSettings,
      measureSelectionSettings,
      tooltipSettings
    );

    histogramUtilsMock.verify();

    expect(boxMarker.data.extract.props.binEnd.value).to.be.a('Function');
    expect(boxMarker.data.extract.props.binEnd.value({ qNum: 0 })).to.equal(0 + binSize);
    expect(boxMarker.data.extract.props.binEnd.value({ qNum: 22 })).to.equal(22 + binSize);
    expect(boxMarker.data.extract.props.binEnd.value({ qNum: 627 })).to.equal(627 + binSize);
  });
});
