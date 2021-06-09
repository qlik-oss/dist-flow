import chai from 'chai';
import sinon from 'sinon';
import { setValue } from '@qlik/chart-modules';
import DimensionAxis from '../dimension-axis';

const expect = chai.expect;

describe('Histogram picasso component - dimension axis', () => {
  const sandbox = sinon.createSandbox();
  const MAX_GLYPH_COUNT = 20;

  afterEach(() => {
    sandbox.restore();
  });

  it('should have the qApprMaxGlyphCount if smaller than the max count', () => {
    const layout = {};

    setValue(layout, 'qUndoExclude.box.qHyperCube.qDimensionInfo.0.qApprMaxGlyphCount', 12);

    const dimensionAxisSettings = DimensionAxis.createSettings(layout);

    expect(dimensionAxisSettings.settings.labels.maxGlyphCount).to.equal(12);
  });

  it('maxGlyphCount should never exceed the max count', () => {
    const layout = {};

    setValue(layout, 'qUndoExclude.box.qHyperCube.qDimensionInfo.0.qApprMaxGlyphCount', 120);

    const dimensionAxisSettings = DimensionAxis.createSettings(layout);

    expect(dimensionAxisSettings.settings.labels.maxGlyphCount).to.equal(MAX_GLYPH_COUNT);
  });
});
