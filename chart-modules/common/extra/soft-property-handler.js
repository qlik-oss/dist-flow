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

  async mergeSoftPatches() {
    if (!this._model) {
      return;
    }

    const propertiesPromise = this._model.getProperties();
    const effectivePromise = this._model.getEffectiveProperties();

    const properties = await propertiesPromise;
    const effective = await effectivePromise;

    if (properties.qExtendsId) {
      return;
    }
    const patches = JSONPatch.generate(properties, effective);
    JSONPatch.apply(properties, patches);

    const self = this;
    self._model.setProperties(properties).then(() => {
      self._model.clearSoftPatches();
    });
  }
}

export default SoftPropertyHandler;
