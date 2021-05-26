export default {
  validate,
};

/**
 * Implementation details
 */

function validate(settings) {
  if (
    !settings ||
    !settings.layout ||
    !settings.properties ||
    !settings.model ||
    !settings.hashData ||
    !settings.generateDerivedProperties
  ) {
    throw Error('Derived-properties: Missing input');
  }
}
