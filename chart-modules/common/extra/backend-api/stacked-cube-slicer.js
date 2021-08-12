import Rect from './rect';

const areaRect = new Rect(0, 0, 0, 0);
const pageRect = new Rect(0, 0, 0, 0);

class StackedCubeSlicer {
  constructor() {
    this.pages = [];
  }

  get(areas) {
    return areas.map((area) => this.getPage(area));
  }

  getPage(area) {
    const coverage = [];
    // try to extract the entire requested set
    for (let i = 0; i < this.pages.length; i++) {
      const storage = this.pages[i].qArea;
      areaRect.set(area.qLeft, area.qTop, area.qWidth, area.qHeight);
      pageRect.set(storage.qLeft, storage.qTop, storage.qWidth, storage.qHeight);
      const cover = pageRect.intersection(areaRect, true);
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
      qData: [],
    };
  }

  destroy() {
    this.clear();
  }

  isEmpty() {
    return !this.pages || !this.pages[0] || !this.pages[0].qArea.qHeight || !this.pages[0].qArea.qWidth;
  }

  clear() {
    this.pages = [];
  }

  store(pages) {
    // TODO - store pages in order from left to right according to qLeft value (mek)
    this.pages = pages;
  }

  containsArea(area) {
    for (let i = 0; i < this.pages.length; i++) {
      const a = this.pages[i].qArea;
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
  }

  contains(areas) {
    if (!this.pages || !this.pages.length) {
      return false;
    }
    return areas.filter((a) => !this.containsArea(a)).length === 0;
  }

  // eslint-disable-next-line class-methods-use-this
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
        qData: [],
      };
    }

    const y = Math.max(0, area.qTop - fromPage.qArea.qTop);

    const source = fromPage.qData[0];
    const nodes = source.qSubNodes;

    const data = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(key)) {
        if (key === 'qSubNodes') {
          data[key] = nodes.slice(y, y + intersection.height);
        } else {
          data[key] = source[key];
        }
      }
    }

    data.qUp += y;
    data.qDown += fromPage.qArea.qHeight - intersection.height - y;

    return {
      qArea: {
        qTop: intersection.y,
        qLeft: intersection.x,
        qWidth: intersection.width,
        qHeight: intersection.height,
      },
      qData: [data],
    };
  }
}

export default StackedCubeSlicer;
