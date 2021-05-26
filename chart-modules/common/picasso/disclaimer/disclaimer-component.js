/**
 * UI component for disclaimers
 *
 */

import template from './disclaimer-component.ng.html';
import DisclaimersConfig from './disclaimers-config';
import DisclaimerComponentHelper from './disclaimer-component-helper';
import translator from '../../../../js/lib/translator';

export default {
  template,
  scope: {
    dataAttributes: '=',
    direction: '=',
    supportedDisclaimers: '=',
    onRender: '=',
  },
  controller: [
    '$scope',
    '$timeout',
    function ($scope, $timeout) {
      const helper = new DisclaimerComponentHelper(
        DisclaimersConfig.DISCLAIMERS,
        $scope.dataAttributes,
        $scope.supportedDisclaimers
      );

      $scope.centerDisclaimer = {
        show: helper.isAnyValidDisclaimer(DisclaimersConfig.ALIGNMENT.CENTER),
        message: helper.getMessage(DisclaimersConfig.ALIGNMENT.CENTER, translator),
      };

      $scope.outerDisclaimer = {
        show: helper.isAnyValidDisclaimer(DisclaimersConfig.ALIGNMENT.BOTTOM),
        message: helper.getMessage(DisclaimersConfig.ALIGNMENT.BOTTOM, translator),
      };

      // To be able to check RTL flag
      $scope.languageString = translator.get('Object.Disclaimer.LimitedData');

      $timeout(() => {
        $scope.onRender();
      }, 5);
    },
  ],
};
