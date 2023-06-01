import renderer from '../boxplot-box-tooltip-renderer';

describe('boxplot box tooltip renderer', () => {
  test('renderShouldMatchSnapshot', () => {
    const settings = {
      h: (tag, attr, children) => ({ tag, attr, children }),
      style: {
        cell: {
          cellstyle: true,
        },
      },
      translator: jest.fn((key) => `translated:${key}`),
    };
    const box = {
      header: 'BoxHeader',
      rows: [
        { label: 'M1 Label', value: 'M1 Value' },
        { label: 'M2 Label', value: 'M2 Value' },
        { label: 'M3 Label', value: 'M3 Value' },
        { label: 'M4 Label', value: 'M4 Value' },
        { label: 'M5 Label', value: 'M5 Value' },
      ],
    };
    const content = [box];
    content.numberInExcess = 0;

    const result = renderer(settings, content);

    expect(JSON.stringify(result, null, '   ')).toMatchInlineSnapshot(`
      "[
         {
            "tag": "tr",
            "attr": null,
            "children": {
               "tag": "td",
               "attr": {
                  "style": {
                     "cellstyle": true,
                     "fontWeight": "bold",
                     "textAlign": "left",
                     "direction": "ltr"
                  },
                  "colSpan": 5
               },
               "children": "BoxHeader"
            }
         },
         {
            "tag": "tr",
            "attr": null,
            "children": [
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "13px",
                        "position": "relative"
                     }
                  },
                  "children": [
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "5px",
                              "borderTop": "2px solid #FFF",
                              "left": "calc(50% - 2.5px)",
                              "top": "calc(50% - 2px)"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "left": "6px",
                              "width": "1px",
                              "backgroundColor": "#FFF",
                              "height": "calc(50% + 2px)",
                              "top": "50%"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "3px",
                              "borderTop": "2px solid rgba(255, 255, 255, 0.2)",
                              "left": "calc(50% + 3.5px)",
                              "top": "calc(50% - 2px)"
                           }
                        }
                     }
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "15px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "width": "25px",
                           "borderBottom": "2px solid rgba(255, 255, 255, 0.2)",
                           "zIndex": 1,
                           "position": "absolute",
                           "left": "-4px",
                           "top": "calc(50% - 2px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "4px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "borderRadius": "8px",
                           "width": "4px",
                           "height": "4px",
                           "backgroundColor": "#fff",
                           "position": "absolute",
                           "top": "calc(50% - 3px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "left"
                     }
                  },
                  "children": [
                     "M1 Label",
                     ":"
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "right"
                     }
                  },
                  "children": "M1 Value"
               }
            ]
         },
         {
            "tag": "tr",
            "attr": null,
            "children": [
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "13px",
                        "position": "relative"
                     }
                  },
                  "children": [
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "left": "6px",
                              "width": "1px",
                              "backgroundColor": "#FFF",
                              "height": "50%",
                              "top": "-2px"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "13px",
                              "backgroundColor": "#FFF",
                              "zIndex": 10,
                              "top": "calc(50% - 2px)",
                              "height": "calc(50% + 4px)"
                           }
                        }
                     }
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "15px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "width": "25px",
                           "borderBottom": "2px solid rgba(255, 255, 255, 0.2)",
                           "zIndex": 1,
                           "position": "absolute",
                           "left": "-4px",
                           "top": "calc(50% - 2px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "4px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "borderRadius": "8px",
                           "width": "4px",
                           "height": "4px",
                           "backgroundColor": "#fff",
                           "position": "absolute",
                           "top": "calc(50% - 3px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "left"
                     }
                  },
                  "children": [
                     "M2 Label",
                     ":"
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "right"
                     }
                  },
                  "children": "M2 Value"
               }
            ]
         },
         {
            "tag": "tr",
            "attr": null,
            "children": [
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "13px",
                        "position": "relative"
                     }
                  },
                  "children": [
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "13px",
                              "backgroundColor": "#FFF",
                              "zIndex": 10,
                              "top": "-2px",
                              "height": "calc(50%)"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "backgroundColor": "#404040",
                              "width": "13px",
                              "top": "calc(50% - 2px)",
                              "height": "2px"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "13px",
                              "backgroundColor": "#FFF",
                              "zIndex": 10,
                              "top": "50%",
                              "height": "calc(50% + 2px)"
                           }
                        }
                     }
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "15px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "width": "25px",
                           "borderBottom": "2px solid rgba(255, 255, 255, 0.2)",
                           "zIndex": 1,
                           "position": "absolute",
                           "left": "-4px",
                           "top": "calc(50% - 2px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "4px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "borderRadius": "8px",
                           "width": "4px",
                           "height": "4px",
                           "backgroundColor": "#fff",
                           "position": "absolute",
                           "top": "calc(50% - 3px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "left"
                     }
                  },
                  "children": [
                     "M3 Label",
                     ":"
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "right"
                     }
                  },
                  "children": "M3 Value"
               }
            ]
         },
         {
            "tag": "tr",
            "attr": null,
            "children": [
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "13px",
                        "position": "relative"
                     }
                  },
                  "children": [
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "13px",
                              "backgroundColor": "#FFF",
                              "zIndex": 10,
                              "top": "-2px",
                              "height": "calc(50% + 2px)"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "left": "6px",
                              "width": "1px",
                              "backgroundColor": "#FFF",
                              "height": "calc(50% + 2px)",
                              "top": "50%"
                           }
                        }
                     }
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "15px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "width": "25px",
                           "borderBottom": "2px solid rgba(255, 255, 255, 0.2)",
                           "zIndex": 1,
                           "position": "absolute",
                           "left": "-4px",
                           "top": "calc(50% - 2px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "4px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "borderRadius": "8px",
                           "width": "4px",
                           "height": "4px",
                           "backgroundColor": "#fff",
                           "position": "absolute",
                           "top": "calc(50% - 3px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "left"
                     }
                  },
                  "children": [
                     "M4 Label",
                     ":"
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "right"
                     }
                  },
                  "children": "M4 Value"
               }
            ]
         },
         {
            "tag": "tr",
            "attr": null,
            "children": [
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "13px",
                        "position": "relative"
                     }
                  },
                  "children": [
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "5px",
                              "borderTop": "2px solid #FFF",
                              "left": "calc(50% - 2.5px)",
                              "top": "calc(50% - 2px)"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "left": "6px",
                              "width": "1px",
                              "backgroundColor": "#FFF",
                              "height": "50%",
                              "top": "-2px"
                           }
                        }
                     },
                     {
                        "tag": "div",
                        "attr": {
                           "style": {
                              "position": "absolute",
                              "width": "3px",
                              "borderTop": "2px solid rgba(255, 255, 255, 0.2)",
                              "left": "calc(50% + 3.5px)",
                              "top": "calc(50% - 2px)"
                           }
                        }
                     }
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "15px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "width": "25px",
                           "borderBottom": "2px solid rgba(255, 255, 255, 0.2)",
                           "zIndex": 1,
                           "position": "absolute",
                           "left": "-4px",
                           "top": "calc(50% - 2px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "width": "4px",
                        "position": "relative"
                     }
                  },
                  "children": {
                     "tag": "div",
                     "attr": {
                        "style": {
                           "borderRadius": "8px",
                           "width": "4px",
                           "height": "4px",
                           "backgroundColor": "#fff",
                           "position": "absolute",
                           "top": "calc(50% - 3px)"
                        }
                     }
                  }
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "left"
                     }
                  },
                  "children": [
                     "M5 Label",
                     ":"
                  ]
               },
               {
                  "tag": "td",
                  "attr": {
                     "style": {
                        "cellstyle": true,
                        "direction": "ltr",
                        "textAlign": "right"
                     }
                  },
                  "children": "M5 Value"
               }
            ]
         }
      ]"
    `);
  });
});
