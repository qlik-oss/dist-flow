import chai from 'chai';
import sinon from 'sinon';
import ScrollHandler from '../scroll-handler';

const expect = chai.expect;
let sandbox;

describe('Scroll', () => {
  let scrollApi;
  let chartInstance;
  let scrollHandler;
  let height;
  let width;
  let start;
  let viewSizeInItem;
  let itemSize;

  beforeEach(() => {
    height = 600;
    width = 300;
    start = 10;
    itemSize = 30;
    viewSizeInItem = Math.round(height / itemSize);
    sandbox = sinon.createSandbox();
    scrollApi = {
      removeAllListeners: sinon.stub(),
      on: sinon.stub(),
      update: sinon.stub(),
      getState() {
        return {
          start,
          viewSize: viewSizeInItem,
        };
      },
    };
    chartInstance = {
      scroll() {
        return scrollApi;
      },
    };

    scrollHandler = Object.create(ScrollHandler.prototype);
    scrollHandler._$chartElement = {
      height() {
        return height;
      },
      width() {
        return width;
      },
      on: sinon.stub(),
      off: sinon.stub(),
    };
    scrollHandler._itemSize = itemSize;
    scrollHandler._chartInstance = chartInstance;
    scrollHandler._getSlicedDataFn = sinon.stub().returns(Promise.resolve());
    scrollHandler._onScrollCallback = sinon.stub();

    scrollHandler.options = { direction: 'vertical' };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be able to enable and disable scroll', () => {
    scrollHandler.setDisabled(true);
    expect(scrollHandler.getDisabled()).to.equal(true);
    scrollHandler.setDisabled(false);
    expect(scrollHandler.getDisabled()).to.equal(false);
  });

  it('should have initial item size of 30', () => {
    expect(scrollHandler.getItemSize()).to.equal(30);
  });

  it('should calculate initial view size correctly for vertical case', () => {
    expect(scrollHandler.getScrollViewSizeInItem()).to.equal(20);
  });

  it('should calculate initial view size correctly for horizontal case', () => {
    scrollHandler.options.direction = 'horizontal';
    expect(scrollHandler.getScrollViewSizeInItem()).to.equal(10);
  });

  it('should recalculate view size correctly after changing item size', () => {
    scrollHandler.setItemSize(50);
    expect(scrollHandler.getScrollViewSizeInItem()).to.equal(12);
  });

  it('should recalculate view size correctly after changing scroll size', () => {
    height = 1200;
    scrollHandler.onResize();
    expect(scrollHandler.getScrollViewSizeInItem()).to.equal(40);
  });

  it('should recalculate view size correctly after changing scroll size for horizontal chart', () => {
    height = 1200;
    width = 900;
    scrollHandler.options.direction = 'horizontal';
    scrollHandler.onResize();
    expect(scrollHandler.getScrollViewSizeInItem()).to.equal(30);
  });

  it("should run function on if it is not in state 'on'", () => {
    scrollHandler._on = false;
    scrollHandler.on();
    expect(scrollApi.removeAllListeners).to.have.been.calledOnce;
    expect(scrollApi.on).to.have.been.calledOnce;
  });

  it("should run function off if it is not in state 'off'", () => {
    scrollHandler._on = true;
    scrollHandler.off();
    expect(scrollApi.removeAllListeners).to.have.been.calledOnce;
  });

  it("should not run function on if it is already in state 'on'", () => {
    scrollHandler._on = true;
    scrollHandler.on();
    expect(scrollApi.removeAllListeners).to.not.been.called;
    expect(scrollApi.on).to.not.been.called;
  });

  it("should not run function off if it is already in state 'off'", () => {
    scrollHandler._on = false;
    scrollHandler.off();
    expect(scrollApi.removeAllListeners).to.not.been.called;
  });

  it.skip('should run onScroll function when scroll api is updated', () => {
    scrollHandler._on = false;
    scrollHandler.on();
    const scrollCallback = scrollApi.on.args[0][1];
    scrollCallback();
    expect(scrollHandler._getSlicedDataFn).to.have.been.calledOnce;
    expect(scrollHandler._getSlicedDataFn).to.be.calledWith(10, 20);
    // window.flush();
    expect(scrollHandler._onScrollCallback).to.have.been.calledOnce;
  });

  it('should run getViewData correctly', () => {
    scrollHandler.getViewData();
    expect(scrollHandler._getSlicedDataFn).to.have.been.calledOnce;
    expect(scrollHandler._getSlicedDataFn).to.be.calledWith(10, 20);
  });

  describe('> isDataSizeChanged', () => {
    it('should work for case 1', () => {
      sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
      expect(scrollHandler.isDataSizeChanged(10, 10)).to.equal(false);
    });

    it('should work for case 2', () => {
      sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
      expect(scrollHandler.isDataSizeChanged(30, 100)).to.equal(false);
    });

    it('should work for case 3', () => {
      sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
      expect(scrollHandler.isDataSizeChanged(20, 100)).to.equal(true);
    });

    it('should work for case 4', () => {
      sandbox.stub(scrollHandler, 'getScrollViewSizeInItem').returns(30);
      expect(scrollHandler.isDataSizeChanged(10, 20)).to.equal(true);
    });
  });
});
