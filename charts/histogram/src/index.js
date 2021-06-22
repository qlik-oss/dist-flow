import {
  useConstraints,
  useDeviceType,
  useEffect,
  useElement,
  useModel,
  useOptions,
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
      const constraints = useConstraints();
      const deviceType = useDeviceType();
      const element = useElement();
      const lasso = useLasso();
      const model = useModel();
      const options = useOptions();
      const selections = useSelections();
      const layout = useStaleLayout();
      const theme = useTheme();
      const translator = useTranslator();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $element = $(element);
        const backendApi = new BackednAPi(model);
        const selectionsApi = selections;
        const view = new ChartView({
          $element,
          backendApi,
          deviceType,
          lasso,
          options,
          picasso,
          selectionsApi,
          theme,
          translator,
        });

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
