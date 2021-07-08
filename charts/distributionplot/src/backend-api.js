export default class BackednAPi {
  constructor(model) {
    this.model = model;
  }

  setPath(path) {
    this.path = path;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setCacheOptions({ maxStackedValues }) {}

  // eslint-disable-next-line no-unused-vars
  getData(pages, path, hyperCube) {
    const qMaxNbrCells = 3000;
    return this.model.getHyperCubeStackData(this.path, pages, qMaxNbrCells);
  }
}
