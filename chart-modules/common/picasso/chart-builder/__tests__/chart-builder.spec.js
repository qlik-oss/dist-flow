import chai from 'chai';
import ChartBuilder from '../chart-builder';

const expect = chai.expect;

describe('chart builder', () => {
  let theme;
  beforeEach(() => {
    theme = {
      getStyle: jest.fn(),
    };
  });

  it('should create correct component types', () => {
    expect(ChartBuilder.createComponent('axis', null, { theme }).type).to.equal('axis');
    expect(ChartBuilder.createComponent('x-axis', null, { theme }).type).to.equal('axis');
    expect(ChartBuilder.createComponent('y-axis', null, { theme, source: 's' }).type).to.equal('axis');
    expect(ChartBuilder.createComponent('box-marker').type).to.equal('box-marker');
    expect(ChartBuilder.createComponent('point-marker').type).to.equal('point-marker');
    expect(ChartBuilder.createComponent('scrollbar', null, { theme }).type).to.equal('scrollbar');
    expect(ChartBuilder.createComponent('text', null, { theme }).type).to.equal('text');
    expect(ChartBuilder.createComponent('x-axis-title', null, { theme }).type).to.equal('text');
    expect(ChartBuilder.createComponent('y-axis-title', null, { theme }).type).to.equal('text');
    expect(ChartBuilder.createComponent('event-area').type).to.equal('event-area');
    expect(ChartBuilder.createComponent('grid-line', null, { theme }).type).to.equal('grid-line');
  });

  it('builds components', () => {
    const chartBuilder = new ChartBuilder();
    chartBuilder.addComponent('axis', null, { theme });
    chartBuilder.addComponent('grid-line', null, { theme });
    const components = chartBuilder.getSettings().components;
    expect(components.length).to.equal(2);
    expect(components[0].type).to.equal('axis');
    expect(components[1].type).to.equal('grid-line');
  });

  it('validates keys', () => {
    const validComponents = [
      ChartBuilder.createComponent('axis', null, { theme }),
      ChartBuilder.createComponent('grid-line', null, { theme }),
    ];
    expect(ChartBuilder.validateComponentKeys(validComponents).length).to.equal(0);
    expect(ChartBuilder.validateComponentKeys([]).length).to.equal(0);

    const invalidComponents = [
      ChartBuilder.createComponent('axis', null, { theme }),
      ChartBuilder.createComponent('axis', null, { theme }),
    ];
    expect(ChartBuilder.validateComponentKeys(invalidComponents).length).to.equal(1);
    expect(ChartBuilder.validateComponentKeys([{}]).length).to.equal(1);
  });
});
