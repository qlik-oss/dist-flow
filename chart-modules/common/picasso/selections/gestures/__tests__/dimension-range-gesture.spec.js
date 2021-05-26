import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import DependentInteractions from '../../dependent-interactions';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
describe('Dim range gesture', () => {
  const scrollApi = {
    on(/* s, callback */) {},
    move: sandbox.spy(),
  };
  const scrollHandler = {
    getScrollApi() {
      return scrollApi;
    },
    getItemSize() {
      return 1;
    },
  };

  afterEach(() => {
    sandbox.reset();
  });

  const selectionHandler = {
    pauseEngineCalls() {},
    resumeEngineCalls() {},
    addComponent() {},
  };

  const handlers = {
    scrollHandler,
    selectionHandler,
  };

  const keys = {
    componentKey: 'MYMARKER',
    lassoBrushKey: 'MYMARKER',
    dimRangeBrushKey: 'MYMARKER',
    measureRangeBrushKey: 'MYMARKER',
    areaBrushKey: null,
  };

  const rangeSelStatus = {
    isOpenDim: true,
    isOpenMea: true,
  };

  describe('Setting up components', () => {
    let gestures;
    const emitter = {
      emit: sandbox.spy(),
      settings: {
        key: '',
      },
    };
    const that = {
      chart: {
        component() {
          return emitter;
        },
        componentsFromPoint() {
          return [emitter];
        },
      },
    };
    const event = {
      x: 0,
      y: 0,
      center: {
        x: 0,
        y: 0,
      },
      pointers: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };
    let interactions;
    let rangeDim;

    const enabledFn = function () {
      return true;
    };

    beforeEach(() => {
      interactions = DependentInteractions.create(handlers, enabledFn, 'vertical', false, keys, rangeSelStatus);
      gestures = interactions.gestures;
      rangeDim = gestures[3];

      emitter.settings.key = 'x-axis';
      rangeDim.options.enable.call(event);
    });

    it('should not trigger a move if start has not been called first', () => {
      rangeDim.events.majorrangemove.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger an end if start has not been called first', () => {
      rangeDim.events.majorrangeend.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger a cancel if start has not been called first', () => {
      rangeDim.events.majorrangecancel.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger a move followed by end if start has not been called first', () => {
      rangeDim.events.majorrangemove.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);

      rangeDim.events.majorrangeend.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should trigger a move if start has been called first', () => {
      rangeDim.events.majorrangestart.call(that, event);
      rangeDim.events.majorrangemove.call(that, event);

      expect(emitter.emit.callCount).to.equal(2);
    });

    it('should trigger a end if start has been called first', () => {
      rangeDim.events.majorrangestart.call(that, event);
      rangeDim.events.majorrangeend.call(that, event);

      expect(emitter.emit.callCount).to.equal(2);
    });

    it('should trigger a move followed by end if start has been called first', () => {
      rangeDim.events.majorrangestart.call(that, event);
      rangeDim.events.majorrangemove.call(that, event);
      rangeDim.events.majorrangeend.call(that, event);

      expect(emitter.emit.callCount).to.equal(3);
    });
  });
});
