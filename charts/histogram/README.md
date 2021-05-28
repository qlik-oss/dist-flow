# @nebula.js/sn-histogram

## Installing

If you use npm: `npm install @nebula.js/sn-histogram`. You can also load through the script tag directly from [https://unpkg.com](https://unpkg.com/@nebula.js/sn-histogram).

## Usage

```js
import { embed } from '@nebula.js/stardust';
import histogram from '@nebula.js/sn-histogram';

// 'app' is an enigma app model
const embeddable = embed(app, {
  types: [
    {
      // register combo chart
      name: 'histogram',
      load: () => Promise.resolve(histogram),
    },
  ],
});

embeddable.render({
  element,
  type: 'histogram',
  fields: [],
});
```
