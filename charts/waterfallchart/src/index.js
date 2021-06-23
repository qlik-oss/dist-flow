import { useConstraints, useEffect, useElement, usePromise, useState, useStaleLayout } from '@nebula.js/stardust';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';
import useResize from '@qlik/common/nebula/resize';
import useEnvironment from '@qlik/common/nebula/use-environment';
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
      const element = useElement();
      const environment = useEnvironment();
      const layout = useStaleLayout();
      const constraints = useConstraints();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $element = $(element);
        const view = new ChartView({ picasso, environment, $element });

        setInstance(view);

        return () => {
          view.destroy();
        };
      }, []);

      usePromiseNoError(async () => {
        if (!instance) {
          return;
        }
        instance.updateEnvironment(environment);
        instance.updateConstraints(constraints);

        await instance.updateData(layout);
        await instance.paint();
      }, [layout, instance, environment]);

      useResize(instance);
      setupSnapshot(instance);
    },
  };
}
