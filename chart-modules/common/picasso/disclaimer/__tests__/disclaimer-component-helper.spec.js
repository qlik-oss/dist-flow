import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import DisclaimerComponentHelper from '../disclaimer-component-helper';

const expect = chai.expect;

describe('Disclaimer component helper', () => {
  let helper;
  let dataAttributes;
  let supportedDisclaimers;
  let config;
  let translator;

  beforeEach(() => {
    dataAttributes = {
      DisclaimerOne: false,
      DisclaimerTwo: false,
    };
    supportedDisclaimers = {
      DisclaimerOne: false,
      DisclaimerTwo: false,
    };
    config = [
      {
        label: 'DisclaimerOne',
        alignment: 0,
        default: true,
      },
      {
        label: 'DisclaimerTwo',
        alignment: 1,
        default: false,
      },
      {
        label: 'DisclaimerThree',
        alignment: 0,
        default: false,
      },
    ];
    translator = {
      get() {
        return 'translated string';
      },
    };
    helper = new DisclaimerComponentHelper(config, dataAttributes, supportedDisclaimers);
  });

  it('should be invalid if alignment is not set', () => {
    expect(helper.isValidAndSupported(config[0])).to.be.false;
  });

  it('should be invalid if dataAttributes is not set', () => {
    expect(helper.isValidAndSupported(config[0]), 0).to.be.false;
  });

  it('should be valid if dataAttributes is set, is default supported, for alignment', () => {
    dataAttributes.DisclaimerOne = true;
    expect(helper.isValidAndSupported(config[0], 0)).to.be.true;
  });

  it('should be invalid if dataAttributes is set, is not default supported, is not explicitly supported', () => {
    dataAttributes.DisclaimerTwo = true;
    expect(helper.isValidAndSupported(config[1], 1)).to.be.false;
  });

  it('should be valid if dataAttributes is set, is not default supported, but is explicitly supported, for alignment', () => {
    dataAttributes.DisclaimerTwo = true;
    supportedDisclaimers.DisclaimerTwo = true;
    expect(helper.isValidAndSupported(config[1], 1)).to.be.true;
  });

  it('should be invalid if dataAttributes is set, is not default supported, but is explicitly supported, but alignment is incorrect', () => {
    dataAttributes.DisclaimerTwo = true;
    supportedDisclaimers.DisclaimerTwo = true;
    expect(helper.isValidAndSupported(config[1], -1)).to.be.false;
  });

  it('should identify valid disclaimers for an alignment', () => {
    const key = 'DisclaimerOne';
    dataAttributes[key] = true;
    expect(helper.isAnyValidDisclaimer(0)).to.be.true;
  });

  it('should identify no valid disclaimers for an alignment', () => {
    expect(helper.isAnyValidDisclaimer(0)).to.be.false;
  });

  it('should identify no valid disclaimers for a non-valid alignment', () => {
    const key = 'DisclaimerOne';
    dataAttributes[key] = true;
    expect(helper.isAnyValidDisclaimer(-1)).to.be.false;
  });

  it('should get disclaimer messages for an alignment', () => {
    dataAttributes.DisclaimerOne = true;
    dataAttributes.DisclaimerThree = true;
    supportedDisclaimers.DisclaimerThree = true;
    expect(helper.getMessage(0, translator)).to.equal('translated string translated string ');
  });

  it('should not get disclaimer message if none are valid', () => {
    expect(helper.getMessage(0, translator)).to.equal('');
  });
});
