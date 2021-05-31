// import Touche from 'touchejs';
import extend from 'extend';
import Actions from './selection-actions';
// import interaction from '../../views/selections/interaction-handler';
// import eventUtils from '../../utils/event-utils';

// TODO: fix
const eventUtils = {
  showLockedFeedback: () => {},
};
const Touche = {
  preventGestures: () => {},
};
const interaction = {
  CtrlToggle: { bind: () => {}, unbind: () => {} },
  ShiftToggle: { bind: () => {}, unbind: () => {} },
  KeyPressed: { bind: () => {}, unbind: () => {} },
};

const DEFAULT_OPTIONS = {
  data: ['elemNo'],
  contexts: ['select'],
  startOnEmptySelection: true,
  style: {
    active: {
      strokeWidth: 2,
      stroke: '#333', // To make it consistent with other charts
    },
    inactive: {
      opacity: 0.3,
    },
  },
};

const ESCAPE = 27;
const ENTER = 13;

/**
 * Create a new Selections handler
 *
 * @param {Object} options
 * @param {Object} options.model The backend model for the chart
 * @param {Object} options.chartInstance Picasso chart instance
 * @param {Object} options.selectionsApi Object selectionsApi
 * @returns {Object} The selections handler instance
 */
function Selections(options) {
  if (!options || !options.model || !options.chartInstance || !options.selectionsApi) {
    throw Error('Selections-handler: Missing input');
  }
  const chartInstance = options.chartInstance;
  const selectionsApi = options.selectionsApi;
  const dataPaths = options.dataPaths || [''];
  const selectPaths = options.selectPaths;

  let selectionContexts = [];
  let ctrlPressed;
  let shiftPressed;
  const selectionsApiRestoreHelper = { propertiesToRestore: {} };
  let on = false;
  const actions = Actions(chartInstance, selectionsApi, selectPaths);

  // Not need for a function, so turned it into an object
  const fn = {};

  // Chart-wide functionality
  function ctrlToggle(pressed) {
    ctrlPressed = pressed;
  }

  function shiftToggle(pressed) {
    shiftPressed = pressed;
    // We run this here so that the selections toolbar can pick up the changed state
    selectionsApi.refreshToolbar();
  }

  function keyPressed(key) {
    if (key === ESCAPE) {
      selectionsApi.cancel();
    } else if (key === ENTER) {
      selectionsApi.confirm();
    }
  }

  // If a single field in a single table is not locked, this function returns false
  function areAllFieldsLocked() {
    let dimFields = dataPaths.map((dataPath) =>
      chartInstance
        .dataset(dataPath)
        .fields()
        .filter((field) => field.type() === 'dimension')
    );

    // flattern list
    dimFields = [].concat.apply([], dimFields);

    return dimFields.length && dimFields.every((field) => field.raw().qLocked);
  }

  // If a single field in a single table is not locked, this function returns false
  function getFieldsLocked() {
    const lockedFields = [];
    let dimFields = dataPaths.map((dataPath) =>
      chartInstance
        .dataset(dataPath)
        .fields()
        .filter((field) => field.type() === 'dimension')
    );

    // flattern list
    dimFields = [].concat.apply([], dimFields);

    for (let i = 0; i < dimFields.length; i++) {
      if (dimFields[i].raw().qLocked) {
        lockedFields.push(dimFields[i].raw());
      }
    }
    return {
      fields: lockedFields,
      areAllFieldsLocked: lockedFields.length && lockedFields.length === dimFields.length,
    };
  }

  function isLassoDisabled() {
    return options.isLassoDisabled && options.isLassoDisabled();
  }

  // TODO - Do not override clear like this, add watch functionality to it
  const selectionsApiClearFn = selectionsApi.clear.bind(selectionsApi);
  selectionsApi.clear = function () {
    // eslint-disable-line no-param-reassign
    selectionContexts.forEach((context) => {
      context.brush.clear();
      // Clear dependent components
      context.dependentComponents.forEach((comp) => {
        const instance = chartInstance.component(comp.id);
        if (instance) {
          instance.emit(comp.clear);
        }
      });
    });
    selectionsApiClearFn();
  };

  // Setup a selection context
  /*
        builder - instance of chart-builder
        componentKeys = []
        options = {
            contexts: [],
            data: [],
            style: {}
        }
    */
  /**
   * Setup a selection context
   * @param {Object} options Selection context options
   * @returns {Object} The selections handler instance
   */
  fn.setUp = function (options) {
    fn.tearDown();

    const result = this.setUpBrush(options);

    if (on) {
      register();
    }

    return result;
  };
  fn.setUpBrush = function (options) {
    const opts = extend(true, {}, DEFAULT_OPTIONS, options);

    const selectionTrigger = {
      on: 'tap',
      action() {
        return ctrlPressed || options.isSingleSelect ? 'set' : 'toggle';
      },
      contexts: opts.contexts,
      data: opts.data,
      globalPropagation: 'stop',
    };

    const selectionConsumer = {
      context: opts.contexts[0],
      data: opts.data,
      style: opts.style,
    };

    const context = createContext(opts, chartInstance);
    // Do this here instead of in register to be able to catch the consumer
    context.listeners.toggle = function (items) {
      // eslint-disable-line no-param-reassign
      if (!on) {
        return [];
      }
      const fieldsLocked = getFieldsLocked();
      if (opts.startOnEmptySelection && items.length === 0 && fieldsLocked.areAllFieldsLocked) {
        eventUtils.showLockedFeedback(fieldsLocked.fields);
        return [];
      }
      return actions.toggleValues(items, context.brush, opts.startOnEmptySelection);
    };

    // Add all three to cover tap, brush range and lasso
    context.brush.intercept('toggle-values', context.listeners.toggle);
    context.brush.intercept('add-values', context.listeners.toggle);
    context.brush.intercept('remove-values', context.listeners.toggle);
    context.brush.intercept('set-values', context.listeners.toggle);

    context.listeners.start = function () {
      if (selectionContexts.length > 1) {
        selectionContexts.forEach((c) => {
          if (c !== context) {
            c.brush.end();
          }
        });

        if (selectionsApi.canClear()) {
          selectionsApi.clear();
        }
      }
    };

    selectionContexts.push(context);

    return { trigger: selectionTrigger, consume: selectionConsumer };
  };
  fn.setUpStart = function () {
    fn.tearDown();
  };
  fn.setUpDone = function () {
    if (on) {
      register();
    }
  };

  fn.tearDown = function () {
    if (on) {
      deregister();
    }
    selectionContexts.forEach((context) => {
      context.brush.removeInterceptor('toggle-values', context.listeners.toggle);
      context.brush.removeInterceptor('add-values', context.listeners.toggle);
      context.brush.removeInterceptor('remove-values', context.listeners.toggle);
      context.brush.removeInterceptor('set-values', context.listeners.toggle);
    });
    selectionContexts = [];
  };

  function register() {
    selectionContexts.forEach((context) => {
      context.listeners.update = function (added, removed) {
        // eslint-disable-line no-param-reassign
        // On tap end, picaso will run rendering in the same frame, and if this is a heavy job then long tap end will happen before tap end finish. This can trigger the radial context menu.
        // So we prevent long tap end here.
        Touche.preventGestures();
        if (!context.sleep) {
          actions.update(added, removed, context.brush);
        }
      };
      context.brush.on('update', context.listeners.update);
      context.brush.on('start', context.listeners.start);
    });
  }

  function deregister() {
    selectionContexts.forEach((context) => {
      context.brush.removeListener('update', context.listeners.update);
      context.brush.removeListener('start', context.listeners.start);
    });
  }

  fn.pauseEngineCalls = function (id) {
    selectionContexts.forEach((context) => {
      if (context.id === id) {
        context.sleep = true; // eslint-disable-line no-param-reassign
      }
    });
  };

  fn.resumeEngineCalls = function (id, run) {
    selectionContexts.forEach((context) => {
      if (context.id === id) {
        context.sleep = false; // eslint-disable-line no-param-reassign
        if (run) {
          context.listeners.update([], []);
        }
      }
    });
  };

  fn.addComponent = function (id, comp) {
    selectionContexts.forEach((context) => {
      if (context.id === id) {
        context.dependentComponents.push(comp);
      }
    });
  };

  let lasso = false;

  fn.on = function () {
    if (on) {
      return;
    }
    on = true;

    register();

    interaction.CtrlToggle.bind(ctrlToggle);
    interaction.ShiftToggle.bind(shiftToggle);

    const onDeactivated = () => {
      selectionContexts.forEach((context) => {
        context.brush.end();
      });
      interaction.KeyPressed.unbind(keyPressed);
      lasso = false;
    };
    selectionsApi.on('deactivated', onDeactivated);
    selectionsApiRestoreHelper.unbindDeactivated = () => {
      selectionsApi.removeListener('deactivated', onDeactivated);
    };

    const onActivated = () => {
      interaction.KeyPressed.bind(keyPressed);
    };
    selectionsApi.on('activated', onActivated);
    selectionsApiRestoreHelper.unbindActivated = () => {
      selectionsApi.removeListener('activated', onActivated);
    };
  };
  fn.isOn = () => on;
  fn.off = function () {
    if (!on) {
      return;
    }
    on = false;
    deregister();

    interaction.CtrlToggle.unbind(ctrlToggle);
    interaction.ShiftToggle.unbind(shiftToggle);
    interaction.KeyPressed.unbind(keyPressed);

    selectionsApiRestoreHelper.unbindActivated();
    selectionsApiRestoreHelper.unbindDeactivated();
  };

  fn.lassoState = function () {
    return shiftPressed && !isLassoDisabled() ? !lasso : lasso;
  };
  fn.toggleLasso = function () {
    lasso = !lasso;
  };
  fn.allFieldsLocked = function () {
    return areAllFieldsLocked();
  };

  /* fn.destroy = function () {
    } */

  return fn;
}

export default {
  create(model) {
    return Selections(model);
  },
};

// Internal Utils

function createContext(options, chartInstance) {
  return {
    brush: chartInstance.brush(options.contexts[0]), // TODO - Need multi context support?
    listeners: {},
    dependentComponents: [],
    id: options.contexts[0],
  };
}
