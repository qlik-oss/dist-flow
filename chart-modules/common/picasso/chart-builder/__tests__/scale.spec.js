import chai from 'chai';
import scale from '../scale';

const expect = chai.expect;

describe('chart builder - scale', () => {
  let expectedDefaultSettings;

  beforeEach(() => {
    expectedDefaultSettings = {
      name: 'scale',
      component: {
        invert: false,
        minorTicks: {
          count: 1,
        },
        trackBy: 'id',
      },
    };
  });

  describe('scale', () => {
    it('should return scale settings with default values', () => {
      const scaleSettings = scale();

      expect(scaleSettings).to.deep.equal(expectedDefaultSettings);
    });

    it('should return new object', () => {
      const scaleSettings1 = scale();
      const scaleSettings2 = scale();

      expect(scaleSettings1).not.to.equal(scaleSettings2);
    });

    it('should use provided settings', () => {
      const settings = {
        name: 'tasseKATT',
        component: {
          invert: true,
          minorTicks: {
            count: 10,
          },
          dynamic: true,
          version: '1.0.5',
          range: null,
          domain: null,
          trackBy: 'id',
        },
      };

      const scaleSettings = scale(settings);

      expect(scaleSettings).to.deep.equal(settings);
    });

    describe('component.invert', () => {
      it('should be false if has no orientation and is not rtl', () => {
        const scaleSettings = scale(null, { isRtl: false });

        expect(scaleSettings.component.invert).to.be.false;
      });

      it('should be true if has no orientation and is rtl', () => {
        const scaleSettings = scale(null, { isRtl: true });

        expect(scaleSettings.component.invert).to.be.true;
      });

      it('should be false if is horizontal and is not rtl', () => {
        const scaleSettings = scale(null, { orientation: 'horizontal', isRtl: false });

        expect(scaleSettings.component.invert).to.be.false;
      });

      it('should be true if is horizontal and is rtl', () => {
        const scaleSettings = scale(null, { orientation: 'horizontal', isRtl: true });

        expect(scaleSettings.component.invert).to.be.true;
      });

      it('should be false if is vertical and is not rtl', () => {
        const scaleSettings = scale(null, { orientation: 'vertical', isRtl: false });

        expect(scaleSettings.component.invert).to.be.false;
      });

      it('should be false if is vertical and is rtl', () => {
        const scaleSettings = scale(null, { orientation: 'vertical', isRtl: true });

        expect(scaleSettings.component.invert).to.be.false;
      });
    });
  });

  describe('measureScale', () => {
    it('should return measure scale settings with default values', () => {
      expectedDefaultSettings.name = 'measure';
      expectedDefaultSettings.component.expand = 0.1;
      expectedDefaultSettings.component.invert = false;
      expectedDefaultSettings.component.data = { fields: [] };

      const measureScaleSettings = scale.measureScale();

      expect(measureScaleSettings).to.deep.equal(expectedDefaultSettings);
    });

    it('should return new object', () => {
      const measureScaleSettings1 = scale.measureScale();
      const measureScaleSettings2 = scale.measureScale();

      expect(measureScaleSettings1).not.to.equal(measureScaleSettings2);
    });

    it('should use provided settings', () => {
      const measureSettings = {
        name: 'tasseKATT',
        component: {
          data: {
            source: 'customHyperCube',
            fields: ['Shikari'],
          },
          expand: 0.5,
          invert: true,
          minorTicks: {
            count: 10,
          },
          dynamic: true,
          version: '1.0.5',
          range: null,
          domain: null,
          trackBy: 'id',
        },
      };

      const measureScaleSettings = scale.measureScale(measureSettings);

      expect(measureScaleSettings).to.deep.equal(measureSettings);
    });

    describe('component.source', () => {
      it('should be set from options', () => {
        const measureScaleSettings = scale.measureScale(null, { source: 'Shikari' });

        expect(measureScaleSettings.component.data.fields[0].field).to.equal('Shikari');
      });

      it('should support an array as source', () => {
        const measureScaleSettings = scale.measureScale(null, { source: ['Shikari', 'Other field'] });

        expect(measureScaleSettings.component.data.fields[0].field).to.equal('Shikari');
        expect(measureScaleSettings.component.data.fields[1].field).to.equal('Other field');
      });
    });

    describe('component.invert', () => {
      it('should be false if has no orientation and is not rtl', () => {
        const measureScaleSettings = scale.measureScale(null, { isRtl: false });

        expect(measureScaleSettings.component.invert).to.be.false;
      });

      it('should be true if has no orientation and is rtl', () => {
        const measureScaleSettings = scale.measureScale(null, { isRtl: true });

        expect(measureScaleSettings.component.invert).to.be.true;
      });

      it('should be false if is horizontal and is not rtl', () => {
        const measureScaleSettings = scale.measureScale(null, { orientation: 'horizontal', isRtl: false });

        expect(measureScaleSettings.component.invert).to.be.false;
      });

      it('should be true if is horizontal and is rtl', () => {
        const measureScaleSettings = scale.measureScale(null, { orientation: 'horizontal', isRtl: true });

        expect(measureScaleSettings.component.invert).to.be.true;
      });

      it('should be true if is vertical and is not rtl', () => {
        const measureScaleSettings = scale.measureScale(null, { orientation: 'vertical', isRtl: false });

        expect(measureScaleSettings.component.invert).to.be.true;
      });

      it('should be true if is vertical and is rtl', () => {
        const measureScaleSettings = scale.measureScale(null, { orientation: 'vertical', isRtl: true });

        expect(measureScaleSettings.component.invert).to.be.true;
      });
    });

    describe('component.min', () => {
      it('should be set from options if is not autoMinMax and minMax is set to min', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: false,
            minMax: 'min',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.min).to.equal(42);
      });

      it('should be set from options if is not autoMinMax and minMax is set to minMax', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: false,
            minMax: 'minMax',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.min).to.equal(42);
      });

      it('should not be set from options if is not autoMinMax and minMax is set to max', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: false,
            minMax: 'max',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.min).to.be.undefined;
      });

      it('should not be set from options if is autoMinMax and minMax is set to min', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: true,
            minMax: 'min',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.min).to.be.undefined;
      });
    });

    describe('component.max', () => {
      it('should be set from options if is not autoMinMax and minMax is set to max', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: false,
            minMax: 'max',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.max).to.equal(99);
      });

      it('should be set from options if is not autoMinMax and minMax is set to minMax', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: false,
            minMax: 'minMax',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.max).to.equal(99);
      });

      it('should not be set from options if is not autoMinMax and minMax is set to min', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: false,
            minMax: 'min',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.max).to.be.undefined;
      });

      it('should not be set from options if is autoMinMax and minMax is set to max', () => {
        const measureScaleSettings = scale.measureScale(null, {
          measureAxisProperties: {
            autoMinMax: true,
            minMax: 'max',
            min: 42,
            max: 99,
          },
        });

        expect(measureScaleSettings.component.max).to.be.undefined;
      });
    });
  });

  describe('dimensionScale', () => {
    it('should return dimension scale settings with default values', () => {
      expectedDefaultSettings.name = 'dimension';
      expectedDefaultSettings.component.type = 'band';
      expectedDefaultSettings.component.trackBy = 'id';
      expectedDefaultSettings.component.data = {
        extract: {
          field: '',
        },
      };

      const dimensionScaleSettings = scale.dimensionScale();
      // remove function to make deep equals work
      delete dimensionScaleSettings.component.data.extract.value;
      delete dimensionScaleSettings.component.data.extract.props;
      delete dimensionScaleSettings.component.label;

      expect(dimensionScaleSettings).to.deep.equal(expectedDefaultSettings);
    });

    it('should return new object', () => {
      const dimensionScaleSettings1 = scale.dimensionScale();
      const dimensionScaleSettings2 = scale.dimensionScale();

      expect(dimensionScaleSettings1).not.to.equal(dimensionScaleSettings2);
    });

    it('should use provided settings', () => {
      const dimensionSettings = {
        name: 'tasseKATT',
        component: {
          data: {
            extract: {
              key: 'custom/qHyperCube',
              field: 'Shikari',
            },
          },
          type: 'plane',
          invert: true,
          minorTicks: {
            count: 10,
          },
          trackBy: 'id',
          dynamic: true,
          version: '1.0.5',
          range: null,
          domain: null,
        },
      };

      const dimensionScaleSettings = scale.dimensionScale(dimensionSettings);
      // remove function to make deep equals work
      delete dimensionScaleSettings.component.data.extract.value;
      delete dimensionScaleSettings.component.data.extract.props;
      delete dimensionScaleSettings.component.label;
      delete dimensionScaleSettings.component.value;

      expect(dimensionScaleSettings).to.deep.equal(dimensionSettings);
    });

    describe('component.source', () => {
      it('should be set from options', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { source: 'Shikari' });

        expect(dimensionScaleSettings.component.data.extract.field).to.equal('Shikari');
      });
    });

    describe('component.invert', () => {
      it('should be false if has no orientation and is not rtl', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { isRtl: false });

        expect(dimensionScaleSettings.component.invert).to.be.false;
      });

      it('should be true if has no orientation and is rtl', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { isRtl: true });

        expect(dimensionScaleSettings.component.invert).to.be.true;
      });

      it('should be false if is horizontal and is not rtl', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { orientation: 'horizontal', isRtl: false });

        expect(dimensionScaleSettings.component.invert).to.be.false;
      });

      it('should be true if is horizontal and is rtl', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { orientation: 'horizontal', isRtl: true });

        expect(dimensionScaleSettings.component.invert).to.be.true;
      });

      it('should be false if is vertical and is not rtl', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { orientation: 'vertical', isRtl: false });

        expect(dimensionScaleSettings.component.invert).to.be.false;
      });

      it('should be false if is vertical and is rtl', () => {
        const dimensionScaleSettings = scale.dimensionScale(null, { orientation: 'vertical', isRtl: true });

        expect(dimensionScaleSettings.component.invert).to.be.false;
      });
    });
  });
});
