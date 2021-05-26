let brushContexts = {};
let shapes;
let fields;
let components;
let brushes;
let brushedValues;

function getBrushContext(context) {
  brushContexts[context] = {
    brushes() {
      return brushes;
    },
    intercept(type, listener) {
      this.intercepts[type] = listener;
    },
    on(type, listener) {
      this.callbacks[type] = listener;
    },
    removeListener(type) {
      delete this.callbacks[type];
    },
    removeInterceptor(type) {
      delete this.intercepts[type];
    },
    callbacks: {},
    intercepts: {},
    clear() {},
    end() {},
    start() {},
    emit() {},
  };
  return brushContexts[context];
}

const chartInstance = {
  brush(context) {
    return brushContexts[context];
  },
  dataset() {
    return {
      field(query) {
        let queriedField;
        fields.forEach((field) => {
          if (field.id() === query) {
            queriedField = field;
          }
        });
        return queriedField;
      },
      tables() {
        return [
          {
            fields() {
              return fields;
            },
          },
        ];
      },
      fields() {
        return fields;
      },
      findField(path) {
        return {
          field() {
            return {
              values() {
                const ATTR_DIM_RX = /qAttrDimInfo\/\d+$/;
                if (ATTR_DIM_RX.test(path)) {
                  return [
                    // Mockup data for qAttrDimInfo
                    {
                      id: 30,
                      index: 0,
                      label: '155',
                    },
                    {
                      id: 6,
                      index: 1,
                      label: '140',
                    },
                    {
                      id: 31,
                      index: 2,
                      label: '142',
                    },
                  ];
                }
                return [
                  // Mockup data for dimension
                  {
                    id: 47,
                    index: 0,
                    label: 'Volvo 264GL',
                  },
                  {
                    id: 53,
                    index: 1,
                    label: 'Cadillac Eldorado',
                  },
                  {
                    id: 41,
                    index: 2,
                    label: 'Honda Accord',
                  },
                ];
              },
            };
          },
        };
      },
    };
  },
  getAffectedShapes() {
    return shapes;
  },
  component(key) {
    return components[key];
  },
};

let valueArray;
function getField(index, type, values, id) {
  fields[index] = {
    id() {
      return id || '';
    },
    items() {
      return values || valueArray;
    },
    formatter() {
      return function (v) {
        return v;
      };
    },
    data() {
      return {
        meta: {
          qFallbackTitle: `FieldTitle${index}`,
        },
      };
    },
    type() {
      return type || 'dimension';
    },
    title() {
      return 'measureTitle';
    },
    raw() {
      return {
        qLocked: false,
      };
    },
  };
  return fields[index];
}

let parentRect;
let bounds;
function getShape(index, localBounds) {
  shapes[index] = {
    type: 'rect',
    bounds: localBounds || bounds,
    element: {
      getBoundingClientRect() {
        return parentRect;
      },
    },
    data: {
      inner: {
        source: {
          field: 'dimension/0',
        },
        value: {
          qText: 'Francis Ford Coppola',
        },
      },
      outer: {
        source: {
          field: 'dimension/1',
        },
        value: {
          qText: '1970s',
        },
      },
      x: {
        source: {
          field: 'measure/0',
        },
        value: 8,
      },
    },
  };
  return shapes[index];
}

function getBrush(index, id) {
  brushes[index] = {
    brush: {
      values() {
        return brushedValues;
      },
    },
    type: 'value',
    id: id || '',
  };
  return brushes[index];
}

function getComponent(key) {
  components[key] = { emit() {} };
  return components[key];
}

function restore() {
  brushContexts = {};
  parentRect = {
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  };
  bounds = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  valueArray = [];
  brushedValues = [];
  fields = [];
  shapes = [];
  brushes = [];
  components = {};
}

restore();

export default {
  chartInstance,
  restore,
  createBrushContext: getBrushContext,
  createField: getField,
  createShape: getShape,
  createBrush: getBrush,
  createComponent: getComponent,
  constants: {
    valueArray() {
      return valueArray;
    },
    brushedValues() {
      return brushedValues;
    },
    parentRect() {
      return parentRect;
    },
    shapes() {
      return shapes;
    },
  },
};
