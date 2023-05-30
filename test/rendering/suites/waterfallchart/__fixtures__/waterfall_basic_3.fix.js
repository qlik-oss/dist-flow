export default () => ({
  instanceConfig: {
    context: {
      theme: 'senseish',
    },
  },
  genericObjects: [
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'jrmCc',
            qType: 'waterfallchart',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 1,
            },
            qDimensionInfo: [],
            qMeasureInfo: [
              {
                qFallbackTitle: 'Actual Amount',
                qApprMaxGlyphCount: 11,
                qCardinal: 0,
                qSortIndicator: 'D',
                qNumFormat: {
                  qType: 'U',
                  qnDec: 0,
                  qUseThou: 0,
                },
                qMin: 46258458.10999999,
                qMax: 46258458.10999999,
                qIsAutoFormat: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qLibraryId: 'uQbd',
                qTrendLines: [],
                autoSort: true,
                cId: 'xPNkuM',
                numFormatFromTemplate: true,
                valueType: 'NORMAL',
                subtotal: {
                  enable: true,
                  label: 'Subtotals',
                },
                quarantine: {
                  qNumFormat: {},
                  isCustomFormatted: false,
                },
              },
            ],
            qEffectiveInterColumnSortOrder: [0],
            qGrandTotalRow: [
              {
                qText: '46258458.11',
                qNum: 46258458.10999999,
                qElemNumber: -1,
                qState: 'X',
                qIsTotalCell: true,
              },
            ],
            qDataPages: [
              {
                qMatrix: [
                  [
                    {
                      qText: '46258458.11',
                      qNum: 46258458.10999999,
                      qElemNumber: 0,
                      qState: 'L',
                      qInExtRow: true,
                    },
                  ],
                ],
                qTails: [],
                qArea: {
                  qLeft: 0,
                  qTop: 0,
                  qWidth: 1,
                  qHeight: 1,
                },
              },
            ],
            qPivotDataPages: [],
            qStackedDataPages: [],
            qMode: 'S',
            qNoOfLeftDims: -1,
            qTreeNodesOnDim: [],
            qColumnOrder: [],
          },
          qDef: {
            numFormatFromTemplate: true,
            qNumFormat: {},
            isCustomFormatted: false,
          },
          refLine: {
            refLines: [],
          },
          showTitles: true,
          title: '',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: false,
          gridlines: {
            auto: true,
            spacing: 2,
          },
          dataPoint: {
            showLabels: false,
          },
          color: {
            auto: true,
            positiveValue: {
              paletteColor: {
                index: 6,
                color: null,
              },
            },
            negativeValue: {
              paletteColor: {
                index: -1,
                color: '#cc6677',
              },
            },
            subtotal: {
              paletteColor: {
                index: -1,
                color: '#c3c3c3',
              },
            },
          },
          legend: {
            show: true,
            dock: 'left',
          },
          measureAxis: {
            show: 'labels',
            dock: 'far',
            spacing: 1,
            autoMinMax: true,
            minMax: 'min',
            min: 0,
            max: 10,
          },
          dimensionAxis: {
            show: 'labels',
            label: 'horizontal',
            dock: 'far',
          },
          visualization: 'waterfallchart',
          version: '0.25.6',
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
