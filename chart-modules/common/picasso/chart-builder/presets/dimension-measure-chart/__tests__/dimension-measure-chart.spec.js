import chai from 'chai';
import sinon from 'sinon';
import ChartBuilder from '../../../chart-builder';
import dimensionMeasureChart from '../dimension-measure-chart';

const expect = chai.expect;
let sandbox;
let returnedSettings;
let returnedComponent;
let chartBuilderMock;

describe('dimension-measure-chart', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();

    returnedSettings = {};
    returnedComponent = { actions: [] };

    chartBuilderMock = {
      getSettings: sandbox.stub().returns(returnedSettings),
      addComponent: sandbox.spy(),
      addInteraction: sandbox.spy(),
      addSubComponent: sandbox.stub().returnsArg(0),
      addScale: sandbox.spy(),
      getComponent: sandbox.stub().returns(returnedComponent),
    };
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('measure-axis', () => {
    const MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER = 0;

    it('should be added via chart-builder as x-axis if chart is horizontal and options.measureAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'horizontal',
        measureAxisProperties: {
          show: 'all',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('x-axis')).to.be.true;
    });

    it('should add settings to measure axis', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'horizontal',
        measureAxisProperties: {
          show: 'all',
        },
        axisLabelStyle: {
          label: {
            color: '#33333',
          },
        },
      });
      const expectedSettings = {
        scale: 'measure',
        settings: {
          label: {
            color: '#33333',
          },
        },
        minimumLayoutMode: 'XSMALL',
        prioOrder: 10,
        displayOrder: 80,
        forceBounds: undefined,
      };
      expect(chartBuilderMock.addComponent.calledWith('x-axis', expectedSettings)).to.be.true;
    });

    it('should be added via chart-builder as x-axis if chart is horizontal and options.measureAxisProperties.show is labels', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'horizontal',
        measureAxisProperties: {
          show: 'labels',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('x-axis')).to.be.true;
    });

    it('should be added via chart-builder as y-axis if chart is vertical and options.measureAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'vertical',
        measureAxisProperties: {
          show: 'all',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('y-axis')).to.be.true;
    });

    it('should be added via chart-builder as y-axis if chart is vertical and options.measureAxisProperties.show is labels', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'vertical',
        measureAxisProperties: {
          show: 'labels',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('y-axis')).to.be.true;
    });

    describe('settings passed to chart-builder', () => {
      describe('scale', () => {
        it('should be measure', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(measureAxisSettingsArgs.scale).to.equal('measure');
        });
      });

      describe('forceBounds', () => {
        it('should be undefined if no measureAxisProperties', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(measureAxisSettingsArgs.forceBounds).to.be.undefined;
        });

        it('should be false if is not showBounds and is not autoMinMax', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
              showBounds: false,
              autoMinMax: false,
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(measureAxisSettingsArgs.forceBounds).to.be.false;
        });

        it('should be false if is not showBounds and is autoMinMax', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
              showBounds: false,
              autoMinMax: true,
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(measureAxisSettingsArgs.forceBounds).to.be.false;
        });

        it('should be true if is showBounds and is not autoMinMax', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
              showBounds: true,
              autoMinMax: false,
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(measureAxisSettingsArgs.forceBounds).to.be.true;
        });

        it('should be false if is showBounds and is autoMinMax', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
              showBounds: true,
              autoMinMax: true,
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(measureAxisSettingsArgs.forceBounds).to.be.false;
        });
      });
    });

    describe('options passed to chart-builder', () => {
      describe('dock', () => {
        it('should be undefined if no measureAxisProperties', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisSettingsArgs.dock).to.be.undefined;
        });

        it('should be false if measureAxisProperties.dock is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
              dock: false,
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisSettingsArgs.dock).to.be.false;
        });

        it('should be true if measureAxisProperties.dock is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureAxisProperties: {
              show: 'all',
              dock: true,
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisSettingsArgs.dock).to.be.true;
        });
      });

      describe('direction', () => {
        it('should be x if chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, {
            orientation: 'horizontal',
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisSettingsArgs.direction).to.equal('x');
        });

        it('should be y if chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, {
            orientation: 'vertical',
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisSettingsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisSettingsArgs.direction).to.equal('y');
        });
      });

      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            isRtl: false,
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisOptionsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            isRtl: true,
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisOptionsArgs = chartBuilderMock.addComponent.getCall(MEASUREAXIS_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(measureAxisOptionsArgs.isRtl).to.equal(true);
        });
      });
    });
  });

  describe('measure-axis-title', () => {
    const MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER = 1;

    it('should not be added via chart-builder if has no options.measureTitleText', () => {
      dimensionMeasureChart(chartBuilderMock);

      expect(chartBuilderMock.addComponent.calledWith('x-axis-title')).to.be.false;
      expect(chartBuilderMock.addComponent.calledWith('y-axis-title')).to.be.false;
    });

    it('should be added via chart-builder as x-axis-title if chart has no orientation, has optionsMeasureTitleText and options.measureAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'all',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('x-axis-title')).to.be.true;
    });

    it('should add style to measure axis title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'all',
        },
        axisTitleStyle: {
          title: {
            color: '#33333',
          },
        },
      });

      const expectedStyleSettings = {
        text: 'Text',
        style: {
          title: {
            color: '#33333',
          },
        },
        minimumLayoutMode: 'XSMALL',
        prioOrder: 30,
        displayOrder: 90,
      };
      expect(chartBuilderMock.addComponent.calledWith('x-axis-title', expectedStyleSettings)).to.be.true;
    });

    it('should be added via chart-builder as x-axis-title if chart is horizontal, has optionsMeasureTitleText and options.measureAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'horizontal',
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'all',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('x-axis-title')).to.be.true;
    });

    it('should be added via chart-builder as x-axis-title if chart has no orientation, has optionsMeasureTitleText and options.measureAxisProperties.show is title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'title',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('x-axis-title')).to.be.true;
    });

    it('should be added via chart-builder as x-axis-title if chart is horizontal, has optionsMeasureTitleText and options.measureAxisProperties.show is title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'horizontal',
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'title',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('x-axis-title')).to.be.true;
    });

    it('should be added via chart-builder as y-axis-title if chart is vertical, has optionsMeasureTitleText and options.measureAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'vertical',
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'all',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('y-axis-title')).to.be.true;
    });

    it('should be added via chart-builder as y-axis-title if chart is vertical, has optionsMeasureTitleText and options.measureAxisProperties.show is title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        orientation: 'vertical',
        measureTitleText: 'Text',
        measureAxisProperties: {
          show: 'title',
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('y-axis-title')).to.be.true;
    });

    describe('settings passed to chart-builder', () => {
      describe('text', () => {
        it('should be taken from options-measuretitleText', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'tasseKATT',
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisTitleSettingsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[1];

          expect(measureAxisTitleSettingsArgs.text).to.equal('tasseKATT');
        });
      });
    });

    describe('options passed to chart-builder', () => {
      describe('dock', () => {
        it('should be undefined if no measureAxisProperties', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.dock).to.be.undefined;
        });

        it('should be false if measureAxisProperties.dock is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            measureAxisProperties: {
              show: 'all',
              dock: false,
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.dock).to.be.false;
        });

        it('should be true if measureAxisProperties.dock is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            measureAxisProperties: {
              show: 'all',
              dock: true,
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.dock).to.be.true;
        });
      });

      describe('direction', () => {
        it('should be x if chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            orientation: 'horizontal',
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.direction).to.equal('x');
        });

        it('should be y if chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            orientation: 'vertical',
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.direction).to.equal('y');
        });
      });

      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            isRtl: false,
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            measureTitleText: 'Text',
            isRtl: true,
            measureAxisProperties: {
              show: 'all',
            },
          });

          const measureAxisTitleOptionsArgs = chartBuilderMock.addComponent.getCall(
            MEASUREAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(measureAxisTitleOptionsArgs.isRtl).to.equal(true);
        });
      });
    });
  });

  describe('measure-scale', () => {
    it('should be added via chart-builder', () => {
      dimensionMeasureChart(chartBuilderMock);

      expect(chartBuilderMock.addScale.calledWith('measure-scale')).to.be.true;
    });

    describe('settings passed to chart-builder', () => {
      it('should use settings from options.measureScaleSettings', () => {
        const options = {
          measureScaleSettings: {
            name: 'tasseKATT',
            age: 42,
          },
        };

        dimensionMeasureChart(chartBuilderMock, options);

        const measureScaleSettingsArg = chartBuilderMock.addScale.getCall(0).args[1];

        expect(measureScaleSettingsArg.name).to.equal('tasseKATT');
        expect(measureScaleSettingsArg.age).to.equal(42);
      });

      describe('component', () => {
        it('should be undefined if no measureAxisProperties.spacing', () => {
          const options = {
            measureScaleSettings: {},
          };

          dimensionMeasureChart(chartBuilderMock, options);

          const measureScaleSettingsArg = chartBuilderMock.addScale.getCall(0).args[1];

          expect(measureScaleSettingsArg.component).to.be.undefined;
        });

        describe('ticks.distance', () => {
          it('should be set correctly if has measureAxisProperties.spacing', () => {
            const options = {
              measureAxisProperties: {
                spacing: 5,
              },
            };

            dimensionMeasureChart(chartBuilderMock, options);

            const measureScaleSettingsArg = chartBuilderMock.addScale.getCall(0).args[1];

            expect(measureScaleSettingsArg.component.ticks.distance).to.equal(500);
          });
        });
      });
    });

    describe('options passed to chart-builder', () => {
      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, { isRtl: false });

          const measureScaleOptionsArgs = chartBuilderMock.addScale.getCall(0).args[2];

          expect(measureScaleOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, { isRtl: true });

          const measureScaleOptionsArgs = chartBuilderMock.addScale.getCall(0).args[2];

          expect(measureScaleOptionsArgs.isRtl).to.equal(true);
        });
      });

      describe('source', () => {
        it('should be taken from options.measureSource', () => {
          const measureSource = {};

          dimensionMeasureChart(chartBuilderMock, { measureSource });

          const measureScaleOptionsArgs = chartBuilderMock.addScale.getCall(0).args[2];

          expect(measureScaleOptionsArgs.source).to.equal(measureSource);
        });
      });

      describe('orientation', () => {
        it('should be horizontal if chart orientation is not set', () => {
          dimensionMeasureChart(chartBuilderMock, {});

          const measureScaleOptionsArgs = chartBuilderMock.addScale.getCall(0).args[2];

          expect(measureScaleOptionsArgs.orientation).to.equal('horizontal');
        });

        it('should be horizontal if chart orientation is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, { orientation: 'horizontal' });

          const measureScaleOptionsArgs = chartBuilderMock.addScale.getCall(0).args[2];

          expect(measureScaleOptionsArgs.orientation).to.equal('horizontal');
        });

        it('should be vertical if chart orientation is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, { orientation: 'vertical' });

          const measureScaleOptionsArgs = chartBuilderMock.addScale.getCall(0).args[2];

          expect(measureScaleOptionsArgs.orientation).to.equal('vertical');
        });
      });
    });
  });

  describe('dimension-axis', () => {
    const DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER = 0;

    it('should not be added via chart-builder if includeDimensionAxis is false', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: false,
      });

      expect(chartBuilderMock.addComponent.callCount).to.equal(0);
      expect(chartBuilderMock.addComponent.neverCalledWith('y-axis')).to.be.true;
      expect(chartBuilderMock.addComponent.neverCalledWith('x-axis')).to.be.true;
    });

    it('should be added as y-axis if includeDimensionAxis is true, chart has no orientation and options.dimensionAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        dimensionAxisProperties: {
          show: 'all',
        },
      });

      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('y-axis');
    });

    it('should add settings for styling to dimension axis', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        dimensionAxisProperties: {
          show: 'all',
        },
        axisLabelStyle: {
          title: {
            color: '#33333',
          },
        },
      });

      const expectedDimensionAxisSettings = {
        scale: 'dimension',
        settings: {
          title: {
            color: '#33333',
          },
        },
        minimumLayoutMode: 'XSMALL',
        prioOrder: 10,
        displayOrder: 80,
      };
      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('y-axis');
      expect(dimensionAxisCall.args[1]).to.eql(expectedDimensionAxisSettings);
    });

    it('should be added as y-axis if includeDimensionAxis is true, chart has no orientation and options.dimensionAxisProperties.show is labels', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        dimensionAxisProperties: {
          show: 'labels',
        },
      });

      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('y-axis');
    });

    it('should be added as y-axis if includeDimensionAxis is true, chart is horizontal and options.dimensionAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'horizontal',
        dimensionAxisProperties: {
          show: 'all',
        },
      });

      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('y-axis');
    });

    it('should be added as y-axis if includeDimensionAxis is true, chart is horizontal and options.dimensionAxisProperties.show is labels', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'horizontal',
        dimensionAxisProperties: {
          show: 'labels',
        },
      });

      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('y-axis');
    });

    it('should be added as x-axis if includeDimensionAxis is true, chart is vertical and options.dimensionAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'vertical',
        dimensionAxisProperties: {
          show: 'all',
        },
      });

      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('x-axis');
    });

    it('should be added as x-axis if includeDimensionAxis is true, chart is vertical and options.dimensionAxisProperties.show is labels', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'vertical',
        dimensionAxisProperties: {
          show: 'labels',
        },
      });

      const dimensionAxisCall = chartBuilderMock.addComponent.getCall(DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER);

      expect(dimensionAxisCall.args[0]).to.equal('x-axis');
    });

    describe('settings passed to chart-builder', () => {
      describe('scale', () => {
        it('should be dimension', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionAxisProperties: {
              show: 'labels',
            },
          });

          const dimensionAxisSettingsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[1];

          expect(dimensionAxisSettingsArgs.scale).to.equal('dimension');
        });
      });
    });

    describe('options passed to chart-builder', () => {
      describe('dock', () => {
        it('should be undefined if no dimensionAxisProperties', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionAxisProperties: {
              show: 'labels',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.dock).to.be.undefined;
        });

        it('should be false if dimensionAxisProperties.dock is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionAxisProperties: {
              show: 'labels',
              dock: false,
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.dock).to.equal(false);
        });

        it('should be true if dimensionAxisProperties.dock is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionAxisProperties: {
              show: 'labels',
              dock: true,
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.dock).to.equal(true);
        });
      });

      describe('direction', () => {
        it('should be y if chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            orientation: 'horizontal',
            dimensionAxisProperties: {
              show: 'labels',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.direction).to.equal('y');
        });

        it('should be x if chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            orientation: 'vertical',
            dimensionAxisProperties: {
              show: 'labels',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.direction).to.equal('x');
        });
      });

      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            isRtl: false,
            dimensionAxisProperties: {
              show: 'labels',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            isRtl: true,
            dimensionAxisProperties: {
              show: 'labels',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXIS_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.isRtl).to.equal(true);
        });
      });
    });
  });

  describe('dimension-axis-title', () => {
    const DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER = 1;

    it('should not be added via chart-builder if includeDimensionAxis is false', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: false,
      });

      expect(chartBuilderMock.addComponent.callCount).to.equal(0);
      expect(chartBuilderMock.addComponent.neverCalledWith('y-axis-title')).to.be.true;
      expect(chartBuilderMock.addComponent.neverCalledWith('x-axis-title')).to.be.true;
    });

    it('should not be added via chart-builder if includeDimensionAxis is true and has no options.dimensionTitleText', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
      });

      expect(chartBuilderMock.addComponent.callCount).to.equal(0);
      expect(chartBuilderMock.addComponent.neverCalledWith('y-axis-title')).to.be.true;
      expect(chartBuilderMock.addComponent.neverCalledWith('x-axis-title')).to.be.true;
    });

    it('should be added via chart-builder as y-axis-title if includeDimensionAxis is true, chart has no orientation, has options.dimensionTitleText and options.dimensionAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'all',
        },
      });

      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('y-axis-title');
    });

    it('should add title styling from settings to y-axis-title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'all',
        },
        axisTitleStyle: {
          label: {
            color: '#33333',
          },
        },
      });

      const expectedDimensionTitleSettings = {
        text: 'Text',
        style: {
          label: {
            color: '#33333',
          },
        },
        minimumLayoutMode: 'XSMALL',
        prioOrder: 30,
        displayOrder: 90,
      };
      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('y-axis-title');
      expect(dimensionAxisTitleCall.args[1]).to.eql(expectedDimensionTitleSettings);
    });

    it('should be added via chart-builder as y-axis-title if includeDimensionAxis is true, chart has no orientation, has options.dimensionTitleText and options.dimensionAxisProperties.show is title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'title',
        },
      });

      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER - 1
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('y-axis-title');
    });

    it('should be added via chart-builder as y-axis-title if includeDimensionAxis is true, chart is horizontal, has options.dimensionTitleText and options.dimensionAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'horizontal',
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'all',
        },
      });

      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('y-axis-title');
    });

    it('should be added via chart-builder as y-axis-title if includeDimensionAxis is true, chart is horizontal, has options.dimensionTitleText and options.dimensionAxisProperties.show is title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'horizontal',
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'title',
        },
      });

      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER - 1
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('y-axis-title');
    });

    it('should be added via chart-builder as x-axis-title if includeDimensionAxis is true, chart is vertical, has options.dimensionTitleText and options.dimensionAxisProperties.show is all', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'vertical',
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'all',
        },
      });

      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('x-axis-title');
    });

    it('should be added via chart-builder as x-axis-title if includeDimensionAxis is true, chart is vertical, has options.dimensionTitleText and options.dimensionAxisProperties.show is title', () => {
      dimensionMeasureChart(chartBuilderMock, {
        includeDimensionAxis: true,
        orientation: 'vertical',
        dimensionTitleText: 'Text',
        dimensionAxisProperties: {
          show: 'title',
        },
      });

      const dimensionAxisTitleCall = chartBuilderMock.addComponent.getCall(
        DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER - 1
      );

      expect(dimensionAxisTitleCall.args[0]).to.equal('x-axis-title');
    });

    describe('settings passed to chart-builder', () => {
      describe('text', () => {
        it('should be taken from options.dimensionTitleText', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'tasseKATT',
            dimensionAxisProperties: {
              show: 'all',
            },
          });

          const dimensionAxisTitleSettingsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[1];

          expect(dimensionAxisTitleSettingsArgs.text).to.equal('tasseKATT');
        });
      });
    });

    describe('options passed to chart-builder', () => {
      describe('dock', () => {
        it('should be false if dimensionAxisProperties.dock is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'Text',
            dimensionAxisProperties: {
              show: 'all',
              dock: false,
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.dock).to.equal(false);
        });

        it('should be true if dimensionAxisProperties.dock is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'Text',
            dimensionAxisProperties: {
              show: 'all',
              dock: true,
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.dock).to.equal(true);
        });
      });

      describe('direction', () => {
        it('should be y if chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'Text',
            orientation: 'horizontal',
            dimensionAxisProperties: {
              show: 'all',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.direction).to.equal('y');
        });

        it('should be x if chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'Text',
            orientation: 'vertical',
            dimensionAxisProperties: {
              show: 'all',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.direction).to.equal('x');
        });
      });

      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'Text',
            isRtl: false,
            dimensionAxisProperties: {
              show: 'all',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, {
            includeDimensionAxis: true,
            dimensionTitleText: 'Text',
            isRtl: true,
            dimensionAxisProperties: {
              show: 'all',
            },
          });

          const dimensionAxisOptionsArgs = chartBuilderMock.addComponent.getCall(
            DIMENSIONAXISTITLE_ADD_COMPONENT_CALL_NUMBER
          ).args[2];

          expect(dimensionAxisOptionsArgs.isRtl).to.equal(true);
        });
      });
    });
  });

  describe('dimension-scale', () => {
    it('should not be added via chart-builder if includeDimensionAxis is false', () => {
      dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: false });

      expect(chartBuilderMock.addScale.calledWith('dimension-scale')).to.be.false;
    });

    it('should be added via chart-builder if includeDimensionAxis is true', () => {
      dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true });

      expect(chartBuilderMock.addScale.calledWith('dimension-scale')).to.be.true;
    });

    it('should pass correct settings to chart-builder', () => {
      const dimensionScaleSettings = {};

      const options = {
        dimensionScaleSettings,
        includeDimensionAxis: true,
      };

      dimensionMeasureChart(chartBuilderMock, options);

      const dimensionScaleSettingsArg = chartBuilderMock.addScale.getCall(1).args[1];

      expect(dimensionScaleSettingsArg).to.equal(dimensionScaleSettings);
    });

    describe('options passed to chart-builder', () => {
      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true, isRtl: false });

          const dimensionScaleOptionsArgs = chartBuilderMock.addScale.getCall(1).args[2];

          expect(dimensionScaleOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true, isRtl: true });

          const dimensionScaleOptionsArgs = chartBuilderMock.addScale.getCall(1).args[2];

          expect(dimensionScaleOptionsArgs.isRtl).to.equal(true);
        });
      });

      describe('source', () => {
        it('should be taken from options.dimensionSource', () => {
          const dimensionSource = {};

          dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true, dimensionSource });

          const dimensionScaleOptionsArgs = chartBuilderMock.addScale.getCall(1).args[2];

          expect(dimensionScaleOptionsArgs.source).to.equal(dimensionSource);
        });
      });

      describe('orientation', () => {
        it('should be vertical if chart orientation is not set', () => {
          dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true });

          const dimensionScaleOptionsArgs = chartBuilderMock.addScale.getCall(1).args[2];

          expect(dimensionScaleOptionsArgs.orientation).to.equal('vertical');
        });

        it('should be vertical if chart orientation is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true, orientation: 'horizontal' });

          const dimensionScaleOptionsArgs = chartBuilderMock.addScale.getCall(1).args[2];

          expect(dimensionScaleOptionsArgs.orientation).to.equal('vertical');
        });

        it('should be horizontal if chart orientation is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, { includeDimensionAxis: true, orientation: 'vertical' });

          const dimensionScaleOptionsArgs = chartBuilderMock.addScale.getCall(1).args[2];

          expect(dimensionScaleOptionsArgs.orientation).to.equal('horizontal');
        });
      });
    });
  });

  describe('grid-line', () => {
    const GRIDLINE_ADD_COMPONENT_CALL_NUMBER = 0;

    it('should not be added via chart-builder if no options.gridlines', () => {
      dimensionMeasureChart(chartBuilderMock, {});

      expect(chartBuilderMock.addComponent.calledWith('grid-line')).to.be.false;
    });

    it('should not be added via chart-builder if options.gridlines.auto is false and options.gridlines.spacing is 0', () => {
      dimensionMeasureChart(chartBuilderMock, {
        gridlines: {
          auto: false,
          spacing: 0,
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('grid-line')).to.be.false;
    });

    it('should be added via chart-builder if options.gridlines.auto is false and options.gridlines.spacing above 0', () => {
      dimensionMeasureChart(chartBuilderMock, {
        gridlines: {
          auto: false,
          spacing: 1,
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('grid-line')).to.be.true;
    });

    it('should be added via chart-builder if options.gridlines.auto is true', () => {
      dimensionMeasureChart(chartBuilderMock, {
        gridlines: {
          auto: true,
        },
      });

      expect(chartBuilderMock.addComponent.calledWith('grid-line')).to.be.true;
    });

    describe('options passed to chart-builder', () => {
      describe('ticks', () => {
        describe('show', () => {
          it('should be true if options.gridlines.auto is true', () => {
            dimensionMeasureChart(chartBuilderMock, {
              gridlines: {
                auto: true,
              },
              orientation: 'horizontal',
            });

            const gridlineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
              .args[1];

            expect(gridlineSettingsArgs.ticks.show).to.be.true;
          });

          it('should be true if options.gridlines.auto is false and options.gridlines.spacing is above 0', () => {
            dimensionMeasureChart(chartBuilderMock, {
              gridlines: {
                auto: false,
                spacing: 1,
              },
              orientation: 'horizontal',
            });

            const gridlineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
              .args[1];

            expect(gridlineSettingsArgs.ticks.show).to.be.true;
          });
        });
      });

      describe('minorTicks', () => {
        describe('show', () => {
          it('should be false if options.gridlines.auto is true', () => {
            dimensionMeasureChart(chartBuilderMock, {
              gridlines: {
                auto: true,
              },
              orientation: 'horizontal',
            });

            const gridlineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
              .args[1];

            expect(gridlineSettingsArgs.minorTicks.show).to.be.false;
          });

          it('should be false if options.gridlines.auto is false and spacing is below 3', () => {
            dimensionMeasureChart(chartBuilderMock, {
              gridlines: {
                auto: false,
                spacing: 2,
              },
              orientation: 'horizontal',
            });

            const gridlineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
              .args[1];

            expect(gridlineSettingsArgs.minorTicks.show).to.be.false;
          });

          it('should be true if options.gridlines.auto is false and spacing is 33', () => {
            dimensionMeasureChart(chartBuilderMock, {
              gridlines: {
                auto: false,
                spacing: 3,
              },
              orientation: 'horizontal',
            });

            const gridlineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
              .args[1];

            expect(gridlineSettingsArgs.minorTicks.show).to.be.true;
          });
        });
      });

      describe('x', () => {
        it('should be set correctly when chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, {
            gridlines: {
              auto: true,
            },
            orientation: 'horizontal',
          });

          const gridLineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(gridLineSettingsArgs.x).to.deep.equal({ scale: 'measure' });
        });

        it('should be set correctly when chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, {
            gridlines: {
              auto: true,
            },
            orientation: 'vertical',
          });

          const gridLineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(gridLineSettingsArgs.x).to.be.undefined;
        });
      });

      describe('y', () => {
        it('should be set correctly when chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, {
            gridlines: {
              auto: true,
            },
            orientation: 'horizontal',
          });

          const gridLineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(gridLineSettingsArgs.y).to.be.undefined;
        });

        it('should be set correctly when chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, {
            gridlines: {
              auto: true,
            },
            orientation: 'vertical',
          });

          const gridLineSettingsArgs = chartBuilderMock.addComponent.getCall(GRIDLINE_ADD_COMPONENT_CALL_NUMBER)
            .args[1];

          expect(gridLineSettingsArgs.y).to.deep.equal({ scale: 'measure' });
        });
      });
    });
  });

  describe('scrollbar', () => {
    const SCROLLBAR_ADD_COMPONENT_CALL_NUMBER = 0;

    it('should not be added via chart-builder if options.hasNavigation is false', () => {
      dimensionMeasureChart(chartBuilderMock, { hasNavigation: false });

      expect(chartBuilderMock.addComponent.neverCalledWith('scrollbar')).to.be.true;
    });

    it('should be added via chart-builder if options.hasNavigation is true', () => {
      dimensionMeasureChart(chartBuilderMock, { hasNavigation: true });

      const scrollbarCall = chartBuilderMock.addComponent.getCall(SCROLLBAR_ADD_COMPONENT_CALL_NUMBER);

      expect(scrollbarCall.args[0]).to.equal('scrollbar');
    });

    it('should not retrieve settings from chart-builder if options.hasNavigation is false', () => {
      dimensionMeasureChart(chartBuilderMock, { hasNavigation: false });

      expect(chartBuilderMock.getSettings.called).to.be.false;
    });

    it('should retrieve settings from chart-builder if options.hasNavigation is true', () => {
      dimensionMeasureChart(chartBuilderMock, { hasNavigation: true });

      expect(chartBuilderMock.getSettings.calledOnce).to.be.true;
    });

    it("should set default viewSize value in chart-builder's settings if scrollSettings.viewSize is missing", () => {
      dimensionMeasureChart(chartBuilderMock, { hasNavigation: true });

      expect(returnedSettings.scroll.dimension.viewSize).to.equal(0);
    });

    it("should set correct viewSize value in chart-builder's settings if scrollSettings.viewSize is provided", () => {
      dimensionMeasureChart(chartBuilderMock, {
        hasNavigation: true,
        scrollSettings: {
          viewSize: 42,
        },
      });

      expect(returnedSettings.scroll.dimension.viewSize).to.equal(42);
    });

    it("should set default max value in chart-builder's settings if scrollSettings.viewSize is missing", () => {
      dimensionMeasureChart(chartBuilderMock, { hasNavigation: true });

      expect(returnedSettings.scroll.dimension.max).to.equal(0);
    });

    it("should set correct max value in chart-builder's settings if scrollSettings.max is provided", () => {
      dimensionMeasureChart(chartBuilderMock, {
        hasNavigation: true,
        scrollSettings: {
          max: 42,
        },
      });

      expect(returnedSettings.scroll.dimension.max).to.equal(42);
    });

    describe('options passed to chart-builder', () => {
      describe('isRtl', () => {
        it('should be false if options.isRtl is false', () => {
          dimensionMeasureChart(chartBuilderMock, { hasNavigation: true, isRtl: false });

          const scrollbarOptionsArgs = chartBuilderMock.addComponent.getCall(SCROLLBAR_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(scrollbarOptionsArgs.isRtl).to.equal(false);
        });

        it('should be true if options.isRtl is true', () => {
          dimensionMeasureChart(chartBuilderMock, { hasNavigation: true, isRtl: true });

          const scrollbarOptionsArgs = chartBuilderMock.addComponent.getCall(SCROLLBAR_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(scrollbarOptionsArgs.isRtl).to.equal(true);
        });
      });

      describe('chartID', () => {
        it('should be taken from options.chartID', () => {
          dimensionMeasureChart(chartBuilderMock, { hasNavigation: true, chartID: 'XD' });

          const scrollbarOptionsArgs = chartBuilderMock.addComponent.getCall(SCROLLBAR_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(scrollbarOptionsArgs.chartID).to.equal('XD');
        });
      });

      describe('isHorizontal', () => {
        it('should be false if chart is horizontal', () => {
          dimensionMeasureChart(chartBuilderMock, { hasNavigation: true, orientation: 'horizontal' });

          const scrollbarOptionsArgs = chartBuilderMock.addComponent.getCall(SCROLLBAR_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(scrollbarOptionsArgs.isHorizontal).to.be.false;
        });

        it('should be true if chart is vertical', () => {
          dimensionMeasureChart(chartBuilderMock, { hasNavigation: true, orientation: 'vertical' });

          const scrollbarOptionsArgs = chartBuilderMock.addComponent.getCall(SCROLLBAR_ADD_COMPONENT_CALL_NUMBER)
            .args[2];

          expect(scrollbarOptionsArgs.isHorizontal).to.be.true;
        });
      });
    });
  });

  describe('ref-line', () => {
    let chartBuilder;
    let theme;

    beforeEach(() => {
      theme = {
        getStyle: jest.fn(),
      };
      chartBuilder = new ChartBuilder({ theme });
    });

    it('Has no refline by default', () => {
      dimensionMeasureChart(chartBuilder, {
        includeEventArea: false,
      });
      expect(chartBuilder.getSettings().components.length).to.equal(0);
    });

    it("Doesn't add a refline", () => {
      dimensionMeasureChart(chartBuilder, {
        includeEventArea: false,
        refLines: [
          {
            show: false,
          },
        ],
      });
      expect(chartBuilder.getSettings().components.length).to.equal(0);
    });

    it('Adds a refline', () => {
      dimensionMeasureChart(chartBuilder, {
        includeEventArea: false,
        refLines: [
          {
            show: true,
          },
        ],
        theme,
      });

      expect(chartBuilder.getSettings().components.length).to.equal(2);

      const refLineComponent = chartBuilder.getComponent('ref-line');
      expect(refLineComponent.key).to.equal('ref-line');
      expect(refLineComponent.type).to.equal('ref-line');

      // TODO: fix random id
      // const refLineLabelsComponent = chartBuilder.getComponent('ref-line-labels-xyz');
      // expect(refLineLabelsComponent.key).to.equal('ref-line-labels-xyz');
      // expect(refLineLabelsComponent.type).to.equal('ref-line');
    });

    it('Adds two reflines', () => {
      dimensionMeasureChart(chartBuilder, {
        includeEventArea: false,
        refLines: [
          {
            show: true,
          },
          {},
        ],
        theme,
      });

      expect(chartBuilder.getSettings().components.length).to.equal(2);

      const refLineComponent = chartBuilder.getComponent('ref-line');
      expect(refLineComponent.key).to.equal('ref-line');
      expect(refLineComponent.type).to.equal('ref-line');

      // TODO: fix random id
      // const refLineLabelsComponent = chartBuilder.getComponent('ref-line-labels-xyz');
      // expect(refLineLabelsComponent.key).to.equal('ref-line-labels-xyz');
      // expect(refLineLabelsComponent.type).to.equal('ref-line');
    });

    it('Returns correct preferredSize for horizontal ref lines', () => {
      dimensionMeasureChart(chartBuilder, {
        includeEventArea: false,
        refLines: [
          {
            show: true,
          },
        ],
        theme,
      });

      expect(chartBuilder.getSettings().components[1].preferredSize()).to.equal(26);
    });

    it('Returns correct preferredSize for vertical ref lines', () => {
      dimensionMeasureChart(chartBuilder, {
        includeEventArea: false,
        orientation: 'vertical',
        measureSource: 'measure',
        theme,
        refLines: [
          {
            show: true,
            label: 'xyz',
            refLineExpr: { value: 2.5 },
          },
          {
            show: true,
            label: 'xyz 123',
            refLineExpr: { value: 2.54 },
          },
          {
            show: true,
            label: '123',
            refLineExpr: { value: 2 },
          },
        ],
      });

      const labelComponent = chartBuilder.getSettings().components[1];
      labelComponent.preferredSize = labelComponent.preferredSize.bind({
        renderer: {
          measureText(obj) {
            return { width: obj.text.length };
          },
        },
        chart: {
          formatter() {
            return function (v) {
              return v;
            };
          },
        },
      });
      expect(labelComponent.preferredSize()).to.equal(14 + 12 /* width + padding */ /* width + padding */);
    });
  });

  describe('lasso', () => {
    const LASSO_ADD_COMPONENT_CALL_NUMBER = 0;
    it('should not be added via chart-builder if there are no options', () => {
      dimensionMeasureChart(chartBuilderMock, {});
      expect(chartBuilderMock.addComponent.neverCalledWith('lasso')).to.be.true;
    });
    it('should be added via chart-builder if there are options', () => {
      dimensionMeasureChart(chartBuilderMock, { enableLasso: true, selectionsEnabled: true });
      const lassoCall = chartBuilderMock.addComponent.getCall(LASSO_ADD_COMPONENT_CALL_NUMBER);
      expect(lassoCall.args[0]).to.equal('lasso');
    });
  });

  describe('dim range', () => {
    const DIMRANGE_ADD_COMPONENT_CALL_NUMBER = 0;
    let settings;
    beforeEach(() => {
      settings = { enableDimRange: true, includeDimensionAxis: true, selectionsEnabled: true };
    });
    it('should not be added via chart-builder if there are no options', () => {
      dimensionMeasureChart(chartBuilderMock, {});
      expect(chartBuilderMock.addComponent.neverCalledWith('range')).to.be.true;
    });
    it('should be added via chart-builder if there are options', () => {
      dimensionMeasureChart(chartBuilderMock, settings);
      const rangeCall = chartBuilderMock.addComponent.getCall(DIMRANGE_ADD_COMPONENT_CALL_NUMBER);
      expect(rangeCall.args[0]).to.equal('range');
    });
    describe('isHorizontal', () => {
      it('should be false if chart is horizontal', () => {
        settings.orientation = 'horizontal';
        dimensionMeasureChart(chartBuilderMock, settings);
        const optionsArgs = chartBuilderMock.addComponent.getCall(DIMRANGE_ADD_COMPONENT_CALL_NUMBER).args[2];
        expect(optionsArgs.isHorizontal).to.be.false;
      });
      it('should be true if chart is vertical', () => {
        settings.orientation = 'vertical';
        dimensionMeasureChart(chartBuilderMock, settings);
        const optionsArgs = chartBuilderMock.addComponent.getCall(DIMRANGE_ADD_COMPONENT_CALL_NUMBER).args[2];
        expect(optionsArgs.isHorizontal).to.be.true;
      });
    });
  });
});
