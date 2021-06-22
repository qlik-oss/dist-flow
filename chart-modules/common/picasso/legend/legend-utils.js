// TODO: fix
const Touche = {
  preventGestures: () => {},
};

const NULL_ELEMNO = -2;
const OTHERS_ELEMNO = -3;
const LEGEND_DISPLAY_OREDER = 200;
const LEGEND_PRIO_ORDER = 50; // should be between axis (30) and refline (60) to be removed before axis but after refline

export default {
  getLegendData,
  getCategoricalLegendPanGesture,
  onMouseWheel,
};

// TODO: common function stolen from legend-data.js
function getItemText(item) {
  if (item.label) {
    return item.label;
  }
  if (item.min && item.max) {
    return `${item.min} - ${item.isMax ? '' : '<'}${item.max}`;
  }
  if (item.max) {
    return `<${item.max}`;
  }
  return `>${item.min}`;
}

function categoricalDimensionLegendSettings(options) {
  const colorItems = options.colorItems;
  const selectionSettings = options.selectionSettings;
  const colorMap = options.colorMap;
  const colorDataInfo = options.colorDataInfo;

  const marker = colorMap.getLegendDataProvider() ? colorMap.getLegendDataProvider().getLegendMarker() : 'rect';

  const domain = colorItems.map((item) => (Array.isArray(item.id) ? item.id[0] : item.id));
  const range = colorItems.map((item) => item.color.toRGBA());

  const extractColorFn = function (v) {
    return colorMap.getColorFromPreScaledValue(v.qElemNo);
  };
  const colorFn = function (v) {
    return extractColorFn(v).toHex();
  };

  const filterFn = function (v) {
    const color = extractColorFn(v);
    return v.qElemNo !== NULL_ELEMNO && !color.isInvalid();
  };

  const data = {
    extract: {
      source: options.source,
      field: `qDimensionInfo/${options.dimIndex || 0}`,
      props: {
        label(v) {
          return v.qText;
        },
      },
    },
  };

  if (colorDataInfo.hasOthers) {
    const othersLabel = options.translator.get('properties.dimensionLimits.others');
    const othersColor = colorMap.getColorFromPreScaledValue([OTHERS_ELEMNO], othersLabel);
    data.amend = [
      {
        value: OTHERS_ELEMNO,
        label: { value: othersLabel },
        color: { value: othersColor },
        source: {},
      },
    ];

    domain.push(OTHERS_ELEMNO);
    range.push(othersColor);
  }

  const fillFn = function (dataProp) {
    return dataProp.datum.color.value;
  };

  const removeActiveConsumeStyleFn = function (c) {
    // For the legend, no active styling should be applied
    return {
      data: c.data,
      context: c.context,
      style: {
        inactive: c.style.inactive,
      },
    };
  };

  const settings = {
    displayOrder: LEGEND_DISPLAY_OREDER,
    minimumLayoutMode: 'MEDIUM',
    prioOrder: LEGEND_PRIO_ORDER,
    renderer: 'svg',
    mounted(el) {
      el.children[0].style.pointerEvents = 'none';
    },
    scale: {
      type: 'categorical-color',
      data,
      label(v) {
        return v.datum.label.value;
      },
      trackBy: 'id',
      // domain: domain,
      // range: range
    },
    settings: {
      title: options.title,
      item: {
        shape: {
          type: marker,
        },
      },
    },
    brush: {
      trigger: (selectionSettings && selectionSettings.trigger) || [],
      consume: ((selectionSettings && selectionSettings.consume) || []).map(removeActiveConsumeStyleFn),
    },
  };

  // Fix for SUI-3713 when fallback to using ordinary dimension for coloring
  if (colorDataInfo.altMode) {
    settings.scale.domain = domain;
    settings.scale.range = range;
  } else {
    settings.scale.data.extract.props.color = colorFn;
    settings.scale.data.extract.filter = filterFn;
    settings.settings.item.shape.fill = fillFn;
  }

  return settings;
}

function categoricalLegendSettings(options) {
  const colorItems = options.colorItems;
  const colorMap = options.colorMap;

  const marker = colorMap.getLegendDataProvider() ? colorMap.getLegendDataProvider().getLegendMarker() : 'rect';

  const domain = colorItems.map(getItemText);
  const range = colorItems.map((item) => item.color.toRGBA());

  return {
    displayOrder: LEGEND_DISPLAY_OREDER,
    minimumLayoutMode: 'MEDIUM',
    prioOrder: LEGEND_PRIO_ORDER,
    scale: {
      type: 'categorical-color',
      domain,
      range,
    },
    settings: {
      title: options.title,
      item: {
        shape: {
          type: marker,
        },
      },
    },
  };
}
function sequentialLegendSettings(options) {
  const colorItems = options.colorItems;
  const domain = [];
  const range = [];
  const min = colorItems[colorItems.length - 1].id[1];
  const max = colorItems[0].id[0];
  const minText = colorItems[colorItems.length - 1].min;
  const maxText = colorItems[0].max;
  const epsilon = (max - min) / 1000000;
  colorItems.forEach((item) => {
    domain.push(item.id[0] - epsilon);
    domain.push(item.id[1] + epsilon);
  });
  colorItems.forEach((item) => {
    range.push(item.grad[0].toRGBA());
    range.push(item.grad[1].toRGBA());
  });

  return {
    displayOrder: LEGEND_DISPLAY_OREDER,
    prioOrder: LEGEND_PRIO_ORDER,
    settings: {
      fill: {
        type: 'color',
        range,
        domain,
        min,
        max,
      },
      major: {
        type: 'linear',
        min,
        max,
      },
      tick: {
        label(index) {
          return index === 0 ? minText : maxText;
        },
      },
      title: options.title,
    },
  };
}

function getColorItems(colorMap, legendMode, externalColorItems) {
  let colorItems;
  if (externalColorItems && legendMode.colorMode === 'dimension') {
    colorItems = externalColorItems.map((row, index) => {
      const id = row[1].qNum;
      const label = row[0].qText;
      const color = colorMap.getColorFromPreScaledValue(id, label);
      return {
        id: row[0].qElemNumber,
        index,
        label,
        color,
      };
    });
    colorItems = colorItems.filter((item) => !item.color.isInvalid()).slice(0, 100);
  } else {
    colorItems = colorMap.getColorMapping().concat();
    colorItems = colorItems.filter((item) => !item.color.isInvalid());
  }
  return colorItems;
}

function getTitle(colorMap, legendMode) {
  return {
    show: legendMode.showTitle,
    text: colorMap.getLegendTitle(),
  };
}

function getLegendData(options) {
  const colorMap = options.colorMap;
  const colorDataInfo = colorMap.getColorDataInfo();
  const mode = colorDataInfo.legendMode || {};

  if (!colorDataInfo.valid) {
    return undefined;
  }

  const colorItems = getColorItems(colorMap, mode, options.legendData);

  if (colorItems.length === 0) {
    // Don't render empty legend
    return undefined;
  }

  const args = {
    colorMap,
    selectionSettings: options.selectionSettings,
    source: options.source,
    dimIndex: options.dimIndex,
    colorDataInfo,

    colorItems,
    title: getTitle(colorMap, mode),
    translator: options.translator,
  };

  if (mode.discrete) {
    return {
      type: 'categorical-legend',
      settings:
        mode.colorMode === 'dimension' ? categoricalDimensionLegendSettings(args) : categoricalLegendSettings(args),
    };
  }
  return {
    type: 'sequential-legend',
    settings: sequentialLegendSettings(args),
  };
}

function getCategoricalLegendPanGesture(legendKey) {
  let intervalId;

  function targetIsCatLegend(manager, e) {
    if (!e) {
      return false;
    }
    const startPoint = {
      x: e.center.x - e.deltaX,
      y: e.center.y - e.deltaY,
    };
    const components = this.chart.componentsFromPoint(startPoint);
    return components.some((c) => c.settings.key === legendKey);
  }

  function clearIntervalId() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return [
    {
      type: 'Pan',
      options: {
        event: 'catlegendpan',
        threshold: 1,
        enable: targetIsCatLegend,
      },
      events: {
        catlegendpanstart() {
          clearIntervalId();
          const legend = this.chart.component(legendKey);
          legend.emit('panstart');
        },
        catlegendpanmove(e) {
          const legend = this.chart.component(legendKey);
          legend.emit('panmove', e);
        },
        catlegendpanend() {
          const legend = this.chart.component(legendKey);
          legend.emit('panend');
        },
        catlegendpancancel() {
          const legend = this.chart.component(legendKey);
          legend.emit('panend');
        },
      },
    },
    {
      type: 'Press',
      options: {
        enable: targetIsCatLegend,
      },
      events: {
        press(e) {
          const legend = this.chart.component(legendKey);
          const btn = e.target;
          const attr = btn ? btn.getAttribute('data-action') : '';
          if (attr) {
            clearIntervalId();
            intervalId = setInterval(() => {
              legend.emit(attr);
            }, 100);
            Touche.preventGestures();
          }
        },
        pressup() {
          clearIntervalId();
        },
      },
    },
  ];
}

function onMouseWheel(event, chart, legendKey) {
  if (!!legendKey && chart.componentsFromPoint(event).some((c) => c.settings.key === legendKey)) {
    const legend = chart.component(legendKey);
    legend.emit(event.delta > 0 ? 'prev' : 'next');
    return true;
  }
  return false;
}
