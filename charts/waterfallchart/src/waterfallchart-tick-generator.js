import { scaleLinear } from 'd3-scale';

const SENSE_PICASSO_SPACING_COEFFICIENT = 100;

const tickGenerator = {
  getMinorTicks({ majorTicks, minorTickCount }) {
    const minor = [];
    for (let i = 0; i < majorTicks.length - 1; i++) {
      const start = majorTicks[i];
      const end = majorTicks[i + 1];
      const step = (end - start) / (minorTickCount + 1);

      for (let c = 1; c <= minorTickCount; c++) {
        minor.push(start + step * c);
      }
    }

    return minor;
  },

  // Adjust ticks: a) add minor ticks at two ends, if neccessary,
  //               b) add set min and/or set max
  // For simplicity, only consider minorTickCount == 1
  adjustTicks({ ticks, majorTicks, minorTicks, autoMinMax, minMax, min, max }) {
    // a) add minor ticks at two ends, if neccessary,
    const d = minorTicks[0] - majorTicks[0];
    const deltaMin = majorTicks[0] - min;
    if (deltaMin > d) ticks.unshift({ value: majorTicks[0] - d, isMinor: true });
    const deltaMax = max - majorTicks[majorTicks.length - 1];
    if (deltaMax > d) ticks.push({ value: majorTicks[majorTicks.length - 1] + d, isMinor: true });
    if (autoMinMax) return ticks;

    // b) add set min and/or set max
    if ((minMax === 'min' || minMax === 'minMax') && deltaMin > 0) {
      ticks.unshift({ value: min, isMinor: false });
    }
    if ((minMax === 'max' || minMax === 'minMax') && deltaMax > 0) {
      ticks.push({ value: max, isMinor: false });
    }
    return ticks;
  },

  getTicks({ layout, height }) {
    const { autoMinMax, minMax, spacing } = layout.measureAxis;
    let min = Math.min(...layout.generated.qHyperCube.qMeasureInfo.map((measure) => measure.qMin));
    let max = Math.max(...layout.generated.qHyperCube.qMeasureInfo.map((measure) => measure.qMax));
    if (!autoMinMax) {
      switch (minMax) {
        case 'min':
          min = layout.measureAxis.min;
          break;
        case 'max':
          max = layout.measureAxis.max;
          break;
        case 'minMax':
          ({ min, max } = layout.measureAxis);
          break;
        default:
          break;
      }
    }
    const distance = SENSE_PICASSO_SPACING_COEFFICIENT * spacing;
    const count = Math.max(1, Math.round(height / distance));

    const scale = scaleLinear().domain([min, max]);
    const majorTicks = scale.ticks(count);
    const minorTicks = tickGenerator.getMinorTicks({ majorTicks, minorTickCount: 1 });

    // Generate an array of tick objects following the format defined by picasso
    const ticks = [
      ...majorTicks.map((value) => ({ value, isMinor: false })),
      ...minorTicks.map((value) => ({ value, isMinor: true })),
    ].sort((a, b) => a.value - b.value);
    return tickGenerator.adjustTicks({ ticks, majorTicks, minorTicks, autoMinMax, minMax, min, max });
  },
};

export default tickGenerator;
