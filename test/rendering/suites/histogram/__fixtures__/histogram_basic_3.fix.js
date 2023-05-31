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
            qId: '2711498d-6f6e-42b2-8adc-656fa3b91bf6',
            qType: 'embeddedsnapshot',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete', 'publish'],
            title: '',
            description: '',
            annotation: '',
          },
          qBookmark: {
            qStateData: [
              {
                qStateName: '$',
                qFieldItems: [],
              },
              {
                qStateName: 'state 2',
                qFieldItems: [],
              },
            ],
            qUtcModifyTime: 44469.39641203704,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-09-30T09:30:50.228Z',
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 64,
            },
            qDimensionInfo: [
              {
                qFallbackTitle: 'Sales Rep',
                qApprMaxGlyphCount: 3,
                qCardinal: 64,
                qSortIndicator: 'A',
                qGroupFallbackTitles: ['Sales Rep'],
                qGroupPos: 0,
                qStateCounts: {
                  qLocked: 0,
                  qSelected: 0,
                  qOption: 64,
                  qDeselected: 0,
                  qAlternative: 0,
                  qExcluded: 0,
                  qSelectedExcluded: 0,
                  qLockedExcluded: 0,
                },
                qTags: ['$key', '$numeric', '$integer'],
                qDimensionType: 'N',
                qGrouping: 'N',
                qNumFormat: {
                  qType: 'U',
                  qnDec: 0,
                  qUseThou: 0,
                },
                qIsAutoFormat: true,
                qGroupFieldDefs: ['Sales Rep'],
                qMin: 103,
                qMax: 185,
                qContinuousAxes: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qCardinalities: {
                  qCardinal: 64,
                  qHypercubeCardinal: 0,
                  qAllValuesCardinal: -1,
                },
                autoSort: true,
                cId: 'VQyPUnM',
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
          showDetails: false,
          gridlines: {
            auto: false,
            spacing: 0,
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
            show: 'none',
            dock: 'near',
            spacing: 1,
            autoMinMax: true,
            minMax: 'min',
            min: 0,
            max: 10,
            label: '',
          },
          dimensionAxis: {
            show: 'none',
            label: 'auto',
            dock: 'near',
          },
          visualization: 'histogram',
          version: '0.25.5',
          sorting: {
            autoSort: true,
          },
          qUndoExclude: {
            hashCode: -306024104,
            box: {
              qHyperCube: {
                qSize: {
                  qcx: 2,
                  qcy: 19,
                },
                qDimensionInfo: [
                  {
                    qFallbackTitle: 'Sales Rep',
                    qApprMaxGlyphCount: 16,
                    qCardinal: 19,
                    qSortIndicator: 'A',
                    qGroupFallbackTitles: ['Sales Rep'],
                    qGroupPos: 0,
                    qStateCounts: {
                      qLocked: 0,
                      qSelected: 0,
                      qOption: 19,
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
                    qGroupFieldDefs: ["=Class(aggr([Sales Rep],[Sales Rep]),4.5,'x',103)"],
                    qMin: 103,
                    qMax: 184,
                    qContinuousAxes: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qIsCalculated: true,
                    qCardinalities: {
                      qCardinal: 19,
                      qHypercubeCardinal: 19,
                      qAllValuesCardinal: -1,
                    },
                  },
                ],
                qMeasureInfo: [
                  {
                    qFallbackTitle: 'Frequency',
                    qApprMaxGlyphCount: 6,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'I',
                      qnDec: 0,
                      qUseThou: 1,
                      qFmt: '###0',
                      qDec: '.',
                    },
                    qMin: 792,
                    qMax: 16479,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                  },
                ],
                qEffectiveInterColumnSortOrder: [0, 1],
                qGrandTotalRow: [
                  {
                    qText: '138105',
                    qNum: 138105,
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
                          qText: '103 <= x < 107.5',
                          qNum: 103,
                          qElemNumber: 5,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '14002',
                          qNum: 14002,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '107.5 <= x < 112',
                          qNum: 107.5,
                          qElemNumber: 0,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '13040',
                          qNum: 13040,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '112 <= x < 116.5',
                          qNum: 112,
                          qElemNumber: 10,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '12991',
                          qNum: 12991,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '116.5 <= x < 121',
                          qNum: 116.5,
                          qElemNumber: 6,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '8991',
                          qNum: 8991,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '121 <= x < 125.5',
                          qNum: 121,
                          qElemNumber: 17,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '10890',
                          qNum: 10890,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '125.5 <= x < 130',
                          qNum: 125.5,
                          qElemNumber: 16,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '4141',
                          qNum: 4141,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '130 <= x < 134.5',
                          qNum: 130,
                          qElemNumber: 7,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '8491',
                          qNum: 8491,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '134.5 <= x < 139',
                          qNum: 134.5,
                          qElemNumber: 2,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '2035',
                          qNum: 2035,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '139 <= x < 143.5',
                          qNum: 139,
                          qElemNumber: 3,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '8792',
                          qNum: 8792,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '143.5 <= x < 148',
                          qNum: 143.5,
                          qElemNumber: 8,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '5187',
                          qNum: 5187,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '148 <= x < 152.5',
                          qNum: 148,
                          qElemNumber: 12,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '809',
                          qNum: 809,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '152.5 <= x < 157',
                          qNum: 152.5,
                          qElemNumber: 15,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '4962',
                          qNum: 4962,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '157 <= x < 161.5',
                          qNum: 157,
                          qElemNumber: 13,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '8799',
                          qNum: 8799,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '161.5 <= x < 166',
                          qNum: 161.5,
                          qElemNumber: 1,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '1809',
                          qNum: 1809,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '166 <= x < 170.5',
                          qNum: 166,
                          qElemNumber: 18,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '6213',
                          qNum: 6213,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '170.5 <= x < 175',
                          qNum: 170.5,
                          qElemNumber: 14,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '2884',
                          qNum: 2884,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '175 <= x < 179.5',
                          qNum: 175,
                          qElemNumber: 4,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '6798',
                          qNum: 6798,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '179.5 <= x < 184',
                          qNum: 179.5,
                          qElemNumber: 9,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '16479',
                          qNum: 16479,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '184 <= x < 188.5',
                          qNum: 184,
                          qElemNumber: 11,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '792',
                          qNum: 792,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
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
                      qHeight: 19,
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
              binSize: 4.5,
              offset: 103,
              binCount: 19,
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