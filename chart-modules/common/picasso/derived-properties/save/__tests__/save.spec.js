import sinon from 'sinon';
import { expect } from 'chai';
import SoftPropertyHandler from '../../../../extra/soft-property-handler';
import hardPropertiesChecker from '../../../../extra/hard-properties-checker';
import save from '../save';

describe('derived properties save', () => {
  const sandbox = sinon.createSandbox();

  describe('saveDerivedProperties', () => {
    let layout;
    const model = { app: { layout: { permissions: {} } } };

    const properties = {
      something: true,
    };

    const prevProperties = {
      something: false,
    };

    const mockedState = {
      Views: {
        sheet: 1,
      },
      view: 0,
      model: {
        layout: {
          permissions: {
            update: false,
          },
        },
      },
    };

    beforeEach(() => {
      layout = {
        qHasSoftPatches: false,
      };

      model.setProperties = sinon.spy();
      model.app.layout.permissions = {
        update: true,
      };

      sandbox.stub(SoftPropertyHandler.prototype, 'saveSoftProperties');
      sandbox.stub(hardPropertiesChecker, 'canModifyHardProperties');
    });

    afterEach(() => {
      sandbox.verifyAndRestore();
    });

    it('should store the properties as soft properties if the properties can not be modified', () => {
      hardPropertiesChecker.canModifyHardProperties.returns(false);

      save.saveDerivedProperties(model, layout, properties, prevProperties, mockedState);

      expect(model.setProperties.notCalled).to.be.true;
      expect(SoftPropertyHandler.prototype.saveSoftProperties.calledWithExactly(prevProperties, properties));
    });
  });
});
