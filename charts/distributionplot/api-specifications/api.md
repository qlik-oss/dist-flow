# API Reference

* [properties](#properties) : <code>object</code>
    * [.version](#properties.version) : <code>string</code>
    * [.qHyperCubeDef](#properties.qHyperCubeDef) ⇐ <code>HyperCubeDef</code>
    * [.color](#properties.color) : <code>object</code>
        * [.box](#properties.color.box) : <code>object</code>
            * [.paletteColor](#properties.color.box.paletteColor) : [<code>paletteColor</code>](#paletteColor)
        * [.expressionLabel](#properties.color.expressionLabel) : <code>string</code>
        * [.point](#properties.color.point) : <code>object</code>
            * [.auto](#properties.color.point.auto) : <code>boolean</code>
            * [.mode](#properties.color.point.mode) : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
            * [.useBaseColors](#properties.color.point.useBaseColors) : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
            * [.expressionIsColor](#properties.color.point.expressionIsColor) : <code>true</code>
    * [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
        * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code>
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
    * [.presentation](#properties.presentation) : <code>object</code>
        * [.visibleComponents](#properties.presentation.visibleComponents) : <code>&#x27;points\_box&#x27;</code> \| <code>&#x27;points&#x27;</code> \| <code>&#x27;box&#x27;</code>
    * [.refLine](#properties.refLine) : <code>object</code>
        * [.refLines](#properties.refLine.refLines) : [<code>Array.&lt;refLine&gt;</code>](#refLine)
    * [.sorting](#properties.sorting) : <code>object</code>
        * [.autoSort](#properties.sorting.autoSort) : <code>boolean</code>
        * [.elementId](#properties.sorting.elementId) : <code>&#x27;distplot-exp-min&#x27;</code> \| <code>&#x27;distplot-exp-max&#x27;</code>
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
<a name="properties.qHyperCubeDef"></a>

### properties.qHyperCubeDef ⇐ <code>HyperCubeDef</code>
Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.

**Kind**: static property of [<code>properties</code>](#properties)  
**Extends**: <code>HyperCubeDef</code>  
<a name="properties.color"></a>

### properties.color : <code>object</code>
Color settings.
Most color options for visualizations are set in the color object in the options. You activate custom coloring by setting `"auto": false` which turns off auto-coloring.
If `"auto": true`, no other properties need to be defined in the color object.
Note: Some of the color properties are depending on which theme is currently being used.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.color](#properties.color) : <code>object</code>
    * [.box](#properties.color.box) : <code>object</code>
        * [.paletteColor](#properties.color.box.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.expressionLabel](#properties.color.expressionLabel) : <code>string</code>
    * [.point](#properties.color.point) : <code>object</code>
        * [.auto](#properties.color.point.auto) : <code>boolean</code>
        * [.mode](#properties.color.point.mode) : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
        * [.useBaseColors](#properties.color.point.useBaseColors) : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
        * [.expressionIsColor](#properties.color.point.expressionIsColor) : <code>true</code>

<a name="properties.color.box"></a>

#### color.box : <code>object</code>
**Kind**: static property of [<code>color</code>](#properties.color)  
<a name="properties.color.box.paletteColor"></a>

##### box.paletteColor : [<code>paletteColor</code>](#paletteColor)
The paletteColor object is used to define the box color when you color by single color `("mode": "primary")`.

**Kind**: static property of [<code>box</code>](#properties.color.box)  
**Default**: <code>{ index: -1, color: &#x27;#e6e6e6&#x27; }</code>  
<a name="properties.color.expressionLabel"></a>

#### color.expressionLabel : <code>string</code>
Label to be defined on tool tips when using a coloring expression.
Only used if `'expressionIsColor': false`.

**Kind**: static property of [<code>color</code>](#properties.color)  
**Default**: <code>&quot;&quot;</code>  
<a name="properties.color.point"></a>

#### color.point : <code>object</code>
**Kind**: static property of [<code>color</code>](#properties.color)  

* [.point](#properties.color.point) : <code>object</code>
    * [.auto](#properties.color.point.auto) : <code>boolean</code>
    * [.mode](#properties.color.point.mode) : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
    * [.useBaseColors](#properties.color.point.useBaseColors) : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
    * [.expressionIsColor](#properties.color.point.expressionIsColor) : <code>true</code>

<a name="properties.color.point.auto"></a>

##### point.auto : <code>boolean</code>
Set to use automatic coloring.
When `"auto": true`, color settings are based on the visualization used and the number of dimensions
and measures, that is, the settings are not fixed, but are dependent on the data input.

**Kind**: static property of [<code>point</code>](#properties.color.point)  
**Default**: <code>true</code>  
<a name="properties.color.point.mode"></a>

##### point.mode : <code>&#x27;primary&#x27;</code> \| <code>&#x27;byExpression&#x27;</code> \| <code>&#x27;byMultiple&#x27;</code>
Sets the coloring mode for the visualization when auto-coloring has been switched off (`"auto": false`). Can be one of:
* `primary`: a single color (by default blue) is used for all items in the chart. In visualizations that do not benefit from multiple colors (bar charts with one dimension and scatter plots), single color is the default setting.
* `byExpression`: coloring is based on an expression, which in most cases is a color code. Details are set in the `"expressionIsColor"`, `"expressionLabel`" and `"colorExpression"` properties.
* `byMultiple`: can be used when more than one measure is used. By default, 12 colors are used for the dimensions. The colors are reused when there are more than 12 dimension values.

**Kind**: static property of [<code>point</code>](#properties.color.point)  
**Default**: <code>&quot;primary&quot;</code>  
<a name="properties.color.point.useBaseColors"></a>

##### point.useBaseColors : <code>&#x27;off&#x27;</code> \| <code>&#x27;dimension&#x27;</code> \| <code>&#x27;measure&#x27;</code>
Use colors encoded in master items.
Only applicable when `"mode": "primary"` has been defined.

**Kind**: static property of [<code>point</code>](#properties.color.point)  
**Default**: <code>&quot;off&quot;</code>  
<a name="properties.color.point.expressionIsColor"></a>

##### point.expressionIsColor : <code>true</code>
Should be true

**Kind**: static property of [<code>point</code>](#properties.color.point)  
**Default**: <code>true</code>  
<a name="properties.dimensionAxis"></a>

### properties.dimensionAxis : <code>object</code>
Dimension axis settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
    * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
    * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code>
    * [.show](#properties.dimensionAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>

<a name="properties.dimensionAxis.dock"></a>

#### dimensionAxis.dock : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
Axis docking position

**Kind**: static property of [<code>dimensionAxis</code>](#properties.dimensionAxis)  
**Default**: <code>&quot;near&quot;</code>  
<a name="properties.dimensionAxis.label"></a>

#### dimensionAxis.label : <code>&#x27;auto&#x27;</code>
Label orientation

**Kind**: static property of [<code>dimensionAxis</code>](#properties.dimensionAxis)  
**Default**: <code>auto</code>  
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
**Default**: <code>&quot;horizontal&quot;</code>  
<a name="properties.presentation"></a>

### properties.presentation : <code>object</code>
Presentation settings for the distributionplot

**Kind**: static property of [<code>properties</code>](#properties)  
<a name="properties.presentation.visibleComponents"></a>

#### presentation.visibleComponents : <code>&#x27;points\_box&#x27;</code> \| <code>&#x27;points&#x27;</code> \| <code>&#x27;box&#x27;</code>
Visible components of the distributionplot

**Kind**: static property of [<code>presentation</code>](#properties.presentation)  
**Default**: <code>&quot;points_box&quot;</code>  
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
    * [.elementId](#properties.sorting.elementId) : <code>&#x27;distplot-exp-min&#x27;</code> \| <code>&#x27;distplot-exp-max&#x27;</code>
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

#### sorting.elementId : <code>&#x27;distplot-exp-min&#x27;</code> \| <code>&#x27;distplot-exp-max&#x27;</code>
Sorting preset

**Kind**: static property of [<code>sorting</code>](#properties.sorting)  
**Default**: <code>&quot;distplot-exp-min&quot;</code>  
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

