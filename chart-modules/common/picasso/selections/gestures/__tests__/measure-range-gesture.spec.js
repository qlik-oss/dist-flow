import chai from 'chai';
import sinon from 'sinon';
import DependentInteractions from '../../dependent-interactions';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
describe('Measure range gesture', () => {
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
    let rangeMea;

    beforeEach(() => {
      interactions = DependentInteractions.create(handlers, 'vertical', false, keys, rangeSelStatus);
      gestures = interactions.gestures;
      rangeMea = gestures[4];

      emitter.settings.key = 'y-axis';
      rangeMea.options.enable.call(event);
    });

    it('should not trigger a move if start has not been called first', () => {
      rangeMea.events.measurerangemove.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger an end if start has not been called first', () => {
      rangeMea.events.measurerangeend.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger a cancel if start has not been called first', () => {
      rangeMea.events.measurerangecancel.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should not trigger a move followed by end if start has not been called first', () => {
      rangeMea.events.measurerangemove.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);

      rangeMea.events.measurerangeend.call(that, event);
      expect(emitter.emit.callCount).to.equal(0);
    });

    it('should trigger a move if start has been called first', () => {
      rangeMea.events.measurerangestart.call(that, event);
      rangeMea.events.measurerangemove.call(that, event);

      expect(emitter.emit.callCount).to.equal(2);
    });

    it('should trigger a end if start has been called first', () => {
      rangeMea.events.measurerangestart.call(that, event);
      rangeMea.events.measurerangeend.call(that, event);

      expect(emitter.emit.callCount).to.equal(2);
    });

    it('should trigger a move followed by end if start has been called first', () => {
      rangeMea.events.measurerangestart.call(that, event);
      rangeMea.events.measurerangemove.call(that, event);
      rangeMea.events.measurerangeend.call(that, event);

      expect(emitter.emit.callCount).to.equal(3);
    });
  });
});
