# API Reference

* [properties](#properties) : <code>object</code>
    * [.version](#properties.version) : <code>string</code>
    * [.qHyperCubeDef](#properties.qHyperCubeDef) ⇐ <code>HyperCubeDef</code>
    * [.bins](#properties.bins) : <code>object</code>
        * [.auto](#properties.bins.auto) : <code>boolean</code>
        * [.binCount](#properties.bins.binCount) : <code>number</code>
        * [.binSize](#properties.bins.binSize) : <code>number</code>
        * [.offset](#properties.bins.offset) : <code>number</code>
        * [.countDistinct](#properties.bins.countDistinct) : <code>boolean</code>
        * [.binMode](#properties.bins.binMode) : <code>string</code>
    * [.color](#properties.color) : <code>object</code>
        * [.bar](#properties.color.bar) : <code>object</code>
            * [.paletteColor](#properties.color.bar.paletteColor) : [<code>paletteColor</code>](#paletteColor)
    * [.dataPoint](#properties.dataPoint) : <code>object</code>
        * [.showLabels](#properties.dataPoint.showLabels) : <code>boolean</code>
    * [.dimensionAxis](#properties.dimensionAxis) : <code>object</code>
        * [.dock](#properties.dimensionAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.label](#properties.dimensionAxis.label) : <code>&#x27;auto&#x27;</code>
        * [.show](#properties.dimensionAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
    * [.measureAxis](#properties.measureAxis) : <code>object</code>
        * [.autoMinMax](#properties.measureAxis.autoMinMax) : <code>boolean</code>
        * [.dock](#properties.measureAxis.dock) : <code>&#x27;near&#x27;</code> \| <code>&#x27;far&#x27;</code>
        * [.label](#properties.measureAxis.label) : <code>string</code> \| <code>StringExpression</code>
        * [.max](#properties.measureAxis.max) : <code>number</code> \| <code>ValueExpression</code>
        * [.min](#properties.measureAxis.min) : <code>number</code> \| <code>ValueExpression</code>
        * [.minMax](#properties.measureAxis.minMax) : <code>&#x27;min&#x27;</code> \| <code>&#x27;max&#x27;</code> \| <code>&#x27;minMax&#x27;</code>
        * [.show](#properties.measureAxis.show) : <code>&#x27;all&#x27;</code> \| <code>&#x27;labels&#x27;</code> \| <code>&#x27;title&#x27;</code> \| <code>&#x27;none&#x27;</code>
        * [.spacing](#properties.measureAxis.spacing) : <code>number</code>
    * [.gridLine](#properties.gridLine) : <code>object</code>
        * [.auto](#properties.gridLine.auto) : <code>boolean</code>
        * [.spacing](#properties.gridLine.spacing) : <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code>
    * [.refLine](#properties.refLine) : <code>object</code>
        * [.refLines](#properties.refLine.refLines) : [<code>Array.&lt;refLine&gt;</code>](#refLine)
    * [.sorting](#properties.sorting) : <code>object</code>
        * [.autoSort](#properties.sorting.autoSort) : <code>true</code>
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
<a name="properties.bins"></a>

### properties.bins : <code>object</code>
Bin settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.bins](#properties.bins) : <code>object</code>
    * [.auto](#properties.bins.auto) : <code>boolean</code>
    * [.binCount](#properties.bins.binCount) : <code>number</code>
    * [.binSize](#properties.bins.binSize) : <code>number</code>
    * [.offset](#properties.bins.offset) : <code>number</code>
    * [.countDistinct](#properties.bins.countDistinct) : <code>boolean</code>
    * [.binMode](#properties.bins.binMode) : <code>string</code>

<a name="properties.bins.auto"></a>

#### bins.auto : <code>boolean</code>
Auto mode generates a nice looking histogram without special parameters.

**Kind**: static property of [<code>bins</code>](#properties.bins)  
<a name="properties.bins.binCount"></a>

#### bins.binCount : <code>number</code>
Number of bars to be displayed, used when binMode is set to 'maxCount'.

**Kind**: static property of [<code>bins</code>](#properties.bins)  
**Default**: <code></code>  
<a name="properties.bins.binSize"></a>

#### bins.binSize : <code>number</code>
The width of the bars, used when binMode is set to 'size'.

**Kind**: static property of [<code>bins</code>](#properties.bins)  
<a name="properties.bins.offset"></a>

#### bins.offset : <code>number</code>
Used to know where to start displaying bars on x-axis.

**Kind**: static property of [<code>bins</code>](#properties.bins)  
<a name="properties.bins.countDistinct"></a>

#### bins.countDistinct : <code>boolean</code>
Shows unique values.

**Kind**: static property of [<code>bins</code>](#properties.bins)  
<a name="properties.bins.binMode"></a>

#### bins.binMode : <code>string</code>
MaxCount - Able to adjust the maximum number of bars to be displayed. size - Able to adjust size of bars and offset from x-axis.

**Kind**: static property of [<code>bins</code>](#properties.bins)  
<a name="properties.color"></a>

### properties.color : <code>object</code>
Color settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.color](#properties.color) : <code>object</code>
    * [.bar](#properties.color.bar) : <code>object</code>
        * [.paletteColor](#properties.color.bar.paletteColor) : [<code>paletteColor</code>](#paletteColor)

<a name="properties.color.bar"></a>

#### color.bar : <code>object</code>
**Kind**: static property of [<code>color</code>](#properties.color)  
<a name="properties.color.bar.paletteColor"></a>

##### bar.paletteColor : [<code>paletteColor</code>](#paletteColor)
The paletteColor object is used to define the bar color.

**Kind**: static property of [<code>bar</code>](#properties.color.bar)  
**Default**: <code>{ index: 6 }</code>  
<a name="properties.dataPoint"></a>

### properties.dataPoint : <code>object</code>
Data points

**Kind**: static property of [<code>properties</code>](#properties)  
<a name="properties.dataPoint.showLabels"></a>

#### dataPoint.showLabels : <code>boolean</code>
Show labels on bars

**Kind**: static property of [<code>dataPoint</code>](#properties.dataPoint)  
**Default**: <code>false</code>  
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
    * [.label](#properties.measureAxis.label) : <code>string</code> \| <code>StringExpression</code>
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
<a name="properties.measureAxis.label"></a>

#### measureAxis.label : <code>string</code> \| <code>StringExpression</code>
Label to show on the measure axis, if left empty it defaults to 'Frequency'

**Kind**: static property of [<code>measureAxis</code>](#properties.measureAxis)  
**Default**: <code>&quot;&quot;</code>  
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
<a name="properties.gridLine"></a>

### properties.gridLine : <code>object</code>
Grid lines settings.

**Kind**: static property of [<code>properties</code>](#properties)  

* [.gridLine](#properties.gridLine) : <code>object</code>
    * [.auto](#properties.gridLine.auto) : <code>boolean</code>
    * [.spacing](#properties.gridLine.spacing) : <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code>

<a name="properties.gridLine.auto"></a>

#### gridLine.auto : <code>boolean</code>
Automatic grid line spacing.

**Kind**: static property of [<code>gridLine</code>](#properties.gridLine)  
**Default**: <code>true</code>  
<a name="properties.gridLine.spacing"></a>

#### gridLine.spacing : <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code>
Grid line spacing. Used only when auto is set to false.

**Kind**: static property of [<code>gridLine</code>](#properties.gridLine)  
**Default**: <code>2</code>  
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
<a name="properties.sorting.autoSort"></a>

#### sorting.autoSort : <code>true</code>
Sort automatically

**Kind**: static property of [<code>sorting</code>](#properties.sorting)  
**Default**: <code>true</code>  
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

