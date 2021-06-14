import { useOptions, usePromise, useRect, useStaleLayout } from '@nebula.js/stardust';

export default function useResize(chartInstance) {
  const layout = useStaleLayout();
  const rect = useRect();
  const options = useOptions();

  const [, error] = usePromise(async () => {
    if (!chartInstance) {
      return;
    }
    chartInstance.options = options;
    const $element = null;
    await chartInstance.resize($element, layout);
  }, [rect.width, rect.height]);

  if (error) {
    throw error;
  }
}
