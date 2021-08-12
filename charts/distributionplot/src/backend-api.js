import CacheCube from '@qlik/common/extra/backend-api/cache-cube';
import hypercubeUtil from '@qlik/common/extra/hypercube-util';
import CONSTANTS from './distributionplot-constants';

const DATA_PATH = CONSTANTS.DATA_PATH;
const HYPERCUBE_DEF_PATH = CONSTANTS.HYPERCUBE_DEF_PATH;

export default class BackednAPi {
  constructor(model) {
    this.model = model;
    this.path = `/${DATA_PATH}/${HYPERCUBE_DEF_PATH}`;
    this.cacheCube = new CacheCube(model, 'qDataPages', this.path, { mode: 'K' });
    this.cacheCube.setMethodName('getHyperCubeStackData');
    this.cacheCube.setOptions({ maxStackedValues: CONSTANTS.MAX_STACKED_VALUES });
  }

  setPath(path) {
    this.path = path;
  }

  setCacheOptions(opts) {
    this.cacheCube.setOptions(opts);
  }

  updateCache(layout) {
    let hyperCube;
    let hyperCubeContainerPath;
    if (this.dataPath === 'qHyperCube') {
      hyperCube = layout && layout.qHyperCube;
    } else {
      hyperCubeContainerPath = this.dataPath.slice(0, this.dataPath.indexOf('qHyperCube') - 1);
      hyperCube = layout && layout[hyperCubeContainerPath] && layout[hyperCubeContainerPath].qHyperCube;
    }
    if (!layout.qSelectionInfo.qInSelections) {
      this.cacheCube.setCubeSize({
        qcx: hyperCube.qSize.qcx,
        qcy: hypercubeUtil.getStackedCubeSizeOfMax2Dims(layout, hyperCubeContainerPath),
      });
    }
    this.backendStackThrottle.clear();
  }

  getData(pages, path) {
    const cacheCube = this.cacheCube;
    if (path) {
      return this.model.getHyperCubeData(path, pages);
    }
    return this.cacheCube.getData(pages).then((data) => {
      const isReduced = data[0] && data[0].qData[0] && data[0].qData[0].qSubNodes.some((node) => node.qDown > 0);
      if (isReduced) {
        cacheCube.clear();
      }
      return data;
    });
  }
}
