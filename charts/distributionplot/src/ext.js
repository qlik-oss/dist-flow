import pp from './distributionplot-properties';
import softDefinition from './distributionplot-explore-properties';
import propsLogic from './distributionplot-properties-logic';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  return {
    definition: pp(env),
    softDefinition,
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    options: {
      usingDerivedProperties: true,
      colorByPath: 'color.point',
    },
    onSoftPropertyChange(prevProperties, nextProperties) {
      propsLogic.onGlobalChangeColors(nextProperties);
    },
    // TODO: import, export, ...
  };
}
