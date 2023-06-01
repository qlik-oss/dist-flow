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
            qId: 'e4db4a38-0836-4436-aac8-4f3bde7f973d',
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
            qUtcModifyTime: 44469.388969907406,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-09-30T09:20:07.439Z',
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 31,
            },
            qDimensionInfo: [
              {
                qFallbackTitle: 'Product Type',
                qApprMaxGlyphCount: 2,
                qCardinal: 31,
                qSortIndicator: 'A',
                qGroupFallbackTitles: ['Product Type'],
                qGroupPos: 0,
                qStateCounts: {
                  qLocked: 0,
                  qSelected: 0,
                  qOption: 31,
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
                qGroupFieldDefs: ['Product Type'],
                qMin: 1,
                qMax: 47,
                qContinuousAxes: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qCardinalities: {
                  qCardinal: 31,
                  qHypercubeCardinal: 0,
                  qAllValuesCardinal: -1,
                },
                autoSort: true,
                cId: 'pjPUFmp',
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
                color: '#4477aa',
              },
            },
          },
          measureAxis: {
            show: 'all',
            dock: 'far',
            spacing: 0.5,
            autoMinMax: false,
            minMax: 'minMax',
            min: 800,
            max: 1000,
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
            hashCode: 1720287761,
            box: {
              qHyperCube: {
                qSize: {
                  qcx: 2,
                  qcy: 14,
                },
                qDimensionInfo: [
                  {
                    qFallbackTitle: 'Product Type',
                    qApprMaxGlyphCount: 14,
                    qCardinal: 14,
                    qSortIndicator: 'A',
                    qGroupFallbackTitles: ['Product Type'],
                    qGroupPos: 0,
                    qStateCounts: {
                      qLocked: 0,
                      qSelected: 0,
                      qOption: 14,
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
                    qGroupFieldDefs: ['=Class(aggr([Product Type],[Product Type]),3.5)'],
                    qMin: 0,
                    qMax: 45.5,
                    qContinuousAxes: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qIsCalculated: true,
                    qCardinalities: {
                      qCardinal: 14,
                      qHypercubeCardinal: 14,
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
                    qMin: 27,
                    qMax: 1266,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                  },
                ],
                qEffectiveInterColumnSortOrder: [0, 1],
                qGrandTotalRow: [
                  {
                    qText: '7479',
                    qNum: 7479,
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
                          qText: '0 <= x < 3.5',
                          qNum: 0,
                          qElemNumber: 12,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '486',
                          qNum: 486,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '3.5 <= x < 7',
                          qNum: 3.5,
                          qElemNumber: 5,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '525',
                          qNum: 525,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '7 <= x < 10.5',
                          qNum: 7,
                          qElemNumber: 4,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '318',
                          qNum: 318,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '10.5 <= x < 14',
                          qNum: 10.5,
                          qElemNumber: 6,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '375',
                          qNum: 375,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '14 <= x < 17.5',
                          qNum: 14,
                          qElemNumber: 9,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '219',
                          qNum: 219,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '17.5 <= x < 21',
                          qNum: 17.5,
                          qElemNumber: 13,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '825',
                          qNum: 825,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '21 <= x < 24.5',
                          qNum: 21,
                          qElemNumber: 1,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '372',
                          qNum: 372,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '24.5 <= x < 28',
                          qNum: 24.5,
                          qElemNumber: 0,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '534',
                          qNum: 534,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '28 <= x < 31.5',
                          qNum: 28,
                          qElemNumber: 2,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '513',
                          qNum: 513,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '31.5 <= x < 35',
                          qNum: 31.5,
                          qElemNumber: 8,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '513',
                          qNum: 513,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '35 <= x < 38.5',
                          qNum: 35,
                          qElemNumber: 11,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '27',
                          qNum: 27,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '38.5 <= x < 42',
                          qNum: 38.5,
                          qElemNumber: 10,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '261',
                          qNum: 261,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '42 <= x < 45.5',
                          qNum: 42,
                          qElemNumber: 7,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '1266',
                          qNum: 1266,
                          qElemNumber: 0,
                          qState: 'L',
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: '45.5 <= x < 49',
                          qNum: 45.5,
                          qElemNumber: 3,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '1245',
                          qNum: 1245,
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
                      qHeight: 14,
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
              binSize: 3.5,
              offset: 0,
              binCount: 14,
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
          sourceObjectId: 'ZsBnYJR',
          sheetId: '9999b835-dad7-4fa0-83bf-621b5312c430',
          timestamp: 1632993607318,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
