import View from './view';

const BaseView = View.extend({
  init($element, options, backendApi) {
    this.$element = $element;
    this.options = options;
    this.backendApi = backendApi;
  },
  prePaint() {},
  setFreeResize(freeResize) {
    this.options.freeResize = freeResize;
  },
  setBackendApi(backendApi) {
    this._dataView = undefined;
    this.backendApi = backendApi;
  },
  updateDerivedProperties() /* properties, layout */ {
    return Promise.resolve(false); // returns updatingDerivedProperties flag
  },
  setInteractionState(state) {
    this.options.interactionState = state;
  },
  setDirection(direction) {
    this.options.direction = direction;
  },
  getContextMenu(object, menu, event) {
    if (this._dataView && this._dataView.toggled) {
      const table = this._dataView.getObject();
      if (table) {
        return table.getContextMenu(menu, event);
      }
    }
    return undefined;
  },
  getViewState() {
    return {};
  },
  getPreferredSize() {},
  getDataViewObject() {
    if (this._dataView) {
      return this._dataView.getObject();
    }
    return undefined;
  },
  destroy() {
    this._destroyed = true;
  },
  cancel() {},
  retry() {},
});

export default BaseView;
