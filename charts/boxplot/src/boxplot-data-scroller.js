import extend from 'extend';
import CacheCube from '@qlik/common/extra/backend-api/cache-cube';

/**
 * Implementation details
 */

function BoxPlotDataScroller(backendApi, getDataFn, scrollHandler) {
  this._backendApi = backendApi;
  this._getDataFn = getDataFn;
  this._scrollHandler = scrollHandler;
}

function getOutliersCache() {
  return this._outliersCacheCube;
}

function updateOutliersCache(layout) {
  if (!this._outliersCacheCube) {
    this._outliersCacheCube = new CacheCube(
      this._backendApi.model,
      'qDataPages',
      '/qUndoExclude/outliers/qHyperCubeDef',
      extend(true, {}, this._backendApi.cacheCube.options, { mode: 'K' })
    ); // To fix memory leak
    this._outliersCacheCube.setMethodName('getHyperCubeStackData');
    if (this._scrollHandler.getScrollViewSizeInItem()) {
      this._outliersCacheCube.setOptions({ height: 3 * this._scrollHandler.getScrollViewSizeInItem(), width: 6 });
    }
  }
  const hasSecondDimension = layout.boxplotDef.qHyperCube.qDimensionInfo.length > 1;
  this._outliersCacheCube.setCubeSize(
    hasSecondDimension ? layout.qUndoExclude.box.qHyperCube.qSize : layout.qUndoExclude.outliers.qHyperCube.qSize
  );
}

function updateCacheSize() {
  const size = { height: 3 * this._scrollHandler.getScrollViewSizeInItem(), width: 6 };
  this._backendApi.setCacheOptions(size);
  if (this._outliersCacheCube) {
    this._outliersCacheCube.setOptions(size);
  }
}

function getSlicedData(layout, top, height) {
  // This works when there are 2 dimensions. If there is 1 dimension then there is no need to use this.
  const boxPage = {
    top,
    height,
    left: 0,
    width: layout.qUndoExclude.box.qHyperCube.qSize.qcx,
  };
  const boxData = this._getDataFn(this._backendApi, layout.qUndoExclude.box.qHyperCube, boxPage);
  if (!layout.boxplotDef.elements || !layout.boxplotDef.elements.outliers.include) {
    return boxData.then(() => layout);
  }
  const outliersPage = {
    top,
    height,
    left: 0,
    width: layout.qUndoExclude.outliers.qHyperCube.qSize.qcx,
  };
  const outliersData = this._getDataFn(this._outliersCacheCube, layout.qUndoExclude.outliers.qHyperCube, outliersPage);
  return Promise.all([boxData, outliersData]).then(() => layout);
}

function destroy() {
  if (this._outliersCacheCube) {
    this._outliersCacheCube.destroy();
  }
}

BoxPlotDataScroller.prototype.getOutliersCache = getOutliersCache;
BoxPlotDataScroller.prototype.updateOutliersCache = updateOutliersCache;
BoxPlotDataScroller.prototype.updateCacheSize = updateCacheSize;
BoxPlotDataScroller.prototype.getSlicedData = getSlicedData;
BoxPlotDataScroller.prototype.destroy = destroy;

export default BoxPlotDataScroller;
