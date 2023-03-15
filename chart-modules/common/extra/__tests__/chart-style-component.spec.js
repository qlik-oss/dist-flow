import { fontResolver as createFontResolver } from 'qlik-chart-modules';
import ChartStyleComponent, { getChartFontResolver } from '../chart-style-component';

describe('ChartStyleComponent', () => {
  const ref = 'key.ref';
  const key = 'Key';
  let chartStyleComponent;
  let fontResolver;
  beforeEach(() => {
    const layout = {
      qMeta: {
        privileges: ['update'],
      },
      qHasSoftPatches: false,
      qExtendsId: undefined,
      qInfo: {},
    };
    const theme = {
      getStyle: jest.fn(),
    };
    fontResolver = getChartFontResolver(theme, layout, 'object.Histogram', createFontResolver);
    chartStyleComponent = ChartStyleComponent(key, ref, fontResolver);
  });

  it('should get proper styling options', () => {
    const styleComponent = {
      labelSection: {
        component: 'items',
        ref: 'components',
        key: 'Key',
        items: {
          fontFamily: {
            ref: `${ref}.fontFamily`,
            component: 'dropdown',
            options: () => fontResolver.getOptions(`key.ref.fontFamily`),
            defaultValue: () => fontResolver.getDefaultValue(`key.ref.fontFamily`),
          },
          fontWrapper: {
            component: 'inline-wrapper',
            items: {
              fontSize: {
                ref: `${ref}.fontSize`,
                component: 'dropdown',
                width: true,
                options: () => fontResolver.getOptions(`${ref}.fontSize`),
                defaultValue: () => fontResolver.getDefaultValue(`${ref}.fontSize`),
              },
              fontColor: {
                ref: `${ref}.fontColor`,
                component: 'color-picker',
                width: false,
              },
            },
          },
        },
      },
    };
    expect(JSON.stringify(chartStyleComponent)).toEqual(JSON.stringify(styleComponent));
  });
});
