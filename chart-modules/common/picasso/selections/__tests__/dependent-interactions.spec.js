import chai from 'chai';
import sinon from 'sinon';
import DependentInteractions from '../dependent-interactions';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
describe('Dependent Interactions', () => {
  let scrollListener;
  const scrollApi = {
    on(s, callback) {
      scrollListener = callback;
    },
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

  describe('test components', () => {
    let gestures;
    beforeEach(() => {
      gestures = DependentInteractions.create(handlers, 'vertical', false, keys, rangeSelStatus).gestures;
    });

    it('Should setup default interaction', () => {
      expect(gestures.length).to.equal(6);
    });
  });

  describe('test switching', () => {
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
    let rangeDim;
    let rangeMea;
    /* clearTap, */ let pan;
    beforeEach(() => {
      interactions = DependentInteractions.create(handlers, 'vertical', false, keys, rangeSelStatus);
      gestures = interactions.gestures;
      // clearTap = gestures[0];
      lasso = gestures[2];
      rangeDim = gestures[3];
      rangeMea = gestures[4];
      pan = gestures[5];
    });

    it('switch from dim range should clear it', () => {
      // start dim range to switch to it
      emitter.settings.key = 'x-axis';
      rangeDim.events.majorrangestart.call(that, event);
      rangeDim.events.majorrangeend.call(that, event);
      // start lasso to switch to it
      emitter.settings.key = 'MYMARKER';
      lasso.events.lassostart.call(that, event);
      expect(emitter.emit.callCount).to.equal(4);
      expect(emitter.emit.getCall(2).args[0]).to.equal('rangeClear');
    });

    it('a move or end should not trigger if start has not been called first(for dimensions)', () => {
      // start dim range to switch to it
      emitter.settings.key = 'x-axis';
      rangeDim.events.majorrangestart.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);

      // Try lasso
      emitter.settings.key = 'MYMARKER';
      lasso.events.lassomove.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);
      lasso.events.lassoend.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);

      // Try pan
      emitter.settings.key = 'MYMARKER';
      pan.events.dragmove.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
      pan.events.dragend.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
    });

    it('a scroll event should clear the dim range', () => {
      // start dim range to switch to it
      emitter.settings.key = 'x-axis';
      rangeDim.events.majorrangestart.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);
      scrollListener();
      expect(emitter.emit.callCount).to.equal(2);
      expect(emitter.emit.getCall(1).args[0]).to.equal('rangeClear');
    });

    it('switch from measure range should clear it', () => {
      // start measure range to switch to it
      emitter.settings.key = 'y-axis';
      rangeMea.events.measurerangestart.call(that, event);
      rangeMea.events.measurerangeend.call(that, event);
      // start lasso to switch to it
      emitter.settings.key = 'MYMARKER';
      lasso.events.lassostart.call(that, event);
      expect(emitter.emit.callCount).to.equal(4);
      expect(emitter.emit.getCall(2).args[0]).to.equal('rangeClear');
    });

    it('a move or end should not trigger if start has not been called first(for measures)', () => {
      // start measure range to switch to it
      emitter.settings.key = 'y-axis';
      rangeMea.events.measurerangestart.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);

      // Try lasso
      emitter.settings.key = 'MYMARKER';
      lasso.events.lassomove.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);
      lasso.events.lassoend.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);

      // Try pan
      emitter.settings.key = 'MYMARKER';
      pan.events.dragmove.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
      pan.events.dragend.call(that, event);
      expect(scrollApi.move.callCount).to.equal(0);
    });

    it('a scroll event should clear the measure range', () => {
      // start measure range to switch to it
      emitter.settings.key = 'y-axis';
      rangeMea.events.measurerangestart.call(that, event);
      expect(emitter.emit.callCount).to.equal(1);
      scrollListener();
      expect(emitter.emit.callCount).to.equal(2);
      expect(emitter.emit.getCall(1).args[0]).to.equal('rangeClear');
    });
  });
});
