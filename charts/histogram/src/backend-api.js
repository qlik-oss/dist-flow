export default class BackednAPi {
  constructor(model) {
    this.model = model;
    this.path = '/qUndoExclude/box/qHyperCubeDef';
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setCacheOptions({ maxStackedValues }) {}

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  updateCache(args) {}

  getData(pages) {
    return this.model.getHyperCubeData(this.path, pages);
  }
}
