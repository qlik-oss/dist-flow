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
import SnapshotAPI from '@qlik/common/extra/backend-api/snapshot-api';

import qae from './distributionplot-qae';
import ext from './ext';
import ChartView from './distributionplot-view';
import BackednAPI from './backend-api';

function getBackedApi(model, layout) {
  const isSnapshot = !!layout.snapshotData;
  if (isSnapshot) {
    return new SnapshotAPI(layout, 'qUndoExclude.qHyperCube', 'qStackedDataPages');
  }
  return new BackednAPI(model);
}

export default function supernova(env) {
  locale(env.translator);

  return {
    qae: qae(env),
    ext: ext(env),
    component() {
      const element = useElement();
      const environment = useEnvironment();
      const renderer = environment.options.renderer;
      const picasso = useMemo(() => picassoSetup(renderer), [renderer]);
      const selections = useSelections();
      const layout = useStaleLayout();
      const model = useModel();
      const constraints = useConstraints();
      const lasso = useLasso();
      const renderState = useRenderState();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $element = $(element);
        const backendApi = getBackedApi(model, layout);
        const selectionsApi = selections;
        const view = new ChartView({
          environment,
          lasso,
          flags: env.flags,
          picasso,
          $element,
          backendApi,
          selectionsApi,
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

        const isSnapshot = !!layout.snapshotData;
        if (!isSnapshot) {
          const properties = await model.getEffectiveProperties();
          const updatingDerivedProperties = await instance.updateDerivedProperties(properties, layout);
          if (updatingDerivedProperties) {
            renderState.pending();
            return;
          }
          renderState.restore();
        }

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
