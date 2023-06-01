import chai from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import * as ChartStyleComponent from '@qlik/common/extra/chart-style-component';
import WaterfallChartView from '../waterfallchart-view';
import CubeGenerator from '../waterfallchart-cube-generator-by-measures';

const expect = chai.expect;
let sandbox;

describe('Waterfallchart-view', () => {
  let waterfallchart;
  let $element;
  let environment;
  let layout;
  let picasso;

  beforeEach(() => {
    $element = $("<div><div style='width: 100px; height: 100px' class='picasso-chart'></div></div>");
    environment = {
      deviceType: null,
      options: {},
      theme: {
        getStyle: jest.fn(),
        getColorPickerColor: jest.fn(),
      },
      translator: {
        get: () => {},
      },
    };
    layout = {
      generated: {
        qHyperCube: {
          qDataPages: [
            {
              qArea: {},
            },
          ],
        },
      },
      generatedMatrix: { length: 0 },
      qHyperCube: {
        qDataPages: [
          {
            qArea: { qWidth: 2 },
          },
        ],
        qMeasureInfo: [],
      },
      dimensionAxis: {
        label: 'MyLabel',
      },
      qDef: {
        isCustomFormatted: false,
      },
      dataPoint: {
        showLabels: true,
      },
    };

    picasso = picassoSetup();

    sandbox = sinon.createSandbox();
    sandbox.stub(CubeGenerator, 'generateHyperCube');
    sandbox.stub(CubeGenerator, 'generateSlicedHyperCube');
    sandbox.stub(CubeGenerator, 'getGeneratedDimensionPath');
    sandbox.stub(CubeGenerator, 'getGeneratedMeasurePath');
    sandbox.stub(ChartStyleComponent, 'getAxisLabelStyle');
    sandbox.stub(ChartStyleComponent, 'getValueLabelStyle');
  });

  afterEach(() => {
    sandbox.restore();
    $element.remove();
  });

  it('should work when export sheet to pdf', async () => {
    environment.options.navigation = true;
    environment.options.viewState = { scroll: 5 };
    layout.generatedMatrix.length = 15;
    waterfallchart = new WaterfallChartView({ picasso, environment, $element });
    waterfallchart.layout = layout;
    sandbox.stub(waterfallchart._scrollHandler, 'getScrollViewSizeInItem').returns(10);
    await waterfallchart.updateData(layout);

    expect(CubeGenerator.generateHyperCube).have.been.calledOnce;
    expect(CubeGenerator.generateSlicedHyperCube).have.been.calledWith(
      sinon.match.any,
      environment.options.viewState.scroll,
      10
    );
  });

  it('should work in snapshot mode', async () => {
    environment.options.navigation = true;
    layout.generatedMatrix.length = 15;
    layout.generated.qHyperCube.qDataPages[0].qArea = { qTop: 3, qHeight: 12 };
    layout.snapshotData = true;
    waterfallchart = new WaterfallChartView({ picasso, environment, $element });
    waterfallchart.layout = layout;
    await waterfallchart.updateData(layout);

    expect(CubeGenerator.generateHyperCube).have.been.calledOnce;
    expect(CubeGenerator.generateSlicedHyperCube).have.been.calledWith(sinon.match.any, 3, 12);
  });

  it('createChartSettings should create settings from layout', async () => {
    waterfallchart = new WaterfallChartView({ picasso, environment, $element });
    waterfallchart._tooltipHandler.setUp = sinon.mock().once().withArgs().returns({ trigger: {} });
    waterfallchart.flags = { isEnabled: () => true };
    waterfallchart.getBarSettings = jest.fn();
    waterfallchart.createChartSettings(layout);
    expect(ChartStyleComponent.getAxisLabelStyle).have.been.calledOnce;
    expect(ChartStyleComponent.getValueLabelStyle).have.been.calledOnce;
  });
});
