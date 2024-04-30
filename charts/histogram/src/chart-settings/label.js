import { getValueLabelStyle } from '@qlik/common/extra/chart-style-component';
import Color from '@qlik/common/extra/color';

//
// Implementation details
//

function createLabelSettings(layout, themeService, chartId) {
  const styles = themeService.getStyles();
  const valueLabelSettings = getValueLabelStyle(chartId, styles, layout);
  const boxFillColor = valueLabelSettings.fill || styles.label.value.color;
  const getContrastColor = () => (ctx) =>
    Color.isDark(ctx.node.attrs.fill) ? styles.label.value.lightColor : styles.label.value.darkColor;
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
                      fill: valueLabelSettings.fill ? boxFillColor : getContrastColor(),
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
