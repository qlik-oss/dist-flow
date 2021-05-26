import extend from 'extend';

function scale(settings, opts) {
  const options = opts || {};
  const isHorizontal = !options.orientation || options.orientation === 'horizontal';
  const isRtl = !!options.isRtl;

  const defaultSettings = {
    name: options.name || 'scale',
    component: {
      invert: isHorizontal && isRtl,
      minorTicks: {
        count: 1,
      },
      range: options.range || undefined,
      domain: options.domain || undefined,
      trackBy: options.trackBy || 'id',
    },
  };

  return extend(true, {}, defaultSettings, settings || {});
}

function measureScale(settings, opts) {
  const options = opts || {};
  let fields = options.source || [];
  if (typeof fields === 'string') {
    fields = [fields];
  }

  const defaultSettings = {
    name: 'measure',
    component: {
      expand: 0.1,
      data: {
        fields: fields.map((f) => ({
          field: f,
        })),
      },
    },
  };

  const measureAxisProperties = opts && opts.measureAxisProperties;

  if (measureAxisProperties && !measureAxisProperties.autoMinMax) {
    // explicit min max measure scale range
    if (['min', 'minMax'].includes(measureAxisProperties.minMax)) {
      defaultSettings.component.min = measureAxisProperties.min;
    }
    if (['max', 'minMax'].includes(measureAxisProperties.minMax)) {
      defaultSettings.component.max = measureAxisProperties.max;
    }
  }

  const measureSettings = extend(true, defaultSettings, settings || {});
  const scaleSettings = scale(measureSettings, opts);
  const hasInvertSettings = settings && settings.component && typeof settings.component.invert !== 'undefined';

  if (!hasInvertSettings && opts && opts.orientation === 'vertical') {
    scaleSettings.component.invert = !scaleSettings.component.invert;
  }

  return scaleSettings;
}

function dimensionScale(settings, opts) {
  const defaultSettings = {
    name: 'dimension',
    component: {
      trackBy: 'id',
      type: 'band',
      data: {
        extract: {
          field: (opts && opts.source) || '',
          props: {
            label(v) {
              return v.qText || '';
            }, // Map qText to handle both qElemNo and qElemNumber
          },
        },
      },
      label(v) {
        return v.datum.label.value;
      }, // Set qText as value from the mapping on r.92
    },
  };

  const dimensionSettings = extend(true, defaultSettings, settings || {});

  return scale(dimensionSettings, opts);
}

scale.measureScale = measureScale;
scale.dimensionScale = dimensionScale;

export default scale;
