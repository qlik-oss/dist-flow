/**
 * Disclaimer component for Picasso base charts
 *
 * @exports objects.picasso/disclaimer/disclaimer
 */

import $ from 'jquery';
import DisclaimersConfig from './disclaimers-config';
import AttributesUtil from './disclaimer-attributes-util';
import DisclaimerComponent from './disclaimer-component';
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
function Disclaimer(options) {
  this.options = options;
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

/**
 * Returns true if bottom disclaimer should be visible
 * @returns {boolean}
 */
Disclaimer.prototype.getBottomDisclaimerVisibility = function () {
  const helper = new DisclaimerComponentHelper(
    DisclaimersConfig.DISCLAIMERS,
    this.dataAttributes,
    this.vizAttributes.supportedDisclaimers
  );
  return (
    helper.isAnyValidDisclaimer(DisclaimersConfig.ALIGNMENT.BOTTOM) &&
    !helper.isAnyValidDisclaimer(DisclaimersConfig.ALIGNMENT.CENTER)
  );
};

/**
 * Toggles the visibility of bottom disclaimer and star in chart title
 * @param element {Object} chart element
 * @param toggle {Boolean}
 */
Disclaimer.prototype.toggleBottomDisclaimerVisibility = function (element, toggle) {
  const addBottomSpace = !!(toggle || (this.vizAttributes.options && this.vizAttributes.options.paddingBottom));
  this.options.showDisclaimerStar = toggle;
  element.toggleClass('qv-viz-with-disclaimer', addBottomSpace);
};

/**
 * Display valid disclaimers for a charts
 * @param {Object} element - chart element
 */
Disclaimer.prototype.display = function (element) {
  let elem;

  if (this.vizAttributes && this.dataAttributes && this.options) {
    this.vizAttributes.supportedDisclaimers = Disclaimer._applyDefaultSupport(
      this.vizAttributes.supportedDisclaimers,
      DisclaimersConfig.DISCLAIMERS
    );
    elem = $(element);
    elem.siblings('.disclaimer').addClass('to-remove');
    elem.parent().append("<div class='disclaimer'></div>");
    elem
      .siblings('.disclaimer')
      .last()
      .showComponent(DisclaimerComponent, {
        dataAttributes: $.extend(true, {}, this.dataAttributes),
        direction: this.options.direction,
        supportedDisclaimers: $.extend(true, {}, this.vizAttributes.supportedDisclaimers),
        onRender() {
          // Last disclaimer element is removed with a delay for smooth scrolling
          elem.siblings('.disclaimer.to-remove').remove();
        },
      });
    this.toggleBottomDisclaimerVisibility(elem, this.getBottomDisclaimerVisibility());
  } else {
    throw new Error(Disclaimer.ERRORS.DISPLAY);
  }
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
