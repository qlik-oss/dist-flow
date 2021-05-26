import extend from 'extend';
import JSONPatch from './json-patch';

class SoftPropertyHandler {
  constructor(model) {
    this._model = model;
  }

  setModel(model) {
    this._model = model;
  }

  saveSoftProperties(prevEffectiveProperties, effectiveProperties) {
    if (!this._model) {
      return Promise.resolve(false);
    }

    let patches = JSONPatch.generate(prevEffectiveProperties, effectiveProperties);
    extend(true, prevEffectiveProperties, effectiveProperties);

    if (patches && patches.length) {
      patches = patches.map((p) => ({
        qOp: p.op,
        qValue: JSON.stringify(p.value),
        qPath: p.path,
      }));

      return this._model.applyPatches(patches, true).then(() => true);
    }
    return Promise.resolve(false);
  }

  mergeSoftPatches() {
    if (!this._model) {
      return Promise.resolve();
    }

    const self = this;

    return Promise.all({
      properties: this._model.getProperties(),
      effective: this._model.getEffectiveProperties(),
    }).then((args) => {
      if (args.properties.qExtendsId) {
        return;
      }
      const patches = JSONPatch.generate(args.properties, args.effective);
      JSONPatch.apply(args.properties, patches);
      self._model.setProperties(args.properties).then(() => {
        self._model.clearSoftPatches();
      });
    });
  }
}

export default SoftPropertyHandler;
