import chai from 'chai';
import refLineUtil from '../ref-line-util';

const expect = chai.expect;
const lrm = String.fromCharCode(8206);

describe('chart builder - ref-line util', () => {
  let theme;
  beforeEach(() => {
    theme = {
      getStyle: jest.fn((...args) => args.join('.')),
      getColorPickerColor: jest.fn().mockReturnValue('theme color'),
    };
  });

  describe('lineSettings', () => {
    it('should return correct lineSettings', () => {
      const paletteColor = 7;
      const lineSettings = refLineUtil.lineSettings(
        {
          value: 2,
          label: {
            vAlign: 0.2,
            align: 0.8,
          },
        },
        {
          paletteColor,
          theme,
        }
      );

      expect(lineSettings).to.deep.equal({
        value: 2,
        line: {
          stroke: 'theme color',
          strokeDasharray: undefined,
        },
        label: {
          vAlign: 0.2,
          align: 0.8,
        },
      });
    });
  });

  describe('lineLabelSettings', () => {
    it('should return correct lineLabelSettings', () => {
      const paletteColor = 7;
      const label = 'test';

      const lineLabelSettings = refLineUtil.lineLabelSettings(
        {
          value: 2,
          label: {
            text: label,
            vAlign: 0.2,
            align: 0.8,
          },
        },
        {
          paletteColor,
          theme,
        }
      );

      expect(lineLabelSettings).to.deep.equal({
        value: 2,
        line: {
          stroke: 'transparent',
        },
        label: {
          text: label,
          vAlign: 0.2,
          align: 0.8,
          fill: 'theme color',
          fontFamily: '.referenceLine.label.name.fontFamily',
          fontSize: '.referenceLine.label.name.fontSize',
          maxWidthPx: 135,
        },
      });
    });
  });

  describe('getRefLineTitle', () => {
    it('should return correct refLine title when showValue = true, showLabel = true', () => {
      const title = refLineUtil.getRefLineTitle({
        refLine: { showValue: true, showLabel: true },
        label: 'abc',
        valueString: 100,
      });
      expect(title).to.equal(`abc ${lrm}(100)${lrm}`);
    });

    it('should return correct refLine title when showValue = true, showLabel = false', () => {
      const title = refLineUtil.getRefLineTitle({
        refLine: { showValue: true, showLabel: false },
        label: 'abc',
        valueString: 100,
      });
      expect(title).to.equal(`${lrm}(100)${lrm}`);
    });

    it('should return correct refLine title when showValue = false, showLabel = true', () => {
      const title = refLineUtil.getRefLineTitle({
        refLine: { showValue: false, showLabel: true },
        label: 'abc',
        valueString: 100,
      });
      expect(title).to.equal('abc');
    });

    it('should return correct refLine title when showValue = false, showLabel = false', () => {
      const title = refLineUtil.getRefLineTitle({
        refLine: { showValue: false, showLabel: false },
        label: 'abc',
        valueString: 100,
      });
      expect(title).to.equal('');
    });
  });
});
