import translator from '../../../js/lib/translator';

const data = {
  measures: {
    min: 1,
    max: 50,
    description() {
      return translator.get('Visualizations.Descriptions.Bars');
    },
    add() /* measure, data, handler */ {},
    move() /* measure, data, handler */ {},
    remove() /* measure, data, handler */ {},
  },
};

export default data;
