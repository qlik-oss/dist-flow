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
            qId: 'f119121f-7565-4adc-8847-b2d49864182d',
            qType: 'embeddedsnapshot',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete', 'exportdata'],
          },
          qBookmark: {
            qStateData: [
              {
                qStateName: '$',
                qFieldItems: [],
              },
            ],
            qUtcModifyTime: 44413.62700231482,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-08-05T13:02:53.587Z',
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 191,
            },
            qDimensionInfo: [
              {
                qFallbackTitle: 'AsciiNum',
                qApprMaxGlyphCount: 3,
                qCardinal: 191,
                qSortIndicator: 'A',
                qGroupFallbackTitles: ['AsciiNum'],
                qGroupPos: 0,
                qStateCounts: {
                  qLocked: 0,
                  qSelected: 0,
                  qOption: 191,
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
                  qType: 'I',
                  qnDec: 0,
                  qUseThou: 1,
                  qFmt: '###0',
                  qDec: ',',
                },
                qIsAutoFormat: true,
                qGroupFieldDefs: ['AsciiNum'],
                qMin: 32,
                qMax: 255,
                qContinuousAxes: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qCardinalities: {
                  qCardinal: 191,
                  qHypercubeCardinal: 0,
                  qAllValuesCardinal: -1,
                },
                autoSort: true,
                cId: 'mpPJP',
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
            auto: true,
            spacing: 2,
          },
          dataPoint: {
            showLabels: false,
          },
          color: {
            bar: {
              paletteColor: {
                index: 6,
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
          sorting: {
            autoSort: true,
          },
          qUndoExclude: {
            hashCode: -1292725650,
            box: {
              qHyperCube: {
                qSize: {
                  qcx: 2,
                  qcy: 8,
                },
                qDimensionInfo: [
                  {
                    qFallbackTitle: 'AsciiNum',
                    qApprMaxGlyphCount: 14,
                    qCardinal: 8,
                    qSortIndicator: 'A',
                    qGroupFallbackTitles: ['AsciiNum'],
                    qGroupPos: 0,
                    qStateCounts: {
                      qLocked: 0,
                      qSelected: 0,
                      qOption: 8,
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
                    qGroupFieldDefs: ["=Class(aggr([AsciiNum],[AsciiNum]),25,'x',32)"],
                    qMin: 32,
                    qMax: 232,
                    qContinuousAxes: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qIsCalculated: true,
                    qCardinalities: {
                      qCardinal: 8,
                      qHypercubeCardinal: 8,
                      qAllValuesCardinal: -1,
                    },
                  },
                ],
                qMeasureInfo: [
                  {
                    qFallbackTitle: 'Frequency',
                    qApprMaxGlyphCount: 3,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'I',
                      qnDec: 0,
                      qUseThou: 1,
                      qFmt: '###0',
                      qDec: ',',
                    },
                    qMin: 20,
                    qMax: 25,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                  },
                ],
                qEffectiveInterColumnSortOrder: [0, 1],
                qGrandTotalRow: [
                  {
                    qText: '191',
                    qNum: 191,
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
                          qText: '32 <= x < 57',
                          qNum: 32,
                          qElemNumber: 0,
                          qState: 'O',
                        },
                        {
                          qText: '25',
                          qNum: 25,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '57 <= x < 82',
                          qNum: 57,
                          qElemNumber: 1,
                          qState: 'O',
                        },
                        {
                          qText: '25',
                          qNum: 25,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '82 <= x < 107',
                          qNum: 82,
                          qElemNumber: 2,
                          qState: 'O',
                        },
                        {
                          qText: '25',
                          qNum: 25,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '107 <= x < 132',
                          qNum: 107,
                          qElemNumber: 3,
                          qState: 'O',
                        },
                        {
                          qText: '20',
                          qNum: 20,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '157 <= x < 182',
                          qNum: 157,
                          qElemNumber: 4,
                          qState: 'O',
                        },
                        {
                          qText: '22',
                          qNum: 22,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '182 <= x < 207',
                          qNum: 182,
                          qElemNumber: 5,
                          qState: 'O',
                        },
                        {
                          qText: '25',
                          qNum: 25,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '207 <= x < 232',
                          qNum: 207,
                          qElemNumber: 6,
                          qState: 'O',
                        },
                        {
                          qText: '25',
                          qNum: 25,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                      [
                        {
                          qText: '232 <= x < 257',
                          qNum: 232,
                          qElemNumber: 7,
                          qState: 'O',
                        },
                        {
                          qText: '24',
                          qNum: 24,
                          qElemNumber: 0,
                          qState: 'L',
                        },
                      ],
                    ],
                    qTails: [],
                    qArea: {
                      qLeft: 0,
                      qTop: 0,
                      qWidth: 2,
                      qHeight: 8,
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
              binSize: 25,
              offset: 32,
              binCount: 9,
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
          sourceObjectId: 'QttHJ',
          sheetId: '7a3b3d88-153a-4ed6-abbc-36cf58d11047',
          timestamp: 1628168573569,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
