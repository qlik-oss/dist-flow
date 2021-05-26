function getBublesAlign(isHorizontal, dock, isRtl) {
  let isAlignStart = (isHorizontal && dock !== 'far') || (!isHorizontal && dock === 'far');
  if (!isHorizontal && isRtl) {
    isAlignStart = !isAlignStart;
  }
  return isAlignStart ? 'start' : 'end';
}

function getDock(brushAxis, brushArea) {
  const dockTargets = [];
  let dockT;
  if (brushAxis) {
    dockTargets.push(`@${brushAxis}`);
  }
  if (brushArea) {
    dockTargets.push(`@${brushArea}`);
  }
  if (dockTargets.length) {
    dockT = dockTargets.join(',');
  }
  return dockT;
}

export default {
  getBublesAlign,
  getDock,
};
