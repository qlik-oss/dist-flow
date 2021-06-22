import {
  useConstraints,
  useEffect,
  useElement,
  useModel,
  usePromise,
  useSelections,
  useState,
  useStaleLayout,
  useTheme,
  useTranslator,
} from '@nebula.js/stardust';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import useLasso from '@qlik/common/nebula/use-lasso';
import useResize from '@qlik/common/nebula/resize';
import setupSnapshot from '@qlik/common/nebula/snapshot';

import properties from './object-properties';
import data from './histogram-data';
import ChartView from './histogram-view';
import BackednAPi from './backend-api';
import ext from './ext';

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
      const selections = useSelections();
      const layout = useStaleLayout();
      const model = useModel();
      const constraints = useConstraints();
      const translator = useTranslator();
      const theme = useTheme();
      const lasso = useLasso();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $element = $(element);
        const options = null;
        const backendApi = new BackednAPi(model);
        const selectionsApi = selections;
        const tooltipApi = null;
        const view = new ChartView(
          lasso,
          env.flags,
          picasso,
          translator,
          theme,
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

      const [, error] = usePromise(async () => {
        if (!instance) {
          return;
        }
        instance.theme = theme;
        instance.updateConstraints(constraints);

        // TODO: confim selection if triggered from engine (another websocket to the same session (browser tab))

        await instance.updateData(layout);
        await instance.paint();
      }, [layout, instance, theme.name()]);
      if (error) {
        throw error;
      }

      useResize(instance);
      setupSnapshot(instance);
    },
  };
}
