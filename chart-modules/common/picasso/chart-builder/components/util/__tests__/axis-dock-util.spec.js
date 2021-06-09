import chai from 'chai';
import axisDockUtil from '../axis-dock-util';

const expect = chai.expect;

describe('chart builder - axis dock util', () => {
  describe('getAxisDock', () => {
    it('should default to bottom', () => {
      expect(axisDockUtil.getAxisDock()).to.equal('bottom');
      expect(axisDockUtil.getAxisDock(null)).to.equal('bottom');
      expect(axisDockUtil.getAxisDock(undefined, undefined)).to.equal('bottom');
      expect(axisDockUtil.getAxisDock(NaN, NaN, NaN)).to.equal('bottom');
    });

    it('should return correct when x is direction', () => {
      expect(axisDockUtil.getAxisDock('x')).to.equal('bottom');
      expect(axisDockUtil.getAxisDock('x', 'near', false)).to.equal('bottom');
      expect(axisDockUtil.getAxisDock('x', 'near', true)).to.equal('bottom');

      expect(axisDockUtil.getAxisDock('x', 'far', false)).to.equal('top');
      expect(axisDockUtil.getAxisDock('x', 'far', true)).to.equal('top');
    });

    it('should return correct when y is direction: ', () => {
      expect(axisDockUtil.getAxisDock('y')).to.equal('left');
      expect(axisDockUtil.getAxisDock('y', 'near', false)).to.equal('left');
      expect(axisDockUtil.getAxisDock('y', 'far', true)).to.equal('left');

      expect(axisDockUtil.getAxisDock('y', 'near', true)).to.equal('right');
      expect(axisDockUtil.getAxisDock('y', 'far', false)).to.equal('right');
    });

    it('should return correct when y is direction: ', () => {
      expect(axisDockUtil.getOppositeAxisDock('y', 'near', false)).to.equal('right');
    });
  });
});
