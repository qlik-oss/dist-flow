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
    sandbox.spy(ChartStyleComponent, 'getAxisTitleSettings');
    sandbox.spy(ChartStyleComponent, 'getAxisLabelSettings');
    ChartSettings.createChartSettings(chartView, layout);
    expect(ChartStyleComponent.getAxisTitleSettings).to.have.been.calledOnce;
    expect(ChartStyleComponent.getAxisLabelSettings).to.have.been.calledOnce;
  });
});
