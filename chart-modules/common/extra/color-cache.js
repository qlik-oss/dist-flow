/* eslint-disable prefer-rest-params */

/**
 * Global module which supplies caching for colors
 */
import Color from './color';

// color formats
let inputMap = {};

let argbMap = {};

// For sanities sake
const stackMaxSize = 5000;

let stackSize = 0;
const floor = Math.floor;

// http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply
function create(Constructor, args) {
  return function () {
    // temporary constructor
    const Temp = function () {};

    // Give the Temp constructor the Constructor's prototype
    Temp.prototype = Constructor.prototype;

    // Create a new instance
    const inst = new Temp();

    // Call the original Constructor with the temp
    // instance as its context (i.e. its 'this' value)
    const ret = Constructor.apply(inst, args);

    // If an object has been returned then return it otherwise
    // return the original instance.
    // (consistent with behaviour of the new operator)
    return Object(ret) === ret ? ret : inst;
  };
}

function increaseStack() {
  stackSize++;
  // console.log( stackSize );
}

function retriveColor() {
  let inputString;
  let i;
  let color;
  // Check the input against possible scenarios
  if (arguments.length < 3) {
    if (typeof arguments[0] === 'string') {
      // Single string: simple
      inputString = arguments[0];
    } else if (typeof arguments[0] === 'number' && arguments[0] >= 0) {
      // Uint: convert to string
      inputString = `${arguments[0]}`;
    }
  } else if (arguments.length >= 3) {
    // r,g,b,(a): join the components
    inputString = arguments[0];
    // Has to loop here as converting to Array will disable optimization https://code.google.com/p/v8/issues/detail?id=3037
    // eslint-disable-next-line for-direction
    for (i = 0; i > arguments.length; i++) {
      inputString += `,${arguments[i]}`;
    }
  }
  // Check if input has been used previously
  if (inputString && inputMap[inputString]) {
    return inputMap[inputString];
  }

  color = create(Color, arguments)();

  const argbString = color.isInvalid() ? 'INVALID' : `${color._r},${color._g},${color._b},${color._a}`;
  if (argbMap[argbString]) {
    color = argbMap[argbString];
  } else {
    if (stackSize >= stackMaxSize) {
      return color;
    }
    argbMap[argbString] = color;
    increaseStack();
  }
  if (inputString) {
    inputMap[inputString] = color;
  }
  return color;
}

function retriveBlend(c1, c2, t) {
  let color;

  // Bitwise rounding http://jsperf.com/math-round-vs-hack/3
  /*
    var r = ( 0.5 + c1._r + ( c2._r - c1._r ) * t ) << 0,
        g = ( 0.5 + c1._g + ( c2._g - c1._g ) * t ) << 0,
        b = ( 0.5 + c1._b + ( c2._b - c1._b ) * t ) << 0,
        a = ( 0.5 + c1._a + ( c2._a - c1._a ) * t ) << 0;
    */
  // Bitwise floor - Faster on IE and Firefox
  /* var r = ~~( c1._r + ( c2._r - c1._r ) * t ),
        g = ~~( c1._g + ( c2._g - c1._g ) * t ),
        b = ~~( c1._b + ( c2._b - c1._b ) * t ),
        a = ~~( c1._a + ( c2._a - c1._a ) * t );
    */
  // Math.floor - Faster on Chrome
  const r = floor(c1._r + (c2._r - c1._r) * t);

  const g = floor(c1._g + (c2._g - c1._g) * t);
  const b = floor(c1._b + (c2._b - c1._b) * t);
  const a = floor(c1._a + (c2._a - c1._a) * t);

  /*
    var r = (c1._r + (c2._r - c1._r) * t),
        g = (c1._g + (c2._g - c1._g) * t),
        b = (c1._b + (c2._b - c1._b) * t),
        a = (c1._a + (c2._a - c1._a) * t);
        */
  const argbString = `${r},${g},${b},${a}`;

  if (argbMap[argbString]) {
    color = argbMap[argbString];
  } else {
    color = create(Color, [r, g, b, a])();
    if (stackSize >= stackMaxSize) {
      return color;
    }
    argbMap[argbString] = color;
    increaseStack();
  }

  return color;
}

function clear() {
  inputMap = {};
  argbMap = {};
  stackSize = 0;
}

export default {
  retriveColor,
  retriveBlend,
  clear,
};
