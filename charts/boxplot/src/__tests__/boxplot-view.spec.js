import * as ChartStyleComponent from '@qlik/common/extra/chart-style-component';
import BoxtplotView from '../boxplot-view';
import CubeGenerator from '../boxplot-cubes-generator';

jest.mock('../boxplot-cubes-generator');
jest.mock('@qlik/common/picasso/derived-properties/derived-properties');
jest.mock('@qlik/common/picasso/selections/selections-handler');
jest.mock('@qlik/common/picasso/selections/dependent-interactions');
jest.mock('@qlik/common/extra/chart-style-component');

function getFakePicasso() {
  return {
    chart: () => ({
      findShapes: () => [],
    }),
  };
}
function getFakeJqueryElement() {
  return [{}];
}
function getFakeApp() {
  return Symbol('app');
}

describe('boxplot-view', () => {
  let view;
  let app;
  let model;
  let translator;
  let layout;
  let theme;

  beforeEach(() => {
    const picasso = getFakePicasso();
    let selectionsApi;
    let lasso;
    const flags = {
      isEnabled: jest.fn().mockReturnValue(true),
    };
    translator = Symbol('translator');
    app = getFakeApp();
    theme = {
      getStyle: jest.fn(),
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
      boxplotDef: {
        qHyperCube: {
          qDataPages: [
            {
              qArea: { qWidth: 2 },
            },
          ],
          qMeasureInfo: [
            {
              qFallbackTitle: 'My title',
            },
          ],
        },
        color: {
          auto: 'MyColor',
        },
        presentation: {
          whiskers: {
            show: false,
          },
        },
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
    const environment = {
      app,
      translator,
      theme,
      options: {},
    };
    model = Symbol('model');
    const backendApi = {
      model,
      setCacheOptions: () => {},
    };
    const $element = getFakeJqueryElement();
    view = new BoxtplotView({ $element, backendApi, environment, flags, lasso, layout, selectionsApi, picasso });
  });

  describe('updateDerivedProperties', () => {
    let properties;
    let layout;
    let hashData;
    beforeEach(async () => {
      properties = {
        boxplotDef: {
          qHyperCubeDef: {
            qMeasures: [],
          },
        },
      };
      layout = {
        boxplotDef: {
          qHyperCube: Symbol('layout hypercube'),
        },
      };
      hashData = {};
      CubeGenerator.generateHyperCubes.mockReset();
      view._derivedProperties.addDefaultHyperCubeHash.mockResolvedValue(hashData);
      view._derivedProperties.updateDerivedProperties.mockImplementation((settings) =>
        settings.generateDerivedProperties(settings.layout, settings.properties)
      );
      await view.updateDerivedProperties(properties, layout);
    });

    test('should call addDefaultHyperCubeHash', () => {
      const hashData = {
        box: {
          qHyperCubeDef: {
            qMeasures: [],
          },
        },
      };
      expect(view._derivedProperties.addDefaultHyperCubeHash).toBeCalledTimes(1);
      expect(view._derivedProperties.addDefaultHyperCubeHash).toBeCalledWith(
        properties.boxplotDef.qHyperCubeDef,
        layout.boxplotDef.qHyperCube,
        app,
        hashData
      );
    });

    test('should call updateDerivedProperties', async () => {
      expect(view._derivedProperties.updateDerivedProperties).toBeCalledTimes(1);
      expect(view._derivedProperties.updateDerivedProperties).toBeCalledWith({
        layout,
        properties,
        model,
        hashData,
        generateDerivedProperties: expect.any(Function),
      });
    });

    test('should call CubeGenerator.generateHyperCubes', async () => {
      const drillIndices = [];
      expect(CubeGenerator.generateHyperCubes).toBeCalledTimes(1);
      expect(CubeGenerator.generateHyperCubes).toBeCalledWith(properties, drillIndices, layout, app, translator);
    });
  });
  test('createChartSettings should create settings from layout', async () => {
    view._selectionHandler = {
      isOn: jest.fn().mockReturnValue(false),
    };
    view._getDimAxisSettings = jest.fn();
    view._scrollHandler = {
      getScrollViewSizeInItem: jest.fn(),
    };
    view.createChartSettings(layout);
    expect(ChartStyleComponent.getAxisTitleStyle).toBeCalledTimes(1);
    expect(ChartStyleComponent.getAxisLabelStyle).toBeCalledTimes(1);
  });
});
