import { useAppLayout, useTranslator, useOptions, useMemo, useTheme, useDeviceType } from '@nebula.js/stardust';

export default function useEnvironment() {
  const appLayout = useAppLayout();
  const deviceType = useDeviceType();
  const options = useOptions();
  const theme = useTheme();
  const translator = useTranslator();

  const environment = useMemo(
    () => ({
      appLayout,
      deviceType,
      options,
      theme,
      translator,
    }),
    [appLayout, options.direction, options.freeResize, translator.language(), theme.name(), deviceType]
  );

  return environment;
}
