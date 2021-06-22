import {
  useConstraints,
  useDeviceType,
  useEffect,
  useElement,
  useOptions,
  usePromise,
  useState,
  useStaleLayout,
  useTheme,
  useTranslator,
} from '@nebula.js/stardust';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import useResize from '@qlik/common/nebula/resize';
import setupSnapshot from '@qlik/common/nebula/snapshot';

import properties from './object-properties';
import data from './waterfallchart-data-definition';
import ext from './ext';
import ChartView from './waterfallchart-view';

function usePromiseNoError(...args) {
  const [, error] = usePromise(...args);
  if (error) {
    throw error;
  }
}

export default function supernova(env) {
  const picasso = picassoSetup();

  return {
    qae: {
      properties,
      data: data(env),
    },
    ext: ext(env),
    component() {
      const deviceType = useDeviceType();
      const element = useElement();
      const layout = useStaleLayout();
      const constraints = useConstraints();
      const options = useOptions();
      const translator = useTranslator();
      const theme = useTheme();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $element = $(element);
        const view = new ChartView({ picasso, deviceType, translator, theme, $element, options });

        setInstance(view);

        return () => {
          view.destroy();
        };
      }, []);

      usePromiseNoError(async () => {
        if (!instance) {
          return;
        }
        instance.options = options;
        instance.theme = theme;
        instance.updateConstraints(constraints);

        await instance.updateData(layout);
        await instance.paint();
      }, [layout, instance, theme.name()]);

      useResize(instance);
      setupSnapshot(instance);
    },
  };
}
