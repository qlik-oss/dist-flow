import chai from 'chai';
import selectionUtils from '../selection-utils';

const expect = chai.expect;
let toggledOnValues;
let activeBrushes;
let brushMock;
let mockedFields;
let chartInstance;

describe('selection-utils', () => {
  beforeEach(() => {
    activeBrushes = [
      {
        brush: {
          values() {
            return toggledOnValues;
          },
        },
        type: 'value',
        id: 'dummy/dummy/0',
      },
    ];
    brushMock = {
      brushes() {
        return activeBrushes;
      },
    };
    mockedFields = {
      field1: {
        raw() {
          return {
            meta: {
              qStateCounts: {
                qOption: 0,
                qSelected: 1,
              },
            },
          };
        },
      },
      field2: {
        raw() {
          return {
            meta: {
              qStateCounts: {
                qOption: 2,
                qSelected: 3,
              },
            },
          };
        },
      },
      field3: {
        raw() {
          return {
            qLocked: true,
            qStateCounts: {
              qOption: 2,
              qSelected: 3,
            },
          };
        },
      },
      field4: {
        raw() {
          return {
            qStateCounts: {
              qOption: 1,
              qSelected: 4,
            },
          };
        },
      },
    };
    chartInstance = {
      dataset() {
        return {
          field(key) {
            return mockedFields[key];
          },
        };
      },
    };
  });

  describe('brush interceptors', () => {
    it('should toggle brushed values off and current item on', () => {
      toggledOnValues = [1, 2];

      const itemToBrush = [{ key: 'dummy/dummy/0', value: 3 }];

      const items = selectionUtils.brushInterceptors.brushOnlyOne(brushMock, itemToBrush);

      expect(items).to.deep.equal([
        { key: 'dummy/dummy/0', value: 1 },
        { key: 'dummy/dummy/0', value: 2 },
        { key: 'dummy/dummy/0', value: 3 },
      ]);
    });

    it('should toggle value if only one field value exist', () => {
      // TODO: should only allow toggle on, not off to match behaviour in other charts

      let items = [{ key: 'qHyperCube/field1', value: 1 }];

      items = selectionUtils.brushInterceptors.filterValues(chartInstance, items).items;

      expect(items).to.deep.equal([{ key: 'qHyperCube/field1', value: 1 }]);
    });

    it('should not toggle null values', () => {
      let items = [
        { key: 'qHyperCube/field2', value: 1 },
        { key: 'qHyperCube/field2', value: 2 },
        { key: 'qHyperCube/field2', value: -2 },
      ];

      items = selectionUtils.brushInterceptors.filterValues(chartInstance, items).items;

      expect(items).to.deep.equal([
        { key: 'qHyperCube/field2', value: 1 },
        { key: 'qHyperCube/field2', value: 2 },
      ]);
    });

    it('should not toggle values if field is locked', () => {
      const items = [
        { key: 'qHyperCube/field3', value: 1 },
        { key: 'qHyperCube/field3', value: 2 },
      ];

      const filterResult = selectionUtils.brushInterceptors.filterValues(chartInstance, items);

      expect(filterResult.items).to.deep.equal([]);
      expect(filterResult.itemsAreLocked).to.equal(true);
    });
  });
});
