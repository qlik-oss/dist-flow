export default class BackednAPi {
  constructor(model) {
    this.model = model;
  }

  setPath(path) {
    this.path = path;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setPaths(paths) {}

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setCacheOptions({ maxStackedValues }) {}

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  updateCache(args) {}

  // eslint-disable-next-line no-unused-vars
  getData(pages, path, hyperCube) {
    return this.model.getHyperCubeData(this.path, pages);
  }
}
