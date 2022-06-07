import chai from 'chai';
import sinon from 'sinon';
import * as chartModules from 'qlik-chart-modules';
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

  describe('measureAxis', () => {
    describe('startAt', () => {
      it('should have correct properties', () => {
        expect(distributionplotProperties.items.settings.items.measureAxis.items.startAt).to.have.all.keys([
          'type',
          'component',
          'translation',
          'readOnly',
          'options',
          'defaultValue',
          'convertFunctions',
          'classification',
        ]);
      });

      it('should have correct type', () => {
        expect(distributionplotProperties.items.settings.items.measureAxis.items.startAt.type).to.equal('string');
      });

      it('should have correct component', () => {
        expect(distributionplotProperties.items.settings.items.measureAxis.items.startAt.component).to.equal(
          'dropdown'
        );
      });

      it('should have correct translation', () => {
        expect(distributionplotProperties.items.settings.items.measureAxis.items.startAt.translation).to.equal(
          'properties.axis.startAt'
        );
      });

      describe('readOnly', () => {
        let readOnly;

        beforeEach(() => {
          ({ readOnly } = distributionplotProperties.items.settings.items.measureAxis.items.startAt);
        });

        it('should have return true when has autoMinMax is false and not min type', () => {
          expect(readOnly({ measureAxis: { autoMinMax: false, minMax: 'max' } })).to.be.true;
        });

        it('should have return true when has autoMinMax is false and is min type, but min is not 0', () => {
          expect(readOnly({ measureAxis: { autoMinMax: false, minMax: 'min', min: 10 } })).to.be.true;
        });

        it('should have return false when has autoMinMax is false and is min type, but min is 0', () => {
          expect(readOnly({ measureAxis: { autoMinMax: false, minMax: 'min', min: 0 } })).to.be.false;
        });

        it('should have return false when has autoMinMax is true', () => {
          expect(readOnly({ measureAxis: { autoMinMax: true } })).to.be.false;
        });
      });

      it('should have correct defaultValue', () => {
        expect(distributionplotProperties.items.settings.items.measureAxis.items.startAt.defaultValue).to.equal(
          'lowest'
        );
      });

      describe('convertFunctions', () => {
        let get;
        let set;
        let data;
        sandbox = sinon.createSandbox();
        const definition = { type: 'string' };
        const getter = (type) => type;
        const args = {};

        beforeEach(() => {
          sandbox.stub(chartModules, 'setValue');
          data = { measureAxis: { autoMinMax: true, min: '10' } };
          ({ get, set } = distributionplotProperties.items.settings.items.measureAxis.items.startAt.convertFunctions);
        });

        afterEach(() => {
          sandbox.restore();
        });

        describe('get', () => {
          it('should convert value to lowest when is autoMinMax', () => {
            expect(get(getter, definition, args, data)).to.equal('lowest');
          });

          it('should convert value to zero when is not autoMinMax, type is min and min is 0', () => {
            data = { measureAxis: { autoMinMax: false, minMax: 'min', min: 0 } };
            expect(get(getter, definition, args, data)).to.equal('zero');
          });

          it('should return value from getter when is not autoMinMax and type is max', () => {
            data = { measureAxis: { autoMinMax: false, minMax: 'max', min: 0 } };
            expect(get(getter, definition, args, data)).to.equal('string');
          });
        });

        describe('set', () => {
          it('should call setValue three times with correct values when select start at as zero', () => {
            set('zero', undefined, definition, args, '');
            expect(chartModules.setValue).to.have.been.calledWith('', 'measureAxis.autoMinMax', false);
            expect(chartModules.setValue).to.have.been.calledWith('', 'measureAxis.minMax', 'min');
            expect(chartModules.setValue).to.have.been.calledWith('', 'measureAxis.min', 0);
          });

          it('should call setValue one time with correct values when select start at as lowest', () => {
            set('lowest', undefined, definition, args, '');
            expect(chartModules.setValue).to.have.been.calledWith('', 'measureAxis.autoMinMax', true);
          });
        });
      });

      it('should have correct classification', () => {
        expect(distributionplotProperties.items.settings.items.measureAxis.items.startAt.classification).to.deep.equal({
          section: 'axis',
          tags: ['simple'],
          exclusive: true,
        });
      });
    });
  });
  describe('dimensionAxis', () => {
    describe('dimensionAxisTitle', () => {
      it('shoould return ture when has more than 1 dimension', () => {
        const properties = {};
        const handler = {
          layout: {
            qHyperCube: {
              qDimensionInfo: [{ cId: '1' }, { cId: '2' }],
            },
          },
        };

        expect(
          distributionplotProperties.items.settings.items.dimensionAxis.items.dimensionAxisTitle.show(
            properties,
            handler
          )
        ).to.be.true;
      });

      it('shoould return false when has 1 dimension', () => {
        const properties = {};
        const handler = {
          layout: {
            qHyperCube: {
              qDimensionInfo: [{ cId: '1' }],
            },
          },
        };

        expect(
          distributionplotProperties.items.settings.items.dimensionAxis.items.dimensionAxisTitle.show(
            properties,
            handler
          )
        ).to.be.false;
      });
    });

    describe('othersGroup', () => {
      describe('label', () => {
        it('should show lable orientation option when has more than 1 dimension', () => {
          const properties = {};
          const handler = {
            layout: {
              qHyperCube: {
                qDimensionInfo: [{ cId: '1' }, { cId: '2' }],
              },
            },
          };

          expect(
            distributionplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.label.show(
              properties,
              handler
            )
          ).to.be.true;
        });

        it('should not show lable orientation option when has 1 dimension', () => {
          const properties = {};
          const handler = {
            layout: {
              boxplotDef: {
                qHyperCube: {
                  qDimensionInfo: [{ cId: '1' }],
                },
              },
            },
          };

          expect(
            distributionplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.label.show(
              properties,
              handler
            )
          ).to.be.false;
        });
      });

      describe('dock', () => {
        it('should show lable orientation option when has more than 1 dimension', () => {
          const properties = {};
          const handler = {
            layout: {
              qHyperCube: {
                qDimensionInfo: [{ cId: '1' }, { cId: '2' }],
              },
            },
          };

          expect(
            distributionplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.dock.show(
              properties,
              handler
            )
          ).to.be.true;
        });

        it('should not show lable orientation option when has 1 dimension', () => {
          const properties = {};
          const handler = {
            layout: {
              qHyperCube: {
                qDimensionInfo: [{ cId: '1' }],
              },
            },
          };

          expect(
            distributionplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.dock.show(
              properties,
              handler
            )
          ).to.be.false;
        });
      });
    });
  });
});
