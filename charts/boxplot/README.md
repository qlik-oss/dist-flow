# @nebula.js/sn-boxplot

## Installing

If you use npm: `npm install @nebula.js/sn-boxplot`. You can also load through the script tag directly from [https://unpkg.com](https://unpkg.com/@nebula.js/sn-boxplot).

## Usage

```js
import { embed } from '@nebula.js/stardust';
import boxplot from '@nebula.js/sn-boxplot';

// 'app' is an enigma app model
const embeddable = embed(app, {
  types: [
    {
      // register combo chart
      name: 'boxplot',
      load: () => Promise.resolve(boxplot),
    },
  ],
});

embeddable.render({
  element,
  type: 'boxplot',
  fields: [],
});
```
