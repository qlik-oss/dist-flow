function getAxisDock(direction, dock, isRtl) {
  return direction === 'y' ? getYAxisDock(dock, isRtl) : getXAxisDock(dock);
}

function getOppositeAxisDock(direction, dock, isRtl) {
  const oppositeDock = dock === 'far' ? 'near' : 'far';
  return getAxisDock(direction, oppositeDock, isRtl);
}

function getYAxisDock(dock, isRtl) {
  const yDockNearFar = dock || 'near';
  return (isRtl && yDockNearFar === 'near') || (!isRtl && yDockNearFar === 'far') ? 'right' : 'left';
}

function getXAxisDock(dock) {
  return dock === 'far' ? 'top' : 'bottom';
}

export default {
  getAxisDock,
  getOppositeAxisDock,
  getYAxisDock,
};
