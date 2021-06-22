import chartStyleUtils from '@qlik/common/extra/chart-style-utils';
import histogramUtils from '../histogram-utils';

//
// Implementation details
//

function createBoxMarkerSettings(
  chartView,
  layout,
  basicSelectionSettings,
  dimensionSelectionSettings,
  measureSelectionSettings,
  tooltipSettings
) {
  const boxFillColor = chartView.theme.getColorPickerColor(layout.color.bar.paletteColor);
  const binSize = histogramUtils.getDerivedBinSize(layout);

  const brushTrigger = [];
  const brushConsume = [
    basicSelectionSettings.consume,
    dimensionSelectionSettings.consume,
    measureSelectionSettings.consume,
  ];

  if (chartView._tooltipHandler.isOn()) {
    brushTrigger.push(tooltipSettings.box.trigger);
    brushConsume.push.apply(brushConsume, tooltipSettings.box.consume);
  }

  brushTrigger.push(basicSelectionSettings.trigger);

  return {
    key: 'box-marker',
    settings: {
      box: {
        fill: boxFillColor,
        stroke: chartStyleUtils.getContrastingGrey(boxFillColor).toHex(),
        strokeWidth: 1,
        maxWidthPx: Infinity,
        minWidthPx: NaN, // Temp fix for QLIK-92353 until a proper fix is available in picasso.js
        minWidth: 0,
      },
      major: {
        scale: 'dimension',
        ref: {
          start: 'binStart',
          end: 'binEnd',
        },
      },
      minor: { scale: 'measure' },
      whiskers: false,
      orientation: 'vertical',
    },
    brush: {
      trigger: brushTrigger,
      consume: brushConsume,
    },
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          start: 0,
          end: { field: 'qMeasureInfo/0' },
          measure: {
            field: 'qMeasureInfo/0',
            reduce: 'first',
            value(v) {
              return v;
            },
            reduceLabel: 'none',
          },
          binStart: {
            field: 'qDimensionInfo/0',
            value(v) {
              return v.qNum;
            },
          },
          binEnd: {
            field: 'qDimensionInfo/0',
            value(v) {
              return v.qNum + binSize;
            },
          },
          elemNo: { field: 'qDimensionInfo/0' },
          bin: {
            field: 'qDimensionInfo/0',
            value(v) {
              return v;
            },
          },
        },
      },
    },
  };
}

const BoxMarker = {
  createSettings: createBoxMarkerSettings,
};

export default BoxMarker;
