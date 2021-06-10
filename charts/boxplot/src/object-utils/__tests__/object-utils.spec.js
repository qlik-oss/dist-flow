import chai from 'chai';
import ObjectUtils from '../object-utils';

const expect = chai.expect;

describe('ObjectUtils', () => {
  it('should create an object from an array with default id', () => {
    const array = [
      { id: 'tooltip', item: 'foo', bar: { foo: 'test' } },
      { id: 'color', item: 'not', something: { else: 'test' } },
    ];
    const obj = ObjectUtils.mapArrayToObject(array);

    expect(obj.tooltip.index).to.equal(0);
    expect(obj.tooltip.item).to.equal(array[0]);
    expect(obj.color.index).to.equal(1);
    expect(obj.color.item).to.equal(array[1]);
  });

  it('should create an object from an array with a different id', () => {
    const array = [
      { notId: 'tooltip', item: 'foo', bar: { foo: 'test' } },
      { notId: 'color', item: 'not', something: { else: 'test' } },
    ];
    const obj = ObjectUtils.mapArrayToObject(array, 'notId');

    expect(obj.tooltip.index).to.equal(0);
    expect(obj.tooltip.item).to.equal(array[0]);
    expect(obj.color.index).to.equal(1);
    expect(obj.color.item).to.equal(array[1]);
  });
});
