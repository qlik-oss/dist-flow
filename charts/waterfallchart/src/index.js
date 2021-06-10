import {
  useConstraints,
  useEffect,
  useElement,
  usePromise,
  useRect,
  useState,
  useStaleLayout,
  useTheme,
  useTranslator,
} from '@nebula.js/stardust';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';

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
      const element = useElement();
      const layout = useStaleLayout();
      const rect = useRect();
      const constraints = useConstraints();
      const translator = useTranslator();
      const theme = useTheme();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $scope = null;
        const $element = $(element);
        const options = null;
        const backendApi = null;
        const selectionsApi = null;
        const tooltipApi = null;
        const view = new ChartView(
          picasso,
          translator,
          theme,
          $scope,
          $element,
          options,
          backendApi,
          selectionsApi,
          tooltipApi
        );

        setInstance(view);

        return () => {
          view.destroy();
        };
      }, []);

      usePromiseNoError(async () => {
        if (!instance) {
          return;
        }
        // update theme
        instance.theme = theme;
        instance.updateConstraints(constraints);

        await instance.updateData(layout);
        const $element = null;
        await instance.paint($element, layout);
      }, [layout, instance, theme.name()]);

      usePromiseNoError(async () => {
        if (!instance) {
          return;
        }
        const $element = null;
        await instance.resize($element, layout);
      }, [rect.width, rect.height]);
    },
  };
}
