/**
 * Implementation details
 */

function getExportRawDataOptions(menu, cell, exportDialog) {
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
