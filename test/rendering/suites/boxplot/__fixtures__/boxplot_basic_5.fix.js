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
            qId: '22fa65a0-0f77-460a-b3c7-ca613ff80b02',
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
            qUtcModifyTime: 44468.52202546296,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-09-29T12:31:43.182Z',
          qSelectionInfo: {
            qInSelections: false,
            qMadeSelections: false,
          },
          boxplotDef: {
            qHyperCube: {
              qSize: {
                qcx: 3,
                qcy: 40,
              },
              qDimensionInfo: [
                {
                  qFallbackTitle: 'Region Name',
                  qApprMaxGlyphCount: 9,
                  qCardinal: 4,
                  qSortIndicator: 'A',
                  qGroupFallbackTitles: ['Region Name'],
                  qGroupPos: 0,
                  qStateCounts: {
                    qLocked: 0,
                    qSelected: 0,
                    qOption: 4,
                    qDeselected: 0,
                    qAlternative: 0,
                    qExcluded: 0,
                    qSelectedExcluded: 0,
                    qLockedExcluded: 0,
                  },
                  qTags: ['$ascii', '$text'],
                  qDimensionType: 'D',
                  qGrouping: 'N',
                  qNumFormat: {
                    qType: 'U',
                    qnDec: 0,
                    qUseThou: 0,
                  },
                  qIsAutoFormat: true,
                  qGroupFieldDefs: ['Region Name'],
                  qMin: 'NaN',
                  qMax: 'NaN',
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qCardinalities: {
                    qCardinal: 4,
                    qHypercubeCardinal: 4,
                    qAllValuesCardinal: -1,
                  },
                  qLibraryId: 'cf1d8ef8-4020-4f81-b487-514c354875b4',
                  title: 'Region Name',
                  autoSort: true,
                  cId: 'FvzjJET',
                  othersLabel: 'Others',
                },
                {
                  qFallbackTitle: 'Regional Sales Mgr',
                  qApprMaxGlyphCount: 15,
                  qCardinal: 15,
                  qSortIndicator: 'A',
                  qGroupFallbackTitles: ['Regional Sales Mgr'],
                  qGroupPos: 0,
                  qStateCounts: {
                    qLocked: 0,
                    qSelected: 0,
                    qOption: 15,
                    qDeselected: 0,
                    qAlternative: 0,
                    qExcluded: 0,
                    qSelectedExcluded: 0,
                    qLockedExcluded: 0,
                  },
                  qTags: ['$ascii', '$text'],
                  qDimensionType: 'D',
                  qGrouping: 'N',
                  qNumFormat: {
                    qType: 'U',
                    qnDec: 0,
                    qUseThou: 0,
                  },
                  qIsAutoFormat: true,
                  qGroupFieldDefs: ['Regional Sales Mgr Name'],
                  qMin: 'NaN',
                  qMax: 'NaN',
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qCardinalities: {
                    qCardinal: 15,
                    qHypercubeCardinal: 15,
                    qAllValuesCardinal: -1,
                  },
                  autoSort: true,
                  cId: 'vLv',
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
                  qMin: 0,
                  qMax: 11590151.359999998,
                  qIsAutoFormat: true,
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qLibraryId: 'uQbd',
                  qTrendLines: [],
                  autoSort: true,
                  cId: 'fpJcd',
                  numFormatFromTemplate: true,
                  quarantine: {
                    qNumFormat: {},
                    isCustomFormatted: false,
                  },
                },
              ],
              qEffectiveInterColumnSortOrder: [0, 1, 2],
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
              mode: 'tukey',
              parameters: {
                tukey: 1.5,
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
              mode: 'byExpression',
              box: {
                paletteColor: {
                  color: '#e6e6e6',
                  index: -1,
                },
              },
              point: {
                paletteColor: {
                  color: '#4477aa',
                  index: 6,
                },
              },
              expressionIsColor: true,
              useBaseColors: 'off',
              expressionLabel: '',
              expression: 4284776576,
            },
            sorting: {
              autoSort: false,
              elementId: 'boxMiddle',
              sortCriteria: {
                sortByExpression: -1,
                sortByAscii: 0,
                sortByNumeric: 0,
                sortByLoadOrder: 1,
              },
              expression: 264404.93,
            },
          },
          refLine: {
            refLines: [
              {
                show: true,
                label: 'Ref',
                showLabel: true,
                refLineExpr: {
                  value: 5000000,
                  label: '5000000',
                },
                showValue: true,
                paletteColor: {
                  index: -1,
                  color: '#38aa2b',
                },
                style: {
                  lineThickness: 2,
                  lineType: '',
                },
                coloredBackground: false,
                cId: 'kvXZvMW',
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
            show: 'none',
            dock: 'far',
            spacing: 1,
            autoMinMax: true,
            minMax: 'min',
            min: 0,
            max: 10,
          },
          dimensionAxis: {
            show: 'none',
            label: 'layered',
            dock: 'far',
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
            hashCode: 982882804,
            box: {
              qHyperCube: {
                qSize: {
                  qcx: 6,
                  qcy: 15,
                },
                qDimensionInfo: [
                  {
                    qFallbackTitle: 'Regional Sales Mgr',
                    qApprMaxGlyphCount: 15,
                    qCardinal: 15,
                    qSortIndicator: 'D',
                    qGroupFallbackTitles: ['Regional Sales Mgr'],
                    qGroupPos: 0,
                    qStateCounts: {
                      qLocked: 0,
                      qSelected: 0,
                      qOption: 15,
                      qDeselected: 0,
                      qAlternative: 0,
                      qExcluded: 0,
                      qSelectedExcluded: 0,
                      qLockedExcluded: 0,
                    },
                    qTags: ['$ascii', '$text'],
                    qDimensionType: 'D',
                    qGrouping: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qIsAutoFormat: true,
                    qGroupFieldDefs: ['Regional Sales Mgr Name'],
                    qMin: 'NaN',
                    qMax: 'NaN',
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qCardinalities: {
                      qCardinal: 15,
                      qHypercubeCardinal: 15,
                      qAllValuesCardinal: -1,
                    },
                    autoSort: true,
                    cId: 'vLv',
                    othersLabel: 'Others',
                  },
                ],
                qMeasureInfo: [
                  {
                    qFallbackTitle: 'First whisker',
                    qApprMaxGlyphCount: 10,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'R',
                      qnDec: 14,
                      qUseThou: 1,
                      qFmt: '##############',
                      qDec: '.',
                    },
                    qMin: 0,
                    qMax: 2709853.750000001,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 4278255360,
                        qMax: 4294967040,
                        qFallbackTitle:
                          "If([Regional Sales Mgr Name] = 'Asia', rgb(255,0,0),\r\n     If([Regional Sales Mgr Name]='South America', rgb(255,255,0),\n          If([Regional Sales Mgr Name]='Scott Porter', rgb(0,255,0), rgb(100,128,128))))",
                        qMinText: 'RGB(0,255,0)',
                        qMaxText: 'RGB(255,255,0)',
                        qNumFormat: {
                          qType: 'U',
                          qnDec: 0,
                          qUseThou: 0,
                        },
                        qIsAutoFormat: true,
                        id: 'colorByExpression',
                      },
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='Box start - 1.5 IQR'",
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
                    cId: 'VQmKP',
                  },
                  {
                    qFallbackTitle: 'Box start',
                    qApprMaxGlyphCount: 11,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 819.0349999999999,
                    qMax: 3447608.0200000014,
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
                    cId: 'ePMuMP',
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
                    qMin: 1062.96,
                    qMax: 4812549.175000001,
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
                    cId: 'ahTWeR',
                  },
                  {
                    qFallbackTitle: 'Box end',
                    qApprMaxGlyphCount: 12,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 1062.96,
                    qMax: 6055323.8375,
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
                    cId: 'dEjLJp',
                  },
                  {
                    qFallbackTitle: 'Last whisker',
                    qApprMaxGlyphCount: 12,
                    qCardinal: 0,
                    qSortIndicator: 'N',
                    qNumFormat: {
                      qType: 'R',
                      qnDec: 14,
                      qUseThou: 1,
                      qFmt: '##############',
                      qDec: '.',
                    },
                    qMin: 1062.96,
                    qMax: 7759111.272499999,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [
                      {
                        qMin: 'NaN',
                        qMax: 'NaN',
                        qFallbackTitle: "='Box end + 1.5 IQR'",
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
                    cId: 'nzZmueJ',
                  },
                ],
                qEffectiveInterColumnSortOrder: [0, 1, 2, 3, 4, 5],
                qGrandTotalRow: [
                  {
                    qText: '0',
                    qNum: 0,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '13906.6125',
                    qNum: 13906.6125,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '264404.93',
                    qNum: 264404.93,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '1163519.56',
                    qNum: 1163519.5600000005,
                    qElemNumber: -1,
                    qState: 'X',
                    qIsTotalCell: true,
                  },
                  {
                    qText: '2887938.98125',
                    qNum: 2887938.981250001,
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
                          qText: 'South America',
                          qNum: 'NaN',
                          qElemNumber: 8,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '2709853.75',
                          qNum: 2709853.750000001,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(255,255,0)',
                                qNum: 4294967040,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '3447608.02',
                          qNum: 3447608.0200000014,
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
                          qText: '4812549.175',
                          qNum: 4812549.175000001,
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
                          qText: '6055323.8375',
                          qNum: 6055323.8375,
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
                          qText: '6426578.63',
                          qNum: 6426578.630000003,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Western Europe',
                          qNum: 'NaN',
                          qElemNumber: 6,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '1838452.49',
                          qNum: 1838452.4899999998,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '1838452.49',
                          qNum: 1838452.4899999998,
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
                          qText: '1838452.49',
                          qNum: 1838452.4899999998,
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
                          qText: '1838452.49',
                          qNum: 1838452.4899999998,
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
                          qText: '1838452.49',
                          qNum: 1838452.4899999998,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Scott Porter',
                          qNum: 'NaN',
                          qElemNumber: 12,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '0',
                          qNum: 0,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(0,255,0)',
                                qNum: 4278255360,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '545380.195',
                          qNum: 545380.1949999998,
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
                          qText: '1090760.39',
                          qNum: 1090760.3899999997,
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
                          qText: '1636140.585',
                          qNum: 1636140.5849999995,
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
                          qText: '2181520.78',
                          qNum: 2181520.7799999993,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Harold Ogden',
                          qNum: 'NaN',
                          qElemNumber: 3,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '393626.33',
                          qNum: 393626.32999999996,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '414483.9275',
                          qNum: 414483.9275000001,
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
                          qText: '516998.895',
                          qNum: 516998.8949999999,
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
                          qText: '744617.2625',
                          qNum: 744617.2625,
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
                          qText: '1140785.06',
                          qNum: 1140785.0600000008,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'House Accounts',
                          qNum: 'NaN',
                          qElemNumber: 5,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '2379.7',
                          qNum: 2379.7,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '63541.0375',
                          qNum: 63541.03750000002,
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
                          qText: '338636.88',
                          qNum: 338636.87999999995,
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
                          qText: '773531.5325',
                          qNum: 773531.5325,
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
                          qText: '1314089.3',
                          qNum: 1314089.3,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Greg Ballantyne',
                          qNum: 'NaN',
                          qElemNumber: 13,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '16190.81',
                          qNum: 16190.810000000003,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '73652.75',
                          qNum: 73652.75,
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
                          qText: '314716.205',
                          qNum: 314716.20499999996,
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
                          qText: '1218414.0125',
                          qNum: 1218414.0125000004,
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
                          qText: '2935555.90625',
                          qNum: 2935555.906250001,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Gage Hartman',
                          qNum: 'NaN',
                          qElemNumber: 11,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '0',
                          qNum: 0,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '155865.44',
                          qNum: 155865.44,
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
                          qText: '311730.88',
                          qNum: 311730.88,
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
                          qText: '771726.97',
                          qNum: 771726.97,
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
                          qText: '1231723.06',
                          qNum: 1231723.06,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Greg Kaphammer',
                          qNum: 'NaN',
                          qElemNumber: 4,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '15212.25',
                          qNum: 15212.25,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '117308.535',
                          qNum: 117308.53500000003,
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
                          qText: '259998.175',
                          qNum: 259998.175,
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
                          qText: '3174029.63',
                          qNum: 3174029.6299999994,
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
                          qText: '7759111.2725',
                          qNum: 7759111.272499999,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Brian Sleicher',
                          qNum: 'NaN',
                          qElemNumber: 14,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '140095.01',
                          qNum: 140095.01,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '179738.87',
                          qNum: 179738.87,
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
                          qText: '219382.73',
                          qNum: 219382.73,
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
                          qText: '259026.59',
                          qNum: 259026.59000000003,
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
                          qText: '298670.45',
                          qNum: 298670.45,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Asia',
                          qNum: 'NaN',
                          qElemNumber: 0,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '936.66',
                          qNum: 936.66,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(255,0,0)',
                                qNum: 4294901760,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '93822.78',
                          qNum: 93822.78,
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
                          qText: '177462.115',
                          qNum: 177462.115,
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
                          qText: '294982.1375',
                          qNum: 294982.1375,
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
                          qText: '489510.32',
                          qNum: 489510.32000000007,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Africa',
                          qNum: 'NaN',
                          qElemNumber: 10,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '98916.31',
                          qNum: 98916.31,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '98916.31',
                          qNum: 98916.31,
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
                          qText: '98916.31',
                          qNum: 98916.31,
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
                          qText: '98916.31',
                          qNum: 98916.31,
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
                          qText: '98916.31',
                          qNum: 98916.31,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                      ],
                      [
                        {
                          qText: 'Japan',
                          qNum: 'NaN',
                          qElemNumber: 1,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '0',
                          qNum: 0,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'RGB(100,128,128)',
                                qNum: 4284776576,
                              },
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '9530.1425',
                          qNum: 9530.142499999998,
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
                          qText: '19060.285',
                          qNum: 19060.284999999996,
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
                          qText: '28590.4275',
                          qNum: 28590.427499999994,
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
                          qText: '38120.57',
                          qNum: 38120.56999999999,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box end + 1.5 IQR',
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
                      qWidth: 6,
                      qHeight: 12,
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
          sourceObjectId: 'vuRUeU',
          sheetId: 'bb52098c-5bf6-44f3-b475-c3c817e77f19',
          timestamp: 1632918703159,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
