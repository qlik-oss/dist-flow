import StringNormalization from '../../../utils/string-normalization';
import arrayUtil from '../../../assets/general/utils/array-util';
import support from '../../../assets/general/utils/support';
import addDimensionPopoverComponent from '../../../assets/objects/add-popovers/add-dimension-popover';
import libraryUtils from '../../../assets/objects/utils/data-properties/library-utils';
import derivedFieldFormatter from '../../../assets/client/assets/tab-contents/fields/derived-field-formatter-service';
import NotificationDialog from '../../../assets/client/dialogs/notification-dialog/notification-dialog';

const ITEM_LIMIT = 100;

function filter(data, term) {
  if (term === '' || term === undefined) {
    return data;
  }

  return data.filter((entity) => {
    if (typeof entity.value === 'undefined') {
      return false;
    }
    return (
      StringNormalization.string(entity.value.toLowerCase()).indexOf(StringNormalization.string(term.toLowerCase())) >
      -1
    );
  });
}

/**
 * Checks whether the tag named tag exists in the array named tags
 * @param tags - Array of tags
 * @param tag - The specific tag to check for
 * @returns {Boolean} - Returns true if the tag was found
 */
function containsTag(tags, tag) {
  return tags.indexOf(tag) !== -1;
}

/**
 * Check if the item named is a drop item according to the name of the tag called tagName
 * @param item - item from DropMenuBuilder
 * @param tagName - string representing the name of the tag
 * @returns {Boolean} - Returns true if the tag name exists for every field in library dimension or for a singular field that contains
 * the tag, otherwise false
 */
function isDropItem(item, tagName) {
  if (item.type === 'field') {
    return containsTag(item.tags, tagName);
  }

  return false;
}

/**
 * Handles dragging fields to histogram. The field is only added to the histogram if it is numeric.
 * If the field is not numeric, a popup dialog will show that it was not possible to add the field.
 * @param builder - Object of type DropMenuBuilder.
 * @param histogramHandler - Handler for the histogram containing the properties.
 * @param model - Model containing the layout.
 * @param showMenu - function containing the logic determining if the histogram should proceed to be rendered.
 */
function addField(builder, histogramHandler, model, showMenu) {
  // Histogram only handles numeric fields because we use the class function to generate buckets
  if (!isDropItem(builder.item, '$numeric')) {
    NotificationDialog.show({
      text: 'Visualization.Histogram.NonNumericalMessage',
      headerLabel: 'Common.InvalidAction',
    });
    return;
  }

  // Determine what menu alternative to show
  if (!histogramHandler.canAddDimension()) {
    builder.Replace(model, histogramHandler);
  } else {
    builder.Add(model, histogramHandler);
  }
  showMenu();
}

function filterFields(fieldList, tag) {
  return fieldList.filter((field) => containsTag(field.qTags, tag));
}

export default {
  getDropFieldOptions(builder, histogramHandler, model, showMenu) {
    addField(builder, histogramHandler, model, showMenu);
  },

  getDropDimensionOptions() /* builder, histogramHandler, model, showMenu */ {
    NotificationDialog.show({
      text: 'Visualization.Histogram.NoDimensionsMessage',
      headerLabel: 'Common.InvalidAction',
    });
  },

  addDimensionPopoverComponent: {
    name: 'histogram-data',
    template: addDimensionPopoverComponent.template,
    controller: [
      '$scope',
      function ($scope) {
        $scope.search = {
          term: '',
        };

        $scope.autoFocus = support.treatAsDesktop();

        $scope.getFieldDisplayName = function (field) {
          return $scope.search.term === '' ? field.label : derivedFieldFormatter.trimAutoCalendarName(field.value);
        };

        let cache = null;

        $scope.$watch('search.term', (term) => {
          function setItems() {
            let fields = filter(cache.fields, term);

            if (fields.length > ITEM_LIMIT) {
              fields = arrayUtil.limit(fields, ITEM_LIMIT);
            }

            $scope.fields = fields;
            $scope.dimensions = [];
          }

          if (!cache) {
            libraryUtils.getSortedFields($scope.app).then((fields) => {
              const numericFields = filterFields(fields, '$numeric').map((field) => {
                // Extract the last part of fully qualified derived field name only when you
                const derivedName =
                  field.isDerived && term === ''
                    ? field.qName.substring(field.qName.lastIndexOf('.') + 1, field.qName.length)
                    : field.qName;

                return {
                  toolTip: field.qName,
                  label: derivedName,
                  value: field.qName,
                  trimmedValue: field.displayName,
                  qTags: field.qTags,
                  isDerived: field.isDerived,
                  isDateField: field.isDateField,
                  isGeoField: field.isGeoField,
                };
              });

              cache = {
                fields: numericFields,
              };

              setItems();
            });
          } else {
            setItems();
          }
        });
      },
    ],
    scope: {
      alignTo: '=',
      app: '=',
      addFieldDimension: '=',
      addLibraryDimension: '=',
      qvaOutsideIgnoreFor: '=',
      close: '=',
      position: '=',
      allowExpressionEditor: '@',
    },
  },
};
