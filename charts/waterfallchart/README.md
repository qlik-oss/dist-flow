# @nebula.js/sn-waterfall

## Installing

If you use npm: `npm install @nebula.js/sn-waterfall`. You can also load through the script tag directly from [https://unpkg.com](https://unpkg.com/@nebula.js/sn-waterfall).

## Usage

```js
import { embed } from '@nebula.js/stardust';
import waterfall from '@nebula.js/sn-waterfall';

// 'app' is an enigma app model
const embeddable = embed(app, {
  types: [
    {
      // register combo chart
      name: 'waterfall',
      load: () => Promise.resolve(waterfall),
    },
  ],
});

embeddable.render({
  element,
  type: 'waterfall',
  fields: [],
});
```
