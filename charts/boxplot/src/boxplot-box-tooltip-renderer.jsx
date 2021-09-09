/** @jsx h */

import rtlUtils from '@qlik/common/extra/rtl-util';

const { detectTextDirection: getDirection } = rtlUtils;

const NR_COLUMNS = 5;
const BOX_COLOR = '#FFF';

const lineStyle = {
  position: 'absolute',
  left: '6px',
  width: '1px',
  backgroundColor: BOX_COLOR,
  height: '50%',
};
const boxSyle = {
  position: 'absolute',
  width: '13px',
  backgroundColor: BOX_COLOR,
  zIndex: 10,
};
const whiskerStyle = {
  position: 'absolute',
  width: '5px',
  borderTop: `2px solid ${BOX_COLOR}`,
  left: 'calc(50% - 2.5px)',
  top: 'calc(50% - 2px)',
};
const fillerStyle = {
  position: 'absolute',
  width: '3px',
  borderTop: '2px solid rgba(255, 255, 255, 0.2)',
  left: 'calc(50% + 3.5px)',
  top: 'calc(50% - 2px)',
};
const medianStyle = {
  position: 'absolute',
  backgroundColor: '#404040',
  width: '13px',
  top: 'calc(50% - 2px)',
  height: '2px',
};

function createBoxCell(settings, index) {
  const { h } = settings;
  let divs;
  if (index === 0) {
    const whisker = <div style={whiskerStyle} />;
    const line = <div style={{ ...lineStyle, top: '50%', height: 'calc(50% + 2px)' }} />;
    const filler = <div style={fillerStyle} />;
    divs = [whisker, line, filler];
  } else if (index === 1) {
    const line = <div style={{ ...lineStyle, top: '-2px' }} />;
    const box = <div style={{ ...boxSyle, top: 'calc(50% - 2px)', height: 'calc(50% + 4px)' }} />;
    divs = [line, box];
  } else if (index === 2) {
    const median = <div style={medianStyle} />;
    const box1 = <div style={{ ...boxSyle, top: '-2px', height: 'calc(50%)' }} />;
    const box2 = <div style={{ ...boxSyle, top: '50%', height: 'calc(50% + 2px)' }} />;
    divs = [box1, median, box2];
  } else if (index === 3) {
    const box = <div style={{ ...boxSyle, top: '-2px', height: 'calc(50% + 2px)' }} />;
    const line = <div style={{ ...lineStyle, top: '50%', height: 'calc(50% + 2px)' }} />;
    divs = [box, line];
  } else if (index === 4) {
    const whisker = <div style={whiskerStyle} />;
    const line = <div style={{ ...lineStyle, top: '-2px' }} />;
    const filler = <div style={fillerStyle} />;
    divs = [whisker, line, filler];
  } else {
    throw new Error('error');
  }
  return <td style={{ width: '13px', position: 'relative' }}>{divs}</td>;
}
function createAlignCell(settings) {
  const { h } = settings;
  const style = {
    width: '25px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    zIndex: 1,
    position: 'absolute',
    left: '-4px',
    top: 'calc(50% - 2px)',
  };
  const div = <div style={style} />;
  return <td style={{ width: '15px', position: 'relative' }}>{div}</td>;
}
function createCircleCell(settings) {
  const { h } = settings;
  const style = {
    borderRadius: '8px',
    width: '4px',
    height: '4px',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 'calc(50% - 3px)',
  };
  const div = <div style={style} />;
  return <td style={{ width: '4px', position: 'relative' }}>{div}</td>;
}

function renderHeader(settings, header) {
  const { h, style, rtl } = settings;
  const headerStyle = {
    ...style.cell,
    fontWeight: 'bold',
    textAlign: rtl ? 'right' : 'left',
    direction: getDirection(header),
  };
  const row = (
    <tr>
      <td style={headerStyle} colSpan={NR_COLUMNS}>
        {header}
      </td>
    </tr>
  );
  return row;
}

function renderLabelCell(settings, label) {
  const { h, style, rtl } = settings;
  const labelStyle = { ...style.cell, direction: getDirection(label), textAlign: rtl ? 'right' : 'left' };
  const labelContent = rtl ? [':', label] : [label, ':'];
  const labelCell = <td style={labelStyle}>{labelContent}</td>;
  return labelCell;
}

function renderValueCell(settings, value) {
  const { h, style, rtl } = settings;
  const valueStyle = { ...style.cell, direction: getDirection(value), textAlign: rtl ? 'left' : 'right' };
  const valueCell = <td style={valueStyle}>{value}</td>;
  return valueCell;
}

function renderMeasureRow(settings, row, index) {
  const { h } = settings;
  const boxCell = createBoxCell(settings, index);
  const alignCell = createAlignCell(settings);
  const circleCell = createCircleCell(settings);
  const labelCell = renderLabelCell(settings, row.label);
  const valueCell = renderValueCell(settings, row.value);
  return <tr>{[boxCell, alignCell, circleCell, labelCell, valueCell]}</tr>;
}

function renderBox(settings, box) {
  const result = [];
  if (box.header) {
    result.push(renderHeader(settings, box.header));
  }
  box.rows.forEach((row, index) => {
    result.push(renderMeasureRow(settings, row, index));
  });
  return result;
}

function renderMoreIndicator(settings, content) {
  const { h, style, rtl, translator } = settings;
  const moreText = translator.get('Object.ChartTooltip.NMore', content.numberInExcess);
  const moreStyle = { ...style.cell, textAlign: rtl ? 'right' : 'left', direction: getDirection(moreText) };
  const row = (
    <tr>
      <td style={moreStyle} colSpan={NR_COLUMNS}>
        {moreText}
      </td>
    </tr>
  );
  return row;
}

export default function render(settings, content) {
  const result = [];
  content.forEach((box) => {
    result.push(...renderBox(settings, box));
  });
  if (content.numberInExcess) {
    result.push(renderMoreIndicator(settings, content));
  }
  return result;
}
