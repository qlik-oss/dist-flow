import hardPropertiesChecker from '../hard-properties-checker';

describe('set up state', () => {
  let propsOrLayout;

  beforeEach(() => {
    propsOrLayout = {
      qMeta: {
        privileges: ['update'],
      },
      qHasSoftPatches: false,
      qExtendsId: undefined,
      qInfo: {},
    };
  });

  it('should be able to update hard properties', () => {
    const canModify = hardPropertiesChecker.canModifyHardProperties(propsOrLayout);
    expect(canModify).toBe(true);
  });

  it('should not allow the user to update hard properties, if no update permissions are allowed', () => {
    propsOrLayout.qMeta.privileges = [];
    const canModify = hardPropertiesChecker.canModifyHardProperties(propsOrLayout);
    expect(canModify).toBe(false);
  });

  it('should not allow the user to update hard properties, if there exists soft patches', () => {
    propsOrLayout.qHasSoftPatches = true;

    const canModify = hardPropertiesChecker.canModifyHardProperties(propsOrLayout);
    expect(canModify).toBe(false);
  });

  it('should not allow the user to update hard properties, if the object is linked to a master visualization', () => {
    propsOrLayout.qExtendsId = 'bj763u';

    const canModify = hardPropertiesChecker.canModifyHardProperties(propsOrLayout);
    expect(canModify).toBe(false);
  });

  it('should not allow the user to update hard properties, if the object is linked to a master visualization and have soft patches', () => {
    propsOrLayout.qExtendsId = 'bj763u';
    propsOrLayout.qHasSoftPatches = true;

    const canModify = hardPropertiesChecker.canModifyHardProperties(propsOrLayout);
    expect(canModify).toBe(false);
  });
});
