import qvangular from '../../../../assets/qvangular/qvangular';

qvangular.directive('qvSetInitHeight', [
  function () {
    return {
      link(scope, element) {
        const tableTextTd = element.find('td.qv-tp-item');
        const unregisterWatch = scope.$watch(
          () => tableTextTd.height(),
          (newHeight) => {
            // Don't render if there are no heights
            if (!newHeight) {
              return;
            }
            const boxPictureTd = element.find('td:eq(0)');
            boxPictureTd.height(newHeight);
            // Only run this watch once since we need the box plot picture initialized at browser refresh
            unregisterWatch();
          }
        );
      },
    };
  },
]);
