import { getValueLabelStyle } from '@qlik/common/extra/chart-style-component';
import Color from '@qlik/common/extra/color';

//
// Implementation details
//

function createLabelSettings(layout, theme, chartId, flags, themeService) {
  const valueLabelSettings = getValueLabelStyle(chartId, theme, layout, flags);
  const styles = themeService.getStyles();
  const boxFillColor = valueLabelSettings.fill || styles.label.value.color;
  const getContrastColor = () =>
    Color.isDark(layout.color.bar.paletteColor.color) ? styles.label.value.lightColor : styles.label.value.darkColor;
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
                      fill:
                        flags.isEnabled('CLIENT_IM_3364') && valueLabelSettings.fill
                          ? boxFillColor
                          : getContrastColor(),
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
