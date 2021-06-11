import chai from 'chai';
import sinon from 'sinon';
import distributionplotPropertiesFn from '../distributionplot-properties';

const expect = chai.expect;
let sandbox;
let isEnabledStub;

describe('distributionplot-properties', () => {
  let distributionplotProperties;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    isEnabledStub = sandbox.stub().returns(true);
    const flags = {
      isEnabled: isEnabledStub,
    };
    const theme = {};
    const env = {
      anything: {
        sense: {
          theme,
        },
      },
      flags,
    };
    distributionplotProperties = distributionplotPropertiesFn(env);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('general', () => {
    let general;
    let showDisclaimer;
    beforeEach(() => {
      general = distributionplotProperties.items.settings.items.general;
      showDisclaimer = general.items.showDisclaimer;
    });

    it('should use correct ref', () => {
      expect(showDisclaimer.ref).to.equal('showDisclaimer');
    });

    describe('show', () => {
      it('should return false if feature flag is not enabled', () => {
        isEnabledStub.returns(false);

        expect(showDisclaimer.show()).to.be.false;
      });

      it('should return true if feature flag is enabled', () => {
        isEnabledStub.returns(true);

        expect(showDisclaimer.show()).to.be.true;
      });
    });
  });
});
