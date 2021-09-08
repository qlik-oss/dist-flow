const namespace = '.scrollHandler';

ScrollHandler.prototype.getScrollApi = getScrollApi;
ScrollHandler.prototype.setDisabled = setDisabled;
ScrollHandler.prototype.getDisabled = getDisabled;
ScrollHandler.prototype.setItemSize = setItemSize;
ScrollHandler.prototype.getItemSize = getItemSize;
ScrollHandler.prototype.getScrollViewSizeInItem = getScrollViewSizeInItem;
ScrollHandler.prototype.on = on;
ScrollHandler.prototype.isOn = isOn;
ScrollHandler.prototype.off = off;
ScrollHandler.prototype.updateViewState = updateViewState;
ScrollHandler.prototype.onResize = onResize;
ScrollHandler.prototype.isDataSizeChanged = isDataSizeChanged;
ScrollHandler.prototype.resetScroll = resetScroll;
ScrollHandler.prototype.getViewData = getViewData;
ScrollHandler.prototype.setOptions = setOptions;
ScrollHandler.prototype.getScrollState = getScrollState;
ScrollHandler.prototype.setScrollState = setScrollState;

export default ScrollHandler;

/**
 * Implementation details
 */

function ScrollHandler(chartInstance, $chartElement, getSlicedDataFn, onScrollCallback, legendKey) {
  if (!chartInstance || !$chartElement || !getSlicedDataFn) {
    throw Error('Scroll-handler: Missing input');
  }
  this._chartInstance = chartInstance;
  this._$chartElement = $chartElement;
  this._getSlicedDataFn = getSlicedDataFn;
  this._on = false;
  this._itemSize = 30;
  this.options = {
    direction: 'vertical',
  };
  this._onScrollCallback = onScrollCallback;
  this._legendKey = legendKey;
}

function getScrollApi() {
  if (!this._scrollApi) {
    this._scrollApi = this._chartInstance.scroll('dimension');
  }
  return this._scrollApi;
}

function setDisabled(b) {
  this._disabled = b;
}

function getDisabled() {
  return this._disabled;
}

function setItemSize(s) {
  if (this._itemSize !== s) {
    this._itemSize = s;
    calculateScrollViewSizeInItem.call(this);
  }
}

function getItemSize() {
  return this._itemSize;
}

function getScrollViewSizeInItem() {
  if (!this._scrollViewSizeInItem) {
    calculateScrollViewSizeInItem.call(this);
  }
  return this._scrollViewSizeInItem;
}

function on() {
  if (this._on) {
    return;
  }
  if (this.getScrollApi()) {
    this._scrollApi.removeAllListeners();
    this._scrollApi.on('update', onScroll.bind(this));
  }
  this._$chartElement.on(`mousewheel${namespace} DOMMouseScroll${namespace}`, onMouseWheel.bind(this));
  // TODO: Picasso does not support pointer events therefore we need to remove preventDefault on pointer down to make it work for IE.
  // However, this will make paning on touch device to pan the object, so we need to prevent it.
  // This fix should be removed when Picasso support pointer events.
  this._$chartElement.on(`touchstart${namespace}`, (event) => {
    event.preventDefault();
  });
  this._on = true;
}
function isOn() {
  return this._on;
}
function off() {
  if (!this._on) {
    return;
  }
  if (this.getScrollApi()) {
    this._scrollApi.removeAllListeners();
  }
  this._$chartElement.off(namespace);
  this._on = false;
}

function updateViewState(max) {
  calculateScrollViewSizeInItem.call(this);
  if (this.getScrollApi()) {
    this._scrollApi.update({ viewSize: this._scrollViewSizeInItem, max });
  }
}

function onResize() {
  this._sizeChanged = true;
  calculateScrollViewSizeInItem.call(this);
  if (this.getScrollApi()) {
    this._scrollApi.update({ viewSize: this._scrollViewSizeInItem });
  }
}

function isDataSizeChanged(pageNumberOfRows, datasetNumberOfRows) {
  return Math.min(this.getScrollViewSizeInItem(), datasetNumberOfRows) !== pageNumberOfRows;
}

function resetScroll() {
  if (this.getScrollApi()) {
    this._scrollApi.moveTo(0);
  }
}

function getViewData() {
  let top = 0;
  let height = 0;
  if (this.getScrollApi()) {
    const state = this._scrollApi.getState();
    top = Math.round(state.start);
    height = state.viewSize;
  }
  return this._getSlicedDataFn(top, height);
}

function getScrollState() {
  return this.getScrollApi().getState().start;
}
function setScrollState(state) {
  this.getScrollApi().moveTo(state);
}

function setOptions(options) {
  if (this.options.direction !== options.direction) {
    this._scrollViewSizeInItem = undefined;
  }
  this.options = options;
}

function calculateScrollViewSizeInItem() {
  const scrollSize =
    (this.options.direction === 'horizontal' ? this._$chartElement.width() : this._$chartElement.height()) || 0;
  const n = Math.floor(scrollSize / this.getItemSize());
  this._scrollViewSizeInItem = Math.max(n, 1); // Number of visible items should be at least 1
}

function getMouseWheelData(orgEvent) {
  let delta = 0;
  let deltaX = 0;
  let deltaY = 0;
  const divider = 60;

  // Old school scrollwheel delta
  if (orgEvent.wheelDelta) {
    delta = orgEvent.wheelDelta / divider;
  }
  if (orgEvent.detail) {
    delta = -orgEvent.detail / 3;
  }

  // New school multidimensional scroll (touchpads) deltas
  deltaY = delta;

  // Gecko
  if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
    deltaY = 0;
    deltaX = -1 * delta;
  }

  // Webkit
  if (orgEvent.wheelDeltaY !== undefined) {
    deltaY = orgEvent.wheelDeltaY / divider;
  }
  if (orgEvent.wheelDeltaX !== undefined) {
    deltaX = (-1 * orgEvent.wheelDeltaX) / divider;
  }

  return {
    delta,
    deltaX,
    deltaY,
    x: orgEvent.pageX,
    y: orgEvent.pageY,
  };
}

function onLegendMouseWheel(e, event, chart, legendKey) {
  if (!!legendKey && chart.componentsFromPoint(event).some((c) => c.settings.key === legendKey)) {
    const legend = chart.component(legendKey);
    legend.emit(event.delta > 0 ? 'prev' : 'next');
    e.preventDefault();
    return true;
  }
  return false;
}

function onMouseWheel(e) {
  const event = getMouseWheelData(e.originalEvent);
  if (onLegendMouseWheel(e, event, this._chartInstance, this._legendKey) || this._disabled || !this.getScrollApi()) {
    return;
  }
  e.preventDefault();
  if (!event.delta) {
    return;
  }
  const scrollSpeed = 3;
  const value = event.delta < 0 ? scrollSpeed : -scrollSpeed;
  this._scrollApi.move(value);
}

function onScroll() {
  if (this._disabled || this._sizeChanged) {
    this._sizeChanged = false;
    return;
  }
  const self = this;
  this.getViewData()
    .then((layout) => {
      if (self._on && !self._disabled && self._onScrollCallback) {
        // Chart is updated with partial data
        self._onScrollCallback(layout, undefined, true);
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        if (typeof err !== 'undefined') {
          console.error(err);
        }
      }
    });
}
