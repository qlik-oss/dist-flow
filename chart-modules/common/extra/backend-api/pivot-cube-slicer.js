import CubeSlicer from './cube-slicer';
import Rect from './rect';

let deepCount;

function addNode(node, slicedTrunk) {
  let key;
  const newNode = {};
  // eslint-disable-next-line no-restricted-syntax
  for (key in node) {
    // eslint-disable-next-line no-prototype-builtins
    if (key !== 'qSubNodes' && node.hasOwnProperty(key)) {
      newNode[key] = node[key];
    }
  }
  slicedTrunk.push(newNode);
  return newNode;
}

function getSlicedTreeRecursive(offset, length, subNodes) {
  // find start in tree structure
  let i;

  let qixNode;
  let node;
  const slicedTrunk = [];
  let subSlicedTree = [];
  let up = 0;
  let down = 0;

  if (subNodes.length) {
    up = subNodes[0].qUp || 0;
    down = subNodes[subNodes.length - 1].qDown || 0;
  }

  for (i = 0; i < subNodes.length; ++i) {
    qixNode = subNodes[i];
    // deep first
    if (qixNode.qSubNodes.length > 0) {
      subSlicedTree = getSlicedTreeRecursive(offset, length, qixNode.qSubNodes);
    }
    node = null;
    // add leaf node if within paging area or if parent and subSlicedTree contains children
    if (
      (qixNode.qSubNodes.length === 0 && deepCount >= offset && deepCount <= offset + length) ||
      subSlicedTree.length > 0
    ) {
      node = addNode(qixNode, slicedTrunk);
      // first node added in slicedtrunk? change up
      if (node.qUp !== undefined && slicedTrunk.length === 1) {
        node.qUp = up + i;
      }
      node.qSubNodes = subSlicedTree;
    }

    // add deepCount if leaf node was passed
    if (qixNode.qSubNodes.length === 0) {
      deepCount++;
    }

    // break if we have passed the paging area
    if (deepCount === offset + length) {
      if (node && node.qDown !== undefined) {
        node.qDown = down + (subNodes.length - 1 - i);
      }
      break;
    }
  }
  return slicedTrunk;
}

function getSlicedTree(offset, length, subNodes) {
  // find start in tree structure
  deepCount = 0;
  return getSlicedTreeRecursive(offset, length, subNodes);
}

const areaRect = new Rect(0, 0, 0, 0);
const pageRect = new Rect(0, 0, 0, 0);

const PivotCubeSlicer = CubeSlicer.extend('PivotCubeSlicer', {
  init() {
    this._super();
    this.requestedAreas = [];
  },
  getPage(area) {
    let storage;
    let i;
    const coverage = [];
    let cover;
    // try to extract the entire requested set
    for (i = 0; i < this.pages.length; i++) {
      storage = this.pages[i].qArea;

      areaRect.set(area.qLeft, area.qTop, area.qWidth, area.qHeight);
      pageRect.set(storage.qLeft, storage.qTop, storage.qWidth, storage.qHeight);
      cover = pageRect.intersection(areaRect, true);
      coverage.push({ coverage: cover ? cover.clone() : new Rect(0, 0, 0, 0), idx: i });

      if (
        storage.qLeft <= area.qLeft &&
        storage.qLeft + storage.qWidth >= area.qLeft + area.qWidth &&
        storage.qTop <= area.qTop &&
        storage.qTop + storage.qHeight >= area.qTop + area.qHeight
      ) {
        return this._extract(area, this.pages[i]);
      }
    }

    // find the page containing the largest amount of requested data
    coverage.sort((a, b) => b.coverage.width * b.coverage.height - a.coverage.width * a.coverage.height);

    if (coverage[0].coverage.height > 0 && coverage[0].coverage.width > 0) {
      return this._extract(area, this.pages[coverage[0].idx]);
    }

    return {
      qLeft: [],
      qTop: [],
      qData: [],
      qArea: {
        qTop: area.qTop,
        qLeft: area.qLeft,
        qWidth: 0,
        qHeight: 0,
      },
    };
  },
  _extract(area, fromPage) {
    areaRect.set(area.qLeft, area.qTop, area.qWidth, area.qHeight);
    pageRect.set(fromPage.qArea.qLeft, fromPage.qArea.qTop, fromPage.qArea.qWidth, fromPage.qArea.qHeight);

    const intersection = areaRect.intersection(pageRect, true);

    if (!intersection) {
      return {
        qLeft: [],
        qTop: [],
        qData: [],
        qArea: {
          qTop: area.qTop,
          qLeft: area.qLeft,
          qWidth: 0,
          qHeight: 0,
        },
      };
    }

    const y = Math.max(0, area.qTop - fromPage.qArea.qTop);
    const x = Math.max(0, area.qLeft - fromPage.qArea.qLeft);

    const matrix = fromPage.qData.slice(y, y + intersection.height).map((row) => row.slice(x, x + intersection.width));

    const leftTree = getSlicedTree(y, intersection.height, fromPage.qLeft);
    const topTree = getSlicedTree(x, intersection.width, fromPage.qTop);

    return {
      qLeft: leftTree,
      qTop: topTree,
      qData: matrix,
      qArea: {
        qTop: intersection.y,
        qLeft: intersection.x,
        qWidth: intersection.width,
        qHeight: intersection.height,
      },
    };
  },
});

export default PivotCubeSlicer;
