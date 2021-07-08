import chai from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import AttributesUtil from '../disclaimer-attributes-util';
import Disclaimer from '../disclaimer';

const expect = chai.expect;

describe('Disclaimer for picasso charts', () => {
  let disclaimer;
  let applyAttributesStub;
  let attributes;

  const config = [
    {
      label: 'DisclaimerOne',
      default: true,
    },
    {
      label: 'DisclaimerTwo',
      default: false,
    },
  ];

  // function createChartElement(attributes) {
  //   const $testScope = qvangular.$rootScope.$new(true);
  //   const parent = $(qvangular.getService('$compile')('<div></div>')($testScope));
  //   parent.append("<div class='chart'></div>");
  //   const element = parent.children('.chart');
  //   disclaimer.set(attributes);
  //   disclaimer.display(element);
  //   return parent;
  // }

  beforeEach(() => {
    disclaimer = new Disclaimer({});
    attributes = {
      options: {
        paddingBottom: false,
      },
    };
  });

  it('should apply defaults for supported disclaimers', () => {
    const supportedDisclaimers = Disclaimer._applyDefaultSupport({}, config);
    expect(supportedDisclaimers.DisclaimerOne).to.be.true;
    expect(supportedDisclaimers.DisclaimerTwo).to.be.false;
  });

  it('should throw an error if calling set without any attributes', () => {
    expect(() => {
      disclaimer.set();
    }).to.throw(Disclaimer.ERRORS.SET);
  });

  it('should call applyAttributes in utility', () => {
    applyAttributesStub = sinon.stub(AttributesUtil, 'applyAttributes').returns({});
    disclaimer.set({});
    expect(AttributesUtil.applyAttributes).to.have.been.called;
    applyAttributesStub.restore();
  });

  it('should display a centered disclaimer', () => {
    const dataAttributes = {
      NoDataExist: true,
    };
    applyAttributesStub = sinon.stub(AttributesUtil, 'applyAttributes').returns(dataAttributes);
    disclaimer.set(attributes);
    const component = disclaimer.getComponentSettings();
    expect(component?.layout?.dock).to.equal('center');
    applyAttributesStub.restore();
  });

  it('should display a bottom disclaimer', () => {
    const dataAttributes = {
      NegativeOrZeroValues: true,
    };
    attributes.supportedDisclaimers = {
      NegativeOrZeroValues: true,
    };
    applyAttributesStub = sinon.stub(AttributesUtil, 'applyAttributes').returns(dataAttributes);
    disclaimer.set(attributes);
    const component = disclaimer.getComponentSettings();
    expect(component?.layout?.dock).to.equal('bottom');
    applyAttributesStub.restore();
  });
});
