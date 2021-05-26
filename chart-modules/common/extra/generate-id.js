// private
const idGen = {
  getChar(value) {
    //               0   o    O   i    I   l
    const banned = [48, 111, 79, 105, 73, 108];
    let val = value;

    let charCode;
    if (val > 9) {
      charCode = 65 + val - 10;
      if (charCode > 90) {
        charCode += 6;
      }
    } else {
      val = `${val}`.charCodeAt(0);
    }
    return banned.indexOf(charCode) > -1 ? this.getChar(val + 1) : String.fromCharCode(charCode);
  },
  base62(value) {
    const chr = this.getChar(value % 62);
    const y = Math.floor(value / 62);
    return y > 0 ? this.base62(y) + chr : chr;
  },
  id() {
    const s = this.base62(Math.round(Math.random() * (1e13 - 1e11) + 1e11));
    return s.replace(/\W/g, '');
  },
};

export default function generateId() {
  return idGen.id();
}
