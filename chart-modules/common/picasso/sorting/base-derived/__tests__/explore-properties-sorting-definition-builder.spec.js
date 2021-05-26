import '../../../../../../../test/unit/node-setup';

import chai from 'chai';
import sinon from 'sinon';
import sortingDefinitionBuilder from '../explore-properties-sorting-definition-builder';

const expect = chai.expect;
let sandbox;

describe('explore-properties-sorting-definition-builder', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.reset();
  });

  it('should expose the correct api', () => {
    expect(Object.keys(sortingDefinitionBuilder).length).to.equal(1);
    expect(sortingDefinitionBuilder).to.have.keys(['buildDefinition']);
  });

  describe('buildDefinition', () => {
    let getSettingsStub;
    let getElementIdsStub;
    let definition;

    beforeEach(() => {
      getSettingsStub = sandbox.stub().returns({
        ELEMENT: 'Anoto',
      });

      getElementIdsStub = sandbox.stub().returns(['H&M', 'Anoto', 'Tethys']);

      definition = sortingDefinitionBuilder.buildDefinition(
        'qHyperCubeDef',
        'sorting',
        'qUndoExclude.qDimensions.0',
        getSettingsStub,
        getElementIdsStub
      );
    });

    it('should return correct definition', () => {
      expect(definition.type, 'type').to.equal('items');
      expect(definition.translation, 'translation').to.equal('properties.sorting');
      expect(definition.icon, 'icon').to.equal('ascending');

      expect(definition.show, 'show').to.be.a('Function');

      const sortingOptions = definition.items.sortingOptions;

      expect(sortingOptions.component, 'items.sortingOptions.component').to.equal('radio-list');
      expect(sortingOptions.type, 'items.sortingOptions.type').to.equal('number');

      expect(sortingOptions.diffs, 'items.sortingOptions.diffs').to.deep.equal([
        'qUndoExclude.qDimensions.0.qDef.qSortCriterias.0.qSortByExpression',
        'qUndoExclude.qDimensions.0.qDef.qSortCriterias.0.qSortByNumeric',
        'qUndoExclude.qDimensions.0.qDef.qSortCriterias.0.qSortByAscii',
      ]);

      expect(sortingOptions.options, 'items.sortingOptions.options').to.deep.equal([
        {
          value: 1,
          translation: 'properties.sorting.ascending',
        },
        {
          value: -1,
          translation: 'properties.sorting.descending',
        },
      ]);

      expect(sortingOptions.setPropertyValue, 'items.sortingOptions.setPropertyValue').to.be.a('Function');

      expect(sortingOptions.setPropertyValue, 'items.sortingOptions.getValue').to.be.a('Function');
    });

    describe('returned definition', () => {
      let data;
      let args;
      let chartSorting;
      let dimensionSortCriteria;
      let sortingOptions;

      beforeEach(() => {
        data = {
          qHyperCubeDef: {
            qDimensions: [],
          },
          sorting: {},
          qUndoExclude: {
            qDimensions: [
              {
                qDef: {
                  qSortCriterias: [{}],
                },
              },
            ],
          },
        };

        args = {
          layout: {
            boxplotDef: {
              qHyperCube: {
                qDimensionInfo: [{}, {}],
              },
            },
          },
        };

        chartSorting = data.sorting;

        dimensionSortCriteria = data.qUndoExclude.qDimensions[0].qDef.qSortCriterias[0];

        sortingOptions = definition.items.sortingOptions;
      });

      describe('show', () => {
        it('should return false if does not have multiple dimensions', () => {
          expect(definition.show(data), 'No dimensions').to.be.false;

          data.qHyperCubeDef.qDimensions.push({});

          expect(definition.show(data), 'Single dimension').to.be.false;
        });

        it('should return true if has multiple dimensions', () => {
          data.qHyperCubeDef.qDimensions.push({});
          data.qHyperCubeDef.qDimensions.push({});

          const result = definition.show(data);

          expect(result).to.be.true;
        });
      });

      describe('setPropertyValue', () => {
        it('should update chartSorting.sortCriteria.sortByExpression correctly when dimension uses qSortByExpression', () => {
          dimensionSortCriteria.qSortByExpression = 1;

          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByExpression).to.equal(-1);

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.sortCriteria.sortByExpression).to.equal(1);
        });

        it('should update chartSorting.sortCriteria.sortByNumeric correctly when dimension uses qSortByNumeric and not qSortByExpression', () => {
          dimensionSortCriteria.qSortByNumeric = 1;

          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByNumeric).to.equal(-1);

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.sortCriteria.sortByNumeric).to.equal(1);
        });

        it('should update chartSorting.sortCriteria.sortByAscii correctly when dimension uses qSortByAscii and not qSortByExpression or qSortByNumeric', () => {
          dimensionSortCriteria.qSortByAscii = 1;

          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByAscii).to.equal(-1);

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.sortCriteria.sortByAscii).to.equal(1);
        });

        it('should fall back and update chartSorting.sortCriteria.sortByAscii correctly when dimension not using qSortByExpression, qSortByNumeric or qSortByAscii', () => {
          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByAscii).to.equal(-1);

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.sortCriteria.sortByAscii).to.equal(1);
        });

        it('should set chartSorting.sortCriteria.sortByExpression to 0 if dimension uses qSortByNumeric', () => {
          dimensionSortCriteria.qSortByNumeric = 1;

          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByExpression).to.equal(0);
        });

        it('should set chartSorting.sortCriteria.sortByExpression to 0 if dimension uses qSortByAscii', () => {
          dimensionSortCriteria.qSortByAscii = 1;

          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByExpression).to.equal(0);
        });

        it('should set chartSorting.sortCriteria.sortByNumeric to 0 if dimension uses qSortByAscii', () => {
          dimensionSortCriteria.qSortByAscii = 1;

          sortingOptions.setPropertyValue(data, -1, args);

          expect(chartSorting.sortCriteria.sortByNumeric).to.equal(0);
        });

        it('should create chartSorting.sortCriteria if missing', () => {
          delete chartSorting.sortCriteria;

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.sortCriteria).to.be.an('object');
        });

        it('should update chartSorting.elementId correctly when is autoSort and retrieved settings contains element', () => {
          chartSorting.autoSort = true;

          getSettingsStub.returns({
            ELEMENT: 'Tokmanni',
          });

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.elementId).to.equal('Tokmanni');
        });

        it('should update chartSorting.elementId correctly when is autoSort and retrieved settings does not contain element', () => {
          chartSorting.autoSort = true;

          getSettingsStub.returns({
            ELEMENT: undefined,
          });

          getElementIdsStub.returns(['Investor', 'Tokmanni']);

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.elementId).to.equal('Investor');
        });

        it('should not update chartSorting.elementId if is not autoSort', () => {
          chartSorting.autoSort = false;
          chartSorting.elementId = 'Protector';

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.elementId).to.equal('Protector');
        });

        it('should set chartSorting.autoSort to false', () => {
          chartSorting.autoSort = true;

          sortingOptions.setPropertyValue(data, 1, args);

          expect(chartSorting.autoSort).to.be.false;
        });
      });

      describe('getValue', () => {
        it('should return 0 if no current dimension sort property', () => {
          const result = sortingOptions.getValue(data);

          expect(result).to.equal(0);
        });

        it('should return correct value if current dimension has sort property', () => {
          dimensionSortCriteria.qSortByExpression = 1;
          dimensionSortCriteria.qSortByNumeric = 2;
          dimensionSortCriteria.qSortByAscii = 3;

          expect(sortingOptions.getValue(data), 'qSortByExpression, qSortByNumeric and qSortByAscii').to.equal(1);

          delete dimensionSortCriteria.qSortByExpression;

          expect(sortingOptions.getValue(data), 'qSortByNumeric and qSortByAscii').to.equal(2);

          delete dimensionSortCriteria.qSortByNumeric;

          expect(sortingOptions.getValue(data), 'qSortByAscii').to.equal(3);
        });
      });
    });
  });
});
