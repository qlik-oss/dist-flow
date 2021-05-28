// import '../../../../../test/unit/node-setup';
import chai from 'chai';
import distributionPlotColorBy from '../distributionplot-color-by';

const expect = chai.expect;
describe('distributionplot-color-by', () => {
  let exportedProperties;
  let importedProperties;
  beforeEach(() => {
    exportedProperties = {
      color: {
        auto: true,
        mode: 'single',
        expressionIsColor: true,
        colorExpression: '=expression',
        point: {},
      },
    };

    importedProperties = {
      color: {
        point: {
          auto: true,
          mode: 'single',
          expressionIsColor: true,
          expression: {
            // should change how the expression used color by expression is stored
            qValueExpression: {
              qExpr: '=expression',
            },
          },
        },
      },
    };
  });

  describe('import', () => {
    it('should move color settings to color point', () => {
      const properties = exportedProperties;
      distributionPlotColorBy.importColors(properties);
      expect(properties).to.deep.equals(importedProperties);
    });

    it('should set expressionIsColor to true', () => {
      const properties = exportedProperties;
      properties.color.expressionIsColor = false;
      distributionPlotColorBy.importColors(properties);
      expect(properties.color.point.expressionIsColor).to.equals(true);
    });
  });

  describe('export', () => {
    it('should move color settings to color point', () => {
      const properties = importedProperties;
      distributionPlotColorBy.exportColors(properties);
      expect(properties).to.deep.equals(exportedProperties);
    });
  });
});
