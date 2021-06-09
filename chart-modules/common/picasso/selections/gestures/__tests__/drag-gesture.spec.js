import chai from 'chai';
import sinon from 'sinon';
import DependentInteractions from '../../dependent-interactions';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
describe('Dragging gesture', () => {
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
    let drag;

    beforeEach(() => {
      interactions = DependentInteractions.create(handlers, 'vertical', false, keys, rangeSelStatus);
      gestures = interactions.gestures;
      drag = gestures[5];

      emitter.settings.key = 'x-axis';
      drag.options.enable.call(event);
    });

    it('should not trigger a move if start has not been called first', () => {
      drag.events.dragmove.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
    });

    it('should not trigger an end if start has not been called first', () => {
      drag.events.dragend.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
    });

    it('should not trigger a cancel if start has not been called first', () => {
      drag.events.dragcancel.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
    });

    it('should not trigger a move followed by end if start has not been called first', () => {
      drag.events.dragmove.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);

      drag.events.dragend.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
    });

    it('should trigger a move if start has been called first', () => {
      drag.events.dragstart.call(that, event);
      drag.events.dragmove.call(that, event);

      expect(scrollApi.move.callCount).to.equal(1);
    });
  });
});
