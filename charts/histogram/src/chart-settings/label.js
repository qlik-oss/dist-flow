import chartStyleUtils from '@qlik/common/extra/chart-style-utils';
import { getValueLabelSettings } from '@qlik/common/extra/chart-style-component';

//
// Implementation details
//

function createLabelSettings(layout, theme, chartId) {
  const valueLabelSettings = getValueLabelSettings(chartId, theme, layout, true);
  const boxFillColor = valueLabelSettings.fill || theme.getColorPickerColor(layout.color.bar.paletteColor);

  return {
    settings: {
      sources: [
        {
          strategy: {
            settings: {
              ...valueLabelSettings,
              labels: [
                {
                  placements: [{ fill: boxFillColor }, { fill: chartStyleUtils.getInverse(boxFillColor) }],
                },
              ],
            },
          },
        },
      ],
    },
  };
}

const Label = {
  createSettings: createLabelSettings,
};

export default Label;
