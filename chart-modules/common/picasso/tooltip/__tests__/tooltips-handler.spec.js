import { expect } from 'chai';
import sinon from 'sinon';
import PicassoMock from '../../__tests__/picasso-mock';
import Support from '../../../../general/utils/support';
import TooltipHandler from '../tooltips-handler';
import TooltipActions from '../tooltip-actions';
import chartTooltipService from '../../../views/charts/tooltip/chart-tooltip-service';
import chartStyleUtils from '../../../extra/chart-style-utils';

describe('tooltip-handler for picasso', () => {
  let handler;
  let sandbox;
  let mock;
  let openMock;
  let supportTreatAsDesktopStub;

  let tooltipBrush;
  const tooltipApi = { cancel() {} };
  let actionInstance;
  let restoreFunc;
  let getStyleStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mock = sandbox.mock(chartTooltipService);
    openMock = mock.expects('open').once();

    tooltipBrush = PicassoMock.createBrushContext('tooltip');
    PicassoMock.createField(0, 'dimension', null, 'dimension/0');
    PicassoMock.createField(1, 'measure', null, 'measure/0');
    PicassoMock.createBrush(0, 'cube/dimension/0');

    supportTreatAsDesktopStub = sandbox.stub(Support, 'treatAsDesktop');
    supportTreatAsDesktopStub.returns(true);

    getStyleStub = sandbox.stub().returns('mumbojumbo-font');

    sandbox.stub(chartStyleUtils, 'getStyle').callsFake(getStyleStub);

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

  it('should use defaults', () => {
    handler.setUp({ componentKey: 'layer' });
    sinon.stub(actionInstance, 'getElementOffset').returns({
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
    });

    PicassoMock.constants.brushedValues().push('dimVal1');
    PicassoMock.constants.valueArray().push({ id: 'dimVal1', value: 'dimVal1' });
    handler.on();
    tooltipBrush.callbacks.update();
    expect(actionInstance.isOpen()).to.equal(false);
  });

  it('should add listeners if already on', () => {
    handler.on();
    handler.setUp({ componentKey: 'layer' });
    expect(tooltipBrush.callbacks.update).to.be.ok;
    expect(tooltipBrush.callbacks.end).to.be.ok;
  });

  it('toggle interceptor', () => {
    const items = TooltipActions.create(undefined, PicassoMock.chartInstance, '', [1, 2]).toggleInterceptor([
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
    handler.setUp({ componentKey: 'layer' });
    handler.setUp({ componentKey: 'layer' });
    expect(onSpy.callCount).to.equal(4);
    expect(offSpy.callCount).to.equal(2);
  });

  describe('with setup', () => {
    beforeEach(() => {
      handler.setUp({
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
      sinon.stub(actionInstance, 'getElementOffset').returns({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
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
      const args = openMock.args[0];
      expect(args[0].position[0].x).to.equal(50);
      openMock.verify();
    });
    it('should not open outside parent', () => {
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
      const args = openMock.args[0];
      expect(args[0].position[0].x).to.equal(100);
      openMock.verify();
    });
    it('should only include a limited number of brushed items', () => {
      for (let i = 0; i < 30; i++) {
        PicassoMock.constants.brushedValues().push(`dimVal${i}`);
        PicassoMock.constants.valueArray().push({ id: `dimVal${i}`, value: 'dimVal1' });
        PicassoMock.createShape(i, {
          x: 100,
          y: 10,
          width: 90,
          height: 90,
        });
      }

      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(true);
      const args = openMock.args[0];
      expect(args[0].numberInExcess).to.equal(25);
      openMock.verify();
    });
    it('should not show for null values', () => {
      PicassoMock.createField(1, 'dimension', [{ label: '-', id: -2 }]);
      PicassoMock.constants.brushedValues().push('dimVal1');
      PicassoMock.constants.valueArray().push({ id: 'dimVal1' });
      openMock.never();
      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(false);
      openMock.verify();
    });
    it('should not open the tooltip when no values are brushed', () => {
      PicassoMock.constants.valueArray().push({ id: 'dimVal1' });
      openMock.never();
      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(false);
      openMock.verify();
    });
    it('should not open the tooltip when there is no content', () => {
      PicassoMock.constants.brushedValues().push('dimVal1');
      openMock.never();

      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(false);
      openMock.verify();
    });
    it('should include styling from theme', () => {
      PicassoMock.constants.brushedValues().push('dimVal1');
      PicassoMock.constants.valueArray().push({ id: 'dimVal1', value: 'dimVal1' });
      PicassoMock.createShape(0);

      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(true);
      expect(getStyleStub).to.have.been.calledOnce;
      const args = openMock.args[0];
      expect(args[0].styling).to.eql({ 'font-family': 'mumbojumbo-font' });
      openMock.verify();
    });
    it('should close on API cancel', () => {
      PicassoMock.constants.brushedValues().push('dimVal1');
      PicassoMock.constants.valueArray().push({ id: 'dimVal1', value: 'dimVal1' });
      PicassoMock.createShape(0);

      const closeMock = mock.expects('close').once();
      tooltipBrush.callbacks.update();
      expect(actionInstance.isOpen()).to.equal(true);
      openMock.verify();

      tooltipApi.cancel();
      expect(actionInstance.isOpen()).to.equal(false);
      closeMock.verify();
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
    it('should add/remove touch listeners correctly', () => {
      handler.off();
      supportTreatAsDesktopStub.returns(false);
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
