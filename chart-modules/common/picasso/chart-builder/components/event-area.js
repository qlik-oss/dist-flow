import extend from 'extend';

function eventArea(settings) {
  const defaultSettings = {
    type: 'event-area',
    key: 'event-area',
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default eventArea;
