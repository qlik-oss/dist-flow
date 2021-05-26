const SCROLLBAR_KEY = 'scrollbar';

function getActions(isEnabledFn) {
  function targetIsScrollbar(manager, e) {
    if (!e || !isEnabledFn()) {
      return false;
    }
    const startPoint = {
      x: e.center.x - e.deltaX,
      y: e.center.y - e.deltaY,
    };
    const components = this.chart.componentsFromPoint(startPoint);
    return components.some((c) => c.settings.key === SCROLLBAR_KEY);
  }

  const tap = {
    // single tap
    type: 'Tap',
    options: {
      enable: targetIsScrollbar,
    },
    events: {
      tap(e) {
        this.chart.component(SCROLLBAR_KEY).emit('tap', e);
      },
    },
  };

  const pan = {
    type: 'Pan',
    options: {
      enable: targetIsScrollbar,
    },
    events: {
      panstart(e) {
        this.chart.component(SCROLLBAR_KEY).emit('panStart', e);
      },
      pan(e) {
        this.chart.component(SCROLLBAR_KEY).emit('panMove', e);
      },
      panend(e) {
        this.chart.component(SCROLLBAR_KEY).emit('panEnd', e);
      },
      pancancel(e) {
        this.chart.component(SCROLLBAR_KEY).emit('panCancel', e);
      },
    },
  };

  const actions = [tap, pan];
  return actions;
}

export default getActions;
