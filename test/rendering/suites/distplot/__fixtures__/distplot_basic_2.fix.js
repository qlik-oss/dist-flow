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
            qId: 'a20efdbe-1a00-4820-b03a-27c6bd8c9c95',
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
            ],
            qUtcModifyTime: 44469.23451388889,
            qVariableItems: [],
            qPatches: [],
          },
          qFieldInfos: [],
          creationDate: '2021-09-30T05:37:42.640Z',
          qSelectionInfo: {
            qInSelections: false,
          },
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 10,
            },
            qDimensionInfo: [
              {
                qFallbackTitle: 'Dimension',
                qApprMaxGlyphCount: 1,
                qCardinal: 24,
                qSortIndicator: 'A',
                qGroupFallbackTitles: ['Dimension'],
                qGroupPos: 0,
                qStateCounts: {
                  qLocked: 0,
                  qSelected: 0,
                  qOption: 24,
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
                  qType: 'R',
                  qnDec: 14,
                  qUseThou: 1,
                  qFmt: '##############',
                  qDec: '.',
                },
                qIsAutoFormat: true,
                qGroupFieldDefs: ['Dimension'],
                qMin: 'NaN',
                qMax: 'NaN',
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qCardinalities: {
                  qCardinal: 24,
                  qHypercubeCardinal: 10,
                  qAllValuesCardinal: -1,
                },
                autoSort: true,
                cId: 'cPmUQpv',
                othersLabel: 'Others',
              },
            ],
            qMeasureInfo: [
              {
                qFallbackTitle: 'Sum(M1)',
                qApprMaxGlyphCount: 2,
                qCardinal: 0,
                qSortIndicator: 'D',
                qNumFormat: {
                  qType: 'R',
                  qnDec: 14,
                  qUseThou: 1,
                  qFmt: '##############',
                  qDec: '.',
                },
                qMin: 3,
                qMax: 17,
                qIsAutoFormat: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qTrendLines: [],
                autoSort: true,
                cId: 'pLjcL',
                numFormatFromTemplate: true,
              },
            ],
            qEffectiveInterColumnSortOrder: [0],
            qGrandTotalRow: [],
            qDataPages: [],
            qPivotDataPages: [],
            qStackedDataPages: [],
            qMode: 'K',
            qNoOfLeftDims: 1,
            qHasOtherValues: true,
            qTreeNodesOnDim: [],
            qColumnOrder: [],
          },
          refLine: {
            refLines: [
              {
                show: true,
                label: 'Ref',
                showLabel: true,
                refLineExpr: {
                  value: 0,
                  label: '0',
                },
                showValue: true,
                paletteColor: {
                  index: -1,
                  color: '#333333',
                },
                style: {
                  lineThickness: 2,
                  lineType: '',
                },
                coloredBackground: false,
                cId: 'gWxpKw',
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
          presentation: {
            visibleComponents: 'points',
          },
          gridlines: {
            auto: false,
            spacing: 0,
          },
          dataPoint: {
            bubbleScales: 100,
            displacement: 'jitter',
          },
          color: {
            point: {
              auto: true,
              mode: 'primary',
              useBaseColors: 'off',
              paletteColor: {
                index: 6,
              },
              useDimColVal: true,
              persistent: false,
              expressionIsColor: true,
              measureScheme: 'sg',
              reverseScheme: false,
              dimensionScheme: '12',
              autoMinMax: true,
              measureMin: 0,
              measureMax: 10,
            },
            formatting: {
              numFormatFromTemplate: true,
            },
            expressionLabel: '',
            box: {
              paletteColor: {
                index: -1,
                color: '#e6e6e6',
              },
            },
          },
          legend: {
            show: true,
            dock: 'auto',
            showTitle: true,
          },
          measureAxis: {
            show: 'none',
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
          visualization: 'distributionplot',
          sorting: {
            autoSort: true,
          },
          qUndoExclude: {
            hashCode: 713785080,
            qHyperCube: {
              qSize: {
                qcx: 1,
                qcy: 10,
              },
              qDimensionInfo: [
                {
                  qFallbackTitle: 'Dimension',
                  qApprMaxGlyphCount: 1,
                  qCardinal: 24,
                  qSortIndicator: 'A',
                  qGroupFallbackTitles: ['Dimension'],
                  qGroupPos: 0,
                  qStateCounts: {
                    qLocked: 0,
                    qSelected: 0,
                    qOption: 24,
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
                    qType: 'R',
                    qnDec: 14,
                    qUseThou: 1,
                    qFmt: '##############',
                    qDec: '.',
                  },
                  qIsAutoFormat: true,
                  qGroupFieldDefs: ['Dimension'],
                  qMin: 'NaN',
                  qMax: 'NaN',
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qCardinalities: {
                    qCardinal: 24,
                    qHypercubeCardinal: 10,
                    qAllValuesCardinal: -1,
                  },
                  autoSort: true,
                  cId: 'cPmUQpv',
                  othersLabel: 'Others',
                },
              ],
              qMeasureInfo: [
                {
                  qFallbackTitle: 'Sum(M1)',
                  qApprMaxGlyphCount: 2,
                  qCardinal: 0,
                  qSortIndicator: 'D',
                  qNumFormat: {
                    qType: 'R',
                    qnDec: 14,
                    qUseThou: 1,
                    qFmt: '##############',
                    qDec: '.',
                  },
                  qMin: 3,
                  qMax: 17,
                  qIsAutoFormat: true,
                  qAttrExprInfo: [],
                  qAttrDimInfo: [],
                  qTrendLines: [],
                  autoSort: true,
                  cId: 'pLjcL',
                  numFormatFromTemplate: true,
                },
              ],
              qEffectiveInterColumnSortOrder: [0],
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
                      qMaxPos: 56,
                      qMinNeg: 0,
                      qUp: 0,
                      qDown: 0,
                      qRow: 0,
                      qSubNodes: [
                        {
                          qText: 'A',
                          qElemNo: 0,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 5,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 0,
                          qSubNodes: [
                            {
                              qText: '5',
                              qElemNo: 0,
                              qValue: 5,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 0,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'F',
                          qElemNo: 4,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 4,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 1,
                          qSubNodes: [
                            {
                              qText: '4',
                              qElemNo: 0,
                              qValue: 4,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 1,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'G',
                          qElemNo: 5,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 5,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 2,
                          qSubNodes: [
                            {
                              qText: '5',
                              qElemNo: 0,
                              qValue: 5,
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
                        {
                          qText: 'H',
                          qElemNo: 6,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 3,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 3,
                          qSubNodes: [
                            {
                              qText: '3',
                              qElemNo: 0,
                              qValue: 3,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 3,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'I',
                          qElemNo: 7,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 3,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 4,
                          qSubNodes: [
                            {
                              qText: '3',
                              qElemNo: 0,
                              qValue: 3,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 4,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'O',
                          qElemNo: 13,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 5,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 5,
                          qSubNodes: [
                            {
                              qText: '5',
                              qElemNo: 0,
                              qValue: 5,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 5,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'T',
                          qElemNo: 18,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 4,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 6,
                          qSubNodes: [
                            {
                              qText: '4',
                              qElemNo: 0,
                              qValue: 4,
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
                        {
                          qText: 'U',
                          qElemNo: 19,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 6,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 7,
                          qSubNodes: [
                            {
                              qText: '6',
                              qElemNo: 0,
                              qValue: 6,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 7,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'X',
                          qElemNo: 21,
                          qValue: 'NaN',
                          qType: 'N',
                          qMaxPos: 4,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 8,
                          qSubNodes: [
                            {
                              qText: '4',
                              qElemNo: 0,
                              qValue: 4,
                              qType: 'V',
                              qMaxPos: 0,
                              qMinNeg: 0,
                              qUp: 0,
                              qDown: 0,
                              qRow: 8,
                              qSubNodes: [],
                            },
                          ],
                        },
                        {
                          qText: 'Others',
                          qElemNo: -3,
                          qValue: 'NaN',
                          qType: 'O',
                          qMaxPos: 17,
                          qMinNeg: 0,
                          qUp: 0,
                          qDown: 0,
                          qRow: 9,
                          qSubNodes: [
                            {
                              qText: '17',
                              qElemNo: 0,
                              qValue: 17,
                              qType: 'V',
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
                  qArea: {
                    qLeft: 0,
                    qTop: 0,
                    qWidth: 1,
                    qHeight: 10,
                  },
                },
              ],
              qMode: 'K',
              qNoOfLeftDims: 1,
              qHasOtherValues: true,
              qTreeNodesOnDim: [],
              qColumnOrder: [],
            },
            legendData: null,
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
          visualizationType: 'distributionplot',
          sourceObjectId: 'JDCR',
          sheetId: 'a63486be-c7ac-4fc5-9385-86b882a0861f',
          timestamp: 1632980262637,
          isClone: false,
          supportExport: true,
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
