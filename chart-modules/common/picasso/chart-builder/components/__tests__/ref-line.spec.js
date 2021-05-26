import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import refLine from '../ref-line';

const expect = chai.expect;

describe('chart builder - ref-line component', () => {
  it('should return ref lines settings with default values', () => {
    const refLinesSettings = refLine();

    expect(refLinesSettings.key).to.equal('ref-line');
    expect(refLinesSettings.type).to.equal('ref-line');
    expect(refLinesSettings.dock).to.equal('center');
    expect(refLinesSettings.lines).to.deep.equal({
      x: [],
      y: [],
    });
    expect(refLinesSettings.style).to.exist;
    expect(refLinesSettings.style.oob).to.exist;
    expect(refLinesSettings.style.oob.width).to.equal(7);
  });

  it('should return ref lines settings with overridden values', () => {
    const refLinesSettings = refLine({
      key: 'xyz',
      dock: 'bottom',
      lines: {
        x: [{}],
      },
      style: {
        oob: {
          width: 10,
        },
      },
    });

    expect(refLinesSettings.key).to.equal('xyz');
    expect(refLinesSettings.dock).to.equal('bottom');
    expect(refLinesSettings.lines).to.deep.equal({
      x: [{}],
      y: [],
    });
    expect(refLinesSettings.style.oob.width).to.equal(10);
  });
});
