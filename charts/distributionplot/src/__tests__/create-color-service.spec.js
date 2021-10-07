import { colorService } from 'qlik-chart-modules';
import createColorService from '../create-color-service';

jest.mock('qlik-chart-modules');

describe('create-color-service', () => {
  let create;
  let layout;
  beforeEach(() => {
    const app = 'app';
    const model = 'model';
    const picasso = 'picasso';
    const localeInfo = 'localeInfo';
    const theme = 'theme';
    const translator = 'translator';
    const environment = { app, theme, translator };
    layout = {
      color: {
        point: null,
      },
      qHyperCube: {
        qDimensionInfo: [],
      },
    };

    const args = { layout, localeInfo, model, picasso, environment };
    create = () => createColorService(args);
  });

  it('should create a qlik-chart-moduels color-service', () => {
    create();
    expect(colorService).toBeCalled();
  });

  it('should pass on app, model, picasso and translator', () => {
    create();
    expect(colorService).toBeCalledWith(
      expect.objectContaining({
        app: 'app',
        model: 'model',
        picasso: 'picasso',
        translator: 'translator',
      })
    );
  });

  it('should send in config', () => {
    create();
    expect(colorService).toBeCalledWith(
      expect.objectContaining({
        config: {
          localeInfo: 'localeInfo',
          theme: 'theme',
          key: 'color',
          definitionPath: '/qUndoExclude/qHyperCubeDef',
        },
      })
    );
  });
});
