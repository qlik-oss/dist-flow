import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import getScrollActions from '../scroll-actions';

const expect = chai.expect;

describe('Scroll Actions', () => {
  let event;
  let manager;
  let isEnabled;
  let context;
  let componentsFromPoint;
  let scrollbarComponent;

  beforeEach(() => {
    isEnabled = sinon.stub();
    event = {
      center: { x: 100, y: 100 },
      deltaX: 100,
      deltaY: 0,
    };
    manager = null;
    componentsFromPoint = sinon.stub();
    context = {
      chart: {
        componentsFromPoint,
      },
    };
    scrollbarComponent = {
      settings: {
        key: 'scrollbar',
      },
    };
  });

  it('to be a tap & pan actions', () => {
    const actions = getScrollActions(isEnabled);
    expect(actions).to.have.length(2);
    expect(actions[0].type).to.equals('Tap');
    expect(actions[1].type).to.equals('Pan');
  });

  it('to have an enabled function', () => {
    const actions = getScrollActions(isEnabled);
    expect(actions[0].options.enable).to.be.a('function');
  });

  it('to be enabled when start on scrollbar', () => {
    isEnabled.returns(true);
    componentsFromPoint.returns([scrollbarComponent]);

    const actions = getScrollActions(isEnabled);
    const enabled = actions[0].options.enable.call(context, manager, event);
    expect(enabled).to.be.true;
  });

  it('to be disabled when not start on scrollbar', () => {
    isEnabled.returns(true);
    componentsFromPoint.returns([]);

    const actions = getScrollActions(isEnabled);
    const enabled = actions[0].options.enable.call(context, manager, event);
    expect(enabled).to.be.false;
  });

  it('to be disabled when isEnabled return false (edit mode)', () => {
    isEnabled.returns(false);
    componentsFromPoint.returns([scrollbarComponent]);

    const actions = getScrollActions(isEnabled);
    const enabled = actions[0].options.enable.call(context, manager, event);
    expect(enabled).to.be.false;
  });
});
