import { expect } from 'chai';
import sinon from 'sinon';
import PicassoMock from '../../__tests__/picasso-mock';
import TooltipHandler from '../tooltips-handler';
import TooltipActions from '../tooltip-actions';
import * as createTooltip from '../tooltips-component';

describe('tooltip-handler for picasso', () => {
  let handler;
  let sandbox;
  let mock;
  let openMock;

  let tooltipBrush;
  const tooltipApi = { cancel() {} };
  let actionInstance;
  let restoreFunc;
  let chartBuilder;
  let chartView;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    tooltipBrush = PicassoMock.createBrushContext('tooltip');
    PicassoMock.createField(0, 'dimension', null, 'dimension/0');
    PicassoMock.createField(1, 'measure', null, 'measure/0');
    PicassoMock.createBrush(0, 'cube/dimension/0');
    const tooltipComponent = PicassoMock.createComponent('tooltip');

    mock = sandbox.mock(tooltipComponent);
    openMock = mock.expects('emit').once();

    createTooltip.default = sinon.stub();

    chartBuilder = {
      settings: {
        components: [],
      },
      getSettings: () => chartBuilder.settings,
    };
    chartView = {
      translator: (x) => x,
      theme: {
        getStyle: () => 'mumbojumbo-font',
      },
    };

    handler = TooltipHandler.create(PicassoMock.chartInstance, tooltipApi);
    restoreFunc = TooltipActions.create;
    TooltipActions.create = function (chartInstance, componentKey, data, dataPath, context, template, duration) {
      // eslint-disable-line no-param-reassign
      actionInstance = restoreFunc(chartInstance, componentKey, data, dataPath, context, template, duration);
      return actionInstance;
    };
  });

  afterEach(() => {
    PicassoMock.restore();
    mock.restore();
    sandbox.restore();
    TooltipActions.create = restoreFunc; // eslint-disable-line no-param-reassign
  });

  it('should add listeners if already on', () => {
    handler.on();
    handler.setUp({ chartBuilder, chartView, componentKey: 'layer' });
    expect(tooltipBrush.callbacks.update).to.be.ok;
    expect(tooltipBrush.callbacks.end).to.be.ok;
  });

  it('toggle interceptor', () => {
    const items = TooltipActions.create(PicassoMock.chartInstance, '', [1, 2]).toggleInterceptor([
      { key: 'A', value: '1' },
      { key: 'A', value: '2' },
      { key: 'B', value: '1' },
      { key: 'B', value: '1' },
    ]);
    expect(items).to.deep.equal([
      { key: 'A', value: '1' },
      { key: 'A', value: '2' },
      { key: 'B', value: '1' },
    ]);
  });

  it('should throw error on missing input', () => {
    expect(() => {
      handler.setUp({});
    }).to.throw(Error);
    expect(() => {
      TooltipHandler.create();
    }).to.throw(Error);
  });

  it('should not add double listeners', () => {
    const onSpy = sinon.spy(tooltipBrush, 'on');
    const offSpy = sinon.spy(tooltipBrush, 'removeListener');
    handler.on();
    handler.setUp({ chartBuilder, chartView, componentKey: 'layer' });
    handler.setUp({ chartBuilder, chartView, componentKey: 'layer' });
    expect(onSpy.callCount).to.equal(4);
    expect(offSpy.callCount).to.equal(2);
  });

  describe('with setup', () => {
    beforeEach(() => {
      handler.setUp({
        chartBuilder,
        chartView,
        dataPath: 'qHyperCube',
        data: ['self'],
        componentKey: 'pointLayer',
        contexts: ['tooltip'],
        headerResolver() /* b, index */ {
          // First brush is dimension value, get the value
          return 'HEADER';
        },
        direction: 'ltr',
        measureRows: ['x'],
        labelData: ['inner', 'outer'],
      });
      handler.on();
    });

    it('should try to open the tooltip once on brush', () => {
      PicassoMock.constants.brushedValues().push('dimVal1');
      PicassoMock.constants.valueArray().push({ id: 'dimVal1', value: 'dimVal1' });
      PicassoMock.createShape(0, {
        x: 100,
        y: 10,
        width: 90,
        height: 90,
      });
      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(true);
      openMock.verify();
    });

    it('should open for multiple shapes', () => {
      PicassoMock.constants.brushedValues().push('dimVal1');
      PicassoMock.constants.valueArray().push({ id: 'dimVal1', value: 'dimVal1' });
      PicassoMock.createShape(0);
      PicassoMock.createShape(1, {
        x: 10,
        y: 10,
        width: 90,
        height: 90,
      });

      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(true);
      openMock.verify();
    });

    it('should send component key to createTooltipComponennt', () => {
      expect(createTooltip.default).to.have.been.calledOnce;
      expect(createTooltip.default).to.have.been.calledWithMatch({
        key: 'tooltip',
      });
    });

    it('should send rtl to createTooltipComponennt', () => {
      expect(createTooltip.default).to.have.been.calledOnce;
      expect(createTooltip.default).to.have.been.calledWithMatch({
        rtl: false,
      });
    });

    it('should send filter and content functions to createTooltipComponennt', () => {
      expect(createTooltip.default).to.have.been.calledOnce;
      expect(createTooltip.default).to.have.been.calledWithMatch({
        filter: sinon.match.func,
        content: sinon.match.func,
      });
    });

    it('should include styling from theme', () => {
      expect(createTooltip.default).to.have.been.calledOnce;
      expect(createTooltip.default).to.have.been.calledWithMatch({
        fontFamily: 'mumbojumbo-font',
      });
    });
    it('should add/remove all listeners correctly', () => {
      expect(tooltipBrush.callbacks.update).to.be.ok;
      expect(tooltipBrush.callbacks.end).to.be.ok;
      handler.off();
      handler.off(); // Double here to check that it won't crash
      expect(tooltipBrush.callbacks.update).to.not.be.ok;
      expect(tooltipBrush.callbacks.end).to.not.be.ok;
    });

    it('should tearDown correctly', () => {
      expect(tooltipBrush.callbacks.update).to.be.ok;
      expect(tooltipBrush.callbacks.end).to.be.ok;
      handler.tearDown();
      expect(tooltipBrush.callbacks.update).to.not.be.ok;
      expect(tooltipBrush.callbacks.end).to.not.be.ok;
    });
    it.skip('should add/remove touch listeners correctly', () => {
      handler.off();
      handler.on();
      handler.on(); // Double here to check that it won't crash
      expect(tooltipBrush.callbacks['set-values']).to.be.ok;
      expect(tooltipBrush.callbacks.end).to.be.ok;
      handler.off();
      expect(tooltipBrush.callbacks['set-values']).to.not.be.ok;
      expect(tooltipBrush.callbacks.end).to.not.be.ok;
    });
  });
});
