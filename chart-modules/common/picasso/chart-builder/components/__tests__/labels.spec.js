import chai from 'chai';
import labels from '../labels';

const expect = chai.expect;

describe('chart builder - labels component', () => {
  let expectedSettings;
  let theme;

  beforeEach(() => {
    const themeValues = {
      fontFamily: 'QlikView Sans, sans-serif',
      fontSize: '13px',
      color: '#333333',
    };
    theme = {
      getStyle: jest.fn((chart, path, attr) => {
        const r = themeValues[attr];
        if (!r) {
          console.log('missing', attr);
        }
        return r;
      }),
    };

    expectedSettings = {
      key: 'labels',
      type: 'labels',
      displayOrder: 1,
      settings: {
        sources: [
          {
            component: 'bars',
            selector: 'rect',
            strategy: {
              type: 'bar',
              settings: {
                direction: 'up',
                fontFamily: 'QlikView Sans, sans-serif',
                fontSize: 12,
                align: 0.5,
                labels: [
                  {
                    placements: [
                      {
                        position: 'outside',
                        fill: '#333333',
                        justify: 0,
                      },
                      {
                        position: 'inside',
                        fill: '#fff',
                        justify: 1,
                      },
                    ],
                    label: function label(data) {
                      return data ? data.end.label : '';
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    };
  });

  it('should return labels with the default settings', () => {
    const labelSettings = labels(null, { theme });

    expect(labelSettings.key).to.equal('labels');
    expect(labelSettings.settings.sources[0].component).to.equal('box-marker');
    expect(labelSettings.settings.sources[0].strategy.settings.direction).to.equal('up');
    expect(labelSettings.settings.sources[0].strategy.settings.fontFamily).to.equal('QlikView Sans, sans-serif');
    expect(labelSettings.settings.sources[0].strategy.settings.fontSize).to.equal(13);
    expect(labelSettings.settings.sources[0].strategy.settings.labels[0].placements.length).to.equal(2);
    expect(labelSettings.settings.sources[0].strategy.settings.labels[0].placements[0].fill).to.equal('#333333');
  });

  it('should apply the color change from insideColorSettings', () => {
    const insideColorSettings = {
      settings: {
        sources: [
          {
            strategy: {
              settings: {
                labels: [
                  {
                    placements: [{}, { fill: '#ccc' }],
                  },
                ],
              },
            },
          },
        ],
      },
    };

    const labelSettings = labels(insideColorSettings, { theme });
    const color = labelSettings.settings.sources[0].strategy.settings.labels[0].placements[1].fill;
    const expectedColor = expectedSettings.settings.sources[0].strategy.settings.labels[0].placements[1].fill;

    expect(color).to.equal('#ccc');
    expect(color).to.not.equal(expectedColor);
  });
});
