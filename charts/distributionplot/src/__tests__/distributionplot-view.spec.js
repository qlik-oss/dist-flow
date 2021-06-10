
import chai from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import DistributionPlot from '../distributionplot-view';

const expect = chai.expect;
let sandbox;

describe('Distributionplot', () => {
  let distributionplot;
  let $element;
  let options;
  let backendApi;
  let selectionsApi;
  let tooltipApi;
  let lasso;
  let flags;
  let picasso;
  let translator;
  let theme;

  beforeEach(() => {
    $element = $("<div><div style='width: 100px; height: 100px' class='picasso-chart'></div></div>");
    // document.body.appendChild($element[0]);
    options = {};
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
      clear: {
        bind() {},
      },
      watchDeactivated() {},
      watchActivated() {},
    };
    tooltipApi = {};
    lasso = null;
    flags = null;
    picasso = picassoSetup();
    translator = null;
    theme = null;
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    $element.remove();
  });

  it('should work when export sheet to pdf', async () => {
    options.navigation = true;
    options.viewState = { scroll: 70 };
    backendApi.model.layout.qUndoExclude.qHyperCube.qStackedDataPages[0].qData[0].qSubNodes.length = 27;
    backendApi.model.layout.qUndoExclude.qHyperCube.qStackedDataPages[0].qData[0].qDown = 73;
    distributionplot = new DistributionPlot(
      lasso,
      flags,
      picasso,
      translator,
      theme,
      undefined,
      $element,
      options,
      backendApi,
      selectionsApi,
      tooltipApi
    );
    distributionplot.layout = backendApi.model.layout;
    sandbox.stub(distributionplot, 'getSlicedData').returns(Promise.resolve());
    sandbox.stub(distributionplot._scrollHandler, 'getScrollViewSizeInItem').returns(30);
    sandbox.stub(distributionplot, 'updateScrollHandlerState');
    sandbox.stub(distributionplot, '_updateColorData');
    await distributionplot.updateData(backendApi.model.layout);
    expect(distributionplot.getSlicedData).have.been.calledWith(options.viewState.scroll, 30);
  });

  it('should not render distribution plot when no data', () => {
    backendApi.model.layout.qUndoExclude.qHyperCube.qStackedDataPages = [{ qData: [] }];
    distributionplot = new DistributionPlot(
      lasso,
      flags,
      picasso,
      translator,
      theme,
      undefined,
      $element,
      options,
      backendApi,
      selectionsApi,
      tooltipApi
    );
    const result = distributionplot.createChartSettings(backendApi.model.layout);
    expect(result.components).to.eql([]);
  });
});
