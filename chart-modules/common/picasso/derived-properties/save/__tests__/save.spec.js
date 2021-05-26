import '../../../../../../../test/unit/node-setup';
import sinon from 'sinon';
import { expect } from 'chai';
import SoftPropertyHandler from '../../../../../client/soft-property-panel/soft-property-handler';
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
    });

    afterEach(() => {
      sandbox.verifyAndRestore();
    });

    it('should store the properties as soft properties if the user lacks update permission', () => {
      model.app.layout.permissions.update = false;
      layout.qHasSoftPatches = false;
      layout.qExtendsId = '';

      save.saveDerivedProperties(model, layout, properties, prevProperties, mockedState);

      expect(model.setProperties.notCalled).to.be.true;
      expect(SoftPropertyHandler.prototype.saveSoftProperties.calledWithExactly(prevProperties, properties));
    });

    it('should store the properties as soft properties if it have soft patches', () => {
      layout.qHasSoftPatches = true;
      model.app.layout.permissions = true;
      layout.qExtendsId = '';

      save.saveDerivedProperties(model, layout, properties, prevProperties, mockedState);

      expect(model.setProperties.notCalled).to.be.true;
      expect(SoftPropertyHandler.prototype.saveSoftProperties.calledWithExactly(prevProperties, properties));
    });

    it("should store the properties as soft properties if it's a master item", () => {
      // This this test was added after the discovery of SUI-1363
      layout.qExtendsId = 'QWERTY';
      model.app.layout.permissions = true;
      layout.qHasSoftPatches = false;

      save.saveDerivedProperties(model, layout, properties, prevProperties, mockedState);

      expect(model.setProperties.notCalled).to.be.true;
      expect(SoftPropertyHandler.prototype.saveSoftProperties.calledWithExactly(prevProperties, properties));
    });
  });
});
