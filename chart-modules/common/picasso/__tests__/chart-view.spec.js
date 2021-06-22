import $ from 'jquery';
import ChartView from '../chart-view';
import picassoSetup from '../picasso-setup';

describe('chart-view', () => {
  let picasso;
  let $container;
  let options;
  let backendApi;
  let selectionsApi;
  let myChart;
  let layout;

  beforeEach(() => {
    $container = $('<div style="width: 600px; height: 400px;"><div class="picasso-chart"></div></div>');

    backendApi = {
      getData: jest.fn().mockReturnValue({ then() {} }),
      model: {
        layout: {},
      },
    };

    const MyChart = ChartView.extend({
      createChartSettings: jest.fn().mockReturnValue({ components: [] }),
      getDisclaimerAttributes: jest.fn().mockReturnValue({}),
    });

    options = {
      myOptionTrue: true,
      myOptionFalse: false,
    };
    selectionsApi = {
      clear() {},
      watchActivated() {},
      watchDeactivated() {},
    };
    picasso = picassoSetup();
    myChart = new MyChart(picasso, $container, options, backendApi, selectionsApi);

    layout = {
      qHyperCube: {
        qDimensionInfo: [],
        qMeasureInfo: [],
      },
    };
  });

  test('initializes a chart', () => {
    expect(myChart.createChartSettings).not.toHaveBeenCalled();
  });

  test('paints a chart', async () => {
    myChart.layout = layout;
    await myChart.paint();
    expect(myChart.createChartSettings).toHaveBeenCalledWith(myChart.layout);
  });

  test('resizes a chart', () => {
    myChart.layout = layout;
    myChart.resize();
    expect(myChart.createChartSettings).toHaveBeenCalledWith(myChart.layout);
  });

  test('calls updateData function', () => {
    const layout = {
      data: {},
      permissions: {},
    };
    myChart.updateData(layout);
    expect(myChart.layout).not.toBe(layout);
    expect(myChart.layout.permissions).toEqual(layout.permissions);
    expect(myChart.layout).toEqual(layout);
  });

  test('createChartSettings function', () => {
    const CustomChart = ChartView.extend({});
    const customChart = new CustomChart(picasso, $container, options, backendApi, selectionsApi);
    expect(customChart.createChartSettings).toThrow(Error);
  });

  test('adds properties to a snapshot', () => {
    const snapshotLayout = {
      snapshotData: {},
    };
    myChart.setSnapshotData(snapshotLayout);
    expect(snapshotLayout).toEqual({
      snapshotData: {
        content: {
          chartData: {},
          size: {
            w: 600,
            h: 400,
          },
        },
      },
    });
  });

  test('gets the correct data', () => {
    const rect = {
      top: 0,
      left: 0,
      width: 1000,
      height: 1000,
    };
    const hypercube = {
      qSize: {
        qcx: 1000,
      },
    };
    myChart.getData(backendApi, hypercube, rect);
    // A hypercube should have at most 10000 values
    expect(backendApi.getData).toHaveBeenCalledWith(
      [
        {
          qHeight: 10,
          qLeft: 0,
          qTop: 0,
          qWidth: 1000,
        },
      ],
      null,
      hypercube
    );
  });

  test.skip('destroys a chart', () => {
    myChart.layout = layout;
    myChart.paint();
    myChart.destroy();
    // expect(chartElement.innerHTML).toEqual("");
  });
});
