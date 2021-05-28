// import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import binSizeCalculator from '../bin-size-calculator';

const expect = chai.expect;

describe('Bin size calculator ', () => {
  describe('input validation', () => {
    it("should throw an error if the min parameter isn't numeric", () => {
      function fn() {
        binSizeCalculator.calculateBinSize(undefined, 10, 10);
      }

      expect(fn).to.throw(Error);
    });

    it("should throw an error if the max parameter isn't numeric", () => {
      function fn() {
        binSizeCalculator.calculateBinSize(0, undefined, 10);
      }

      expect(fn).to.throw(Error);
    });

    it("should throw an error if the binCount parameter isn't numeric", () => {
      function fn() {
        binSizeCalculator.calculateBinSize(0, 10, undefined);
      }

      expect(fn).to.throw(Error);
    });

    it('should not throw an error if all parameters is numeric', () => {
      function fn() {
        binSizeCalculator.calculateBinSize(0, 10, 10);
      }

      expect(fn).to.not.throw(Error);
    });

    it('should throw an error if the min parameter is greater than the max parameter', () => {
      function fn() {
        binSizeCalculator.calculateBinSize(10, 0, 10);
      }

      expect(fn).to.throw(Error);
    });
  });

  describe('Adjust invalid binCount parameter', () => {
    it('should make sure the binCount is not smaller than 1', () => {
      const bin = binSizeCalculator.calculateBinSize(0, 10, -2);

      // When -2 changed to 1, we should get a bin that looks like this
      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(15, 'binSize');
    });

    it('should round the binCount with Math.ceil', () => {
      const bin = binSizeCalculator.calculateBinSize(0, 10, 1.5);

      // When 1.5 is rounded to 2, we should get a bin that looks like this
      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(6, 'binSize');
    });
  });

  describe('calculate offset and binSize', () => {
    it('should handle min 1, max 1000 and binCount 8', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 1000, 8);

      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(140, 'binSize');
    });

    it('should handle min 38, max 1791 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(38, 1791, 10);

      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(180, 'binSize');
    });

    it('should handle min 1038, max 2791 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(1038, 2791, 10);

      expect(bin.offset).to.equal(1000, 'offset');
      expect(bin.binSize).to.equal(180, 'binSize');
    });

    it('should handle min 1, max 1 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 1, 10);

      expect(bin.offset).to.equal(0.5, 'offset');
      expect(bin.binSize).to.equal(0.1, 'binSize');
    });

    it('should handle min 1, max 1 and binCount 1', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 1, 1);

      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(2, 'binSize');
    });

    it('should handle min 1, max 5 and binCount 1', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 5, 1);

      expect(bin.offset).to.equal(1, 'offset');
      expect(bin.binSize).to.equal(5, 'binSize');
    });

    it('should handle min 1, max 6 and binCount 1', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 6, 1);

      expect(bin.offset).to.equal(1, 'offset');
      expect(bin.binSize).to.equal(6, 'binSize');
    });

    it('should handle min 1, max 15 and binCount 1', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 15, 1);

      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(20, 'binSize');
    });

    it('should handle min 1, max 20 and binCount 1', () => {
      const bin = binSizeCalculator.calculateBinSize(1, 20, 1);

      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(30, 'binSize');
    });

    it('should handle min 0, max 0.005 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(0, 0.005, 10);

      expect(bin.offset).to.equal(0, 'offset');
      expect(bin.binSize).to.equal(0.00055, 'binSize');
    });

    it('should handle min 1611.1699999999998, max 1611.1699999999998 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(1611.1699999999998, 1611.1699999999998, 10);

      expect(bin.offset).to.equal(850, 'offset');
      expect(bin.binSize).to.equal(170, 'binSize');
    });

    it('should handle min -55, max -55 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(-55, -55, 10);

      expect(bin.offset).to.equal(-82.5, 'offset');
      expect(bin.binSize).to.equal(5.5, 'binSize');
    });

    it('should handle min -0.0055, max -0.0055 and binCount 10', () => {
      const bin = binSizeCalculator.calculateBinSize(-0.0055, -0.0055, 10);

      expect(bin.offset).to.equal(-0.0077, 'offset');
      expect(bin.binSize).to.equal(0.00055, 'binSize');
    });
  });
});
