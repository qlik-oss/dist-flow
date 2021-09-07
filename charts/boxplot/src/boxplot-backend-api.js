import CacheCube from '@qlik/common/extra/backend-api/cache-cube';

export default class BackednAPi {
  constructor(model) {
    this.model = model;
    this.path = '/qUndoExclude/box/qHyperCubeDef';
    this.cacheCube = new CacheCube(model, 'qDataPages', this.path);
    this.cacheCube.setMethodName('getHyperCubeData');
  }

  updateCache(layout) {
    if (layout && layout.qHyperCube && layout.qHyperCube.qMode === 'S') {
      this.cacheCube.set(layout.qHyperCube.qDataPages);
      this.cacheCube.setCubeSize(layout.qHyperCube.qSize);
    } else {
      this.cacheCube.clear();
    }
  }

  setCacheOptions(opts) {
    this.cacheCube.setOptions(opts);
  }

  getData(pages) {
    return this.cacheCube.getData(pages);
  }
}
