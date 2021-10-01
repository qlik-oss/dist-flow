import extend from 'extend';
import Hash from './hash/hash';
import HashBuilder from './hash/hash-builder';
import Save from './save/save';
import InputValidator from './input-validator/input-validator';

function DerivedProperties() {
  this._generationInProgress = false;
}

DerivedProperties.prototype.isDerivedUpToDate = isDerivedUpToDate;
DerivedProperties.prototype.updateDerivedProperties = updateDerivedProperties;
DerivedProperties.prototype.addDefaultHyperCubeHash = addDefaultHyperCubeHash;

export default DerivedProperties;

function isDerivedUpToDate(settings) {
  InputValidator.validate(settings);

  const properties = settings.properties;
  const hash = Hash.generateHash(settings.hashData);

  if (!properties.qUndoExclude || properties.qUndoExclude.hashCode !== hash) {
    return false;
  }

  return true;
}

// Returns a boolean flag if properties actually are being updated or not
function updateDerivedProperties(settings) {
  InputValidator.validate(settings);

  if (this._generationInProgress) {
    return Promise.resolve(true);
  }

  if (isDerivedUpToDate(settings)) {
    const layoutIsUpdated =
      settings.layout.qUndoExclude &&
      settings.layout.qUndoExclude.hashCode === settings.properties.qUndoExclude.hashCode;
    return Promise.resolve(!layoutIsUpdated);
  }

  const self = this;
  const model = settings.model;
  const layout = settings.layout;
  const properties = extend(true, {}, settings.properties);
  const prevProperties = extend(true, {}, properties);

  this._generationInProgress = true;

  Hash.updateHash(properties, settings.hashData);

  return settings.generateDerivedProperties(layout, properties).then(() =>
    Save.saveDerivedProperties(model, layout, properties, prevProperties).then(() => {
      self._generationInProgress = false;

      return Promise.resolve(true);
    })
  );
}

function addDefaultHyperCubeHash(hyperCubeDef, hyperCube, app, settings) {
  return HashBuilder.getDefaultHashDataForHyperCube(hyperCubeDef, hyperCube, app).then((defaultSettings) =>
    extend(true, settings, defaultSettings)
  );
}
