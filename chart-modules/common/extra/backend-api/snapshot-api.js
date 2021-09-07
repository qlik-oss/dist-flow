/* eslint-disable class-methods-use-this */
import { getValue } from 'qlik-chart-modules';
import CubeSlicer from './cube-slicer';
import PivotCubeSlicer from './pivot-cube-slicer';

function sliceDataPages(slicer, layout, rects, responseProperty) {
  if (!slicer) {
    return;
  }

  // 1. Save original dataPages (needed when resizing the snapshot) - only once of course!
  if (!layout.snapshotData.object.origDataPages) {
    layout.snapshotData.object.origDataPages = layout.qHyperCube[responseProperty];
  }

  // 2. Clone and slice from original dataPages and place in qHyperCube[responseProperty]
  for (let i = 0; i < rects.length; i++) {
    rects[i].qHeight = Math.min(layout.qHyperCube.qSize.qcy, rects[i].qHeight); // never try to slice more rows than what's persisted in snapshot
    rects[i].qTop = layout.snapshotData.object.origDataPages[i].qArea.qTop; // This is necessary for dataPages with area "window" not starting at top
  }
  layout.qHyperCube[responseProperty] = slicer.get(rects);
}

function prepareCubeSlicer(layout) {
  if (layout.visualization === 'pivot-table') {
    this.responseProperty = 'qPivotDataPages';
    this.slicer = new PivotCubeSlicer();
  } else if (layout.visualization === 'table') {
    this.slicer = new CubeSlicer();
  } else {
    return;
  }

  let pages = layout.snapshotData.object.origDataPages;
  if (!pages) {
    pages = layout.qHyperCube[this.responseProperty];
  }

  this.slicer.store(pages.filter((page) => page));
}

export default class SnapshotApi {
  constructor(layout, dataPath, responseProperty) {
    this.layout = layout;
    this.dataPath = dataPath;
    this.responseProperty = responseProperty;

    prepareCubeSlicer.call(this, layout);
  }

  getData(rects) {
    sliceDataPages(this.slicer, this.layout, rects, this.responseProperty);
    const prop = getValue(this.layout, `${this.dataPath}.${this.responseProperty}`);
    return Promise.resolve(prop);
  }

  setCacheOptions() {}

  updateCache() {}
}
