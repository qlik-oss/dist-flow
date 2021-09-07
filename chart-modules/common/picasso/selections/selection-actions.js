import PicassoQ from 'picasso-plugin-q/dist/picasso-q';
import selectionUtils from './selection-utils';

// TODO: maybe add support later
const eventUtils = {
  showLockedFeedback: () => {},
};

function SelectionActions(chartInstance, selectionsApi, paths) {
  function fn() {}

  function update(added, removed, brush) {
    if (!selectionsApi.isActive()) {
      selectionsApi.begin(paths);
    }
    const selections = PicassoQ.qBrushHelper(brush);
    selections.forEach((s) => {
      selectionsApi.select(s);
    });
  }

  function toggleValues(items, brush, startOnEmptySelection) {
    const filterResult = selectionUtils.brushInterceptors.filterValues(chartInstance, items);
    const itms = filterResult.items;
    if (filterResult.itemsAreLocked) {
      eventUtils.showLockedFeedback(filterResult.lockedFields);
    }
    if (!selectionsApi.isActive() && !filterResult.itemsAreLocked && (startOnEmptySelection || itms.length > 0)) {
      selectionsApi.begin(paths);
      brush.start();
      brush.emit('update', [], []); // and activate our brush
    }

    return itms;
  }

  fn.update = update;
  fn.toggleValues = toggleValues;

  return fn;
}
export default SelectionActions;
