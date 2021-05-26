import extend from 'extend';

function interaction(settings, options) {
  const gestures = (options && options.gestures) || [];
  const defaultSettings = {
    type: 'hammer',
    key: 'hammered',
    gestures,
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default interaction;
