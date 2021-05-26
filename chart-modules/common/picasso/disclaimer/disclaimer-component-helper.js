/**
 * Helper for disclaimer component
 *
 */

/**
 * Create new Helper for disclaimer
 * @param disclaimersConfig {Array} List of disclaimer config objects
 * @param dataAttributes {Object} Config for which disclaimers that are valid to show
 * @param supportedDisclaimers {Object} Config for which disclaimers that are supported
 * @constructor
 */
function Helper(disclaimersConfig, dataAttributes, supportedDisclaimers) {
  this.disclaimersConfig = disclaimersConfig;
  this.dataAttributes = dataAttributes;
  this.supportedDisclaimers = supportedDisclaimers;
}

function isValid(label, list) {
  return label && list && list[label];
}

/**
 * Returns true if disclaimer config is valid, supported and has an alignment
 * @param disclaimer {Object} Configuration for a disclaimer
 * @param alignment {Integer} Alignment value in disclaimers config
 * @returns {Boolean}
 */
Helper.prototype.isValidAndSupported = function (disclaimer, alignment) {
  return (
    isValid(disclaimer.label, this.dataAttributes) &&
    (disclaimer.default || isValid(disclaimer.label, this.supportedDisclaimers)) &&
    alignment !== undefined &&
    disclaimer.alignment === alignment
  );
};

/**
 * Returns true if there are any valid disclaimers for an alignment
 * @param alignment {Integer} Alignment value in disclaimers config
 * @returns {Boolean}
 */
Helper.prototype.isAnyValidDisclaimer = function (alignment) {
  let result = false;
  const self = this;
  this.disclaimersConfig.forEach((config) => {
    if (self.isValidAndSupported(config, alignment)) {
      result = true;
    }
  });
  return result;
};

/**
 * Gets all translated disclaimer messages for an alignment
 * @param alignment {Integer} Alignment value in disclaimers config
 * @param translator {Object} Translator component
 * @returns {string}
 */
Helper.prototype.getMessage = function (alignment, translator) {
  let str = '';
  const self = this;
  if (translator) {
    this.disclaimersConfig.forEach((config) => {
      if (self.isValidAndSupported(config, alignment)) {
        str += `${translator.get(`Object.Disclaimer.${config.label}`)} `;
      }
    });
  }
  return str;
};

export default Helper;
