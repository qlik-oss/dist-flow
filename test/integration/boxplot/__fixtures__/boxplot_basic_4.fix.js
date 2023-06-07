export default () => ({
  instanceConfig: {
    context: {
      theme: 'senseish',
    },
  },
  snConfig: {
    options: {
      renderer: 'svg',
    },
  },
  genericObjects: [
    {
      getLayout() {
        return {
          qInfo: {
            qId: '36e513eb-c782-480b-81e6-a89d62ffbbd9',
            qType: 'embeddedsnapshot',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete', 'publish'],
            title: '',
            description: '',
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
            qUtcModifyTime: 44468.51329861111,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-09-29T12:19:08.954Z',
          qSelectionInfo: {
            qInSelections: false,
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
                  qLibraryId: '5b68675d-30a0-4e5c-9c11-efe9dba2fd1a',
                  title: 'Regional Sales Mgr',
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
                include: true,
                sortOutliers: true,
              },
            },
            presentation: {
              whiskers: {
                show: true,
              },
            },
            color: {
              auto: true,
              mode: 'primary',
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
            },
            sorting: {
              autoSort: false,
              elementId: 'boxEnd',
              sortCriteria: {
                sortByExpression: -1,
                sortByAscii: 0,
                sortByNumeric: 0,
                sortByLoadOrder: 1,
              },
              expression: 1163519.5600000005,
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
                  lineType: '8 4',
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
          orientation: 'vertical',
          gridlines: {
            auto: true,
            spacing: 2,
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
            label: 'layered',
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
            hashCode: 1254464562,
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
                    qLibraryId: '5b68675d-30a0-4e5c-9c11-efe9dba2fd1a',
                    title: 'Regional Sales Mgr',
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
                    cId: 'kgXN',
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
                    cId: 'mGpes',
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
                    cId: 'mqgBGyq',
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
                    cId: 'mJcqxc',
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
                    cId: 'rWwmY',
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
                      [
                        {
                          qText: 'Eastern Europe',
                          qNum: 'NaN',
                          qElemNumber: 7,
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
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '2497.425',
                          qNum: 2497.4249999999997,
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
                          qText: '4994.85',
                          qNum: 4994.849999999999,
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
                          qText: '7492.275',
                          qNum: 7492.275,
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
                          qText: '9989.7',
                          qNum: 9989.699999999999,
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
                          qText: 'Central America',
                          qNum: 'NaN',
                          qElemNumber: 9,
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
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '819.035',
                          qNum: 819.0349999999999,
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
                          qText: '1638.07',
                          qNum: 1638.0699999999997,
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
                          qText: '2457.105',
                          qNum: 2457.1049999999996,
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
                          qText: '3276.14',
                          qNum: 3276.1399999999994,
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
                          qText: 'Wes Stockton',
                          qNum: 'NaN',
                          qElemNumber: 2,
                          qState: 'O',
                          qInExtRow: true,
                        },
                        {
                          qText: '1062.96',
                          qNum: 1062.96,
                          qElemNumber: 0,
                          qState: 'L',
                          qAttrExps: {
                            qValues: [
                              {
                                qText: 'Box start - 1.5 IQR',
                                qNum: 'NaN',
                              },
                            ],
                          },
                          qInExtRow: true,
                        },
                        {
                          qText: '1062.96',
                          qNum: 1062.96,
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
                          qText: '1062.96',
                          qNum: 1062.96,
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
                          qText: '1062.96',
                          qNum: 1062.96,
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
                          qText: '1062.96',
                          qNum: 1062.96,
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
                      qHeight: 15,
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
            outliers: {
              qHyperCube: {
                qSize: {
                  qcx: 1,
                  qcy: 17,
                },
                qDimensionInfo: [
                  {
                    qFallbackTitle:
                      '=aggr( If( Sum ([Actual Amount]) < Rangemax(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 ) - ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Min( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Sum ([Actual Amount]) > Rangemin(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) + ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Max( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Alt( Aggr( RowNo(), [Regional Sales Mgr Name], [Region Name] ), 1 ) = 1, [Regional Sales Mgr Name] & [Region Name] ), [Region Name], [Regional Sales Mgr Name] )',
                    qApprMaxGlyphCount: 22,
                    qCardinal: 17,
                    qSortIndicator: 'A',
                    qGroupFallbackTitles: [
                      '=aggr( If( Sum ([Actual Amount]) < Rangemax(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 ) - ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Min( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Sum ([Actual Amount]) > Rangemin(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) + ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Max( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Alt( Aggr( RowNo(), [Regional Sales Mgr Name], [Region Name] ), 1 ) = 1, [Regional Sales Mgr Name] & [Region Name] ), [Region Name], [Regional Sales Mgr Name] )',
                    ],
                    qGroupPos: 0,
                    qStateCounts: {
                      qLocked: 0,
                      qSelected: 0,
                      qOption: 17,
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
                    qGroupFieldDefs: [
                      '=aggr( If( Sum ([Actual Amount]) < Rangemax(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 ) - ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Min( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Sum ([Actual Amount]) > Rangemin(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) + ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Max( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Alt( Aggr( RowNo(), [Regional Sales Mgr Name], [Region Name] ), 1 ) = 1, [Regional Sales Mgr Name] & [Region Name] ), [Region Name], [Regional Sales Mgr Name] )',
                    ],
                    qMin: 'NaN',
                    qMax: 'NaN',
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
                    qIsCalculated: true,
                    qCardinalities: {
                      qCardinal: 17,
                      qHypercubeCardinal: 17,
                      qAllValuesCardinal: -1,
                    },
                    autoSort: true,
                    cId: 'BhUv',
                    othersLabel: 'Others',
                  },
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
                    qLibraryId: '5b68675d-30a0-4e5c-9c11-efe9dba2fd1a',
                    title: 'Regional Sales Mgr',
                    autoSort: true,
                    cId: 'vLv',
                    othersLabel: 'Others',
                  },
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
                      qHypercubeCardinal: 3,
                      qAllValuesCardinal: -1,
                    },
                    qLibraryId: 'cf1d8ef8-4020-4f81-b487-514c354875b4',
                    title: 'Region Name',
                    autoSort: true,
                    cId: 'FvzjJET',
                    othersLabel: 'Others',
                  },
                ],
                qMeasureInfo: [
                  {
                    qFallbackTitle:
                      '=aggr( If( Sum ([Actual Amount]) < Rangemax(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 ) - ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Min( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )) or Sum ([Actual Amount]) > Rangemin(Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) + ((Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.75 ) - Fractile( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] ) ,0.25 )) * 1.5), Max( total <[Regional Sales Mgr Name]> Aggr( Sum ([Actual Amount]), [Regional Sales Mgr Name], [Region Name] )  )), Sum ([Actual Amount]) ), [Region Name], [Regional Sales Mgr Name] )',
                    qApprMaxGlyphCount: 11,
                    qCardinal: 0,
                    qSortIndicator: 'D',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qMin: 3263779.0100000016,
                    qMax: 11590151.359999998,
                    qIsAutoFormat: true,
                    qAttrExprInfo: [],
                    qAttrDimInfo: [],
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
                qEffectiveInterColumnSortOrder: [1, 0, 2],
                qGrandTotalRow: [],
                qDataPages: [],
                qPivotDataPages: [],
                qStackedDataPages: [
                  {
                    qData: [
                      {
                        qElemNo: 0,
                        qValue: 0,
                        qType: 'R',
                        qMaxPos: 14853930.37,
                        qMinNeg: 0,
                        qUp: 0,
                        qDown: 0,
                        qRow: 0,
                        qSubNodes: [
                          {
                            qText: 'South America',
                            qElemNo: 8,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 0,
                            qSubNodes: [
                              {
                                qText: 'South AmericaWestern',
                                qElemNo: 8,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 0,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 0,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 0,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Greg Kaphammer',
                            qElemNo: 4,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 11590151.359999998,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 1,
                            qSubNodes: [
                              {
                                qText: 'Greg KaphammerWestern',
                                qElemNo: 4,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 1,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 1,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 1,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                qText: 'Greg KaphammerCentral',
                                qElemNo: 9,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 11590151.359999998,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 2,
                                qSubNodes: [
                                  {
                                    qText: 'Central',
                                    qElemNo: 3,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 11590151.359999998,
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 2,
                                    qSubNodes: [
                                      {
                                        qText: '11590151.36',
                                        qElemNo: 0,
                                        qValue: 11590151.359999998,
                                        qType: 'V',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 2,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Western Europe',
                            qElemNo: 6,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 3,
                            qSubNodes: [
                              {
                                qText: 'Western EuropeCentral',
                                qElemNo: 10,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 3,
                                qSubNodes: [
                                  {
                                    qText: 'Central',
                                    qElemNo: 3,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 3,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 3,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Scott Porter',
                            qElemNo: 12,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 4,
                            qSubNodes: [
                              {
                                qText: 'Scott PorterWestern',
                                qElemNo: 6,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 4,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 4,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 4,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Greg Ballantyne',
                            qElemNo: 13,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 3263779.0100000016,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 5,
                            qSubNodes: [
                              {
                                qText: 'Greg BallantyneWestern',
                                qElemNo: 0,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 5,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 5,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 5,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                qText: 'Greg BallantyneCentral',
                                qElemNo: 11,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 3263779.0100000016,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 6,
                                qSubNodes: [
                                  {
                                    qText: 'Central',
                                    qElemNo: 3,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 3263779.0100000016,
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 6,
                                    qSubNodes: [
                                      {
                                        qText: '3263779.01',
                                        qElemNo: 0,
                                        qValue: 3263779.0100000016,
                                        qType: 'V',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 6,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'House Accounts',
                            qElemNo: 5,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 7,
                            qSubNodes: [
                              {
                                qText: 'House AccountsWestern',
                                qElemNo: 5,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 7,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 7,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 7,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Gage Hartman',
                            qElemNo: 11,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 8,
                            qSubNodes: [
                              {
                                qText: 'Gage HartmanWestern',
                                qElemNo: 1,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 8,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 8,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 8,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Harold Ogden',
                            qElemNo: 3,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 9,
                            qSubNodes: [
                              {
                                qText: 'Harold OgdenWestern',
                                qElemNo: 7,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 9,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 9,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 9,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Asia',
                            qElemNo: 0,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 10,
                            qSubNodes: [
                              {
                                qText: 'AsiaWestern',
                                qElemNo: 3,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 10,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 10,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 10,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Brian Sleicher',
                            qElemNo: 14,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 11,
                            qSubNodes: [
                              {
                                qText: 'Brian SleicherSouthern',
                                qElemNo: 14,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 11,
                                qSubNodes: [
                                  {
                                    qText: 'Southern',
                                    qElemNo: 1,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 11,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 11,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Africa',
                            qElemNo: 10,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 12,
                            qSubNodes: [
                              {
                                qText: 'AfricaSouthern',
                                qElemNo: 15,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 12,
                                qSubNodes: [
                                  {
                                    qText: 'Southern',
                                    qElemNo: 1,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 12,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 12,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Japan',
                            qElemNo: 1,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 13,
                            qSubNodes: [
                              {
                                qText: 'JapanSouthern',
                                qElemNo: 12,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 13,
                                qSubNodes: [
                                  {
                                    qText: 'Southern',
                                    qElemNo: 1,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 13,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 13,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Eastern Europe',
                            qElemNo: 7,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 14,
                            qSubNodes: [
                              {
                                qText: 'Eastern EuropeSouthern',
                                qElemNo: 16,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 14,
                                qSubNodes: [
                                  {
                                    qText: 'Southern',
                                    qElemNo: 1,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 14,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 14,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Central America',
                            qElemNo: 9,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 15,
                            qSubNodes: [
                              {
                                qText: 'Central AmericaWestern',
                                qElemNo: 2,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 15,
                                qSubNodes: [
                                  {
                                    qText: 'Western',
                                    qElemNo: 0,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 15,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 15,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            qText: 'Wes Stockton',
                            qElemNo: 2,
                            qValue: 'NaN',
                            qType: 'N',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 16,
                            qSubNodes: [
                              {
                                qText: 'Wes StocktonSouthern',
                                qElemNo: 13,
                                qValue: 'NaN',
                                qType: 'N',
                                qMaxPos: 0,
                                qMinNeg: 0,
                                qUp: 0,
                                qDown: 0,
                                qRow: 16,
                                qSubNodes: [
                                  {
                                    qText: 'Southern',
                                    qElemNo: 1,
                                    qValue: 'NaN',
                                    qType: 'N',
                                    qMaxPos: 'NaN',
                                    qMinNeg: 0,
                                    qUp: 0,
                                    qDown: 0,
                                    qRow: 16,
                                    qSubNodes: [
                                      {
                                        qText: '-',
                                        qElemNo: 0,
                                        qValue: 'NaN',
                                        qType: 'U',
                                        qMaxPos: 0,
                                        qMinNeg: 0,
                                        qUp: 0,
                                        qDown: 0,
                                        qRow: 16,
                                        qSubNodes: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    qArea: {
                      qLeft: 0,
                      qTop: 0,
                      qWidth: 1,
                      qHeight: 15,
                    },
                  },
                ],
                qMode: 'K',
                qNoOfLeftDims: 3,
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
          timestamp: 1632917948948,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
