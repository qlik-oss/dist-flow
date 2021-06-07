import {
  useApp,
  useAppLayout,
  useConstraints,
  useEffect,
  useElement,
  useModel,
  usePromise,
  useRect,
  useSelections,
  useState,
  useStaleLayout,
  useTheme,
  useTranslator,
} from '@nebula.js/stardust';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import useLasso from '@qlik/common/nebula/use-lasso';

import properties from './object-properties';
import data from './data';
import ChartView from './distributionplot-view';
import BackednAPi from './backend-api';

export default function supernova(env) {
  const picasso = picassoSetup();

  return {
    qae: {
      properties,
      data,
    },
    component() {
      const element = useElement();
      const selections = useSelections();
      const layout = useStaleLayout();
      const rect = useRect();
      const model = useModel();
      const constraints = useConstraints();
      const translator = useTranslator();
      const theme = useTheme();
      const lasso = useLasso();
      const app = useApp();
      const appLayout = useAppLayout();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $scope = null;
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
          $scope,
          $element,
          options,
          backendApi,
          selectionsApi,
          tooltipApi
        );
        view.app = app;
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
        instance.appLayout = appLayout;
        instance.updateConstraints(constraints);

        const isSnapshot = !!layout.snapshotData;
        if (!isSnapshot) {
          const properties = await model.getEffectiveProperties();
          const updatingDerivedProperties = await instance.updateDerivedProperties(properties, layout);
          if (updatingDerivedProperties) {
            return;
          }
        }

        // TODO: confim selection if triggered from engine (another websocket to the same session (browser tab))

        await instance.updateData(layout);
        const $element = null;
        await instance.paint($element, layout);
      }, [layout, instance, theme.name(), appLayout]);
      if (error) {
        throw error;
      }

      usePromise(async () => {
        if (!instance) {
          return;
        }
        const $element = null;
        await instance.resize($element, layout);
      }, [rect.width, rect.height]);
    },
  };
}
