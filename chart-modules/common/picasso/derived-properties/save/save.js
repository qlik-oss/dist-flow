import SoftPropertyHandler from '../../../extra/soft-property-handler';
import hardPropertiesChecker from '../../../extra/hard-properties-checker';

export default {
  // eslint-disable-next-line no-use-before-define
  saveDerivedProperties,
};

/**
 * Implementation details
 */

function saveDerivedProperties(model, layout, properties, prevProperties, state) {
  // Can't set new properties on a master item (SUI-1363)

  if (hardPropertiesChecker.canModifyHardProperties(state, model, layout)) {
    return model.setProperties(properties);
  }

  const softPropertyHandler = new SoftPropertyHandler(model);
  return softPropertyHandler.saveSoftProperties(prevProperties, properties);
}
