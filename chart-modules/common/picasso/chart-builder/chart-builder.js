import extend from 'extend';
import ChartPresets from './chart-presets';
import scale from './scale';
import axis from './components/axis';
import boxMarker from './components/box-marker';
import eventArea from './components/event-area';
import gridLine from './components/grid-line';
import interaction from './components/interaction';
import pointMarker from './components/point-marker';
import scrollbar from './components/scrollbar';
import text from './components/text';
import lasso from './components/lasso';
import range from './components/range';
import refLine from './components/ref-line';
import layoutModes from './layout-modes';
import labels from './components/labels';
import categoricalLegend from './components/categorical-legend';
import sequentialLegend from './components/sequential-legend';
import rangeArea from './components/range-area';

function createComponent(type, settings, options) {
  switch (type) {
    // Picasso components
    case 'scale':
      return scale(settings, options);
    case 'measure-scale':
      return scale.measureScale(settings, options);
    case 'dimension-scale':
      return scale.dimensionScale(settings, options);
    case 'axis':
      return axis(settings, options);
    case 'box-marker':
      return boxMarker(settings, options);
    case 'point-marker':
      return pointMarker(settings, options);
    case 'scrollbar':
      return scrollbar(settings, options);
    case 'text':
      return text(settings, options);
    case 'lasso':
      return lasso(settings, options);
    case 'range':
      return range(settings, options);
    case 'range-area':
      return rangeArea(settings, options);
    case 'categorical-legend':
      return categoricalLegend(settings, options);
    case 'sequential-legend':
      return sequentialLegend(settings, options);
    // Wrapepd picasso components
    case 'x-axis':
      return axis.xAxis(settings, options);
    case 'y-axis':
      return axis.yAxis(settings, options);
    case 'x-axis-title':
      return text.xAxisTitle(settings, options);
    case 'y-axis-title':
      return text.yAxisTitle(settings, options);
    case 'grid-line':
      return gridLine(settings, options);
    case 'interaction':
      return interaction(settings, options);
    case 'ref-line':
      return refLine(settings, options);
    // Custom components
    case 'event-area':
      return eventArea(settings, options);
    case 'labels':
      return labels(settings, options);
    default:
      return undefined;
  }
}

function ChartBuilder(options) {
  this.options = options || {};

  this.settings = {
    dockLayout: {
      layoutModes: layoutModes(),
    },
    components: [],
    scales: {},
  };
}

ChartBuilder.prototype.addComponent = function addComponent(type, settings, options) {
  const extendedOptions = extend(true, {}, this.options, options || {});
  const component = createComponent(type, settings, extendedOptions);
  this.settings.components.push(component);
  return component;
};

ChartBuilder.prototype.addInteraction = function addInteraction(settings, options) {
  const extendedOptions = extend(true, {}, this.options, options || {});
  const component = createComponent('interaction', settings, extendedOptions);
  if (!this.settings.interactions) {
    this.settings.interactions = [];
  }
  this.settings.interactions.push(component);
  return component;
};

ChartBuilder.prototype.addScale = function addScale(type, settings, options) {
  const extendedOptions = extend(true, {}, this.options, options || {});
  const scale = createComponent(type, settings, extendedOptions);
  this.settings.scales[scale.name] = scale.component;
};

ChartBuilder.prototype.getSettings = function getSettings() {
  return this.settings;
};

ChartBuilder.prototype.getComponent = function getComponent(key) {
  return this.settings.components.filter((component) => component.key === key)[0];
};

ChartBuilder.prototype.addPreset = function addPreset(type, options) {
  ChartPresets(type, this, options);
};

ChartBuilder.validateComponentKeys = function validateComponentKeys(components) {
  const keys = {};
  return components
    .map((component) => {
      const key = component.key;
      if (!key) {
        return `Missing key for component ${component.type}`;
      }
      if (keys[key]) {
        return `Duplicate key for component ${component.type}`;
      }
      keys[key] = true;
      return null;
    })
    .filter((msg) => !!msg);
};

/*
 * Factory function
 */
ChartBuilder.create = function (options) {
  return new ChartBuilder(options);
};

ChartBuilder.createComponent = createComponent;

export default ChartBuilder;
