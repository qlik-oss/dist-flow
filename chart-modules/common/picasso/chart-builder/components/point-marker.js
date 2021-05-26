import extend from 'extend';

function pointMarker(settings) {
  const defaultSettings = {
    key: 'point-marker',
    type: 'point-marker',
    settings: {},
    brush: { trigger: [], consume: [] },
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default pointMarker;
