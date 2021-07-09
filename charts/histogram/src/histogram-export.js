/* eslint-disable import/no-unresolved */
import exportDialog from '../../../assets/client/services/export-dialog/export-dialog';

/**
 * Implementation details
 */

function getExportRawDataOptions(menu, cell) {
  menu.addItem({
    translation: 'contextMenu.export',
    tid: 'export',
    select() {
      exportDialog.show(cell.model, '/qUndoExclude/box/qHyperCubeDef');
    },
  });

  return Promise.resolve();
}

export default {
  getExportRawDataOptions,
};
