import chai from 'chai';
import sinon from 'sinon';
import * as chartModules from 'qlik-chart-modules';
import boxplotPropertiesFn from '../boxplot-properties';
import boxplotSorter from '../sorting/boxplot-sorter';
import settingsRetriever from '../sorting/boxplot-sorting-settings-retriever';
import elementsRetriever from '../sorting/boxplot-sorting-elements-retriever';

const expect = chai.expect;
let sandbox;
const returnedSettings = {};
const returnedElements = [{}];
let isEnabledStub;

describe('boxplot-properties', () => {
  let boxplotProperties;
  let translator;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    boxplotSorter.applySorting = sandbox.spy();

    sandbox.stub(settingsRetriever, 'getSettings').callsFake(() => returnedSettings);

    sandbox.stub(elementsRetriever, 'getElements').callsFake(() => returnedElements);

    sandbox.stub(Promise, 'reject');

    sandbox.stub(Promise, 'resolve');

    isEnabledStub = sandbox.stub().returns(true);

    const flags = {
      isEnabled: isEnabledStub,
    };
    const theme = {};
    translator = {};
    const env = {
      anything: {
        sense: {
          theme,
        },
      },
      flags,
      translator,
    };
    boxplotProperties = boxplotPropertiesFn(env);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('sorting', () => {
    let sorting;
    beforeEach(() => {
      sorting = boxplotProperties.items.sorting;
    });

    describe('autoSort', () => {
      let autoSort;
      beforeEach(() => {
        autoSort = sorting.items.autoSort;
      });

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
            boxplotSorter.applySorting.calledWithExactly(properties, args.layout, translator),
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
        let expressionItems;
        beforeEach(() => {
          expressionItems = sorting.items.sortingItems.items.expression.items;
        });

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
                elementsRetriever.getElements.calledWithExactly(args.properties, returnedSettings, translator),
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
        let numericItems;
        beforeEach(() => {
          numericItems = sorting.items.sortingItems.items.numeric.items;
        });

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
        let asciiItems;
        beforeEach(() => {
          asciiItems = sorting.items.sortingItems.items.ascii.items;
        });

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
        let defaultSortMessage;
        beforeEach(() => {
          defaultSortMessage = sorting.items.sortingItems.items.defaultSortMessage;
        });

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
      let noData;
      beforeEach(() => {
        noData = sorting.items.noData;
      });

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
    let general;
    let showDisclaimer;
    beforeEach(() => {
      general = boxplotProperties.items.settings.items.general;
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
        expect(boxplotProperties.items.settings.items.measureAxis.items.startAt).to.have.all.keys([
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
        expect(boxplotProperties.items.settings.items.measureAxis.items.startAt.type).to.equal('string');
      });

      it('should have correct component', () => {
        expect(boxplotProperties.items.settings.items.measureAxis.items.startAt.component).to.equal('dropdown');
      });

      it('should have correct translation', () => {
        expect(boxplotProperties.items.settings.items.measureAxis.items.startAt.translation).to.equal(
          'properties.axis.startAt'
        );
      });

      describe('readOnly', () => {
        let readOnly;

        beforeEach(() => {
          ({ readOnly } = boxplotProperties.items.settings.items.measureAxis.items.startAt);
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
        expect(boxplotProperties.items.settings.items.measureAxis.items.startAt.defaultValue).to.equal('lowest');
      });

      describe('convertFunctions', () => {
        let get;
        let set;
        let args;
        sandbox = sinon.createSandbox();
        const definition = { type: 'string' };
        const getter = (type) => type;

        beforeEach(() => {
          sandbox.stub(chartModules, 'setValue');
          args = { properties: { measureAxis: { autoMinMax: true, min: '10' } } };
          ({ get, set } = boxplotProperties.items.settings.items.measureAxis.items.startAt.convertFunctions);
        });

        afterEach(() => {
          sandbox.restore();
        });

        describe('get', () => {
          it('should convert value to lowest when is autoMinMax', () => {
            expect(get(getter, definition, args)).to.equal('lowest');
          });

          it('should convert value to zero when is not autoMinMax, type is min and min is 0', () => {
            args = {
              properties: { measureAxis: { autoMinMax: false, minMax: 'min', min: 0 } },
            };
            expect(get(getter, definition, args)).to.equal('zero');
          });

          it('should return value from getter when is not autoMinMax and type is max', () => {
            args = {
              properties: {
                measureAxis: { autoMinMax: false, minMax: 'max', min: 0 },
              },
            };
            expect(get(getter, definition, args)).to.equal('string');
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
        expect(boxplotProperties.items.settings.items.measureAxis.items.startAt.classification).to.deep.equal({
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
        const args = {
          layout: {
            boxplotDef: {
              qHyperCube: {
                qDimensionInfo: [{ cId: '1' }, { cId: '2' }],
              },
            },
          },
        };

        expect(
          boxplotProperties.items.settings.items.dimensionAxis.items.dimensionAxisTitle.show(
            properties,
            undefined,
            args
          )
        ).to.be.true;
      });

      it('shoould return false when has 1 dimension', () => {
        const properties = {};
        const args = {
          layout: {
            boxplotDef: {
              qHyperCube: {
                qDimensionInfo: [{ cId: '1' }],
              },
            },
          },
        };

        expect(
          boxplotProperties.items.settings.items.dimensionAxis.items.dimensionAxisTitle.show(
            properties,
            undefined,
            args
          )
        ).to.be.false;
      });
    });

    describe('othersGroup', () => {
      describe('label', () => {
        it('should show lable orientation option when has more than 1 dimension', () => {
          const properties = {};
          const args = {
            layout: {
              boxplotDef: {
                qHyperCube: {
                  qDimensionInfo: [{ cId: '1' }, { cId: '2' }],
                },
              },
            },
          };

          expect(
            boxplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.label.show(
              properties,
              undefined,
              args
            )
          ).to.be.true;
        });

        it('should not show lable orientation option when has 1 dimension', () => {
          const properties = {};
          const args = {
            layout: {
              boxplotDef: {
                qHyperCube: {
                  qDimensionInfo: [{ cId: '1' }],
                },
              },
            },
          };

          expect(
            boxplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.label.show(
              properties,
              undefined,
              args
            )
          ).to.be.false;
        });
      });

      describe('dock', () => {
        it('should show lable orientation option when has more than 1 dimension', () => {
          const properties = {};
          const args = {
            layout: {
              boxplotDef: {
                qHyperCube: {
                  qDimensionInfo: [{ cId: '1' }, { cId: '2' }],
                },
              },
            },
          };

          expect(
            boxplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.dock.show(
              properties,
              undefined,
              args
            )
          ).to.be.true;
        });

        it('should not show lable orientation option when has 1 dimension', () => {
          const properties = {};
          const args = {
            layout: {
              boxplotDef: {
                qHyperCube: {
                  qDimensionInfo: [{ cId: '1' }],
                },
              },
            },
          };

          expect(
            boxplotProperties.items.settings.items.dimensionAxis.items.othersGroup.items.dock.show(
              properties,
              undefined,
              args
            )
          ).to.be.false;
        });
      });
    });
  });
});
