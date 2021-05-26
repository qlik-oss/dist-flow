import '../../../../../../test/unit/node-setup';
import sinon from 'sinon';
import { expect } from 'chai';
import Deferred from '../../../../core/utils/deferred';
import DerivedProperties from '../derived-properties';
import hash from '../hash/hash';
import save from '../save/save';
import inputValidator from '../input-validator/input-validator';

describe('derived properties', () => {
  const sandbox = sinon.createSandbox();

  function getValidSettings() {
    return {
      layout: {},
      properties: {},
      model: {},
      hashData: {},
      generateDerivedProperties() {},
    };
  }

  let derivedProperties;

  beforeEach(() => {
    derivedProperties = new DerivedProperties();

    // Create the spies used in later tests
    sandbox.spy(inputValidator, 'validate');
    sandbox.spy(hash, 'updateHash');
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should have 'private' state indicating if generation is in progress", () => {
    expect(derivedProperties._generationInProgress).to.be.a('boolean');
    expect(derivedProperties._generationInProgress).to.equal(false);
  });

  describe('isDerivedUpToDate', () => {
    it('should validate input', () => {
      const settings = getValidSettings();

      derivedProperties.isDerivedUpToDate(settings);

      expect(inputValidator.validate.called).to.be.true;
    });

    it('should return false when there is no hashCode', () => {
      const settings = getValidSettings();

      // Missing qUndoExclude property
      expect(derivedProperties.isDerivedUpToDate(settings)).to.be.false;

      // Missing qUndoExclude.hashCode property
      settings.properties.qUndoExclude = {};
      expect(derivedProperties.isDerivedUpToDate(settings)).to.be.false;
    });

    it('should return false when the hashCode is wrong', () => {
      const settings = getValidSettings();

      settings.hashData = [
        {
          something: 'fake data',
        },
      ];

      settings.properties.qUndoExclude = {
        hashCode: 'This is not the correct hashCode',
      };

      expect(derivedProperties.isDerivedUpToDate(settings)).to.be.false;
    });

    it('should return true when the hashCode is correct', () => {
      const settings = getValidSettings();

      settings.hashData = [
        {
          something: 'fake data',
        },
      ];

      settings.properties.qUndoExclude = {
        hashCode: hash.generateHash(settings.hashData),
      };

      expect(derivedProperties.isDerivedUpToDate(settings)).to.be.true;
    });
  });

  describe('updateDerivedProperties', () => {
    it('should validate input', () => {
      const settings = getValidSettings();

      derivedProperties.isDerivedUpToDate(settings);

      expect(inputValidator.validate.called).to.be.true;
    });

    it('should not call not generate new properties if there already is a generation in progress', () => {
      const settings = getValidSettings();

      settings.generateDerivedProperties = sinon.spy();

      derivedProperties._generationInProgress = true;

      const returnValue = derivedProperties.updateDerivedProperties(settings);

      // Verify that neither of these following functions have been called
      expect(hash.updateHash.notCalled).to.be.true;
      expect(settings.generateDerivedProperties.notCalled).to.be.true;

      // Verify that we get a promise back
      expect(returnValue.then).to.be.a('function');
    });

    it('should call the supplied generateDerivedProperties function with layout and properties', () => {
      const settings = getValidSettings();
      const generateDfd = new Deferred();

      settings.generateDerivedProperties = sinon.stub().returns(generateDfd.promise);

      derivedProperties.updateDerivedProperties(settings);

      // These should have been called
      expect(hash.updateHash.called).to.be.true;

      // Check that it got the correct arguments
      expect(settings.generateDerivedProperties.called).to.be.true;
      expect(settings.generateDerivedProperties.args[0][0]).to.equal(settings.layout);
      expect(settings.generateDerivedProperties.args[0][1]).to.equal(settings.properties);
    });

    it("should update 'private' state indicating if generation is in progress", () => {
      const settings = getValidSettings();
      const generateDfd = new Deferred();
      const saveDfd = new Deferred();

      settings.generateDerivedProperties = sinon.stub().returns(generateDfd.promise);
      sandbox.stub(save, 'saveDerivedProperties').returns(saveDfd.promise);

      // Make sure it's false to start with
      expect(derivedProperties._generationInProgress).to.be.false;

      // Should be true now that we are at the generation step
      derivedProperties.updateDerivedProperties(settings);
      expect(derivedProperties._generationInProgress).to.be.true;

      // Should be true now that we are at the save step
      generateDfd.resolve();
      window.flush();
      expect(derivedProperties._generationInProgress).to.be.true;

      // Should be false now that we have generated and saved the properties
      saveDfd.resolve();
      window.flush();
      expect(derivedProperties._generationInProgress).to.be.false;
    });
  });
});
