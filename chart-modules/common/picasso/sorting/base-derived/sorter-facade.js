const sorterFacade = {
  applySorting,
};

export default sorterFacade;

function applySorting(sorter, dimension, chartSorting) {
  const isAutoSort = chartSorting.autoSort;
  const hasCachedSortCriteria = !!chartSorting.sortCriteria;

  if (isAutoSort) {
    sorter.applyAutoSorting(dimension);
  } else if (!hasCachedSortCriteria) {
    sorter.applyDefaultCustomSorting(dimension, chartSorting);
  } else {
    sorter.applyCustomSorting(dimension, chartSorting);
  }
}
