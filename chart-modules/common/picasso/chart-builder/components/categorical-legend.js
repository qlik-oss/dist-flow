import extend from 'extend';
import getTextRenderer from './util/get-text-renderer';

const directions = {
  left: 'left',
  right: 'right',
  up: 'top',
  down: 'bottom',
};

function legend(settings, options) {
  const chartID = options && options.chartID;
  const isRtl = options && options.isRtl;
  let dock = (options && options.dock) || 'auto';
  const show = options && options.show;

  if (dock === 'auto') {
    dock = options.chartHeight / options.chartWidth < 1 ? (isRtl ? 'left' : 'right') : 'bottom';
  }

  const titleFill = options.theme.getStyle(chartID, 'legend.title', 'color');
  const titleFontSize = options.theme.getStyle(chartID, 'legend.title', 'fontSize');
  const itemFill = options.theme.getStyle(chartID, 'legend.label', 'color');
  const itemFontSize = options.theme.getStyle(chartID, 'legend.label', 'fontSize');
  const titleFontFamily = options.theme.getStyle(chartID, 'legend.title', 'fontFamily');
  const itemFontFamily = options.theme.getStyle(chartID, 'legend.label', 'fontFamily');

  const defaultSettings = {
    key: 'legend',
    type: 'legend-cat',
    renderer: getTextRenderer(options.flags),
    dock,
    show,
    scale: {
      type: 'color',
    },
    settings: {
      title: {
        anchor: 'middle',
      },
      layout: {
        direction: isRtl ? 'rtl' : 'ltr',
        size: dock === 'top' || dock === 'bottom' ? 2 : 1,
        vertical: dock === 'top' || dock === 'bottom' ? 16 : 8,
      },
      navigation: {
        button: {
          class: {
            'lui-fade-button': true,
          },
          content(h, state) {
            const c = ['lui-button__icon', 'lui-icon', `lui-icon--triangle-${directions[state.direction]}`];
            return h('span', {
              style: {
                pointerEvents: 'none',
              },
              class: c.join(' '),
            });
          },
        },
      },
    },
    style: {
      item: {
        label: {
          fontSize: itemFontSize,
          fontFamily: itemFontFamily,
          fill: itemFill,
          lineHeight: 1,
          wordBreak: 'break-word',
        },
        margin: {
          top: 5,
          left: 10,
          right: 10,
          bottom: 10,
        },
        shape: {
          type: options.type ? options.type : 'square',
          size: (parseInt(itemFontSize, 10) * 3) / 4, // To make it consistent with non-picasso charts
        },
      },
      title: {
        show: options.showTitle,
        fontSize: titleFontSize,
        fontFamily: titleFontFamily,
        fill: titleFill,
      },
    },
  };
  return extend(true, {}, defaultSettings, settings);
}

export default legend;
