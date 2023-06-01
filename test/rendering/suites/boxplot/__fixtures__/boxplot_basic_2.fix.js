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
            qId: '8cb79c49-0842-4d2f-ad4c-eb09dd393136',
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
            qUtcModifyTime: 44468.49260416667,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-09-29T11:49:21.304Z',
          qSelectionInfo: {},
          boxplotDef: {
            qHyperCube: {
              qSize: {
                qcx: 2,
                qcy: 12,
              },
              qDimensionInfo: [
                {
                  qFallbackTitle: 'Month',
                  qApprMaxGlyphCount: 3,
                  qCardinal: 12,
                  qSortIndicator: 'A',
                  qGroupFallbackTitles: ['Month'],
                  qGroupPos: 0,
                  qStateCounts: {
                    qLocked: 0,
                    qSelected: 0,
                    qOption: 12,
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
                  qGroupFieldDefs: ['Month'],
                  qMin: 1,
                  qMax: 12,
                  qContinuousAxes: true,
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qCardinalities: {
                    qCardinal: 12,
                    qHypercubeCardinal: 12,
                    qAllValuesCardinal: -1,
                  },
                  qLibraryId: '50a5fd45-6023-487a-a6d1-f71681f0dafe',
                  title: 'Month',
                  autoSort: true,
                  cId: 'zhUPHf',
                  othersLabel: 'Others',
                },
              ],
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
                  qMin: 44884486.24000001,
                  qMax: 45959669.79999998,
                  qIsAutoFormat: true,
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qLibraryId: 'uQbd',
                  qTrendLines: [],
                  autoSort: true,
                  cId: 'zNPr',
                  numFormatFromTemplate: true,
                  quarantine: {
                    qNumFormat: {},
                    isCustomFormatted: false,
                  },
                },
              ],
              qEffectiveInterColumnSortOrder: [1, 0],
              qGrandTotalRow: [
                {
                  qText: '46258458.11',
                  qNum: 46258458.110000014,
                  qElemNumber: -1,
                  qState: 'X',
                  qIsTotalCell: true,
                },
              ],
              qDataPages: [],
              qPivotDataPages: [],
              qStackedDataPages: [],
              qMode: 'S',
              qNoOfLeftDims: -1,
              qTreeNodesOnDim: [],
              qColumnOrder: [],
            },
            calculations: {
              auto: true,
              mode: 'fractiles',
              parameters: {
                tukey: 2,
                fractiles: 0.01,
                stdDev: 3,
              },
            },
            elements: {
              firstWhisker: {
                name: '',
                expression: null,
              },
              boxStart: {
                name: '',
                expression: null,
              },
              boxMiddle: {
                name: '',
                expression: null,
              },
              boxEnd: {
                name: '',
                expression: null,
              },
              lastWhisker: {
                name: '',
                expression: null,
              },
              outliers: {
                include: false,
                sortOutliers: true,
              },
            },
            presentation: {
              whiskers: {
                show: false,
              },
            },
            color: {
              auto: false,
              mode: 'primary',
              box: {
                paletteColor: {
                  color: '#05e612',
                  index: -1,
                },
              },
              point: {
                paletteColor: {
                  color: '#276e27',
                  index: 3,
                },
              },
              expressionIsColor: true,
              useBaseColors: 'off',
              expressionLabel: '',
            },
            sorting: {
              autoSort: true,
            },
          },
          refLine: {
            refLines: [
              {
                show: true,
                label: 'Ref',
                showLabel: true,
                refLineExpr: {
                  value: 45000000,
                  label: '45000000',
                },
                showValue: true,
                paletteColor: {
                  index: -1,
                  color: '#269011',
                },
                style: {
                  lineThickness: 2,
                  lineType: '8 4',
                },
                coloredBackground: false,
                cId: 'PpkbC',
              },
            ],
          },
          showTitles: true,
          title: '',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: false,
          showDisclaimer: true,
          orientation: 'horizontal',
          gridlines: {
            auto: true,
            spacing: 2,
          },
          measureAxis: {
            show: 'all',
            dock: 'near',
            spacing: 1,
            autoMinMax: true,
            minMax: 'min',
            min: 0,
            max: 10,
          },
          dimensionAxis: {
            show: 'all',
            label: 'auto',
            dock: 'near',
          },
          visualization: 'boxplot',
          version: '0.26.2',
          sorting: {
            autoSort: true,
            elementId: 'firstWhisker',
            sortCriteria: {
              sortByAscii: 0,
              sortByExpression: 0,
              sortByNumeric: 0,
            },
          },
          qUndoExclude: {
            hashCode: 191426131,
            box: {
              qHyperCube: {
                qSize: {
                  qcx: 5,
                  qcy: 1,
                },
                qDimensionInfo: [],
                qMeasureInfo: [
                  {
                    qFallbackTitle: 'First whisker',
                    qApprMaxGlyphCount: 13,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 44889851.24360001,
                    qMax: 44889851.24360001,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='1st percentile'",
                        qNumFormat: {
                          qType: 'U',
                          qnDec: 0,
                          qUseThou: 0,
                        },
                        qIsAutoFormat: true,
                        id: 'tooltip',
                      },
                    ],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                    cId: 'PJYJVg',
                  },
                  {
                    qFallbackTitle: 'Box start',
                    qApprMaxGlyphCount: 10,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 45060894.60000001,
                    qMax: 45060894.60000001,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='First quartile'",
                        qNumFormat: {
                          qType: 'U',
                          qnDec: 0,
                          qUseThou: 0,
                        },
                        qIsAutoFormat: true,
                        id: 'tooltip',
                      },
                    ],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                    cId: 'YPwANq',
                  },
                  {
                    qFallbackTitle: 'Center line',
                    qApprMaxGlyphCount: 11,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 45125846.19000001,
                    qMax: 45125846.19000001,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='Median'",
                        qNumFormat: {
                          qType: 'U',
                          qnDec: 0,
                          qUseThou: 0,
                        },
                        qIsAutoFormat: true,
                        id: 'tooltip',
                      },
                    ],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                    cId: 'VrNyybW',
                  },
                  {
                    qFallbackTitle: 'Box end',
                    qApprMaxGlyphCount: 13,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 45286156.5475,
                    qMax: 45286156.5475,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='Third quartile'",
                        qNumFormat: {
                          qType: 'U',
                          qnDec: 0,
                          qUseThou: 0,
                        },
                        qIsAutoFormat: true,
                        id: 'tooltip',
                      },
                    ],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                    cId: 'vnfWDj',
                  },
                  {
                    qFallbackTitle: 'Last whisker',
                    qApprMaxGlyphCount: 13,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 45958019.80439998,
                    qMax: 45958019.80439998,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='99th percentile'",
                        qNumFormat: {
                          qType: 'U',
                          qnDec: 0,
                          qUseThou: 0,
                        },
                        qIsAutoFormat: true,
                        id: 'tooltip',
                      },
                    ],
                    qAttrDimInfo: [],
                    qTrendLines: [],
                    cId: 'rfnqEK',
                  },
                ],
                qEffectiveInterColumnSortOrder: [0, 1, 2, 3, 4],
                qGrandTotalRow: [
                  {
                    qText: '44889851.2436',
                    qNum: 44889851.24360001,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '45060894.6',
                    qNum: 45060894.60000001,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '45125846.19',
                    qNum: 45125846.19000001,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '45286156.5475',
                    qNum: 45286156.5475,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '45958019.8044',
                    qNum: 45958019.80439998,
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
                          qText: '44889851.2436',
                          qNum: 44889851.24360001,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: '1st percentile',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '45060894.6',
                          qNum: 45060894.60000001,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'First quartile',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '45125846.19',
                          qNum: 45125846.19000001,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Median',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '45286156.5475',
                          qNum: 45286156.5475,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Third quartile',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '45958019.8044',
                          qNum: 45958019.80439998,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: '99th percentile',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                    ],
                    qTails: [],
                    qArea: {
                      qLeft: 0,
                      qTop: 0,
                      qWidth: 5,
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
          visualizationType: 'boxplot',
          sourceObjectId: 'pPTkJMG',
          sheetId: 'bb52098c-5bf6-44f3-b475-c3c817e77f19',
          timestamp: 1632916161293,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
