import chai from 'chai';
import sinon from 'sinon';
import histogramNumericValuesHandler from '../histogram-numeric-values-handler';
import libraryUtils from '../../../../assets/objects/utils/data-properties/library-utils';
import derivedFieldFormatter from '../../../../assets/client/assets/tab-contents/fields/derived-field-formatter-service';
import qvangular from '../../../../assets/qvangular/qvangular';

const expect = chai.expect;
let sandbox;
let mockupScope;

describe('When testing filtering function', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(derivedFieldFormatter, 'trimAutoCalendarName').callsFake(() => 'bla bla');
  });

  afterEach(() => {
    sandbox.restore();
    if (mockupScope) {
      mockupScope.$destroy();
    }
    window.qvangularGlobal.$apply(window.qvangularGlobal.$rootScope);
  });

  describe('When having mixed numerical and non-numerical fields and dimensions', () => {
    beforeEach(() => {
      const fields = [
        {
          isDateField: false,
          isGeoField: false,
          qName: 'FilmID',
          qTags: ['$key', '$numeric', '$integer'],
        },
        {
          isDateField: false,
          isGeoField: false,
          qName: 'Actor',
          qTags: ['$text'],
        },
        {
          isDateField: false,
          isGeoField: false,
          qName: 'Length',
          qTags: ['$key', '$numeric'],
        },
        {
          isDateField: false,
          isGeoField: false,
          qName: 'Director',
          qTags: ['$text'],
        },
      ];

      sandbox.stub(libraryUtils, 'getSortedFields').callsFake(() => Promise.resolve(fields));

      mockupScope = qvangular.$rootScope.$new(true);
      qvangular.getService('$controller')(histogramNumericValuesHandler.addDimensionPopoverComponent.controller, {
        $scope: mockupScope,
      });
      mockupScope.$apply();
    });

    it('should remove non-numeric fields', () => {
      expect(mockupScope.fields.length).to.equal(2);
    });
  });

  describe('When having only numerical fields and dimensions', () => {
    beforeEach(() => {
      const fields = [
        {
          isDateField: false,
          isGeoField: false,
          qName: 'FilmID',
          qTags: ['$key', '$numeric', '$integer'],
        },
        {
          isDateField: false,
          isGeoField: false,
          qName: 'Length',
          qTags: ['$key', '$numeric'],
        },
        {
          isDateField: false,
          isGeoField: false,
          qName: 'RatingStar',
          qTags: ['$integer', '$numeric'],
        },
      ];

      sandbox.stub(libraryUtils, 'getSortedFields').callsFake(() => Promise.resolve(fields));

      mockupScope = qvangular.$rootScope.$new(true);
      qvangular.getService('$controller')(histogramNumericValuesHandler.addDimensionPopoverComponent.controller, {
        $scope: mockupScope,
      });
      mockupScope.$apply();
    });

    it('should not remove any fields', () => {
      expect(mockupScope.fields.length).to.equal(3);
    });
  });

  describe('When having only non-numerical fields and dimensions', () => {
    beforeEach(() => {
      const fields = [
        {
          isDateField: false,
          isGeoField: false,
          qName: 'Actor',
          qTags: ['$text'],
        },
        {
          isDateField: false,
          isGeoField: false,
          qName: 'Director',
          qTags: ['$text'],
        },
      ];

      sandbox.stub(libraryUtils, 'getSortedFields').callsFake(() => Promise.resolve(fields));

      mockupScope = qvangular.$rootScope.$new(true);
      qvangular.getService('$controller')(histogramNumericValuesHandler.addDimensionPopoverComponent.controller, {
        $scope: mockupScope,
      });
      mockupScope.$apply();
    });

    it('should remove all fields', () => {
      expect(mockupScope.fields.length).to.equal(0);
    });
  });
});
