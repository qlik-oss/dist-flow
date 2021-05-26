import extend from 'extend';

function lasso(settings, options) {
  const brushKey = options && options.brushKey;
  const brushComponents = options && options.brushComponents ? options.brushComponents : [];
  const brushData = options && options.brushData ? options.brushData : ['elemNo'];

  const defaultSettings = {
    type: 'brush-lasso',
    key: 'lasso',
    displayOrder: 99,
    settings: {
      brush: {
        components: [],
      },
      lasso: {
        fill: 'rgba(0, 0, 0, 0)',
        stroke: 'rgba(102,102,102,1)',
        strokeWidth: 2,
        opacity: 1,
        strokeDasharray: null, // '10, 4',
      },
      startPoint: {
        r: 10,
        fill: 'rgba(0, 152, 69, 1)',
        strokeWidth: 0,
        opacity: 1,
      },
    },
  };

  brushComponents.forEach((comp) => {
    defaultSettings.settings.brush.components.push({
      contexts: brushKey ? [brushKey] : undefined,
      key: comp,
      data: brushData,
    });
  });

  return extend(true, {}, defaultSettings, settings || {});
}

export default lasso;
