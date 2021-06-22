import { useOptions, usePromise, useRect } from '@nebula.js/stardust';

export default function useResize(chartInstance) {
  const rect = useRect();
  const options = useOptions();

  const [, error] = usePromise(async () => {
    if (!chartInstance) {
      return;
    }
    chartInstance.options = options;
    await chartInstance.resize();
  }, [rect.width, rect.height]);

  if (error) {
    throw error;
  }
}
