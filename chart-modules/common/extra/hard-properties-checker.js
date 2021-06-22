export default {
  canModifyHardProperties,
};

function canModifyHardProperties(state, model, propsOrLayout) {
  return propsOrLayout.qMeta.privileges.indexOf('update') !== -1;
}
