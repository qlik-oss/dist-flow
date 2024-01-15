import extend from 'extend';
import getTextRenderer from './util/get-text-renderer';

function getLabel(context) {
  const end = context.data.end;
  const formatter = context.dataset(end.source.key).field(end.source.field).formatter();
  return formatter(end.value);
}

function labels(settings, options) {
  const chartID = options && options.chartID;
  const labelsFill = options.theme.getStyle(chartID, 'label.value', 'color');
  const labelsFontSize = options.theme.getStyle(chartID, 'label.value', 'fontSize');
  const labelsFontFamily = options.theme.getStyle(chartID, 'label.value', 'fontFamily');

  const defaultSettings = {
    key: 'labels',
    type: 'labels',
    renderer: getTextRenderer(options.flags),
    displayOrder: 1,
    settings: {
      sources: [
        {
          component: 'box-marker', // Connects with the matching "key:" attribute in the visualizations
          selector: 'rect',
          strategy: {
            type: 'bar',
            settings: {
              direction: 'up',
              fontFamily: labelsFontFamily,
              fontSize: parseFloat(labelsFontSize),
              align: 0.5,
              labels: [
                {
                  placements: [
                    {
                      position: 'outside',
                      fill: labelsFill,
                      justify: 0,
                    },
                    {
                      position: 'inside',
                      fill: settings && settings.settings.sources[0].strategy.settings.labels[0].placements[1].fill,
                      justify: 1,
                    },
                  ],
                  label: getLabel,
                },
              ],
            },
          },
        },
      ],
    },
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default labels;
