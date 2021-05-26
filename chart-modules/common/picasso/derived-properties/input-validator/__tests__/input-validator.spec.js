import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import inputValidator from '../input-validator';

const expect = chai.expect;

describe('derived properties input validator', () => {
  function getValidSettings() {
    return {
      layout: {},
      properties: {},
      model: {},
      hashData: {},
      generateDerivedProperties() {},
    };
  }

  describe('validate', () => {
    const exceptionPattern = /Derived-properties: Missing input/;

    it('should throw error on empty input', () => {
      const fn = function () {
        inputValidator.validate();
      };

      expect(fn).to.throw(exceptionPattern);
    });

    it('should throw error on missing input', () => {
      let settings;

      const fn = function () {
        inputValidator.validate(settings);
      };

      // Test all combinations of missing one of the required inputs
      Object.keys(getValidSettings()).forEach((key) => {
        settings = getValidSettings();
        delete settings[key];

        expect(fn).to.throw(exceptionPattern);
      });
    });

    it('should not throw any exception given valid input', () => {
      // Make sure no errors are thrown with valid input
      const settings = getValidSettings();

      const fn = function () {
        inputValidator.validate(settings);
      };

      expect(fn).to.not.throw(exceptionPattern);
    });
  });
});
