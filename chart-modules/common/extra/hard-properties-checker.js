export default {
  canModifyHardProperties,
};

function canModifyHardProperties(layout) {
  if (layout.qHasSoftPatches || layout.qExtendsId) {
    return false;
  }
  if (layout.permissions) {
    return layout.permissions.update;
  }
  return layout.qMeta.privileges.indexOf('update') !== -1;
}
