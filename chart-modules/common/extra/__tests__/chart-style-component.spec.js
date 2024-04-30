import { fontResolver as createFontResolver } from 'qlik-chart-modules';
import ChartStyleComponent, {
  getChartFontResolver,
  getAxisLabelStyle,
  getAxisTitleStyle,
  getLegendLabelStyle,
  getLegendTitleStyle,
  getValueLabelStyle,
} from '../chart-style-component';

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
    const flags = undefined;
    fontResolver = getChartFontResolver(theme, layout, 'object.Histogram', createFontResolver, flags);
    chartStyleComponent = ChartStyleComponent(fontResolver, theme, 'object.histogram');
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
    expect(JSON.stringify(chartStyleComponent.getOptions(key, ref))).toEqual(JSON.stringify(styleComponent));
  });
});

describe('Styling options', () => {
  let chartId;
  let theme;
  let layout;
  let flags;

  beforeEach(() => {
    chartId = 'object';
    flags = {
      isEnabled: () => true,
    };
    layout = {};
    theme = {
      getStyle: jest.fn(),
    };
  });

  it('should get correct getAxisTitleStyle', () => {
    const component = {
      key: 'axis',
      axis: { title: { fontFamily: 'aTitleFont, sans-serif', fontSize: '1000', fontColor: { color: 'red' } } },
    };
    layout.components = [component];
    const style = getAxisTitleStyle(chartId, theme, layout, flags);
    expect(style.text.fontFamily).toEqual('aTitleFont, sans-serif');
    expect(style.text.fontSize).toEqual('1000');
    expect(style.text.fill).toEqual('red');
  });

  it('should get corrext getAxisLabelStyle', () => {
    const component = {
      key: 'axis',
      axis: {
        label: { name: { fontFamily: 'aLabelFont, sans-serif', fontSize: '2000', fontColor: { color: 'green' } } },
      },
    };
    layout.components = [component];
    const style = getAxisLabelStyle(chartId, theme, layout);
    expect(style.labels.fontFamily).toEqual('aLabelFont, sans-serif');
    expect(style.labels.fontSize).toEqual('2000');
    expect(style.labels.fill).toEqual('green');
  });

  it('should get correct getValueLabelStyle', () => {
    const component = {
      key: 'value',
      label: { value: { fontFamily: 'vLabelFont, sans-serif', fontSize: '3000', fontColor: { color: 'blue' } } },
    };
    layout.components = [component];
    const style = getValueLabelStyle(chartId, {}, layout);
    expect(style.fontFamily).toEqual('vLabelFont, sans-serif');
    expect(style.fontSize).toEqual(3000);
    expect(style.fill).toEqual('blue');
  });

  it('should get correct getLegendTitleStyle', () => {
    const component = {
      key: 'legend',
      legend: { title: { fontFamily: 'lTitleFont, sans-serif', fontSize: '4000', fontColor: { color: 'purple' } } },
    };
    layout.components = [component];
    const style = getLegendTitleStyle(chartId, theme, layout, flags);
    expect(style.fontFamily).toEqual('lTitleFont, sans-serif');
    expect(style.fontSize).toEqual('4000');
    expect(style.color).toEqual('purple');
  });

  it('should get correct getLegendLabelStyle', () => {
    const component = {
      key: 'legend',
      legend: { label: { fontFamily: 'lLabelFont, sans-serif', fontSize: '5000', fontColor: { color: 'yellow' } } },
    };
    layout.components = [component];
    const style = getLegendLabelStyle(chartId, theme, layout, flags);
    expect(style.fontFamily).toEqual('lLabelFont, sans-serif');
    expect(style.fontSize).toEqual('5000');
    expect(style.color).toEqual('yellow');
  });
});
