export default {
  canModifyHardProperties,
};

function canModifyHardProperties(propsOrLayout) {
  if (propsOrLayout.qHasSoftPatches || propsOrLayout.qExtendsId) {
    return false;
  }
  return propsOrLayout.qMeta.privileges.indexOf('update') !== -1;
}
