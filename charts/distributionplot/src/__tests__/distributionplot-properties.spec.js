
import chai from 'chai';
import sinon from 'sinon';
import distributionplotProperties from '../distributionplot-properties';
import * as featureFlags from '../../../../services/feature-flags';

const expect = chai.expect;
let sandbox;
let isEnabledStub;

describe('distributionplot-properties', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    isEnabledStub = sandbox.stub(featureFlags, 'isEnabled').returns(true);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('general', () => {
    const general = distributionplotProperties.items.settings.items.general;
    const showDisclaimer = general.items.showDisclaimer;

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
