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
import qae from './boxplot-qae';
import ChartView from './boxplot-view';
import ext from './boxplot-ext';
import BackednAPI from './boxplot-backend-api';

function getBackedApi(model, layout) {
  const isSnapshot = !!layout.snapshotData;
  if (isSnapshot) {
    return new SnapshotAPI(layout, 'qUndoExclude.box.qHyperCube', 'qDataPages');
  }
  return new BackednAPI(model);
}

function useView(env, picasso, environment) {
  const element = useElement();
  const model = useModel();
  const lasso = useLasso();
  const selections = useSelections();
  const layout = useStaleLayout();

  const [instance, setInstance] = useState();
  useEffect(() => {
    const backendApi = getBackedApi(model, layout);

    const view = new ChartView({
      $element: $(element),
      backendApi,
      environment,
      flags: env.flags,
      lasso,
      layout,
      selectionsApi: selections,
      picasso,
    });

    setInstance(view);

    return () => {
      view.destroy();
    };
  }, []);
  return instance;
}

function useUpdate(instance, environment) {
  const layout = useStaleLayout();
  const model = useModel();
  const constraints = useConstraints();
  const renderState = useRenderState();

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
    const $element = null;
    await instance.paint($element, layout);
  }, [layout, instance, environment]);
  if (error) {
    throw error;
  }
}

export default function supernova(env) {
  locale(env.translator);
  return {
    qae: qae(env),
    ext: ext(env),
    component() {
      const environment = useEnvironment();
      const renderer = environment.options.renderer;
      const picasso = useMemo(() => picassoSetup(renderer), [renderer]);
      const instance = useView(env, picasso, environment);
      useUpdate(instance, environment);
      useResize(instance);
      setupSnapshot(instance);
    },
  };
}
