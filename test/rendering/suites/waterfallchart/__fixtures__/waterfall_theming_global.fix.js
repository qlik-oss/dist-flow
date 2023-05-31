export default () => ({
  instanceConfig: {
    context: {
      theme: 'theme-global',
    },
  },
  genericObjects: [
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'pXNFYR',
            qType: 'waterfallchart',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete', 'exportdata'],
          },
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 3,
              qcy: 1,
            },
            qDimensionInfo: [],
            qMeasureInfo: [
              {
                qFallbackTitle: 'Avg(Expression2)',
                qApprMaxGlyphCount: 6,
                qCardinal: 0,
                qSortIndicator: 'D',
                qNumFormat: {
                  qType: 'F',
                  qnDec: 4,
                  qUseThou: 1,
                  qFmt: '# ##0,0000',
                  qDec: ',',
                  qThou: ' ',
                },
                qMin: 1.128291048348492,
                qMax: 1.128291048348492,
                qIsAutoFormat: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qTrendLines: [],
                autoSort: true,
                cId: 'dPuJwY',
                numFormatFromTemplate: true,
                valueType: 'NORMAL',
                subtotal: {
                  enable: false,
                  label: 'Subtotals',
                },
              },
              {
                qFallbackTitle: 'Avg(Expression3)',
                qApprMaxGlyphCount: 7,
                qCardinal: 0,
                qSortIndicator: 'D',
                qNumFormat: {
                  qType: 'F',
                  qnDec: 9,
                  qUseThou: 1,
                  qFmt: '###0,00000',
                  qDec: ',',
                },
                qMin: 0.24139007180469108,
                qMax: 0.24139007180469108,
                qIsAutoFormat: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qTrendLines: [],
                autoSort: true,
                cId: 'pKaSRrK',
                numFormatFromTemplate: true,
                valueType: 'NORMAL',
                subtotal: {
                  enable: false,
                  label: 'Subtotals',
                },
              },
              {
                qFallbackTitle: '-Sum(Expression3)/30',
                qApprMaxGlyphCount: 16,
                qCardinal: 0,
                qSortIndicator: 'D',
                qNumFormat: {
                  qType: 'R',
                  qnDec: 0,
                  qUseThou: 0,
                  qFmt: '##############',
                  qDec: ',',
                  qThou: ' ',
                },
                qMin: -16.80879533333332,
                qMax: -16.80879533333332,
                qIsAutoFormat: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qTrendLines: [],
                autoSort: true,
                cId: 'BfjX',
                numFormatFromTemplate: true,
                valueType: 'NORMAL',
                subtotal: {
                  enable: false,
                  label: 'Subtotals',
                },
              },
            ],
            qEffectiveInterColumnSortOrder: [0, 1, 2],
            qGrandTotalRow: [
              {
                qText: '1,1283',
                qNum: 1.128291048348492,
                qElemNumber: -1,
                qState: 'X',
                qIsTotalCell: true,
              },
              {
                qText: '0,24139',
                qNum: 0.24139007180469108,
                qElemNumber: -1,
                qState: 'X',
                qIsTotalCell: true,
              },
              {
                qText: '-16,808795333333',
                qNum: -16.80879533333332,
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
                      qText: '1,1283',
                      qNum: 1.128291048348492,
                      qElemNumber: 0,
                      qState: 'L',
                    },
                    {
                      qText: '0,24139',
                      qNum: 0.24139007180469108,
                      qElemNumber: 0,
                      qState: 'L',
                    },
                    {
                      qText: '-16,808795333333',
                      qNum: -16.80879533333332,
                      qElemNumber: 0,
                      qState: 'L',
                    },
                  ],
                ],
                qTails: [],
                qArea: {
                  qLeft: 0,
                  qTop: 0,
                  qWidth: 3,
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
            showLabels: true,
          },
          color: {
            auto: false,
            positiveValue: {
              paletteColor: {
                index: -1,
                color: '#4477aa',
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
            dock: 'auto',
          },
          measureAxis: {
            show: 'labels',
            dock: 'near',
            spacing: 1,
            autoMinMax: true,
            minMax: 'min',
            min: 0,
            max: 10,
          },
          dimensionAxis: {
            show: 'labels',
            label: 'auto',
            dock: 'near',
          },
          visualization: 'waterfallchart',
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
