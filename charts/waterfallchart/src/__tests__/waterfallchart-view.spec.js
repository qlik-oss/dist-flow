import chai from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import WaterfallChartView from '../waterfallchart-view';
import CubeGenerator from '../waterfallchart-cube-generator-by-measures';

const expect = chai.expect;
let sandbox;

describe('Waterfallchart-view', () => {
  let waterfallchart;
  let $element;
  let options;
  let layout;
  let picasso;
  let translator;
  let theme;

  beforeEach(() => {
    $element = $("<div><div style='width: 100px; height: 100px' class='picasso-chart'></div></div>");
    options = {};
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
    };

    picasso = picassoSetup();

    sandbox = sinon.createSandbox();
    sandbox.stub(CubeGenerator, 'generateHyperCube');
    sandbox.stub(CubeGenerator, 'generateSlicedHyperCube');
    sandbox.stub(CubeGenerator, 'getGeneratedDimensionPath');
    sandbox.stub(CubeGenerator, 'getGeneratedMeasurePath');
  });

  afterEach(() => {
    sandbox.restore();
    $element.remove();
  });

  it('should work when export sheet to pdf', async () => {
    options.navigation = true;
    options.viewState = { scroll: 5 };
    layout.generatedMatrix.length = 15;
    waterfallchart = new WaterfallChartView(picasso, translator, theme, $element, options);
    waterfallchart.layout = layout;
    sandbox.stub(waterfallchart._scrollHandler, 'getScrollViewSizeInItem').returns(10);
    await waterfallchart.updateData(layout);

    expect(CubeGenerator.generateHyperCube).have.been.calledOnce;
    expect(CubeGenerator.generateSlicedHyperCube).have.been.calledWith(sinon.match.any, options.viewState.scroll, 10);
  });

  it('should work in snapshot mode', async () => {
    options.navigation = true;
    layout.generatedMatrix.length = 15;
    layout.generated.qHyperCube.qDataPages[0].qArea = { qTop: 3, qHeight: 12 };
    layout.snapshotData = true;
    waterfallchart = new WaterfallChartView(picasso, translator, theme, $element, options);
    waterfallchart.layout = layout;
    await waterfallchart.updateData(layout);

    expect(CubeGenerator.generateHyperCube).have.been.calledOnce;
    expect(CubeGenerator.generateSlicedHyperCube).have.been.calledWith(sinon.match.any, 3, 12);
  });
});
