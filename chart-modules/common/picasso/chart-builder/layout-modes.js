const layoutModes = {
  SPARK: { width: 0, height: 0 },
  XSMALL: { width: 150, height: 75 },
  SMALL: { width: 300, height: 150 },
  MEDIUM: { width: 400, height: 220 },
  FULL: { width: 550, height: 450 },
};

function LayoutModes() {
  return layoutModes;
}

LayoutModes.getLayoutModeKeys = function () {
  const layoutModeKeys = [];
  let modeKey;

  for (modeKey in layoutModes) {
    layoutModeKeys.push(modeKey);
  }
  return layoutModeKeys;
};

export default LayoutModes;
