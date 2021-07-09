/* eslint-disable import/no-unresolved */
import StackedApi from '../../../assets/objects/backend-api/stacked-api';

const BoxPlotApi = StackedApi.extend('BoxPlotApi', {
  setPaths(paths) {
    this._paths = paths;
  },

  beginSelections() {
    return this.model.app.switchModalSelection(this.model, this._paths);
  },
});

export default BoxPlotApi;
