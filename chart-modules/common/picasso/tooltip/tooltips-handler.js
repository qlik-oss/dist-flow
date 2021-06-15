import extend from 'extend';
// import Support from '../../../general/utils/support';
import TooltipAction from './tooltip-actions';
import formatting from '../formatting';
import { createFilter, createContent } from './tooltip-content';
import createTooltip from './tooltips-component';

// TODO: useDeviceType
const Support = { treatAsDesktop: () => true };

const DEFAULT_OPTIONS = {
  tooltipKey: 'tooltip',
  data: [''],
  contexts: ['tooltip'],
  headerResolver(values) {
    return values.join(', ');
  },
  rowResolver(field, measureContent) {
    return {
      value: formatting.formatMeasureValue(field, measureContent),
      label: field.title(),
    };
  },
  direction: 'ltr',
};

/**
 * Create a new Tooltips handler
 *
 * @param {Object} model The backend model for the chart
 * @param {Object} chartInstance Picasso chart instance
 * @param {Object} tooltipApi Object tooltipApi
 * @returns {Object} The selections handler instance
 */
function Tooltips(chartInstance, tooltipApi, $element, chartType) {
  if (!chartInstance /* || !tooltipApi */) {
    throw Error('Tooltips-handler: Missing input');
  }

  let tooltipContexts = {};
  let on = false;

  // Override the default action in object.js (which does nothing). Other charts do the same in default-controller.js
  if (tooltipApi) {
    tooltipApi.cancel = function () {
      // eslint-disable-line no-param-reassign
      closeTooltip();
    };
  }

  // Not need for a function, so turned it into an object
  const fn = {};

  /**
   * Setup a tooltips context
   * @param {Object} options Tooltip context options
   * @returns {Object} The selections handler instance
   */
  fn.setUp = function (options) {
    const opts = extend(true, {}, DEFAULT_OPTIONS, options);

    if (!opts.componentKey) {
      throw Error('Tooltips-handler.setUp: Missing required input');
    }

    if (tooltipContexts[opts.contexts[0]] && on) {
      deRegContext(tooltipContexts[opts.contexts[0]]);
    }

    const context = createContext(opts, chartInstance);
    tooltipContexts[opts.contexts[0]] = context;

    if (on) {
      registerContext(context);
    }

    const tooltipInfo = {
      data: context.data,
      headerResolver: context.headerResolver,
      rowResolver: context.rowResolver,
      direction: context.direction,
      chartView: context.chartView,
      attrDimPath: context.attrDimPath,
      measureRows: context.measureRows,
      labelData: context.labelData,
      filterShapes: context.filterShapes,
      dataPath: options.dataPath,
      chartInstance,
    };

    // const dataset = chartInstance.dataset(dataPath);

    const component = createTooltip({
      key: options.tooltipKey,
      rtl: context.direction === 'rtl',
      fontFamily: options.chartView.theme.getStyle(chartType, 'tooltip', 'fontFamily'),
      filter: createFilter(context.filterShapes),
      content: createContent(tooltipInfo, options.dataPath),
    });

    const settings = options.chartBuilder.getSettings();
    settings.components.push(component);

    return {
      trigger: {
        on: Support.treatAsDesktop() ? 'over' : 'tap',
        action: 'set',
        contexts: opts.contexts,
        data: opts.data,
        globalPropagation: 'stop',
      },
      consume: opts.contexts.map((c) => ({ context: c })),
      component,
    };
  };

  fn.tearDown = function () {
    if (on) {
      deregister();
    }
    tooltipContexts = [];
  };

  function register() {
    Object.keys(tooltipContexts).forEach((key) => {
      registerContext(tooltipContexts[key]);
    });
  }

  function registerContext(context) {
    context.listeners.update = function (added, removed) {
      // eslint-disable-line no-param-reassign
      const tooltipInfo = {
        data: context.data,
        headerResolver: context.headerResolver,
        rowResolver: context.rowResolver,
        direction: context.direction,
        chartView: context.chartView,
        attrDimPath: context.attrDimPath,
        measureRows: context.measureRows,
        labelData: context.labelData,
        filterShapes: context.filterShapes,
      };

      context.action.update(added, removed, tooltipInfo);
    };
    context.listeners.end = function () {
      // eslint-disable-line no-param-reassign
      context.action.closeTooltip();
    };

    context.brush.on(Support.treatAsDesktop() ? 'update' : 'set-values', context.listeners.update);
    context.brush.on('end', context.listeners.end);
    // Intecept the set-values call to avoid a toggle in the second dimension.
    context.brush.intercept('set-values', context.action.toggleInterceptor);
  }

  function deregister() {
    Object.keys(tooltipContexts).forEach((key) => {
      deRegContext(tooltipContexts[key]);
    });
  }

  function deRegContext(context) {
    context.brush.removeListener(Support.treatAsDesktop() ? 'update' : 'set-values', context.listeners.update);
    context.brush.removeListener('end', context.listeners.end);
    context.brush.removeInterceptor('set-values', context.action.toggleInterceptor);
  }

  function closeTooltip() {
    Object.keys(tooltipContexts).forEach((key) => {
      tooltipContexts[key].action.closeTooltip();
    });
  }

  function mouseLeave() {
    closeTooltip();
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const prop in tooltipContexts) {
      tooltipContexts[prop].brush.clear();
    }
  }

  fn.closeTooltip = closeTooltip;

  fn.on = function () {
    if (on) {
      return;
    }
    on = true;

    register();

    if (Support.treatAsDesktop() && $element) {
      $element.on('mouseleave', mouseLeave);
    }
  };

  fn.off = function () {
    if (!on) {
      return;
    }
    on = false;
    deregister();

    if (Support.treatAsDesktop() && $element) {
      $element.off('mouseleave', mouseLeave);
    }
    closeTooltip();
  };

  /* fn.destroy = function () {
    } */

  return fn;
}

export default {
  create(chartInstance, tooltipApi, $element, chartType) {
    return Tooltips(chartInstance, tooltipApi, $element, chartType);
  },
};

// Internal Utils

function createContext(options, chartInstance) {
  return {
    brush: chartInstance.brush(options.contexts[0]),
    action: TooltipAction.create(
      chartInstance,
      options.componentKey,
      options.data,
      options.contexts[0],
      options.tooltipKey
    ),
    data: options.data,
    headerResolver: options.headerResolver,
    rowResolver: options.rowResolver,
    listeners: {},
    direction: options.direction,
    chartView: options.chartView,
    attrDimPath: options.attrDimPath,
    measureRows: options.measureRows,
    labelData: options.labelData,
    filterShapes: options.filterShapes,
  };
}
