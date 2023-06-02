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
            qId: 'WRZteL',
            qType: 'histogram',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 1498,
            },
            qDimensionInfo: [
              {
                qFallbackTitle: 'BackOrder Amount',
                qApprMaxGlyphCount: 9,
                qCardinal: 1498,
                qSortIndicator: 'A',
                qGroupFallbackTitles: ['BackOrder Amount'],
                qGroupPos: 0,
                qStateCounts: {
                  qLocked: 0,
                  qSelected: 0,
                  qOption: 1498,
                  qDeselected: 0,
                  qAlternative: 0,
                  qExcluded: 0,
                  qSelectedExcluded: 0,
                  qLockedExcluded: 0,
                },
                qTags: ['$numeric'],
                qDimensionType: 'N',
                qGrouping: 'N',
                qNumFormat: {
                  qType: 'U',
                  qnDec: 0,
                  qUseThou: 0,
                },
                qIsAutoFormat: true,
                qGroupFieldDefs: ['BackOrder Amount'],
                qMin: -212031.2,
                qMax: 599580,
                qContinuousAxes: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qCardinalities: {
                  qCardinal: 1498,
                  qHypercubeCardinal: 1498,
                  qAllValuesCardinal: -1,
                },
                autoSort: true,
                cId: 'wXpYAWK',
                othersLabel: 'Others',
              },
            ],
            qMeasureInfo: [],
            qEffectiveInterColumnSortOrder: [0],
            qGrandTotalRow: [],
            qDataPages: [],
            qPivotDataPages: [],
            qStackedDataPages: [],
            qMode: 'S',
            qNoOfLeftDims: -1,
            qTreeNodesOnDim: [],
            qColumnOrder: [],
          },
          script: '',
          bins: {
            auto: true,
            binMode: 'maxCount',
            binCount: '',
            binSize: 10,
            offset: 0,
            countDistinct: false,
          },
          refLine: {
            refLines: [],
          },
          showTitles: true,
          title: '',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: true,
          showDetailsExpression: false,
          components: [
            {
              key: 'general',
            },
            {
              key: 'axis',
              axis: {
                title: {
                  fontSize: '16px',
                  fontColor: {
                    index: -1,
                    color: '#20d91e',
                  },
                  fontFamily: 'Arial, sans-serif',
                },
                label: {
                  name: {
                    fontSize: '16px',
                    fontColor: {
                      index: -1,
                      color: '#20d91e',
                    },
                    fontFamily: 'Arial Black, sans-serif',
                  },
                },
              },
            },
            {
              key: 'value',
              label: {
                value: {
                  fontSize: '16px',
                  fontColor: {
                    index: -1,
                    color: '#20d91e',
                  },
                },
              },
            },
          ],
          gridlines: {
            auto: true,
            spacing: 2,
          },
          dataPoint: {
            showLabels: true,
          },
          color: {
            bar: {
              paletteColor: {
                index: 6,
                color: '#4477aa',
              },
            },
          },
          measureAxis: {
            show: 'all',
            dock: 'near',
            spacing: 1,
            autoMinMax: true,
            minMax: 'min',
            min: 0,
            max: 10,
            label: '',
          },
          dimensionAxis: {
            show: 'all',
            label: 'auto',
            dock: 'near',
          },
          visualization: 'histogram',
          version: '0.33.1',
          sorting: {
            autoSort: true,
          },
          qUndoExclude: {
            hashCode: 1019833723,
            box: {
              qHyperCube: {
                qSize: {
                  qcx: 2,
                  qcy: 10,
                },
                qDimensionInfo: [
                  {
                    qFallbackTitle: 'BackOrder Amount',
                    qApprMaxGlyphCount: 22,
                    qCardinal: 10,
                    qSortIndicator: 'A',
                    qGroupFallbackTitles: ['BackOrder Amount'],
                    qGroupPos: 0,
                    qStateCounts: {
                      qLocked: 0,
                      qSelected: 0,
                      qOption: 10,
                      qDeselected: 0,
                      qAlternative: 0,
                      qExcluded: 0,
                      qSelectedExcluded: 0,
                      qLockedExcluded: 0,
                    },
                    qTags: ['$numeric', '$integer'],
                    qDimensionType: 'N',
                    qGrouping: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qIsAutoFormat: true,
                    qGroupFieldDefs: ["=Class(aggr([BackOrder Amount],[BackOrder Amount]),65000,'x',-220000)"],
                    qMin: -220000,
                    qMax: 560000,
                    qContinuousAxes: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qIsCalculated: true,
                    qCardinalities: {
                      qCardinal: 10,
                      qHypercubeCardinal: 10,
                      qAllValuesCardinal: -1,
                    },
                  },
                ],
                qMeasureInfo: [
                  {
                    qFallbackTitle: 'Frequency',
                    qApprMaxGlyphCount: 4,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'I',
                      qnDec: 0,
                      qUseThou: 1,
                      qFmt: '###0',
                      qDec: '.',
                    },
                    qMin: 1,
                    qMax: 2204,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                  },
                ],
                qEffectiveInterColumnSortOrder: [0, 1],
                qGrandTotalRow: [
                  {
                    qText: '2239',
                    qNum: 2239,
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
                          qText: '-220000 <= x < -155000',
                          qNum: -220000,
                          qElemNumber: 6,
                          qState: 'O',
                        },
                        {
                          qText: '1',
                          qNum: 1,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '-25000 <= x < 40000',
                          qNum: -25000,
                          qElemNumber: 0,
                          qState: 'O',
                        },
                        {
                          qText: '2204',
                          qNum: 2204,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '40000 <= x < 105000',
                          qNum: 40000,
                          qElemNumber: 1,
                          qState: 'O',
                        },
                        {
                          qText: '21',
                          qNum: 21,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '105000 <= x < 170000',
                          qNum: 105000,
                          qElemNumber: 7,
                          qState: 'O',
                        },
                        {
                          qText: '3',
                          qNum: 3,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '170000 <= x < 235000',
                          qNum: 170000,
                          qElemNumber: 8,
                          qState: 'O',
                        },
                        {
                          qText: '5',
                          qNum: 5,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '235000 <= x < 300000',
                          qNum: 235000,
                          qElemNumber: 9,
                          qState: 'O',
                        },
                        {
                          qText: '1',
                          qNum: 1,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '300000 <= x < 365000',
                          qNum: 300000,
                          qElemNumber: 2,
                          qState: 'O',
                        },
                        {
                          qText: '1',
                          qNum: 1,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '365000 <= x < 430000',
                          qNum: 365000,
                          qElemNumber: 3,
                          qState: 'O',
                        },
                        {
                          qText: '1',
                          qNum: 1,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '495000 <= x < 560000',
                          qNum: 495000,
                          qElemNumber: 4,
                          qState: 'O',
                        },
                        {
                          qText: '1',
                          qNum: 1,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '560000 <= x < 625000',
                          qNum: 560000,
                          qElemNumber: 5,
                          qState: 'O',
                        },
                        {
                          qText: '1',
                          qNum: 1,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                    ],
                    qTails: [
                      {
                        qUp: 0,
                        qDown: 0,
                      },
                    ],
                    qArea: {
                      qLeft: 0,
                      qTop: 0,
                      qWidth: 2,
                      qHeight: 10,
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
            },
            bins: {
              binSize: 65000,
              offset: -220000,
              binCount: 13,
            },
          },
          snapshotData: {
            object: {
              size: {
                w: 945,
                h: 391,
              },
            },
            rtl: false,
            content: {
              chartData: {},
              size: {},
            },
            parent: {
              h: 857,
              w: 1920,
            },
          },
          visualizationType: 'histogram',
          sourceObjectId: 'KsjKreA',
          sheetId: '9999b835-dad7-4fa0-83bf-621b5312c430',
          timestamp: 1632994250220,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
