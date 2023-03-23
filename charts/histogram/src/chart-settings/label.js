import chartStyleUtils from '@qlik/common/extra/chart-style-utils';
import { getValueLabelStyle } from '@qlik/common/extra/chart-style-component';

//
// Implementation details
//

function createLabelSettings(layout, theme, chartId, flags) {
  const valueLabelSettings = getValueLabelStyle(chartId, theme, layout, flags);
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
                  placements: [
                    { fill: boxFillColor },
                    {
                      fill: flags.isEnabled('CLIENT_IM_3364') ? boxFillColor : chartStyleUtils.getInverse(boxFillColor),
                    },
                  ],
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
