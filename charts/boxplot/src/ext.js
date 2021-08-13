import pp from './boxplot-properties';
import softDefinition from './boxplot-explore-properties';

const HYPERCUBE_PATH = 'boxplotDef';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  return {
    definition: pp(env),
    softDefinition: softDefinition.get(HYPERCUBE_PATH),
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    options: {
      hyperCubePath: HYPERCUBE_PATH,
      usingDerivedProperties: true,
    },
    // TODO: import, export, ...
  };
}
