import PicassoQ from 'picasso-plugin-q/dist/picasso-q';
import selectionUtils from './selection-utils';
import eventUtils from '../../utils/event-utils';

function SelectionActions(model, chartInstance, selectionsApi) {
  function fn() {}

  function update(added, removed, brush) {
    /* if ( added.length + removed.length < 1 ) {
            return;
        } */

    const selections = PicassoQ.qBrushHelper(brush);
    if (selections.length) {
      if (selections[0].method === 'resetMadeSelections') {
        model[selections[0].method].apply(model).catch((e) => {
          console.warn('err', e);
        });
        return;
      }

      selectionsApi.activate();
      selectionsApi.selectionsMade = true; // eslint-disable-line no-param-reassign
    }

    selections.forEach((s) => {
      model[s.method]
        .apply(model, s.params)
        .then((result) => {
          if (!result) {
            // For example, if we make a range selection and don't cover any data points, then reset the selection
            model.resetMadeSelections();
          }
        })
        .catch((e) => {
          console.warn('err', e);
        });
    });
  }

  function toggleValues(items, brush, startOnEmptySelection) {
    const filterResult = selectionUtils.brushInterceptors.filterValues(chartInstance, items); // eslint-disable-line no-param-reassign
    const itms = filterResult.items;
    if (filterResult.itemsAreLocked) {
      eventUtils.showLockedFeedback(filterResult.lockedFields);
    }
    if (!selectionsApi.active && !filterResult.itemsAreLocked && (startOnEmptySelection || itms.length > 0)) {
      selectionsApi.activate(); // Make sure to always pop up selections tool
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
