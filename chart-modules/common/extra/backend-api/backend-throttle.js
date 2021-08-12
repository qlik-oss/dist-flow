import extend from 'extend';
import EngineThrottle from './engine-throttle';

const defaultOptions = {
  enabled: true,
  debouncing: {
    enabled: true,
    delay: 50,
  },
};

class Cache {
  constructor(model, responseProperty, path /* , opts */) {
    this.model = model;
    this.responseProperty = responseProperty;
    this.options = {};
    this.setOptions({});
    this.setPath(path);

    this.throttle = new EngineThrottle({
      onSend: (areas, dfd) => {
        dfd.resolve(this.model[this.method](this.path, areas));
      },
    });

    this._modelBinding = () => {
      this.clear();
    };

    this.model.Invalidated.bind(this._modelBinding);
  }

  setMethodName(s) {
    this.method = s;
  }

  setPath(s) {
    this.path = s;
  }

  setOptions(opts) {
    this.options = extend(true, {}, defaultOptions, this.options, opts);

    this.enabled = this.options.enabled || false;
    this.debouncing = {
      enabled: this.options.debouncing.enabled || false,
      delay: this.options.debouncing.delay || -1,
    };
  }

  clear() {
    if (this.throttle) {
      this.throttle.clear();
    }
  }

  destroy() {
    this.throttle.destroy();
    if (this.model && this.model.Invalidated) {
      this.model.Invalidated.unbind(this._modelBinding);
    }
    this._modelBinding = null;
    delete this.model;
    delete this.throttle;
  }

  set() {
    this.clear();
  }

  getData(areas) {
    if (!this.enabled) {
      return this.model[this.method](this.path, areas);
    }

    return this.throttle.queue(areas);
  }
}

export default Cache;
