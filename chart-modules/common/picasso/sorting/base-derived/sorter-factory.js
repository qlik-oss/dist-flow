import Sorter from './Sorter';

const sorterFactory = {
  create,
};

export default sorterFactory;

function create(getSettingsFn, elementsRetriever) {
  return new Sorter(getSettingsFn, elementsRetriever);
}
