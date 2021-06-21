import { createContent } from '../tooltip-content';

const NULL_ELEMNO = -2;

function createShape(elemNo) {
  const value = { qElemNo: elemNo };
  const source = { field: 'a field' };
  return { data: { inner: { value }, x: { source } } };
}
function nullShape() {
  return createShape(NULL_ELEMNO);
}

describe('tooltip-contnet', () => {
  const h = null;
  const style = null;
  let tooltipInfo;

  beforeEach(() => {
    tooltipInfo = {
      headerResolver: (values) => values,
      rowResolver: (field, measureContent) => ({ value: measureContent, label: 'label' }),
      labelData: ['inner'],
      measureRows: ['x'],

      chartInstance: {
        dataset: () => ({
          field: () => null,
        }),
      },
      renderer: (settings, x) => x,
      chartView: {
        translator: null,
      },
    };
  });

  test('should not show for null values', () => {
    const data = [nullShape()];
    const content = createContent(tooltipInfo)({ h, data, style });
    expect(content).toBeUndefined();
  });

  it('should only include a limited number of brushed items', () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push(createShape(i));
    }
    const content = createContent(tooltipInfo)({ h, data, style });
    expect(content.numberInExcess).toEqual(25);
  });
})
