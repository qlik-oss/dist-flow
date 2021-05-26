import extend from 'extend';

function boxMarker(settings) {
  const defaultSettings = {
    key: 'box-marker',
    type: 'box-marker',
    settings: {
      minor: { scale: 'x' },
      orientation: 'horizontal',
    },
    brush: { trigger: [], consume: [] },
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default boxMarker;
