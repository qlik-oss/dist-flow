import chartStyleUtils from '@qlik/common/extra/chart-style-utils';

//
// Implementation details
//

function createLabelSettings(layout, theme) {
  const boxFillColor = theme.getColorPickerColor(layout.color.bar.paletteColor);

  return {
    settings: {
      sources: [
        {
          strategy: {
            settings: {
              labels: [
                {
                  placements: [{}, { fill: chartStyleUtils.getInverse(boxFillColor) }],
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
