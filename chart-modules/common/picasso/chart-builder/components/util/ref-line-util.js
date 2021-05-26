import extend from 'extend';
import RtlUtil from '../../../../extra/rtl-util';

/**
 * Get Picasso settings for an individual ref-line.
 *
 * @param {*} settings Default settings for the ref-line
 * @param {*} lineColorIndex Chart builder options + paletteColor option
 */
function lineSettings(settings, options) {
  const lineStroke =
    typeof options.paletteColor !== 'undefined'
      ? options.theme.getColorPickerColor(options.paletteColor)
      : 'transparent';
  const defaultSettings = {
    value: 0,
    line: {
      stroke: lineStroke,
      strokeDasharray: options?.style?.lineType,
    },
  };
  return extend(true, defaultSettings, settings || {});
}

/**
 * Get Picasso settings for an individual ref-line used to display label and OOB.
 *
 * @param {*} settings Default settings for the ref-line label
 * @param {*} options Chart builder options + paletteColor option
 */
function lineLabelSettings(settings, options) {
  const chartID = options && options.chartID; // Should we validate if the parameter exists?
  let labelColor = options.theme.getStyle(chartID, 'referenceLine.label.name', 'color');
  const labelFontSize = options.theme.getStyle(chartID, 'referenceLine.label.name', 'fontSize');
  const labelFontFamily = options.theme.getStyle(chartID, 'referenceLine.label.name', 'fontFamily');

  if (options.paletteColor) {
    labelColor = options.theme.getColorPickerColor(options.paletteColor);
  } else if (!labelColor) {
    labelColor = 'transparent';
  }

  const defaultSettings = {
    value: 0,
    line: {
      stroke: 'transparent',
    },
    label: {
      align: 'center',
      vAlign: 'middle',
      text: '',
      fill: labelColor,
      fontFamily: labelFontFamily,
      fontSize: labelFontSize,
      maxWidthPx: 135,
    },
  };
  return extend(true, defaultSettings, settings || {});
}

const isVisible = (refLine) =>
  refLine && refLine.show !== false && refLine.show !== 0 && refLine.show !== '0' && refLine.refLineExpr !== undefined;

function getRefLineTitle({ refLine, label, valueString }) {
  if (refLine.showValue !== false) {
    if (refLine.showLabel !== false) {
      return `${label} ${RtlUtil.lrm}(${valueString})${RtlUtil.lrm}`;
    }
    return `${RtlUtil.lrm}(${valueString})${RtlUtil.lrm}`;
  }
  if (refLine.showLabel !== false) {
    return label;
  }
  return '';
}

export default {
  lineSettings,
  lineLabelSettings,
  isVisible,
  getRefLineTitle,
};
