import { onTakeSnapshot, useImperativeHandle } from '@nebula.js/stardust';

const setupSnapshot = (chartInstance) => {
  onTakeSnapshot((layout) => {
    if (!chartInstance) {
      return undefined;
    }

    return chartInstance.setSnapshotData(layout);
  });

  useImperativeHandle(
    () => ({
      getViewState() {
        if (!chartInstance) {
          return undefined;
        }
        return chartInstance.getViewState();
      },
    }),
    [chartInstance]
  );
};

export default setupSnapshot;
