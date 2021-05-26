import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import onComponentChecker from '../on-component-checker';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
describe('Gestures on components', () => {
  afterEach(() => {
    sandbox.reset();
  });

  describe('Setting up components', () => {
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

    const gestureParams = {
      keys: {
        componentKey: '',
      },
    };

    it('should return true if the keys matches for range selection', () => {
      emitter.settings.key = 'y-axis';
      const isOn = onComponentChecker.isOnComponentForRange(event, 'y-axis', that);
      expect(isOn).to.equal(true);
    });

    it('should return false if the keys mismatches for range selection', () => {
      emitter.settings.key = 'y-axis';
      const isOn = onComponentChecker.isOnComponentForRange(event, 'x-axis', that);
      expect(isOn).to.equal(false);
    });

    it('should return true if the keys matches for lasso selection', () => {
      emitter.settings.key = 'point-marker';
      gestureParams.keys.componentKey = 'point-marker';
      const comp = onComponentChecker.isOnComponentForLasso(event, gestureParams, that);
      expect(comp.settings.key).to.equal(emitter.settings.key);
    });

    it('should not find the component if the keys mismatches for lasso selection', () => {
      emitter.settings.key = 'box-marker';
      gestureParams.keys.componentKey = 'point-marker';
      const comp = onComponentChecker.isOnComponentForLasso(event, gestureParams, that);
      expect(comp).to.be.undefined;
    });

    it('should return true if navigation button has been pressed', () => {
      emitter.settings.key = 'legend';
      gestureParams.keys.componentKey = 'legend';
      const isOn = onComponentChecker.isOnComponentForNavBtn(event, gestureParams.keys.componentKey, that);
      expect(isOn).to.equal(true);
    });

    it('should return false if navigation button has not been pressed', () => {
      emitter.settings.key = 'legend';
      gestureParams.keys.componentKey = 'Some other key';
      const isOn = onComponentChecker.isOnComponentForNavBtn(event, gestureParams.keys.componentKey, that);
      expect(isOn).to.equal(false);
    });
  });
});
