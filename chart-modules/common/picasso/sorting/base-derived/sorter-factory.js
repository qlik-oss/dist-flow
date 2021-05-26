import Sorter from './Sorter';

const sorterFactory = {
  create,
};

export default sorterFactory;

//
//	Implementation details
//
function create(getSettingsFn, elementsRetriever) {
  return new Sorter(getSettingsFn, elementsRetriever);
}
