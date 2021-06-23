import { useTranslator, useOptions, useMemo, useTheme, useDeviceType } from '@nebula.js/stardust';

export default function useEnvironment() {
  const deviceType = useDeviceType();
  const options = useOptions();
  const theme = useTheme();
  const translator = useTranslator();

  const environment = useMemo(
    () => ({
      deviceType,
      options,
      theme,
      translator,
    }),
    [options.direction, options.freeResize, translator.language(), theme.name(), deviceType]
  );

  return environment;
}
