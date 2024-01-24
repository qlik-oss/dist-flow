import AdvancedColorer from '../advanced-colorer';

describe('advanced-color', () => {
  describe('resolveColorByPropertyDef', () => {
    test('should set labelExpRef when dimension label is expression', () => {
      const properties = { byDimDef: { type: 'expression', label: '=1' } };
      const isDim = true;
      const dimensions = [{}];
      const exclDimensions = [];
      const measures = {};
      const customLabel = undefined;
      AdvancedColorer.resolveColorByPropertyDef(properties, isDim, dimensions, exclDimensions, measures, customLabel);

      console.log(JSON.stringify(dimensions[0]));

      expect(dimensions[0].qAttributeDimensions[0].labelExpRef).toBe('color.altLabel');
    });
  });
});
