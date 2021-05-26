import '../../../../../../../../test/unit/node-setup';
import chai from 'chai';
import rangeUtil from '../range-util';

const expect = chai.expect;

describe('chart builder - range util', () => {
  it('getDock', () => {
    expect(rangeUtil.getDock('axis', 'area')).to.equal('@axis,@area');
    expect(rangeUtil.getDock('axis')).to.equal('@axis');
    expect(rangeUtil.getDock(null, 'area')).to.equal('@area');
  });

  describe('getBublesAlign', () => {
    it('isHorizontal: true, dock: near, isRtl: false', () => {
      expect(rangeUtil.getBublesAlign(true, 'near', false)).to.equal('start');
    });
    it('isHorizontal: true, dock: far, isRtl: false', () => {
      expect(rangeUtil.getBublesAlign(true, 'far', false)).to.equal('end');
    });
    it('isHorizontal: false, dock: near, isRtl: false', () => {
      expect(rangeUtil.getBublesAlign(false, 'near', false)).to.equal('end');
    });
    it('isHorizontal: false, dock: far, isRtl: false', () => {
      expect(rangeUtil.getBublesAlign(false, 'far', false)).to.equal('start');
    });

    it('isHorizontal: true, dock: near, isRtl: true', () => {
      expect(rangeUtil.getBublesAlign(true, 'near', true)).to.equal('start');
    });
    it('isHorizontal: true, dock: far, isRtl: true', () => {
      expect(rangeUtil.getBublesAlign(true, 'far', true)).to.equal('end');
    });
    it('isHorizontal: false, dock: near, isRtl: true', () => {
      expect(rangeUtil.getBublesAlign(false, 'near', true)).to.equal('start');
    });
    it('isHorizontal: false, dock: far, isRtl: true', () => {
      expect(rangeUtil.getBublesAlign(false, 'far', true)).to.equal('end');
    });
  });
});
