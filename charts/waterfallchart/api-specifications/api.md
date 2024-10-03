# API Reference

* [properties](#properties) : <code>object</code>
    * [.version](#properties.version) : <code>string</code>
    * [.qHyperCubeDef](#properties.qHyperCubeDef) ⇐ <code>HyperCubeDef</code>
        * [.qMeasures](#properties.qHyperCubeDef.qMeasures) : [<code>Array.&lt;MeasureProperties&gt;</code>](#MeasureProperties)
    * [.color](#properties.color) : <code>object</code>
        * [.auto](#properties.color.auto) : <code>boolean</code>
        * [.positiveValue](#properties.color.positiveValue) : <code>object</code>
            * [.paletteColor](#properties.color.positiveValue.paletteColor) : [<code>paletteColor</code>](#paletteColor)
        * [.negativeValue](#properties.color.negativeValue) : <code>object</code>
            * [.paletteColor](#properties.color.negativeValue.paletteColor) : [<code>paletteColor</code>](#paletteColor)
        * [.subtotal](#properties.color.subtotal) : <code>object</code>
            * [.paletteColor](#properties.color.subtotal.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.dataPoint](#properties.dataPoint) : <code>object</code>
        * [.showLabels](#properties.dataPoint.showLabels) : <code>boolean</code>
    * [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
        * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code> \| <code>&#x27;horizontal&#x27;</code> \| <code>&#x27;tilted&#x27;</code>
        * [.show](#properties.dimensionAxis.show) : <code>&#x27;labels&#x27;</code> \| <code>&#x27;none&#x27;</code>
    * [.gridlines](#properties.gridlines) : <code>object</code>
        * [.auto](#properties.gridlines.auto) : <code>boolean</code>
        * [.spacing](#properties.gridlines.spacing) : <code>0</code> \| <code>2</code> \| <code>3</code>
    * [.legend](#properties.legend) : <code>object</code>
        * [.dock](#properties.legend.dock) : <code>&#x27;auto&#x27;</code> \| <code>&#x27;right&#x27;</code> \| <code>&#x27;left&#x27;</code> \| <code>&#x27;bottom&#x27;</code> \| <code>&#x27;top&#x27;</code>
        * [.show](#properties.legend.show) : <code>boolean</code>
    * [.measureAxis](#properties.measureAxis) : <code>object</code>
        * [.autoMinMax](#properties.measureAxis.autoMinMax) : <code>boolean</code>
        * [.dock](#properties.measureAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.max](#properties.measureAxis.max) : <code>number</code> \| <code>ValueExpression</code>
        * [.min](#properties.measureAxis.min) : <code>number</code> \| <code>ValueExpression</code>
        * [.minMax](#properties.measureAxis.minMax) : <code>&#x27;min&#x27;</code> \| <code>&#x27;max&#x27;</code> \| <code>&#x27;minMax&#x27;</code>
        * [.show](#properties.measureAxis.show) : <code>&#x27;labels&#x27;</code> \| <code>&#x27;none&#x27;</code>
        * [.spacing](#properties.measureAxis.spacing) : <code>number</code>
    * [.refLine](#properties.refLine) : <code>object</code>
        * [.refLines](#properties.refLine.refLines) : [<code>Array.&lt;refLine&gt;</code>](#refLine)
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
<a name="properties.qHyperCubeDef.qMeasures"></a>

#### qHyperCubeDef.qMeasures : [<code>Array.&lt;MeasureProperties&gt;</code>](#MeasureProperties)
**Kind**: static property of [<code>qHyperCubeDef</code>](#properties.qHyperCubeDef)  
<a name="properties.color"></a>

### properties.color : <code>object</code>
Color settings.
Most color options for visualizations are set in the color object in the options. You activate custom coloring by setting `"auto": false` which turns off auto-coloring.
If `"auto": true`, no other properties need to be defined in the color object.
Note: Some of the color properties are depending on which theme is currently being used.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.color](#properties.color) : <code>object</code>
    * [.auto](#properties.color.auto) : <code>boolean</code>
    * [.positiveValue](#properties.color.positiveValue) : <code>object</code>
        * [.paletteColor](#properties.color.positiveValue.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.negativeValue](#properties.color.negativeValue) : <code>object</code>
        * [.paletteColor](#properties.color.negativeValue.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.subtotal](#properties.color.subtotal) : <code>object</code>
        * [.paletteColor](#properties.color.subtotal.paletteColor) : [<code>paletteColor</code>](#paletteColor)

<a name="properties.color.auto"></a>

#### color.auto : <code>boolean</code>
Set to use automatic coloring.
When `"auto": true`, color settings are based on the visualization used and the number of dimensions
and measures, that is, the settings are not fixed, but are dependent on the data input.

**Kind**: static property of [<code>color</code>](#properties.color)  
**Default**: <code>true</code>  
<a name="properties.color.positiveValue"></a>

#### color.positiveValue : <code>object</code>
Positive value color.

**Kind**: static property of [<code>color</code>](#properties.color)  
<a name="properties.color.positiveValue.paletteColor"></a>

##### positiveValue.paletteColor : [<code>paletteColor</code>](#paletteColor)
paletteColor

**Kind**: static property of [<code>positiveValue</code>](#properties.color.positiveValue)  
**Default**: <code>{ index: 6, color: null }</code>  
<a name="properties.color.negativeValue"></a>

#### color.negativeValue : <code>object</code>
Negative value color.

**Kind**: static property of [<code>color</code>](#properties.color)  
<a name="properties.color.negativeValue.paletteColor"></a>

##### negativeValue.paletteColor : [<code>paletteColor</code>](#paletteColor)
paletteColor

**Kind**: static property of [<code>negativeValue</code>](#properties.color.negativeValue)  
**Default**: <code>{ index: -1, color: &#x27;#cc6677&#x27; }</code>  
<a name="properties.color.subtotal"></a>

#### color.subtotal : <code>object</code>
Subtotal value color.

**Kind**: static property of [<code>color</code>](#properties.color)  
<a name="properties.color.subtotal.paletteColor"></a>

##### subtotal.paletteColor : [<code>paletteColor</code>](#paletteColor)
paletteColor

**Kind**: static property of [<code>subtotal</code>](#properties.color.subtotal)  
**Default**: <code>{ index: -1, color: &#x27;#c3c3c3&#x27; }</code>  
<a name="properties.dataPoint"></a>

### properties.dataPoint : <code>object</code>
Data point.

**Kind**: static property of [<code>properties</code>](#properties)  
<a name="properties.dataPoint.showLabels"></a>

#### dataPoint.showLabels : <code>boolean</code>
Show labels.

**Kind**: static property of [<code>dataPoint</code>](#properties.dataPoint)  
**Default**: <code>true</code>  
<a name="properties.dimensionAxis"></a>

### properties.dimensionAxis : <code>object</code>
Dimension axis settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
    * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
    * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code> \| <code>&#x27;horizontal&#x27;</code> \| <code>&#x27;tilted&#x27;</code>
    * [.show](#properties.dimensionAxis.show) : <code>&#x27;labels&#x27;</code> \| <code>&#x27;none&#x27;</code>

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

#### dimensionAxis.show : <code>&#x27;labels&#x27;</code> \| <code>&#x27;none&#x27;</code>
Labels and title

**Kind**: static property of [<code>dimensionAxis</code>](#properties.dimensionAxis)  
**Default**: <code>labels</code>  
<a name="properties.gridlines"></a>

### properties.gridlines : <code>object</code>
Grid lines settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.gridlines](#properties.gridlines) : <code>object</code>
    * [.auto](#properties.gridlines.auto) : <code>boolean</code>
    * [.spacing](#properties.gridlines.spacing) : <code>0</code> \| <code>2</code> \| <code>3</code>

<a name="properties.gridlines.auto"></a>

#### gridlines.auto : <code>boolean</code>
Automatic grid line spacing.

**Kind**: static property of [<code>gridlines</code>](#properties.gridlines)  
**Default**: <code>true</code>  
<a name="properties.gridlines.spacing"></a>

#### gridlines.spacing : <code>0</code> \| <code>2</code> \| <code>3</code>
Grid line spacing. Used only when auto is set to false.

**Kind**: static property of [<code>gridlines</code>](#properties.gridlines)  
**Default**: <code>2</code>  
<a name="properties.legend"></a>

### properties.legend : <code>object</code>
Legend settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.legend](#properties.legend) : <code>object</code>
    * [.dock](#properties.legend.dock) : <code>&#x27;auto&#x27;</code> \| <code>&#x27;right&#x27;</code> \| <code>&#x27;left&#x27;</code> \| <code>&#x27;bottom&#x27;</code> \| <code>&#x27;top&#x27;</code>
    * [.show](#properties.legend.show) : <code>boolean</code>

<a name="properties.legend.dock"></a>

#### legend.dock : <code>&#x27;auto&#x27;</code> \| <code>&#x27;right&#x27;</code> \| <code>&#x27;left&#x27;</code> \| <code>&#x27;bottom&#x27;</code> \| <code>&#x27;top&#x27;</code>
Sets the legend position.

**Kind**: static property of [<code>legend</code>](#properties.legend)  
**Default**: <code>&#x27;auto&#x27;</code>  
<a name="properties.legend.show"></a>

#### legend.show : <code>boolean</code>
Set to show the legend.

**Kind**: static property of [<code>legend</code>](#properties.legend)  
**Default**: <code>true</code>  
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
    * [.show](#properties.measureAxis.show) : <code>&#x27;labels&#x27;</code> \| <code>&#x27;none&#x27;</code>
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

#### measureAxis.show : <code>&#x27;labels&#x27;</code> \| <code>&#x27;none&#x27;</code>
Labels and title

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>&quot;labels&quot;</code>  
<a name="properties.measureAxis.spacing"></a>

#### measureAxis.spacing : <code>number</code>
Axis scale

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>1</code>  
<a name="properties.refLine"></a>

### properties.refLine : <code>object</code>
Reference lines settings

**Kind**: static property of [<code>properties</code>](#properties)  
<a name="properties.refLine.refLines"></a>

#### refLine.refLines : [<code>Array.&lt;refLine&gt;</code>](#refLine)
Array of measure based reference line definitions

**Kind**: static property of [<code>refLine</code>](#properties.refLine)  
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
