import BoxtplotView from '../boxplot-view';
import CubeGenerator from '../boxplot-cubes-generator';

jest.mock('../boxplot-cubes-generator');
jest.mock('@qlik/common/picasso/derived-properties/derived-properties');
jest.mock('@qlik/common/picasso/selections/selections-handler');

function getFakePicasso() {
  return {
    chart: () => ({
      findShapes: () => [],
    }),
  };
}
function getFakeJqueryElemernt() {
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

  beforeEach(() => {
    const picasso = getFakePicasso();
    let selectionsApi;
    let layout;
    let lasso;
    let flags;
    translator = Symbol('translator');
    app = getFakeApp();
    const environment = {
      app,
      translator,
    };
    model = Symbol('model');
    const backendApi = {
      model,
      setCacheOptions: () => {},
    };
    const $element = getFakeJqueryElemernt();
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
});
