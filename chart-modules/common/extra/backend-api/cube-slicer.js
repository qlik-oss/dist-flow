import Class from '../class';
import Rect from './rect';

const areaRect = new Rect(0, 0, 0, 0);
const pageRect = new Rect(0, 0, 0, 0);

const CubeSlicer = Class.extend('CubeSlicer', {
  init() {
    this.pages = [];
  },
  get(areas) {
    return areas.map((area) => this.getPage(area));
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
      qArea: {
        qTop: area.qTop,
        qLeft: area.qLeft,
        qWidth: 0,
        qHeight: 0,
      },
      qMatrix: [],
    };
  },
  destroy() {
    this.clear();
  },
  isEmpty() {
    return !this.pages || !this.pages[0] || !this.pages[0].qArea.qHeight || !this.pages[0].qArea.qWidth;
  },
  clear() {
    this.pages = [];
  },
  store(pages) {
    this.pages = pages;
  },
  containsArea(area) {
    let a;
    for (let i = 0; i < this.pages.length; i++) {
      a = this.pages[i].qArea;
      if (
        a.qLeft <= area.qLeft &&
        a.qLeft + a.qWidth >= area.qLeft + area.qWidth &&
        a.qTop <= area.qTop &&
        a.qTop + a.qHeight >= area.qTop + area.qHeight
      ) {
        return true;
      }
    }

    return false;
  },
  contains(areas) {
    if (!this.pages || !this.pages.length) {
      return false;
    }

    return areas.filter((a) => !this.containsArea(a)).length === 0;
  },
  _extract(area, fromPage) {
    areaRect.set(area.qLeft, area.qTop, area.qWidth, area.qHeight);
    pageRect.set(fromPage.qArea.qLeft, fromPage.qArea.qTop, fromPage.qArea.qWidth, fromPage.qArea.qHeight);

    const intersection = areaRect.intersection(pageRect, true);

    if (!intersection) {
      return {
        qArea: {
          qTop: area.qTop,
          qLeft: area.qLeft,
          qWidth: 0,
          qHeight: 0,
        },
        qMatrix: [],
      };
    }

    const y = Math.max(0, area.qTop - fromPage.qArea.qTop);
    const x = Math.max(0, area.qLeft - fromPage.qArea.qLeft);

    const matrix = fromPage.qMatrix
      .slice(y, y + intersection.height)
      .map((row) => row.slice(x, x + intersection.width));

    return {
      qArea: {
        qTop: intersection.y,
        qLeft: intersection.x,
        qWidth: intersection.width,
        qHeight: intersection.height,
      },
      qMatrix: matrix,
    };
  },
});

export default CubeSlicer;
