import chai from 'chai';
import sinon from 'sinon';
import sorterFactory from '@qlik/common/picasso/sorting/base-derived/sorter-factory';
import sorterFacade from '@qlik/common/picasso/sorting/base-derived/sorter-facade';
import HyperCubeDefGenerator from '@qlik/common/picasso/hypercube-def-generator/hypercube-def-generator';
import distplotSorter from '../distributionplot-sorter';
import settingsRetriever from '../distributionplot-sorting-settings-retriever';
import elementsRetriever from '../distributionplot-sorting-elements-retriever';

const expect = chai.expect;
let sandbox;
let expressions;
let sorter;
let settings;
let elements;
let innerDimension;
let outerDimension;
let measures;
let properties;
let layout;
let app;

describe('distplot-sorting-service', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();

    expressions = {
      dimensions: ['Dim1', 'Dim2'],
      measures: ['Measure'],
    };

    sorter = {};

    settings = {
      ELEMENT: 'Varianto',
    };

    elements = [
      {
        id: '25',
      },
      {
        id: 'Varianto',
      },
    ];

    sandbox.stub(sorterFactory, 'create').callsFake(() => sorter);

    sandbox.stub(settingsRetriever, 'getSettings').callsFake(() => settings);

    sandbox.stub(elementsRetriever, 'getElements').callsFake(() => elements);

    sandbox.stub(HyperCubeDefGenerator, 'getAllHyperCubeExpressions').returns(Promise.resolve(expressions));

    sorterFacade.applySorting = sandbox.spy();

    innerDimension = {};
    outerDimension = {};

    measures = [];

    properties = {
      sorting: {},
      qUndoExclude: {
        qHyperCubeDef: {
          qDimensions: [outerDimension, innerDimension],
          qMeasures: measures,
        },
      },
      qHyperCubeDef: {
        qDimensions: [innerDimension, outerDimension],
        qMeasures: measures,
      },
    };

    layout = {};
    app = null;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should expose the correct api', () => {
    expect(Object.keys(distplotSorter).length).to.equal(1);
    expect(distplotSorter).to.have.keys(['applySorting']);
  });

  describe('applySorting', () => {
    it('should set correct qInterColumnSortOrder', async () => {
      properties.qUndoExclude.qHyperCubeDef.qDimensions = [{}, {}];

      await distplotSorter.applySorting(properties, layout, app);

      expect(properties.qUndoExclude.qHyperCubeDef.qInterColumnSortOrder, 'two dimensions').to.deep.equal([0, 2, 1]);

      properties.qUndoExclude.qHyperCubeDef.qDimensions.push({});

      await distplotSorter.applySorting(properties, layout, app);

      expect(properties.qUndoExclude.qHyperCubeDef.qInterColumnSortOrder, 'more than two dimensions').to.deep.equal([
        0,
        2,
        1,
      ]);

      properties.qUndoExclude.qHyperCubeDef.qDimensions = [{}];

      await distplotSorter.applySorting(properties, layout, app);

      expect(properties.qUndoExclude.qHyperCubeDef.qInterColumnSortOrder, 'less than two dimensions').to.deep.equal([
        1,
        0,
      ]);
    });

    it('should create sorter via sorterFactory', async () => {
      await distplotSorter.applySorting(properties, layout, app);

      expect(sorterFactory.create.calledOnce, 'call count').to.be.true;
    });

    it('should pass a function that returns correct settings as first argument to sorterFactory', async () => {
      await distplotSorter.applySorting(properties, layout, app);

      const firstSorterFactoryArg = sorterFactory.create.getCall(0).args[0];

      const returnedSettings = firstSorterFactoryArg();

      expect(returnedSettings, 'returned settings').to.equal(settings);
      expect(settingsRetriever.getSettings.calledWithExactly(layout)).to.be.true;
    });

    it('should pass a function that returns correct elements as second argument to sorterFactory', async () => {
      await distplotSorter.applySorting(properties, layout, app);

      const secondSorterFactoryArg = sorterFactory.create.getCall(0).args[1];

      const returnedElements = secondSorterFactoryArg();

      expect(returnedElements, 'returned elements').to.equal(elements);

      const getElementsArgs = elementsRetriever.getElements.getCall(0).args;
      const firstGetElementsArg = getElementsArgs[0];
      const secondGetElementsArg = getElementsArgs[1];
      const thirdGetElementsArg = getElementsArgs[2];

      expect(firstGetElementsArg).to.equal(expressions.measures);
      expect(secondGetElementsArg).to.equal(expressions.dimensions);
      expect(thirdGetElementsArg).to.equal(settings);
    });

    it('should call sorterFacade.applySorting with correct arguments', async () => {
      await distplotSorter.applySorting(properties, layout, app);

      expect(sorterFacade.applySorting.calledOnce, 'call count').to.be.true;

      const callArgs = sorterFacade.applySorting.getCall(0).args;

      expect(callArgs[0], 'argument sorter').to.equal(sorter);
      expect(callArgs[1], 'argument dimension').to.equal(outerDimension);
      expect(callArgs[2], 'argument chartSorting').to.equal(properties.sorting);
    });
  });
});
