import Class from './class';

const View = Class.extend(
  /** @lends Extension# */ {
    /**
     * @param {jqLiteElement} $element
     * @this ExtensionContext
     */
    mounted() /* $element */ {},
    /**
     * @param {jqLiteElement} $element
     * @param {QAE.GenericObjectLayout} layout
     * @this ExtensionContext
     * @returns {Promise<void>}
     */
    paint() /* $element, layout */ {
      return Promise.resolve();
    },
    /**
     * @param {jqLiteElement} $element
     * @param {QAE.GenericObjectLayout} layout
     * @this ExtensionContext
     * @returns {Promise<void>}
     */
    resize($element, layout) {
      return this.paint($element, layout);
    },
    /**
     * @param {QAE.GenericObjectLayout} layout
     * @this ExtensionContext
     * @returns {Promise<void>}
     */
    updateData() /* layout */ {
      return Promise.resolve();
    },
    /**
     * @this ExtensionContext
     */
    beforeDestroy() {},
  }
);

export default View;
