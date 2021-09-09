/** @jsx h */
import rtlUtils from '../../extra/rtl-util';

const { detectTextDirection: getDirection } = rtlUtils;

export default function render(settings, content) {
  const { h, style, translator, rtl } = settings;
  const result = [];
  const labelTextAlign = rtl ? 'right' : 'left';
  content.forEach((item) => {
    if (item.header) {
      const headerStyle = {
        ...style.cell,
        textAlign: labelTextAlign,
        fontWeight: 'bold',
        direction: getDirection(item.header),
      };
      result.push(
        <tr>
          <td style={headerStyle} colSpan={2}>
            {item.header}
          </td>
        </tr>
      );
    }
    item.rows.forEach((row) => {
      let valueContent = row.value;
      if (row.color) {
        const symbolStyle = {
          display: 'inline-block',
          width: 10,
          height: 10,
          'background-color': row.color,
          margin: '0 8px',
        };
        const symbol = <div style={symbolStyle} />;
        valueContent = rtl ? [row.value, symbol] : [symbol, row.value];
      }
      const label = rtl ? [':', row.label] : [row.label, ':'];
      const labelStyle = { ...style.cell, textAlign: labelTextAlign, direction: getDirection(row.label) };
      const valueStyle = { ...style.cell, textAlign: rtl ? 'left' : 'right', direction: getDirection(row.value) };
      result.push(
        <tr>
          <td style={labelStyle}>{label}</td>
          <td style={valueStyle}>{valueContent}</td>
        </tr>
      );
    });
  });
  if (content.numberInExcess) {
    const moreText = translator.get('Object.ChartTooltip.NMore', content.numberInExcess);
    const moreStyle = { ...style.cell, textAlign: labelTextAlign, direction: getDirection(moreText) };
    result.push(
      <tr>
        <td style={moreStyle} colSpan={2}>
          {moreText}
        </td>
      </tr>
    );
  }
  return result;
}
