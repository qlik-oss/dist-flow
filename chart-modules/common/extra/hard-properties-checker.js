export default {
  canModifyHardProperties,
  getPermissions,
};

function canModifyHardProperties(state, model, propsOrLayout) {
  return propsOrLayout.qMeta.privileges.indexOf('update') !== -1;
  // const permissions = getPermissions(state, model, propsOrLayout) || {};
  // return !!permissions.update;
}

function getPermissions(state, model, propsOrLayout) {
  const sheetView = state.Views && state.Views.sheet;

  if (propsOrLayout.qHasSoftPatches || propsOrLayout.qExtendsId) {
    return {};
  }

  if (propsOrLayout.qInfo && propsOrLayout.qInfo.qType === 'masterobject' && propsOrLayout.permissions) {
    return propsOrLayout.permissions;
  }

  if (state.view === sheetView) {
    return state.model && state.model.layout.permissions;
  }

  return model.app && model.app.layout.permissions;
}
