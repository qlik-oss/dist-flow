import chai from 'chai';
import sinon from 'sinon';
import * as ChartStyleComponent from '@qlik/common/extra/chart-style-component';
import ChartSettings from '../chart-settings';

const expect = chai.expect;

describe('Histogram chart settings', () => {
  const sandbox = sinon.createSandbox();
  let chartView;
  beforeEach(() => {
    chartView = {};
    chartView._selectionHandler = {
      isOn: jest.fn(),
    };
    chartView._tooltipHandler = {
      isOn: jest.fn(),
    };
    chartView.isRtl = sinon.mock;
    chartView.addSnapshotChartSettings = sinon.mock;
    chartView.flags = {
      isEnabled: jest.fn().mockReturnValue(true),
    };
    chartView.environment = {
      theme: {
        getStyle: jest.fn(),
        getColorPickerColor: jest.fn(),
      },
    };
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('createChartSettings should get settings from layout components', () => {
    const layout = {
      measureAxis: {
        label: 'MyLabel',
      },
      color: {
        bar: {
          paletteColor: 'MyPaletteColor',
        },
      },
      components: [
        {
          key: 'axis',
          axis: {
            title: {
              fontColor: {
                color: 'MyFontColor',
              },
            },
          },
        },
      ],
    };
    sandbox.spy(ChartStyleComponent, 'getAxisTitleStyle');
    sandbox.spy(ChartStyleComponent, 'getAxisLabelStyle');
    ChartSettings.createChartSettings(chartView, layout);
    expect(ChartStyleComponent.getAxisTitleStyle).to.have.been.calledOnce;
    expect(ChartStyleComponent.getAxisLabelStyle).to.have.been.calledOnce;
  });
});
