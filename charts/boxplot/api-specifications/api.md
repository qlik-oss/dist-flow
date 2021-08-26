# API Reference

* [properties](#properties) : <code>object</code>
    * [.version](#properties.version) : <code>string</code>
    * [.boxplotDef](#properties.boxplotDef) : <code>object</code>
        * [.qHyperCubeDef](#properties.boxplotDef.qHyperCubeDef) ⇐ <code>HyperCubeDef</code>
        * [.calculations](#properties.boxplotDef.calculations) : <code>object</code>
            * [.auto](#properties.boxplotDef.calculations.auto) : <code>boolean</code>
            * [.mode](#properties.boxplotDef.calculations.mode) : <code>&#x27;tukey&#x27;</code> \| <code>&#x27;fractiles&#x27;</code> \| <code>&#x27;stdDev&#x27;</code>
            * [.parameters](#properties.boxplotDef.calculations.parameters) : <code>object</code>
                * [.tukey](#properties.boxplotDef.calculations.parameters.tukey) : <code>number</code>
                * [.fractiles](#properties.boxplotDef.calculations.parameters.fractiles) : <code>number</code>
                * [.stdDev](#properties.boxplotDef.calculations.parameters.stdDev) : <code>number</code>
        * [.color](#properties.boxplotDef.color) : <code>object</code>
            * [.auto](#properties.boxplotDef.color.auto) : <code>boolean</code>
            * [.mode](#properties.boxplotDef.color.mode) : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
            * [.useBaseColors](#properties.boxplotDef.color.useBaseColors) : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
            * [.expressionIsColor](#properties.boxplotDef.color.expressionIsColor) : <code>true</code>
            * [.expressionLabel](#properties.boxplotDef.color.expressionLabel) : <code>string</code>
            * [.box](#properties.boxplotDef.color.box) : <code>object</code>
                * [.paletteColor](#properties.boxplotDef.color.box.paletteColor) : [<code>paletteColor</code>](#paletteColor)
            * [.point](#properties.boxplotDef.color.point) : <code>object</code>
                * [.paletteColor](#properties.boxplotDef.color.point.paletteColor) : [<code>paletteColor</code>](#paletteColor)
        * [.elements](#properties.boxplotDef.elements) : <code>object</code>
            * [.firstWhisker](#properties.boxplotDef.elements.firstWhisker) : <code>object</code>
                * [.name](#properties.boxplotDef.elements.firstWhisker.name) : <code>string</code> \| <code>StringExpression</code>
            * [.outliers](#properties.boxplotDef.elements.outliers) : <code>object</code>
                * [.include](#properties.boxplotDef.elements.outliers.include) : <code>boolean</code>
                * [.sortOutliers](#properties.boxplotDef.elements.outliers.sortOutliers) : <code>boolean</code>
        * [.presentation](#properties.boxplotDef.presentation) : <code>object</code>
            * [.whiskers](#properties.boxplotDef.presentation.whiskers) : <code>object</code>
                * [.show](#properties.boxplotDef.presentation.whiskers.show) : <code>boolean</code>
        * [.sorting](#properties.boxplotDef.sorting) : <code>object</code>
            * [.autoSort](#properties.boxplotDef.sorting.autoSort) : <code>boolean</code>
    * [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
        * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code> \| <code>&#x27;horizontal&#x27;</code> \| <code>&#x27;tilted&#x27;</code>
        * [.show](#properties.dimensionAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
    * [.measureAxis](#properties.measureAxis) : <code>object</code>
        * [.autoMinMax](#properties.measureAxis.autoMinMax) : <code>boolean</code>
        * [.dock](#properties.measureAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.max](#properties.measureAxis.max) : <code>number</code> \| <code>ValueExpression</code>
        * [.min](#properties.measureAxis.min) : <code>number</code> \| <code>ValueExpression</code>
        * [.minMax](#properties.measureAxis.minMax) : <code>&#x27;min&#x27;</code> \| <code>&#x27;max&#x27;</code> \| <code>&#x27;minMax&#x27;</code>
        * [.show](#properties.measureAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
        * [.spacing](#properties.measureAxis.spacing) : <code>number</code>
    * [.gridLines](#properties.gridLines) : <code>object</code>
        * [.auto](#properties.gridLines.auto) : <code>boolean</code>
        * [.spacing](#properties.gridLines.spacing) : <code>0</code> \| <code>2</code> \| <code>3</code>
    * [.orientation](#properties.orientation) : <code>&#x27;vertical&#x27;</code> \| <code>&#x27;horizontal&#x27;</code>
    * [.refLine](#properties.refLine) : <code>object</code>
        * [.refLines](#properties.refLine.refLines) : [<code>Array.&lt;refLine&gt;</code>](#refLine)
    * [.sorting](#properties.sorting) : <code>object</code>
        * [.autoSort](#properties.sorting.autoSort) : <code>boolean</code>
        * [.elementId](#properties.sorting.elementId) : <code>&#x27;firstWhisker&#x27;</code> \| <code>&#x27;boxStart&#x27;</code> \| <code>&#x27;boxMiddle&#x27;</code> \| <code>&#x27;boxEnd&#x27;</code> \| <code>&#x27;lastWhisker&#x27;</code>
        * [.expression](#properties.sorting.expression) : <code>ValueExpression</code>
        * [.sortCriteria](#properties.sorting.sortCriteria) : <code>object</code>
            * [.sortByAscii](#properties.sorting.sortCriteria.sortByAscii) : <code>number</code>
            * [.sortByExpression](#properties.sorting.sortCriteria.sortByExpression) : <code>number</code>
            * [.sortByNumeric](#properties.sorting.sortCriteria.sortByNumeric) : <code>number</code>
    * [.showTitles](#properties.showTitles) : <code>boolean</code>
    * [.subtitle](#properties.subtitle) : <code>string</code> \| <code>StringExpression</code>
    * [.title](#properties.title) : <code>string</code> \| <code>StringExpression</code>
    * [.footnote](#properties.footnote) : <code>string</code> \| <code>StringExpression</code>

---
<a name="properties.version"></a>

### properties.version : <code>string</code>
Current version of this generic object definition.

**Kind**: static property of [<code>properties</code>](#properties)  
<a name="properties.boxplotDef"></a>

### properties.boxplotDef : <code>object</code>
Settings specific to the boxplot

**Kind**: static property of [<code>properties</code>](#properties)  

* [.boxplotDef](#properties.boxplotDef) : <code>object</code>
    * [.qHyperCubeDef](#properties.boxplotDef.qHyperCubeDef) ⇐ <code>HyperCubeDef</code>
    * [.calculations](#properties.boxplotDef.calculations) : <code>object</code>
        * [.auto](#properties.boxplotDef.calculations.auto) : <code>boolean</code>
        * [.mode](#properties.boxplotDef.calculations.mode) : <code>&#x27;tukey&#x27;</code> \| <code>&#x27;fractiles&#x27;</code> \| <code>&#x27;stdDev&#x27;</code>
        * [.parameters](#properties.boxplotDef.calculations.parameters) : <code>object</code>
            * [.tukey](#properties.boxplotDef.calculations.parameters.tukey) : <code>number</code>
            * [.fractiles](#properties.boxplotDef.calculations.parameters.fractiles) : <code>number</code>
            * [.stdDev](#properties.boxplotDef.calculations.parameters.stdDev) : <code>number</code>
    * [.color](#properties.boxplotDef.color) : <code>object</code>
        * [.auto](#properties.boxplotDef.color.auto) : <code>boolean</code>
        * [.mode](#properties.boxplotDef.color.mode) : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
        * [.useBaseColors](#properties.boxplotDef.color.useBaseColors) : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
        * [.expressionIsColor](#properties.boxplotDef.color.expressionIsColor) : <code>true</code>
        * [.expressionLabel](#properties.boxplotDef.color.expressionLabel) : <code>string</code>
        * [.box](#properties.boxplotDef.color.box) : <code>object</code>
            * [.paletteColor](#properties.boxplotDef.color.box.paletteColor) : [<code>paletteColor</code>](#paletteColor)
        * [.point](#properties.boxplotDef.color.point) : <code>object</code>
            * [.paletteColor](#properties.boxplotDef.color.point.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.elements](#properties.boxplotDef.elements) : <code>object</code>
        * [.firstWhisker](#properties.boxplotDef.elements.firstWhisker) : <code>object</code>
            * [.name](#properties.boxplotDef.elements.firstWhisker.name) : <code>string</code> \| <code>StringExpression</code>
        * [.outliers](#properties.boxplotDef.elements.outliers) : <code>object</code>
            * [.include](#properties.boxplotDef.elements.outliers.include) : <code>boolean</code>
            * [.sortOutliers](#properties.boxplotDef.elements.outliers.sortOutliers) : <code>boolean</code>
    * [.presentation](#properties.boxplotDef.presentation) : <code>object</code>
        * [.whiskers](#properties.boxplotDef.presentation.whiskers) : <code>object</code>
            * [.show](#properties.boxplotDef.presentation.whiskers.show) : <code>boolean</code>
    * [.sorting](#properties.boxplotDef.sorting) : <code>object</code>
        * [.autoSort](#properties.boxplotDef.sorting.autoSort) : <code>boolean</code>

<a name="properties.boxplotDef.qHyperCubeDef"></a>

#### boxplotDef.qHyperCubeDef ⇐ <code>HyperCubeDef</code>
Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.

**Kind**: static property of [<code>boxplotDef</code>](#properties.boxplotDef)  
**Extends**: <code>HyperCubeDef</code>  
<a name="properties.boxplotDef.calculations"></a>

#### boxplotDef.calculations : <code>object</code>
Box plot calculation settings.

**Kind**: static property of [<code>boxplotDef</code>](#properties.boxplotDef)  

* [.calculations](#properties.boxplotDef.calculations) : <code>object</code>
    * [.auto](#properties.boxplotDef.calculations.auto) : <code>boolean</code>
    * [.mode](#properties.boxplotDef.calculations.mode) : <code>&#x27;tukey&#x27;</code> \| <code>&#x27;fractiles&#x27;</code> \| <code>&#x27;stdDev&#x27;</code>
    * [.parameters](#properties.boxplotDef.calculations.parameters) : <code>object</code>
        * [.tukey](#properties.boxplotDef.calculations.parameters.tukey) : <code>number</code>
        * [.fractiles](#properties.boxplotDef.calculations.parameters.fractiles) : <code>number</code>
        * [.stdDev](#properties.boxplotDef.calculations.parameters.stdDev) : <code>number</code>

<a name="properties.boxplotDef.calculations.auto"></a>

##### calculations.auto : <code>boolean</code>
Use automatic calculations

**Kind**: static property of [<code>calculations</code>](#properties.boxplotDef.calculations)  
**Default**: <code>true</code>  
<a name="properties.boxplotDef.calculations.mode"></a>

##### calculations.mode : <code>&#x27;tukey&#x27;</code> \| <code>&#x27;fractiles&#x27;</code> \| <code>&#x27;stdDev&#x27;</code>
Auto calculation modes

**Kind**: static property of [<code>calculations</code>](#properties.boxplotDef.calculations)  
**Default**: <code>tukey</code>  
<a name="properties.boxplotDef.calculations.parameters"></a>

##### calculations.parameters : <code>object</code>
Box plot calculation settings

**Kind**: static property of [<code>calculations</code>](#properties.boxplotDef.calculations)  

* [.parameters](#properties.boxplotDef.calculations.parameters) : <code>object</code>
    * [.tukey](#properties.boxplotDef.calculations.parameters.tukey) : <code>number</code>
    * [.fractiles](#properties.boxplotDef.calculations.parameters.fractiles) : <code>number</code>
    * [.stdDev](#properties.boxplotDef.calculations.parameters.stdDev) : <code>number</code>

<a name="properties.boxplotDef.calculations.parameters.tukey"></a>

###### parameters.tukey : <code>number</code>
Number of interquartile ranges for whiskers.

**Kind**: static property of [<code>parameters</code>](#properties.boxplotDef.calculations.parameters)  
**Default**: <code>1.5</code>  
<a name="properties.boxplotDef.calculations.parameters.fractiles"></a>

###### parameters.fractiles : <code>number</code>
A number representing the two whisker fractiles as N and 1-N

**Kind**: static property of [<code>parameters</code>](#properties.boxplotDef.calculations.parameters)  
**Default**: <code>0.01</code>  
<a name="properties.boxplotDef.calculations.parameters.stdDev"></a>

###### parameters.stdDev : <code>number</code>
Standard deviation spread for whiskers

**Kind**: static property of [<code>parameters</code>](#properties.boxplotDef.calculations.parameters)  
**Default**: <code>3</code>  
<a name="properties.boxplotDef.color"></a>

#### boxplotDef.color : <code>object</code>
Color settings.
Most color options for visualizations are set in the color object in the options. You activate custom coloring by setting `"auto": false` which turns off auto-coloring.
If `"auto": true`, no other properties need to be defined in the color object.
Note: Some of the color properties are depending on which theme is currently being used.

**Kind**: static property of [<code>boxplotDef</code>](#properties.boxplotDef)  

* [.color](#properties.boxplotDef.color) : <code>object</code>
    * [.auto](#properties.boxplotDef.color.auto) : <code>boolean</code>
    * [.mode](#properties.boxplotDef.color.mode) : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
    * [.useBaseColors](#properties.boxplotDef.color.useBaseColors) : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
    * [.expressionIsColor](#properties.boxplotDef.color.expressionIsColor) : <code>true</code>
    * [.expressionLabel](#properties.boxplotDef.color.expressionLabel) : <code>string</code>
    * [.box](#properties.boxplotDef.color.box) : <code>object</code>
        * [.paletteColor](#properties.boxplotDef.color.box.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.point](#properties.boxplotDef.color.point) : <code>object</code>
        * [.paletteColor](#properties.boxplotDef.color.point.paletteColor) : [<code>paletteColor</code>](#paletteColor)

<a name="properties.boxplotDef.color.auto"></a>

##### color.auto : <code>boolean</code>
Set to use automatic coloring.
When `"auto": true`, color settings are based on the visualization used and the number of dimensions
and measures, that is, the settings are not fixed, but are dependent on the data input.

**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
**Default**: <code>true</code>  
<a name="properties.boxplotDef.color.mode"></a>

##### color.mode : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
Sets the coloring mode for the visualization when auto-coloring has been switched off (`"auto": false`). Can be one of:
* `primary`: a single color (by default blue) is used for all items in the chart. In visualizations that do not benefit from multiple colors (bar charts with one dimension and scatter plots), single color is the default setting.
* `byExpression`: coloring is based on an expression, which in most cases is a color code. Details are set in the `"expressionIsColor"`, `"expressionLabel`" and `"colorExpression"` properties.
* `byMultiple`: can be used when more than one measure is used. By default, 12 colors are used for the dimensions. The colors are reused when there are more than 12 dimension values.

**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
**Default**: <code>&quot;primary&quot;</code>  
<a name="properties.boxplotDef.color.useBaseColors"></a>

##### color.useBaseColors : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
Use colors encoded in master items.
Only applicable when `"mode": "primary"` has been defined.

**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
**Default**: <code>&quot;off&quot;</code>  
<a name="properties.boxplotDef.color.expressionIsColor"></a>

##### color.expressionIsColor : <code>true</code>
Should be true

**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
**Default**: <code>true</code>  
<a name="properties.boxplotDef.color.expressionLabel"></a>

##### color.expressionLabel : <code>string</code>
Label to be defined on tool tips when using a coloring expression.
Only used if `'expressionIsColor': false`.

**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
**Default**: <code>&quot;&quot;</code>  
<a name="properties.boxplotDef.color.box"></a>

##### color.box : <code>object</code>
**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
<a name="properties.boxplotDef.color.box.paletteColor"></a>

###### box.paletteColor : [<code>paletteColor</code>](#paletteColor)
The paletteColor object is used to define the box color when you color by single color `("mode": "primary")`.

**Kind**: static property of [<code>box</code>](#properties.boxplotDef.color.box)  
**Default**: <code>{ index: -1, color: &#x27;#e6e6e6&#x27; }</code>  
<a name="properties.boxplotDef.color.point"></a>

##### color.point : <code>object</code>
**Kind**: static property of [<code>color</code>](#properties.boxplotDef.color)  
<a name="properties.boxplotDef.color.point.paletteColor"></a>

###### point.paletteColor : [<code>paletteColor</code>](#paletteColor)
The paletteColor object is used to define the point color when you color by single color `("mode": "primary")`.

**Kind**: static property of [<code>point</code>](#properties.boxplotDef.color.point)  
**Default**: <code>{ index: 6 }</code>  
<a name="properties.boxplotDef.elements"></a>

#### boxplotDef.elements : <code>object</code>
Box plot elements settings.

**Kind**: static property of [<code>boxplotDef</code>](#properties.boxplotDef)  

* [.elements](#properties.boxplotDef.elements) : <code>object</code>
    * [.firstWhisker](#properties.boxplotDef.elements.firstWhisker) : <code>object</code>
        * [.name](#properties.boxplotDef.elements.firstWhisker.name) : <code>string</code> \| <code>StringExpression</code>
    * [.outliers](#properties.boxplotDef.elements.outliers) : <code>object</code>
        * [.include](#properties.boxplotDef.elements.outliers.include) : <code>boolean</code>
        * [.sortOutliers](#properties.boxplotDef.elements.outliers.sortOutliers) : <code>boolean</code>

<a name="properties.boxplotDef.elements.firstWhisker"></a>

##### elements.firstWhisker : <code>object</code>
Box plot element settings

**Kind**: static property of [<code>elements</code>](#properties.boxplotDef.elements)  
<a name="properties.boxplotDef.elements.firstWhisker.name"></a>

###### firstWhisker.name : <code>string</code> \| <code>StringExpression</code>
Label for the boxplot element

**Kind**: static property of [<code>firstWhisker</code>](#properties.boxplotDef.elements.firstWhisker)  
**Default**: <code>&quot;&quot;</code>  
<a name="properties.boxplotDef.elements.outliers"></a>

##### elements.outliers : <code>object</code>
Box plot outliers element

**Kind**: static property of [<code>elements</code>](#properties.boxplotDef.elements)  

* [.outliers](#properties.boxplotDef.elements.outliers) : <code>object</code>
    * [.include](#properties.boxplotDef.elements.outliers.include) : <code>boolean</code>
    * [.sortOutliers](#properties.boxplotDef.elements.outliers.sortOutliers) : <code>boolean</code>

<a name="properties.boxplotDef.elements.outliers.include"></a>

###### outliers.include : <code>boolean</code>
Show the outliers.

**Kind**: static property of [<code>outliers</code>](#properties.boxplotDef.elements.outliers)  
<a name="properties.boxplotDef.elements.outliers.sortOutliers"></a>

###### outliers.sortOutliers : <code>boolean</code>
**Kind**: static property of [<code>outliers</code>](#properties.boxplotDef.elements.outliers)  
<a name="properties.boxplotDef.presentation"></a>

#### boxplotDef.presentation : <code>object</code>
Presentation settings for the boxplots

**Kind**: static property of [<code>boxplotDef</code>](#properties.boxplotDef)  

* [.presentation](#properties.boxplotDef.presentation) : <code>object</code>
    * [.whiskers](#properties.boxplotDef.presentation.whiskers) : <code>object</code>
        * [.show](#properties.boxplotDef.presentation.whiskers.show) : <code>boolean</code>

<a name="properties.boxplotDef.presentation.whiskers"></a>

##### presentation.whiskers : <code>object</code>
Settings for the boxplot whiskers

**Kind**: static property of [<code>presentation</code>](#properties.boxplotDef.presentation)  
<a name="properties.boxplotDef.presentation.whiskers.show"></a>

###### whiskers.show : <code>boolean</code>
Show whiskers.

**Kind**: static property of [<code>whiskers</code>](#properties.boxplotDef.presentation.whiskers)  
**Default**: <code>true</code>  
<a name="properties.boxplotDef.sorting"></a>

#### boxplotDef.sorting : <code>object</code>
Wrapper for sorting properties which will be set on the outer dimension.

**Kind**: static property of [<code>boxplotDef</code>](#properties.boxplotDef)  
<a name="properties.boxplotDef.sorting.autoSort"></a>

##### sorting.autoSort : <code>boolean</code>
Sort automatically

**Kind**: static property of [<code>sorting</code>](#properties.boxplotDef.sorting)  
**Default**: <code>true</code>  
<a name="properties.dimensionAxis"></a>

### properties.dimensionAxis : <code>object</code>
Dimension axis settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
    * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
    * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code> \| <code>&#x27;horizontal&#x27;</code> \| <code>&#x27;tilted&#x27;</code>
    * [.show](#properties.dimensionAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>

<a name="properties.dimensionAxis.dock"></a>

#### dimensionAxis.dock : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
Axis docking position

**Kind**: static property of [<code>dimensionAxis</code>](#properties.dimensionAxis)  
**Default**: <code>&quot;near&quot;</code>  
<a name="properties.dimensionAxis.label"></a>

#### dimensionAxis.label : <code>&#x27;auto&#x27;</code> \| <code>&#x27;horizontal&#x27;</code> \| <code>&#x27;tilted&#x27;</code>
Label orientation

**Kind**: static property of [<code>dimensionAxis</code>](#properties.dimensionAxis)  
<a name="properties.dimensionAxis.show"></a>

#### dimensionAxis.show : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
Labels and title

**Kind**: static property of [<code>dimensionAxis</code>](#properties.dimensionAxis)  
<a name="properties.measureAxis"></a>

### properties.measureAxis : <code>object</code>
Measure axis settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.measureAxis](#properties.measureAxis) : <code>object</code>
    * [.autoMinMax](#properties.measureAxis.autoMinMax) : <code>boolean</code>
    * [.dock](#properties.measureAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
    * [.max](#properties.measureAxis.max) : <code>number</code> \| <code>ValueExpression</code>
    * [.min](#properties.measureAxis.min) : <code>number</code> \| <code>ValueExpression</code>
    * [.minMax](#properties.measureAxis.minMax) : <code>&#x27;min&#x27;</code> \| <code>&#x27;max&#x27;</code> \| <code>&#x27;minMax&#x27;</code>
    * [.show](#properties.measureAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
    * [.spacing](#properties.measureAxis.spacing) : <code>number</code>

<a name="properties.measureAxis.autoMinMax"></a>

#### measureAxis.autoMinMax : <code>boolean</code>
Automatic max/min

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>true</code>  
<a name="properties.measureAxis.dock"></a>

#### measureAxis.dock : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
Axis docking position

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>&quot;near&quot;</code>  
<a name="properties.measureAxis.max"></a>

#### measureAxis.max : <code>number</code> \| <code>ValueExpression</code>
Axis max value. `"autoMinMax"` must be set to false and `"minMax"`
must be set to `"max"` or `"minMax"` to use this property

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>10</code>  
<a name="properties.measureAxis.min"></a>

#### measureAxis.min : <code>number</code> \| <code>ValueExpression</code>
Axis min value. `"autoMinMax"` must be set to false and `"minMax"`
must be set to `"min"` or `"minMax"` to use this property

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>0</code>  
<a name="properties.measureAxis.minMax"></a>

#### measureAxis.minMax : <code>&#x27;min&#x27;</code> \| <code>&#x27;max&#x27;</code> \| <code>&#x27;minMax&#x27;</code>
Set custom max/min

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>&quot;min&quot;</code>  
<a name="properties.measureAxis.show"></a>

#### measureAxis.show : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
Labels and title

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>&quot;all&quot;</code>  
<a name="properties.measureAxis.spacing"></a>

#### measureAxis.spacing : <code>number</code>
Axis scale

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>1</code>  
<a name="properties.gridLines"></a>

### properties.gridLines : <code>object</code>
Grid lines settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.gridLines](#properties.gridLines) : <code>object</code>
    * [.auto](#properties.gridLines.auto) : <code>boolean</code>
    * [.spacing](#properties.gridLines.spacing) : <code>0</code> \| <code>2</code> \| <code>3</code>

<a name="properties.gridLines.auto"></a>

#### gridLines.auto : <code>boolean</code>
Automatic grid line spacing.

**Kind**: static property of [<code>gridLines</code>](#properties.gridLines)  
**Default**: <code>true</code>  
<a name="properties.gridLines.spacing"></a>

#### gridLines.spacing : <code>0</code> \| <code>2</code> \| <code>3</code>
Grid line spacing. Used only when auto is set to false.

**Kind**: static property of [<code>gridLines</code>](#properties.gridLines)  
**Default**: <code>2</code>  
<a name="properties.orientation"></a>

### properties.orientation : <code>&#x27;vertical&#x27;</code> \| <code>&#x27;horizontal&#x27;</code>
Orientation setting.
If vertical, the dimension axis can only be docked on bottom or top and measure axis on left or right.

**Kind**: static property of [<code>properties</code>](#properties)  
**Default**: <code>&quot;vertical&quot;</code>  
<a name="properties.refLine"></a>

### properties.refLine : <code>object</code>
Reference lines settings

**Kind**: static property of [<code>properties</code>](#properties)  
<a name="properties.refLine.refLines"></a>

#### refLine.refLines : [<code>Array.&lt;refLine&gt;</code>](#refLine)
Array of measure based reference line definitions

**Kind**: static property of [<code>refLine</code>](#properties.refLine)  
<a name="properties.sorting"></a>

### properties.sorting : <code>object</code>
Wrapper for sorting properties which will be set on the outer dimension.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.sorting](#properties.sorting) : <code>object</code>
    * [.autoSort](#properties.sorting.autoSort) : <code>boolean</code>
    * [.elementId](#properties.sorting.elementId) : <code>&#x27;firstWhisker&#x27;</code> \| <code>&#x27;boxStart&#x27;</code> \| <code>&#x27;boxMiddle&#x27;</code> \| <code>&#x27;boxEnd&#x27;</code> \| <code>&#x27;lastWhisker&#x27;</code>
    * [.expression](#properties.sorting.expression) : <code>ValueExpression</code>
    * [.sortCriteria](#properties.sorting.sortCriteria) : <code>object</code>
        * [.sortByAscii](#properties.sorting.sortCriteria.sortByAscii) : <code>number</code>
        * [.sortByExpression](#properties.sorting.sortCriteria.sortByExpression) : <code>number</code>
        * [.sortByNumeric](#properties.sorting.sortCriteria.sortByNumeric) : <code>number</code>

<a name="properties.sorting.autoSort"></a>

#### sorting.autoSort : <code>boolean</code>
Sort automatically

**Kind**: static property of [<code>sorting</code>](#properties.sorting)  
**Default**: <code>true</code>  
<a name="properties.sorting.elementId"></a>

#### sorting.elementId : <code>&#x27;firstWhisker&#x27;</code> \| <code>&#x27;boxStart&#x27;</code> \| <code>&#x27;boxMiddle&#x27;</code> \| <code>&#x27;boxEnd&#x27;</code> \| <code>&#x27;lastWhisker&#x27;</code>
Sorting preset

**Kind**: static property of [<code>sorting</code>](#properties.sorting)  
<a name="properties.sorting.expression"></a>

#### sorting.expression : <code>ValueExpression</code>
Expression for the sorting. Requires sortByExpression to be -1 or 1.

**Kind**: static property of [<code>sorting</code>](#properties.sorting)  
<a name="properties.sorting.sortCriteria"></a>

#### sorting.sortCriteria : <code>object</code>
**Kind**: static property of [<code>sorting</code>](#properties.sorting)  

* [.sortCriteria](#properties.sorting.sortCriteria) : <code>object</code>
    * [.sortByAscii](#properties.sorting.sortCriteria.sortByAscii) : <code>number</code>
    * [.sortByExpression](#properties.sorting.sortCriteria.sortByExpression) : <code>number</code>
    * [.sortByNumeric](#properties.sorting.sortCriteria.sortByNumeric) : <code>number</code>

<a name="properties.sorting.sortCriteria.sortByAscii"></a>

##### sortCriteria.sortByAscii : <code>number</code>
Sort by alphabetic

**Kind**: static property of [<code>sortCriteria</code>](#properties.sorting.sortCriteria)  
**Default**: <code>0</code>  
<a name="properties.sorting.sortCriteria.sortByExpression"></a>

##### sortCriteria.sortByExpression : <code>number</code>
Sort by expression

**Kind**: static property of [<code>sortCriteria</code>](#properties.sorting.sortCriteria)  
**Default**: <code>0</code>  
<a name="properties.sorting.sortCriteria.sortByNumeric"></a>

##### sortCriteria.sortByNumeric : <code>number</code>
Sort by numeric

**Kind**: static property of [<code>sortCriteria</code>](#properties.sorting.sortCriteria)  
**Default**: <code>0</code>  
<a name="properties.showTitles"></a>

### properties.showTitles : <code>boolean</code>
Show title for the visualization.

**Kind**: static property of [<code>properties</code>](#properties)  
**Default**: <code>true</code>  
<a name="properties.subtitle"></a>

### properties.subtitle : <code>string</code> \| <code>StringExpression</code>
Visualization subtitle.

**Kind**: static property of [<code>properties</code>](#properties)  
**Default**: <code>&quot;&quot;</code>  
<a name="properties.title"></a>

### properties.title : <code>string</code> \| <code>StringExpression</code>
Visualization title.

**Kind**: static property of [<code>properties</code>](#properties)  
**Default**: <code>&quot;&quot;</code>  
<a name="properties.footnote"></a>

### properties.footnote : <code>string</code> \| <code>StringExpression</code>
Visualization footnote.

**Kind**: static property of [<code>properties</code>](#properties)  
**Default**: <code>&quot;&quot;</code>  

# Definitions
<a name="paletteColor"></a>

## paletteColor : <code>object</code>
Color information structure. Holds the actual color and index in palette.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | Color as hex string (mandatory if index: -1) |
| index | <code>number</code> | Index in palette |

<a name="refLineStyle"></a>

## refLineStyle : <code>object</code>
Styling settings for reference line

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [lineThickness] | <code>number</code> | <code>2</code> | Set the thickness for this reference line. |
| [lineType] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Set the dash type for this reference line. |

<a name="refLine"></a>

## refLine : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| show | <code>boolean</code> \| <code>ValueExpression</code> | <code>true</code> | Set to true to display this reference line. |
| label | <code>string</code> |  | Reference line label. |
| [showLabel] | <code>boolean</code> | <code>true</code> | Set to true to show the label of this reference line. |
| [showValue] | <code>boolean</code> | <code>true</code> | Set to true to show the value of this reference line. |
| paletteColor | [<code>paletteColor</code>](#paletteColor) |  |  |
| [style] | [<code>refLineStyle</code>](#refLineStyle) |  | Styling settings for reference line |
| [coloredBackground] | <code>boolean</code> | <code>false</code> | Set to true to fill the label and/or value of this reference line with this color |

