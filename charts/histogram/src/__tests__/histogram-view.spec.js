import sinon from 'sinon';
import chai from 'chai';
import $ from 'jquery';
import derivedProperties from '@qlik/common/picasso/derived-properties/derived-properties';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import Histogram from '../histogram-view';
import generator from './hypercube-generator';

const expect = chai.expect;

describe('Histogram', () => {
  let histogram;
  let $element;
  let options;
  let backendApi;
  let selectionsApi;
  let tooltipApi;
  let properties;
  let lasso;
  let flags;
  let picasso;
  let translator;
  let theme;
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    $element = $("<div><div class='picasso-chart'></div></div>");
    options = {};
    properties = {
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ['Weight'],
            },
          },
        ],
      },
    };
    backendApi = {
      model: {
        getEffectiveProperties() {
          return Promise.resolve(properties);
        },
        setProperties() {
          return Promise.resolve();
        },
        layout: {
          qHyperCube: {
            qSize: {
              qcy: 500,
            },
            qDimensionInfo: [
              {
                qGroupPos: 0,
                qMin: 10,
                qMax: 75,
              },
            ],
            qMeasureInfo: [{}],
          },
          qUndoExclude: {
            box: generator.generateDataFromArray([
              ['d'], // field type
              ['Weight'], // label
              [75],
            ]),
          },
          bins: {
            auto: true,
            binCount: 10,
          },
          permissions: {
            update: true,
          },
          qHasSoftPatches: false,
        },
      },
      cacheCube: {
        setOptions() {},
      },
      setPath() {},
      updateCache() {},
    };
    selectionsApi = {
      clear: {
        bind() {},
      },
      watchDeactivated() {},
      watchActivated() {},
    };

    tooltipApi = {
      cancel() {},
      destroy() {},
    };

    lasso = null;
    flags = null;
    picasso = picassoSetup();
    translator = null;
    theme = null;

    histogram = new Histogram(
      lasso,
      flags,
      picasso,
      translator,
      theme,
      $element,
      options,
      backendApi,
      selectionsApi,
      tooltipApi
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  // TODO: Add test that makes sure the generator function is called from updateDerivedProperties

  describe('updateData', () => {
    it('should make sure the derived properties are up to date before getting data', async () => {
      sandbox.stub(derivedProperties.prototype, 'isDerivedUpToDate').returns(false);
      sandbox.stub(derivedProperties.prototype, 'updateDerivedProperties').returns(Promise.resolve());
      sandbox.spy(histogram, 'getData');

      await histogram.updateData(histogram.backendApi.model.layout);

      expect(derivedProperties.prototype.isDerivedUpToDate).to.have.been.called;
      expect(derivedProperties.prototype.updateDerivedProperties).to.have.been.called;
      expect(histogram.getData).to.not.have.been.called;
    });

    it('should get new data if the derived properties are up to date', async () => {
      sandbox.stub(derivedProperties.prototype, 'isDerivedUpToDate').returns(true);
      sandbox.stub(derivedProperties.prototype, 'updateDerivedProperties').returns(Promise.resolve());
      sandbox.stub(histogram, 'getData').returns(Promise.resolve());

      await histogram.updateData(histogram.backendApi.model.layout);
      const layout = histogram.backendApi.model.layout;

      expect(derivedProperties.prototype.isDerivedUpToDate).to.have.been.called;
      expect(derivedProperties.prototype.updateDerivedProperties).to.not.have.been.called;
      expect(histogram.getData).to.have.been.calledWith(histogram.backendApi, layout.qUndoExclude.box.qHyperCube, {
        height: layout.qHyperCube.qSize.qcy,
        width: 2,
      });
    });
  });
});
