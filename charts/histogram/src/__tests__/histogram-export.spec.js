/* eslint-disable import/no-unresolved */
import sinon from 'sinon';
import { expect } from 'chai';
import histogramExport from '../histogram-export';

const exportService = {
  show() {},
};

describe('Histogram export functions', () => {
  let sandbox;
  let menu;
  let cell;
  let _exportDialog;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    menu = {
      addItem: sandbox.spy(),
    };

    cell = {
      model: {
        fake: 'Fake stuff on the model',
      },
    };

    _exportDialog = sandbox.mock(exportService);
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it('should add a item to the menu', async () => {
    await histogramExport.getExportRawDataOptions(menu, cell, exportService);
    expect(menu.addItem).to.have.been.calledOnce;

    const selectCallback = menu.addItem.getCall(0).args[0].select;

    expect(selectCallback).to.be.a('function');
  });

  it('should export the correct hypercube and not the default one when clicking export', async () => {
    await histogramExport.getExportRawDataOptions(menu, cell, exportService);

    _exportDialog.expects('show').withExactArgs(cell.model, '/qUndoExclude/box/qHyperCubeDef');

    // Click the export menu option
    menu.addItem.getCall(0).args[0].select();
  });
});
