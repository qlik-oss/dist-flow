/**
 * Disclaimer component for Picasso base charts
 *
 * @exports objects.picasso/disclaimer/disclaimer
 */

import extend from 'extend';
import DisclaimersConfig from './disclaimers-config';
import AttributesUtil from './disclaimer-attributes-util';
import DisclaimerComponentHelper from './disclaimer-component-helper';

Disclaimer.ERRORS = {
  SET: 'Calling Disclaimer.set() without attributes',
  DISPLAY: 'Calling Disclaimer.display() before attributes are applied',
};

/**
 * Create new disclaimer component
 * @param {Object} options - A reference to chart options
 * @constructor
 */
function Disclaimer(environment) {
  this.environment = environment;
  this.clear();
}

Disclaimer._applyDefaultSupport = function (supportedDisclaimers, disclaimersConfig) {
  let supported = supportedDisclaimers;
  if (!supported) {
    supported = {};
  }
  disclaimersConfig.forEach((config) => {
    if (supported[config.label] === undefined) {
      supported[config.label] = config.default;
    }
  });
  return supported;
};

Disclaimer.prototype.getComponentSettings = function () {
  const { translator } = this.environment;
  const supportedDisclaimers = extend(true, {}, this.vizAttributes.supportedDisclaimers);
  const helper = new DisclaimerComponentHelper(
    DisclaimersConfig.DISCLAIMERS,
    this.dataAttributes,
    supportedDisclaimers
  );

  let message;
  let dock;
  if (helper.isAnyValidDisclaimer(DisclaimersConfig.ALIGNMENT.CENTER)) {
    message = helper.getMessage(DisclaimersConfig.ALIGNMENT.CENTER, translator);
    dock = 'center';
  } else if (helper.isAnyValidDisclaimer(DisclaimersConfig.ALIGNMENT.BOTTOM)) {
    message = helper.getMessage(DisclaimersConfig.ALIGNMENT.BOTTOM, translator);
    dock = 'bottom';
  } else {
    return undefined;
  }

  return {
    key: 'disclaimer',
    type: 'disclaimer',
    layout: {
      displayOrder: 1000,
      dock,
    },
    settings: {
      label: message,
      rtl: this.environment?.options?.direction === 'rtl',
    },
  };
};

/**
 * Set attributes that configures disclaimers for a charts
 * @param {Object} attributes - Disclaimer settings for a chart
 */
Disclaimer.prototype.set = function (attributes) {
  this.clear();
  if (attributes) {
    this.vizAttributes = attributes;
    this.dataAttributes = AttributesUtil.applyAttributes(this.vizAttributes.options, this.vizAttributes.data);
  } else {
    throw new Error(Disclaimer.ERRORS.SET);
  }
};

/**
 * Clears disclaimer settings
 */
Disclaimer.prototype.clear = function () {
  this.vizAttributes = null;
  this.dataAttributes = null;
};

export default Disclaimer;
