import {
  useConstraints,
  useEffect,
  useElement,
  useMemo,
  useModel,
  usePromise,
  useRenderState,
  useSelections,
  useState,
  useStaleLayout,
} from '@nebula.js/stardust';
import $ from 'jquery';
import locale from '@qlik/common/locale';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import useLasso from '@qlik/common/nebula/use-lasso';
import useResize from '@qlik/common/nebula/resize';
import useEnvironment from '@qlik/common/nebula/use-environment';
import setupSnapshot from '@qlik/common/nebula/snapshot';
import conversion from 'qlik-object-conversion';

import properties from './object-properties';
import data from './histogram-data';
import ChartView from './histogram-view';
import BackednAPi from './backend-api';
import ext from './ext';

export default function supernova(env) {
  locale(env.translator);
  const dataDefinition = data(env);

  return {
    qae: {
      properties,
      data: {
        targets: [dataDefinition],
      },
      exportProperties: ({ propertyTree, hypercubePath, viewDataMode }) =>
        conversion.hypercube.exportProperties({
          propertyTree,
          hypercubePath: viewDataMode ? 'qUndoExclude.box' : hypercubePath,
        }),
    },
    ext: ext(env),
    component() {
      const constraints = useConstraints();
      const element = useElement();
      const environment = useEnvironment();
      const renderer = environment.options.renderer;
      const picasso = useMemo(() => picassoSetup(renderer), [renderer]);
      const lasso = useLasso();
      const model = useModel();
      const selections = useSelections();
      const layout = useStaleLayout();
      const renderState = useRenderState();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $element = $(element);
        const backendApi = new BackednAPi(model);
        const selectionsApi = selections;
        const view = new ChartView({
          $element,
          backendApi,
          environment,
          flags: env.flags,
          lasso,
          picasso,
          selectionsApi,
          renderState,
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
        instance.updateEnvironment(environment);
        instance.updateConstraints(constraints);

        // TODO: confim selection if triggered from engine (another websocket to the same session (browser tab))

        await instance.updateData(layout);
        await instance.paint();
      }, [layout, instance, environment]);
      if (error) {
        throw error;
      }

      useResize(instance);
      setupSnapshot(instance);
    },
  };
}
