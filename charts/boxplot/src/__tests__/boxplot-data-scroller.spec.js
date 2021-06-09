import chai from 'chai';
import sinon from 'sinon';
import DataScroller from '../boxplot-data-scroller';
// import CacheCube from '../../../../assets/objects/backend-api/cache-cube';

const expect = chai.expect;
let sandbox;

describe('Boxplot-data-scroller', () => {
  let dataScroller;
  let backendApi;
  let outliersCacheCube;
  let scrollHandler;
  let layout;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    dataScroller = Object.create(DataScroller.prototype);
    backendApi = {
      cacheCube: {
        setOptions: sinon.stub(),
      },
      setCacheOptions: sinon.stub(),
    };
    outliersCacheCube = {
      setOptions: sinon.stub(),
      destroy: sinon.stub(),
      setCubeSize: sinon.stub(),
    };
    scrollHandler = {
      getScrollViewSizeInItem() {},
    };
    layout = {
      boxplotDef: {
        qHyperCube: {
          qDimensionInfo: {
            length: 1,
          },
          qMeasureInfo: [{}],
        },
        elements: {
          outliers: {
            include: false,
          },
        },
      },
      qUndoExclude: {
        box: {
          qHyperCube: {
            qSize: {
              qcx: 6,
              qcy: 50,
            },
            qDataPages: [
              {
                qMatrix: [],
              },
            ],
          },
        },
        outliers: {
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 100,
            },
          },
        },
      },
    };
    dataScroller._backendApi = backendApi;
    dataScroller._outliersCacheCube = outliersCacheCube;
    dataScroller._scrollHandler = scrollHandler;
    dataScroller._getDataFn = sinon.stub().returns(Promise.resolve());
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should run getOutliersCache correctly', () => {
    expect(dataScroller.getOutliersCache()).to.deep.equal(outliersCacheCube);
  });

  describe.skip('> updateOutliersCache', () => {
    it('should work even when outliersCacheCube is not initialized and only 1 dimension ', () => {
      // sandbox.stub(CacheCube.prototype, 'init');
      // sandbox.stub(CacheCube.prototype, 'setMethodName');
      // sandbox.stub(CacheCube.prototype, 'setOptions');
      // sandbox.stub(CacheCube.prototype, 'setCubeSize');
      sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
      dataScroller._outliersCacheCube = undefined;
      dataScroller.updateOutliersCache(layout);
      expect(dataScroller._outliersCacheCube.setMethodName).to.have.been.calledOnce;
      expect(dataScroller._outliersCacheCube.setOptions).to.be.calledWith({ height: 90, width: 6 });
      expect(dataScroller._outliersCacheCube.setCubeSize).to.be.calledWith({ qcx: 1, qcy: 100 });
    });

    it('should work even when outliersCacheCube is not initialized and 2 dimension ', () => {
      // sandbox.stub(CacheCube.prototype, 'init');
      // sandbox.stub(CacheCube.prototype, 'setMethodName');
      // sandbox.stub(CacheCube.prototype, 'setOptions');
      // sandbox.stub(CacheCube.prototype, 'setCubeSize');
      sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
      layout.boxplotDef.qHyperCube.qDimensionInfo.length = 2;
      dataScroller._outliersCacheCube = undefined;
      dataScroller.updateOutliersCache(layout);
      expect(dataScroller._outliersCacheCube.setMethodName).to.have.been.calledOnce;
      expect(dataScroller._outliersCacheCube.setOptions).to.be.calledWith({ height: 90, width: 6 });
      expect(dataScroller._outliersCacheCube.setCubeSize).to.be.calledWith({ qcx: 6, qcy: 50 });
    });

    it('should work even when outliersCacheCube is initialized and only 1 dimension ', () => {
      dataScroller.updateOutliersCache(layout);
      expect(dataScroller._outliersCacheCube.setCubeSize).to.be.calledWith({ qcx: 1, qcy: 100 });
    });

    it('should work even when outliersCacheCube is initialized and 2 dimension ', () => {
      layout.boxplotDef.qHyperCube.qDimensionInfo.length = 2;
      dataScroller.updateOutliersCache(layout);
      expect(dataScroller._outliersCacheCube.setCubeSize).to.be.calledWith({ qcx: 6, qcy: 50 });
    });
  });

  it('should run updateCacheSize correctly', () => {
    sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
    dataScroller.updateCacheSize();
    expect(backendApi.setCacheOptions).to.be.calledWith({ height: 90, width: 6 });
    expect(outliersCacheCube.setOptions).to.be.calledWith({ height: 90, width: 6 });
  });

  describe('> getSlicedData', () => {
    it('should work for case of having no outliers', () => {
      dataScroller.getSlicedData(layout, 10, 20);
      expect(dataScroller._getDataFn).to.have.been.calledOnce;
    });

    it('should work for case of having outliers', () => {
      layout.boxplotDef.elements.outliers.include = true;
      dataScroller.getSlicedData(layout, 10, 20);
      expect(dataScroller._getDataFn).to.have.been.calledTwice;
    });
  });

  it('should run destroy correctly', () => {
    dataScroller.destroy();
    expect(outliersCacheCube.destroy).to.have.been.calledOnce;
  });
});
