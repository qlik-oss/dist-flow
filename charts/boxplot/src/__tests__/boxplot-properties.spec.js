
import chai from 'chai';
import sinon from 'sinon';
import boxplotProperties from '../boxplot-properties';
import boxplotSorter from '../sorting/boxplot-sorter';
import settingsRetriever from '../sorting/boxplot-sorting-settings-retriever';
import elementsRetriever from '../sorting/boxplot-sorting-elements-retriever';
import * as featureFlags from '../../../../services/feature-flags';

const expect = chai.expect;
let sandbox;
const returnedSettings = {};
const returnedElements = [{}];
let isEnabledStub;

describe('boxplot-properties', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();

    boxplotSorter.applySorting = sandbox.spy();

    sandbox.stub(settingsRetriever, 'getSettings').callsFake(() => returnedSettings);

    sandbox.stub(elementsRetriever, 'getElements').callsFake(() => returnedElements);

    sandbox.stub(Promise, 'reject');

    sandbox.stub(Promise, 'resolve');

    isEnabledStub = sandbox.stub(featureFlags, 'isEnabled').returns(true);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('sorting', () => {
    const sorting = boxplotProperties.items.sorting;

    describe('autoSort', () => {
      const autoSort = sorting.items.autoSort;

      it('should use correct ref', () => {
        expect(autoSort.ref).to.equal('boxplotDef.sorting.autoSort');
      });

      describe('show', () => {
        it('shold return false if not multiple dimensions', () => {
          const properties = {
            boxplotDef: {
              qHyperCubeDef: {
                qDimensions: [{}],
              },
            },
          };

          const result = autoSort.show(properties);

          expect(result).to.be.false;
        });

        it('should return true if multiple dimensions', () => {
          const properties = {
            boxplotDef: {
              qHyperCubeDef: {
                qDimensions: [{}, {}],
              },
            },
          };

          const result = autoSort.show(properties);

          expect(result).to.be.true;
        });
      });

      describe('change', () => {
        it('should call boxplot-sorting-service.applySorting with correct arguments', () => {
          const properties = {};

          const args = {
            layout: {},
          };

          autoSort.change({}, {}, properties, args);

          expect(boxplotSorter.applySorting.calledOnce, 'boxplotSorter.applySorting call count').to.be.true;
          expect(
            boxplotSorter.applySorting.calledWithExactly(properties, args.layout),
            'boxplotSorter.applySorting arguments'
          ).to.be.true;
        });
      });
    });

    describe('sorting-items', () => {
      describe('show', () => {
        it('shold return false if not multiple dimensions', () => {
          const properties = {
            boxplotDef: {
              qHyperCubeDef: {
                qDimensions: [{}],
              },
            },
          };

          const result = sorting.items.sortingItems.show(properties);

          expect(result).to.be.false;
        });

        it('shold return false if multiple dimensions but autoSort is on', () => {
          const properties = {
            boxplotDef: {
              sorting: {
                autoSort: true,
              },
              qHyperCubeDef: {
                qDimensions: [{}, {}],
              },
            },
          };

          const result = sorting.items.sortingItems.show(properties);

          expect(result).to.be.false;
        });

        it('should return true if multiple dimensions and autoSort is off', () => {
          const properties = {
            boxplotDef: {
              sorting: {
                autoSort: false,
              },
              qHyperCubeDef: {
                qDimensions: [{}, {}],
              },
            },
          };

          const result = sorting.items.sortingItems.show(properties);

          expect(result).to.be.true;
        });
      });

      describe('expression', () => {
        const expressionItems = sorting.items.sortingItems.items.expression.items;

        describe('toggled', () => {
          it('should use correct ref', () => {
            expect(expressionItems.toggled.ref).to.equal('boxplotDef.sorting.sortCriteria.sortByExpression');
          });
        });

        describe('sortByElement', () => {
          it('should use correct expression ref', () => {
            expect(expressionItems.sortByElement.expressionRef).to.equal('boxplotDef.sorting.expression');
          });

          it('should use correct element ref', () => {
            expect(expressionItems.sortByElement.elementRef).to.equal('boxplotDef.sorting.elementId');
          });

          describe('show', () => {
            it('should return correct value', () => {
              const properties = {
                boxplotDef: {
                  sorting: {
                    sortCriteria: {},
                  },
                },
              };

              properties.boxplotDef.sorting.sortCriteria.sortByExpression = 0;
              expect(expressionItems.sortByElement.show(properties)).to.be.false;

              properties.boxplotDef.sorting.sortCriteria.sortByExpression = 1;
              expect(expressionItems.sortByElement.show(properties)).to.be.true;

              properties.boxplotDef.sorting.sortCriteria.sortByExpression = -1;
              expect(expressionItems.sortByElement.show(properties)).to.be.true;
            });
          });

          describe('elements', () => {
            it('should reject promise if qUndoExclude or qUndoExclude.hashCode is missing', () => {
              const args = {
                properties: {},
              };

              expressionItems.sortByElement.elements(args);

              expect(Promise.reject.calledOnce, 'no qUndoExclude').to.be.true;

              args.properties.qUndoExclude = {};

              Promise.reject.reset();

              expressionItems.sortByElement.elements(args);

              expect(Promise.reject.calledOnce, 'no qUndoExclude.hashCode').to.be.true;
            });

            it('should call boxplot-sorting-elements-retriever.getElements with correct arguments', () => {
              const measures = [];

              const args = {
                properties: {
                  qUndoExclude: {
                    hashCode: 123,
                    box: {
                      qHyperCubeDef: {
                        qMeasures: measures,
                      },
                    },
                  },
                },
                layout: {
                  boxplotDef: {
                    qHyperCube: {
                      qDimensionInfo: [
                        {},
                        {
                          qCardinal: 42,
                        },
                      ],
                    },
                  },
                },
              };

              expressionItems.sortByElement.elements(args);

              expect(elementsRetriever.getElements.calledOnce, 'elementsRetriever.getElements call count').to.be.true;
              expect(
                elementsRetriever.getElements.calledWithExactly(args.properties, returnedSettings),
                'calledWithExactly'
              ).to.be.true;
            });

            it('should resolve promise with the elements received from boxplotSorter.getElements', () => {
              const measures = [];

              const args = {
                properties: {
                  qUndoExclude: {
                    hashCode: 123,
                    box: {
                      qHyperCubeDef: {
                        qMeasures: measures,
                      },
                    },
                  },
                },
                layout: {
                  boxplotDef: {
                    qHyperCube: {
                      qDimensionInfo: [
                        {},
                        {
                          qCardinal: 42,
                        },
                      ],
                    },
                  },
                },
              };

              expressionItems.sortByElement.elements(args);

              expect(Promise.resolve.calledOnce, 'calledOnce').to.be.true;
              expect(Promise.resolve.calledWithExactly(returnedElements), 'calledWithExactly').to.be.true;
            });
          });
        });

        describe('order', () => {
          it('should use correct ref', () => {
            expect(expressionItems.order.ref).to.equal('boxplotDef.sorting.sortCriteria.sortByExpression');
          });

          describe('show', () => {
            it('should return correct value', () => {
              const properties = {
                boxplotDef: {
                  sorting: {
                    sortCriteria: {},
                  },
                },
              };

              properties.boxplotDef.sorting.sortCriteria.sortByExpression = 0;
              expect(expressionItems.order.show(properties)).to.be.false;

              properties.boxplotDef.sorting.sortCriteria.sortByExpression = 1;
              expect(expressionItems.order.show(properties)).to.be.true;

              properties.boxplotDef.sorting.sortCriteria.sortByExpression = -1;
              expect(expressionItems.order.show(properties)).to.be.true;
            });
          });
        });
      });

      describe('numeric', () => {
        const numericItems = sorting.items.sortingItems.items.numeric.items;

        describe('numericToggled', () => {
          it('should use correct ref', () => {
            expect(numericItems.toggled.ref).to.equal('boxplotDef.sorting.sortCriteria.sortByNumeric');
          });
        });

        describe('numericOrder', () => {
          it('should use correct ref', () => {
            expect(numericItems.order.ref).to.equal('boxplotDef.sorting.sortCriteria.sortByNumeric');
          });

          describe('show', () => {
            it('should return correct value', () => {
              const properties = {
                boxplotDef: {
                  sorting: {
                    sortCriteria: {},
                  },
                },
              };

              properties.boxplotDef.sorting.sortCriteria.sortByNumeric = 0;
              expect(numericItems.order.show(properties)).to.be.false;

              properties.boxplotDef.sorting.sortCriteria.sortByNumeric = 1;
              expect(numericItems.order.show(properties)).to.be.true;

              properties.boxplotDef.sorting.sortCriteria.sortByNumeric = -1;
              expect(numericItems.order.show(properties)).to.be.true;
            });
          });
        });
      });

      describe('ascii', () => {
        const asciiItems = sorting.items.sortingItems.items.ascii.items;

        describe('asciiToggled', () => {
          it('should use correct ref', () => {
            expect(asciiItems.toggled.ref).to.equal('boxplotDef.sorting.sortCriteria.sortByAscii');
          });
        });

        describe('asciiOrder', () => {
          it('should use correct ref', () => {
            expect(asciiItems.order.ref).to.equal('boxplotDef.sorting.sortCriteria.sortByAscii');
          });

          describe('show', () => {
            it('should return correct value', () => {
              const properties = {
                boxplotDef: {
                  sorting: {
                    sortCriteria: {},
                  },
                },
              };

              properties.boxplotDef.sorting.sortCriteria.sortByAscii = 0;
              expect(asciiItems.order.show(properties)).to.be.false;

              properties.boxplotDef.sorting.sortCriteria.sortByAscii = 1;
              expect(asciiItems.order.show(properties)).to.be.true;

              properties.boxplotDef.sorting.sortCriteria.sortByAscii = -1;
              expect(asciiItems.order.show(properties)).to.be.true;
            });
          });
        });
      });

      describe('default sort message', () => {
        const defaultSortMessage = sorting.items.sortingItems.items.defaultSortMessage;

        describe('show', () => {
          it('should return true if sortByExpression, sortByNumeric and sortByAscii are 0', () => {
            const properties = {
              boxplotDef: {
                sorting: {
                  sortCriteria: {
                    sortByExpression: 0,
                    sortByNumeric: 0,
                    sortByAscii: 0,
                  },
                },
              },
            };

            const result = defaultSortMessage.show(properties);

            expect(result).to.be.true;
          });

          it('should return false if sortByExpression, sortByNumeric and sortByAscii are not 0', () => {
            const combos = [
              {
                sortByExpression: -1,
                sortByNumeric: 0,
                sortByAscii: 0,
              },
              {
                sortByExpression: 1,
                sortByNumeric: 0,
                sortByAscii: 0,
              },
              {
                sortByExpression: 0,
                sortByNumeric: -1,
                sortByAscii: 0,
              },
              {
                sortByExpression: 0,
                sortByNumeric: 1,
                sortByAscii: 0,
              },
              {
                sortByExpression: 0,
                sortByNumeric: 0,
                sortByAscii: 1,
              },
              {
                sortByExpression: 0,
                sortByNumeric: 0,
                sortByAscii: -1,
              },
              {
                sortByExpression: 1,
                sortByNumeric: 1,
                sortByAscii: 0,
              },
              {
                sortByExpression: 0,
                sortByNumeric: 1,
                sortByAscii: 1,
              },
              {
                sortByExpression: -1,
                sortByAscii: -1,
              },
              {
                sortByNumeric: -1,
                sortByAscii: -1,
              },
            ];

            combos.forEach((combo, index) => {
              const properties = {
                boxplotDef: {
                  sorting: {
                    sortCriteria: combo,
                  },
                },
              };

              const result = defaultSortMessage.show(properties);

              expect(result, `Combo index ${index}`).to.be.false;
            });
          });
        });
      });
    });

    describe('no data', () => {
      const noData = sorting.items.noData;

      describe('show', () => {
        it('shold return true if not multiple dimensions', () => {
          const properties = {
            boxplotDef: {
              qHyperCubeDef: {
                qDimensions: [{}],
              },
            },
          };

          const result = noData.show(properties);

          expect(result).to.be.true;
        });

        it('should return false if multiple dimensions', () => {
          const properties = {
            boxplotDef: {
              qHyperCubeDef: {
                qDimensions: [{}, {}],
              },
            },
          };

          const result = noData.show(properties);

          expect(result).to.be.false;
        });
      });
    });
  });

  describe('general', () => {
    const general = boxplotProperties.items.settings.items.general;
    const showDisclaimer = general.items.showDisclaimer;

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
});
