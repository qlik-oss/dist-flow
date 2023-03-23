import chai from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import * as ChartStyleComponent from '@qlik/common/extra/chart-style-component';
import DistributionPlot from '../distributionplot-view';

const expect = chai.expect;
let sandbox;

describe('Distributionplot', () => {
  let distributionplot;
  let $element;
  let backendApi;
  let selectionsApi;
  let lasso;
  let flags;
  let picasso;
  let environment;

  beforeEach(() => {
    $element = $("<div><div style='width: 100px; height: 100px' class='picasso-chart'></div></div>");
    backendApi = {
      setPath: sinon.stub(),
      setCacheOptions: sinon.stub(),
      model: {
        layout: {
          qUndoExclude: {
            qHyperCube: {
              qDimensionInfo: {
                length: 2,
              },
              qSize: {
                qcy: 0,
              },
              qStackedDataPages: [
                {
                  qData: [
                    {
                      qSubNodes: { length: 0 },
                      qUp: 0,
                      qDown: 0,
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      cacheCube: {
        setOptions() {},
      },
    };
    selectionsApi = {
      on() {},
      clear: {
        bind() {},
      },
      watchDeactivated() {},
      watchActivated() {},
    };
    lasso = null;
    flags = {
      isEnabled: jest.fn().mockReturnValue(true),
    };
    picasso = picassoSetup();
    sandbox = sinon.createSandbox();

    environment = {
      deviceType: null,
      options: {},
      theme: {
        getStyle: jest.fn(),
      },
      translator: null,
    };
  });

  afterEach(() => {
    sandbox.restore();
    $element.remove();
  });

  it('should work when export sheet to pdf', async () => {
    environment.options.navigation = true;
    environment.options.viewState = { scroll: 70 };
    backendApi.model.layout.qUndoExclude.qHyperCube.qStackedDataPages[0].qData[0].qSubNodes.length = 27;
    backendApi.model.layout.qUndoExclude.qHyperCube.qStackedDataPages[0].qData[0].qDown = 73;
    distributionplot = new DistributionPlot({
      lasso,
      flags,
      picasso,
      environment,
      $element,
      backendApi,
      selectionsApi,
    });
    distributionplot.layout = backendApi.model.layout;
    sandbox.stub(distributionplot, 'getSlicedData').returns(Promise.resolve());
    sandbox.stub(distributionplot._scrollHandler, 'getScrollViewSizeInItem').returns(30);
    sandbox.stub(distributionplot, 'updateScrollHandlerState');
    sandbox.stub(distributionplot, '_updateColorData');
    await distributionplot.updateData(backendApi.model.layout);
    expect(distributionplot.getSlicedData).have.been.calledWith(environment.options.viewState.scroll, 30);
  });

  it('should not render distribution plot when no data', () => {
    backendApi.model.layout.qUndoExclude.qHyperCube.qStackedDataPages = [{ qData: [] }];
    distributionplot = new DistributionPlot({
      lasso,
      flags,
      picasso,
      environment,
      $element,
      backendApi,
      selectionsApi,
    });
    const result = distributionplot.createChartSettings(backendApi.model.layout);
    expect(result.components).to.eql([]);
  });
  it('createChartSettings should create settings from layout', async () => {
    backendApi.model.layout.qUndoExclude.qHyperCube.qDimensionInfo = [{ qData: [{ qSubNodes: [] }] }];
    backendApi.model.layout.qUndoExclude.qHyperCube.qMeasureInfo = [{ qFallbackTitle: 'MyTitle' }];
    backendApi.model.layout.components = [{ key: 'axis', axis: { title: { fontColor: { color: 'MyColor' } } } }];
    distributionplot = new DistributionPlot({
      lasso,
      flags,
      picasso,
      environment,
      $element,
      backendApi,
      selectionsApi,
    });
    distributionplot.layout = backendApi.model.layout;
    distributionplot.colorService = {
      getScales: jest.fn(),
      getPalettes: jest.fn(),
    };
    sandbox.spy(ChartStyleComponent, 'getAxisTitleStyle');
    sandbox.spy(ChartStyleComponent, 'getAxisLabelStyle');
    sandbox.stub(distributionplot, '_getDimAxisSettings');
    distributionplot.createChartSettings(backendApi.model.layout);
    expect(ChartStyleComponent.getAxisTitleStyle).to.have.been.calledOnce;
    expect(ChartStyleComponent.getAxisLabelStyle).to.have.been.calledOnce;
  });
});
