import Color from './color';
// import Theme from '../../client/utils/theme/theme';

const Theme = {};

const chartUtils = {
  Theme, // Exposed like this for convenience

  TRANSPARENT_BLACK: 'rgba( 0,0,0,0.2 )',
  TRANSPARENT_WHITE: 'rgba( 255,255,255,0.7 )',
  LIGHT_GREY: '#ccc',
  DARK_GREY: '#666',
  BLACK: '#000',
  WHITE: '#fff',

  getInverse(color) {
    const colorObj = new Color(color);
    const alpha = colorObj.getAlpha();

    if (alpha === 0) {
      return this.BLACK;
    }
    return colorObj.isDark() ? this.WHITE : this.BLACK;
  },

  getContrastingGrey(color) {
    const colorObj = new Color(color);
    const alpha = colorObj.getAlpha();

    if (alpha === 0) {
      return this.DARK_GREY;
    }
    return Color.getBestContrast(colorObj, new Color(chartUtils.LIGHT_GREY), new Color(chartUtils.DARK_GREY));
    // return colorObj.isDark() ? this.LIGHT_GREY : this.DARK_GREY;
  },

  getBestContrast(color, color1, color2) {
    return Color.getBestContrast(new Color(color), new Color(color1), new Color(color2));
  },

  getContrastingTransparent(color) {
    const colorObj = new Color(color);
    const alpha = colorObj.getAlpha();

    if (alpha === 0 || color === 'none') {
      return this.TRANSPARENT_BLACK;
    }
    return colorObj.isDark() ? this.TRANSPARENT_WHITE : this.TRANSPARENT_BLACK;
  },

  /**
   * Convenience function for using styleService
   * @param chartID
   * @param path
   * @param attribute
   */
  getStyle(chartID, path, attribute) {
    chartID = chartID || '';

    if (!this[`${chartID}StyleService`]) {
      this[`${chartID}StyleService`] = Theme.initializeService(`object.${chartID}`);
    }

    return this[`${chartID}StyleService`].getStyle(path, attribute);
  },

  getFontSize(chartID, path, layoutMode) {
    chartID = chartID || '';

    if (!this[`${chartID}StyleService`]) {
      this[`${chartID}StyleService`] = Theme.initializeService(`object.${chartID}`);
    }

    const service = this[`${chartID}StyleService`];
    return service.scaleFontSize(service.getStyle(path, 'fontSize'), layoutMode);
  },
};

export default chartUtils;
