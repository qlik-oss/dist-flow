import qixSchema from 'enigma.js/schemas/12.34.11.json';
import theme from '@qlik-trial/sense-themes-default/dist/sense/theme.json';

function parseUrl() {
  const options = {};
  window.location.search
    .substring(1)
    .split('&')
    .forEach((pair) => {
      const [name, value] = pair.split('=');
      options[name] = value;
    });

  return options;
}

const callStack = {};

function storeCall(name, args) {
  // console.log(name, args);
  if (Array.isArray(callStack[name])) {
    callStack[name].push(args);
  } else {
    callStack[name] = [args];
  }
}

function spy(obj) {
  const spyObj = { ...obj };
  Object.keys(obj).forEach((key) => {
    const orgFn = obj[key];
    if (typeof orgFn === 'function') {
      spyObj[key] = (...args) => {
        storeCall(key, args);
        return orgFn(...args);
      };
    }
  });

  return spyObj;
}

spy.getCall = (name, index = 0) => {
  const c = callStack[name];
  if (Array.isArray(c)) {
    return c[index];
  }
  return undefined;
};

spy.getCallCount = (name) => {
  const c = callStack[name];
  if (Array.isArray(c)) {
    return c.length;
  }
  return 0;
};

window.spy = spy;

const options = {
  mode: 'none', // 'none', 'passive', 'interactive'
  source: 'snapshot',
  // snapshot source options
  data: '',

  // live source options
  app: '',
  object: '',
  ...parseUrl(),
};

if (options.scrollable) {
  document.querySelector('html').className = 'scrollable';
}

const nebbie = (app, context = {}) =>
  window.stardust.embed(app, {
    types: [
      {
        name: 'boxplot',
      },
      {
        name: 'distributionplot',
      },
      {
        name: 'histogram',
      },
      {
        name: 'waterfallchart',
      },
    ],
    load(type) {
      switch (type.name) {
        case 'boxplot':
          return Promise.resolve(window['sn-boxplot']);
        case 'distributionplot':
          return Promise.resolve(window['sn-distributionplot']);
        case 'histogram':
          return Promise.resolve(window['sn-histogram']);
        case 'waterfallchart':
          return Promise.resolve(window['sn-waterfall']);
        default:
          return Promise.resolve();
      }
    },
    themes: [
      {
        id: 'senseish',
        load: () => Promise.resolve(theme),
      },
    ],
    flags: {
      // BASIC_COLOR_OPTIONS_PER_MEASURE: true,
      // BARS_IN_SECONDARY_AXIS: true,
    },
    context: {
      theme: 'senseish',
      ...context,
    },
  });

function live() {
  if (!options.object) {
    throw new Error('Missing "object" query parameter');
  }
  if (!options.app) {
    throw new Error('Missing "app" query parameter');
  }

  const schema = qixSchema;
  const defaultConfig = {
    host: 'localhost',
    port: 4848,
    secure: false,
    mixins: window.selections,
  };

  const createConnection = (cfg) =>
    window.enigma
      .create({
        schema,
        url: window.senseUtilities.buildUrl({ ...defaultConfig, ...cfg }),
        mixins: defaultConfig.mixins,
      })
      .open()
      .then((global) => global.openDoc(cfg.appId));

  return createConnection({
    appId: options.app.replace('%20', ' '),
  });
}

function getHyperCubeData(key, pages, meta) {
  if (/qAttributeDimensions/.test(key)) {
    return meta.attrDimDataPages;
  }

  return meta.layout.qHyperCube.qDataPages;
}

function getColorMap(meta) {
  return {
    id: 'colors',
    getLayout: () => (meta.colorMap ? Promise.resolve({ colorMap: meta.colorMap }) : Promise.reject()),
  };
}

function extractSnapshotData() {
  const target = options.target || 'pie';
  const data = options.data || 'base_layout';
  let url;
  if (/\.(js|json)$/.test(data)) {
    // data = endsWith(data, '.json') ? data : `${data}.json`;
    url = `./test/__data__/${target}/${data}`;
  } else {
    url = `/data/${encodeURIComponent(`${target}/${data}`)}`;
  }

  return fetch(url).then((response) => response.json());
}

function snapshot(snapshotData) {
  const { layout } = snapshotData;

  const app = {
    id: `app - ${+Date.now()}`,
    session: {
      getObjectApi: () =>
        Promise.resolve({
          id: `sessapi - ${+Date.now()}`,
        }),
    },
    createSessionObject(props) {
      return Promise.resolve({
        on: () => {},
        once: () => {},
        getLayout: () => Promise.resolve({}),
        id: props && props.qInfo && props.qInfo.qId ? props.qInfo.qId : `sel - ${+Date.now()}`,
        ...props,
      });
    },
    getObject: (id) => {
      if (/^ColorMapModel/.test(id)) {
        return Promise.resolve(getColorMap(snapshotData));
      }
      return Promise.resolve(
        spy({
          id: `object - ${+Date.now()}`,
          on: () => {},
          once: () => {},
          getEffectiveProperties: () => Promise.resolve({}),
          session: true,
          getHyperCubeData: (key, pages) => Promise.resolve(getHyperCubeData(key, pages, snapshotData)),
          getHyperCubeContinuousData: () =>
            Promise.resolve({ qAxisData: layout.qHyperCube.qAxisData, qDataPages: layout.qHyperCube.qDataPages }),
          getHyperCubeStackData: () => Promise.resolve(layout.qHyperCube.qStackedDataPages),
          getLayout: () => Promise.resolve(layout),
          selectHyperCubeValues: () => Promise.resolve(true),
          rangeSelectHyperCubeValues: () => Promise.resolve(true),
          beginSelections: () => Promise.resolve(true),
          resetMadeSelections: () => Promise.resolve(true),
          Invalidated: {
            bind() {},
            unbind() {},
          },
        })
      );
    },
    getAppLayout() {
      return Promise.resolve({
        id: 'app-layout',
      });
    },
  };

  return Promise.resolve(app);
}

function highlightEvent(e) {
  let x;
  let y;
  if (e.type.indexOf('touch') >= 0) {
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }
  x = Math.round(x);
  y = Math.round(y);

  const highlight = document.createElement('div');
  highlight.style.opacity = 0;
  highlight.style.transition = 'all 250ms linear';
  highlight.style.borderRadius = '50%';
  highlight.style.borderColor = 'red';
  highlight.style.zIndex = 1000;
  highlight.style.background = 'red';
  highlight.style.position = 'absolute';
  highlight.style.left = `${x}px`;
  highlight.style.top = `${y}px`;
  highlight.style.width = '0px';
  highlight.style.height = '0px';
  highlight.style.transform = 'translate(-50%, -50%)';

  document.body.appendChild(highlight);

  setTimeout(() => {
    highlight.style.opacity = 0.9;
    highlight.style.width = '10px';
    highlight.style.height = '10px';
  }, 0);

  setTimeout(() => {
    highlight.style.opacity = 0;
    highlight.style.width = '0px';
    highlight.style.height = '0px';
  }, 500);

  setTimeout(() => {
    document.body.removeChild(highlight);
  }, 750);
}

document.querySelector('#chart-container').onclick = highlightEvent;
document.querySelector('#chart-container').ontouchend = highlightEvent;

if (options.source === 'live') {
  live().then((app) => {
    nebbie(app).render({
      id: options.object,
      element: document.querySelector('#chart-container'),
      context: {},
      options: {
        renderer: 'svg',
      },
    });
  });
} else {
  const contrs = (options.constraints || '').split(',');
  extractSnapshotData().then((snapshotData) => {
    snapshot(snapshotData).then((app) => {
      const { layout } = snapshotData;
      nebbie(app, {
        constraints: {
          passive: contrs.indexOf('passive') !== -1,
          active: contrs.indexOf('active') !== -1,
          select: contrs.indexOf('select') !== -1,
        },
      }).render({
        id: layout.qInfo.qId,
        element: document.querySelector('#chart-container'),
        options: {
          renderer: 'svg',
        },
      });
    });
  });
}
