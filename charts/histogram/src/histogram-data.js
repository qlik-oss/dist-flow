import translator from '../../../js/lib/translator';

const data = {
  dimensions: {
    min: 1,
    max: 1,
    description() {
      return translator.get('Visualization.Histogram.Binning');
    },
    add() /* dimension, data, handler */ {},
    move() /* dimension, data, handler */ {},
    remove() /* dimension, data, handler */ {},
  },
};

export default data;
