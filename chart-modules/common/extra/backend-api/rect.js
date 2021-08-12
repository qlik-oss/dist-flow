function Rect(x, y, width, height) {
  if (arguments.length === 0) {
    this.set(0, 0, 0, 0);
  } else {
    this.set(x, y, width, height);
  }
}

Rect.prototype = {
  toString() {
    return `${this.x} ${this.y} ${this.width} ${this.height}`;
  },
  clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  },
  set(x, y, width, height) {
    if (width >= 0) {
      this.x = x;
      this.width = width;
    } else {
      this.x = x + width;
      this.width = -width;
    }
    if (height >= 0) {
      this.y = y;
      this.height = height;
    } else {
      this.y = y + height;
      this.height = -height;
    }
  },
  setLTRB(l, t, r, b) {
    if (l <= r) {
      this.x = l;
      this.width = r - l;
    } else {
      this.x = r;
      this.width = l - r;
    }
    if (t <= b) {
      this.y = t;
      this.height = b - t;
    } else {
      this.y = b;
      this.height = t - b;
    }
  },
  equal(rect) {
    return rect && this.x === rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height;
  },
  combineWith(rect) {
    const r = Math.max(rect.getRight(), this.getRight());
    const b = Math.max(rect.getBottom(), this.getBottom());

    // bounding box
    const x = Math.min(rect.x, this.x);
    const y = Math.min(rect.y, this.y);
    const w = Math.max(0, r - x);
    const h = Math.max(0, b - y);

    return new Rect(x, y, w, h);
  },
  intersectsWith(rect) {
    if (!rect) {
      return false;
    }
    if (
      this.x <= rect.getRight() &&
      rect.x <= this.getRight() &&
      this.y <= rect.getBottom() &&
      rect.y <= this.getBottom()
    ) {
      return true;
    }
    return false;
  },
  // This method is used for all shapes (rectangle, polygon, etc.) to check if there is intersection with a rectangle
  intersectsRect(rect) {
    return this.intersectsWith(rect);
  },
  intersection(rect, strict) {
    if (this.intersectsWith(rect)) {
      const x = Math.max(this.x, rect.x);
      const y = Math.max(this.y, rect.y);
      const r = Math.min(this.getRight(), rect.getRight());
      const b = Math.min(this.getBottom(), rect.getBottom());
      return new Rect(x, y, r - x, b - y);
    }
    if (strict) {
      return null;
    } // This is for combination of range selection
    return new Rect(this.x, this.y, this.width, this.height);
  },
  union(rect) {
    const x = Math.min(this.x, rect.x);
    const y = Math.min(this.y, rect.y);
    const r = Math.max(this.getRight(), rect.getRight());
    const b = Math.max(this.getBottom(), rect.getBottom());
    return new Rect(x, y, r - x, b - y);
  },
  pointInside(x, y) {
    return x >= this.x && x <= this.getRight() && y >= this.y && y <= this.getBottom();
  },
  rectInside(rect) {
    const points = rect.getPoints();
    let i;
    for (i = 0; i < 4; i++) {
      if (!this.pointInside(points[i].x, points[i].y)) {
        return false;
      }
    }
    return true;
  },
  getPoints() {
    const points = [];
    points.push({ x: this.x, y: this.y });
    points.push({ x: this.getRight(), y: this.y });
    points.push({ x: this.getRight(), y: this.getBottom() });
    points.push({ x: this.x, y: this.getBottom() });
    return points;
  },
  getRight() {
    return this.x + this.width;
  },
  getBottom() {
    return this.y + this.height;
  },
  getCenterPoint() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  },
  getBoundingRect() {
    return this;
  },
  scale(s) {
    const d = s - 1;
    const dw = (d * this.width) / 2;
    const dh = (d * this.height) / 2;
    this.x -= dw;
    this.y -= dh;
    this.width *= s;
    this.height *= s;
  },
  hasNaN() {
    return Number.isNaN(+this.x) || Number.isNaN(+this.y) || Number.isNaN(+this.width) || Number.isNaN(+this.height);
  },
};
export default Rect;
