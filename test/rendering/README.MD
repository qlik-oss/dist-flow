# Note

There is slight difference between fonts rendered on CircleCI
and on local dev (MacOS). So if tests are run locally some will fail.

Here is how you do it:

- Step 1: run `pnpm test:rendering:ci`

# Tests Histogram

-histogram_with_others:
color set

-histogram_basic_1:
color set,
value labels on,
frequency label changed

-histogram_basic_2:
range set,
axis changed to other side,
gridline spacing changed

-histogram_basic_3:
all axes removed,
gridlines removed,
value labels on

# Tests Dist_plot

-distplot_with_others:
two dimensions,
dimension limit on both

-distplot_basic_1:
1 Dimension,
null value displayed,
others displayed,
ref line outside

-distplot_basic_2:
1 Dimension,
null value off,
others displayed,
ref line outside,
jitter turned on,
points only

-distplot_basic_3:
2 Dimension,
ref line,
jitter turned on,
points only,
color by dimension,
x and y axis removed

-distplot_basic_4:
2 Dimension,
ref line outside,
y axis range data outside

-distplot_basic_5:
2 Dimension,
color by expression,
jitter on,
points size changed

# Tests Box_plot

-boxplot_basic_1:
1 dimension,
outliers displayed,
horizontal

-boxplot_basic_2:
1 dimension,
outliers removed,
vertical,
whiskers removed,
box color,
ref line

-boxplot_basic_3:
1 dimension,
outliers added,
horizontal,
whiskers removed,
box color,
outlier color,
ref line

-boxplot_basic_4:
2 dimension,
sorted by box end,
outlier color,
ref line,
layered labels

-boxplot_basic_5:
2 dimension,
whiskers removed,
outlier removed,
color by expression,
ref line,
no labels or title on x or y axis

-boxplot_basic_6:
2 dimension,
color by box,
ref line outside data area,
max min range set,
outside arrows seen,

# Tests Waterfall

-Waterfall_basic:
3 measures,
negative scale

-Waterfall_basic_1:
5 measures,
addtotal added,
measure with add,
measure with sub,
measure with subtotal

-Waterfall_basic_2:
5 measures,
addtotal added,
measure with add,
measure with sub,
measure with subtotal,
different colors,
layered labels,
nagative scale,
legend on bottom

-Waterfall_basic_3:
1 measures,
measure with subtotal,
horizontal labels,
x-axis on top,
y-axis to the right
legend to left
