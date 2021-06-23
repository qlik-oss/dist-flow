import { __DO_NOT_USE__ } from '@nebula.js/stardust';

const { hook } = __DO_NOT_USE__;

export function create(definition, context = {}) {
  const hooked = hook(definition);
  const component = {
    context: {
      ...context,
    },
    env: {
      translator: context.translator,
    },
    fn: hooked.fn,
  };

  let actions = [];
  hooked.observeActions(component, (updatedActions) => {
    actions = updatedActions;
  });

  hooked.initiate(component);

  return {
    update(ctx) {
      if (ctx) {
        Object.assign(component.context, ctx);
      }
      if (ctx && ctx.translator) {
        component.env.translator = ctx.translator;
      }
      return hooked.run(component);
    },
    updateRectOnNextUpdate() {
      hooked.updateRectOnNextRun(component);
    },
    unmount() {
      return hooked.teardown(component);
    },
    takeSnapshot() {
      return hooked.runSnaps(component, component.context.layout);
    },
    actions() {
      return actions;
    },
  };
}

export async function renderHook(callback, context) {
  const result = {
    all: [],
    current: null,
    error: null,
  };
  const hooked = create(() => {
    let r;
    try {
      r = callback();
    } catch (e) {
      r = undefined;
      result.error = e;
    }
    result.all.push(r);
    result.current = r;
  }, context);
  await hooked.update();
  const rerender = (newContext) => hooked.update(newContext);
  const unmount = () => hooked.unmount();
  return {
    result,
    rerender,
    unmount,
  };
}
