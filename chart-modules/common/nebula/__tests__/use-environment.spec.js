import { renderHook } from './nebula-testing-utils';
import useEnvironment from '../use-environment';

describe('use-environment', () => {
  let context;
  let result;
  let rerender;

  beforeEach(async () => {
    context = {
      deviceType: 'desktop',
      options: {
        direction: 'ltr',
      },
      theme: {
        name: () => 'the theme',
      },
      translator: {
        language: () => 'initial language',
      },
    };
    ({ result, rerender } = await renderHook(() => useEnvironment(), context));
  });

  test('environment should contain deviceType with value from context', () => {
    expect(result.current).toHaveProperty('deviceType', 'desktop');
  });

  test('environment should contain options', () => {
    expect(result.current).toHaveProperty('options');
  });

  test('environment should contain theme', () => {
    expect(result.current).toHaveProperty('theme');
  });

  test('environment should contain translator', () => {
    expect(result.current).toHaveProperty('translator');
  });

  test('should not change on rerender if no dependency has changed', async () => {
    await rerender();
    expect(result.all[0]).toBe(result.all[1]);
  });

  test('should change if deviceType changes', async () => {
    context.deviceType = 'touch';
    await rerender(context);
    expect(result.all[0]).not.toBe(result.all[1]);
  });

  test('should change if theme name changes', async () => {
    context.theme.name = () => 'new theme';
    await rerender(context);
    expect(result.all[0]).not.toBe(result.all[1]);
  });

  test('should change if translator language changes', async () => {
    context.translator.language = () => 'new language';
    await rerender(context);
    expect(result.all[0]).not.toBe(result.all[1]);
  });

  test('should change if options.direction changes', async () => {
    context.options.direction = 'rtl';
    await rerender(context);
    expect(result.all[0]).not.toBe(result.all[1]);
  });

  test('should change if options.freeResize changes', async () => {
    context.options.freeResize = true;
    await rerender(context);
    expect(result.all[0]).not.toBe(result.all[1]);
  });
});
