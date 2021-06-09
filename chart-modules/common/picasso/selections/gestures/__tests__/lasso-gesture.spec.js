import chai from 'chai';
import sinon from 'sinon';
import DependentInteractions from '../../dependent-interactions';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
describe('Lasso gesture', () => {
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
    isOn() {
      return true;
    },
  };

  afterEach(() => {
    sandbox.reset();
  });

  const selectionHandler = {
    pauseEngineCalls() {},
    resumeEngineCalls() {},
    addComponent() {},
    isOn() {
      return true;
    },
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
    let lasso;

    beforeEach(() => {
      interactions = DependentInteractions.create(handlers, 'vertical', false, keys, rangeSelStatus);
      gestures = interactions.gestures;
      lasso = gestures[2];

      emitter.settings.key = 'x-axis';
      lasso.options.enable.call(event);
    });

    it('should not trigger a move if start has not been called first', () => {
      lasso.events.lassomove.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger an end if start has not been called first', () => {
      lasso.events.lassoend.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger a move followed by end if start has not been called first', () => {
      lasso.events.lassomove.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);

      lasso.events.lassoend.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should trigger a cancel regardless of the state of start', () => {
      lasso.events.lassocancel.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);
    });
  });
});
