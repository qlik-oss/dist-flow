import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import ChartBuilder from '../chart-builder';

const expect = chai.expect;

describe('chart builder', () => {
  it('should create correct component types', () => {
    expect(ChartBuilder.createComponent('axis').type).to.equal('axis');
    expect(ChartBuilder.createComponent('x-axis').type).to.equal('axis');
    expect(ChartBuilder.createComponent('y-axis', null, { source: 's' }).type).to.equal('axis');
    expect(ChartBuilder.createComponent('box-marker').type).to.equal('box-marker');
    expect(ChartBuilder.createComponent('point-marker').type).to.equal('point-marker');
    expect(ChartBuilder.createComponent('scrollbar').type).to.equal('scrollbar');
    expect(ChartBuilder.createComponent('text').type).to.equal('text');
    expect(ChartBuilder.createComponent('x-axis-title').type).to.equal('text');
    expect(ChartBuilder.createComponent('y-axis-title').type).to.equal('text');
    expect(ChartBuilder.createComponent('event-area').type).to.equal('event-area');
    expect(ChartBuilder.createComponent('grid-line').type).to.equal('grid-line');
    // expect(ChartBuilder.createComponent('interaction').type).to.equal('interaction');
  });

  it('builds components', () => {
    const chartBuilder = new ChartBuilder();
    chartBuilder.addComponent('axis');
    chartBuilder.addComponent('grid-line');
    const components = chartBuilder.getSettings().components;
    expect(components.length).to.equal(2);
    expect(components[0].type).to.equal('axis');
    expect(components[1].type).to.equal('grid-line');
  });

  it('validates keys', () => {
    const validComponents = [ChartBuilder.createComponent('axis'), ChartBuilder.createComponent('grid-line')];
    expect(ChartBuilder.validateComponentKeys(validComponents).length).to.equal(0);
    expect(ChartBuilder.validateComponentKeys([]).length).to.equal(0);

    const invalidComponents = [ChartBuilder.createComponent('axis'), ChartBuilder.createComponent('axis')];
    expect(ChartBuilder.validateComponentKeys(invalidComponents).length).to.equal(1);
    expect(ChartBuilder.validateComponentKeys([{}]).length).to.equal(1);
  });
});
