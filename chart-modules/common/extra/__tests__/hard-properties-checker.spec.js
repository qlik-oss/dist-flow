import hardPropertiesChecker from '../hard-properties-checker';

describe('set up state', () => {
  let layout;

  beforeEach(() => {
    layout = {
      qMeta: {
        privileges: ['update'],
      },
      qHasSoftPatches: false,
      qExtendsId: undefined,
      qInfo: {},
    };
  });

  it('should be able to update hard properties', () => {
    const canModify = hardPropertiesChecker.canModifyHardProperties(layout);
    expect(canModify).toBe(true);
  });

  it('should not allow the user to update hard properties, if no update permissions are allowed', () => {
    layout.qMeta.privileges = [];
    const canModify = hardPropertiesChecker.canModifyHardProperties(layout);
    expect(canModify).toBe(false);
  });

  it('should not allow the user to update hard properties, if there exists soft patches', () => {
    layout.qHasSoftPatches = true;

    const canModify = hardPropertiesChecker.canModifyHardProperties(layout);
    expect(canModify).toBe(false);
  });

  it('should not allow the user to update hard properties, if the object is linked to a master visualization', () => {
    layout.qExtendsId = 'bj763u';

    const canModify = hardPropertiesChecker.canModifyHardProperties(layout);
    expect(canModify).toBe(false);
  });

  it('should not allow the user to update hard properties, if the object is linked to a master visualization and have soft patches', () => {
    layout.qExtendsId = 'bj763u';
    layout.qHasSoftPatches = true;

    const canModify = hardPropertiesChecker.canModifyHardProperties(layout);
    expect(canModify).toBe(false);
  });

  it('should use permissions mixin if exists as it is correctly do not support uppdate on readonly apps', () => {
    layout.permissions = { update: false };

    const canModify = hardPropertiesChecker.canModifyHardProperties(layout);
    expect(canModify).toBe(false);
  });
});
