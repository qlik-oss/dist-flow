export default function render(settings, content) {
  const { h, style, translator } = settings;
  const result = [];
  content.forEach((item) => {
    if (item.header) {
      const attributes = {
        style: { ...style.cell, fontWeight: 'bold' },
        colspan: 2,
      };
      const cell = h('td', attributes, item.header);
      const row = h('tr', {}, [cell]);
      result.push(row);
    }
    item.rows.forEach((row) => {
      const labelCell = h('td', { style: style.cell }, [row.label, ':']);
      let valueContent = row.value;
      if (row.color) {
        const symbol = h('div', {
          style: {
            display: 'inline-block',
            width: 10,
            height: 10,
            'background-color': row.color,
            margin: '0 8px',
          },
        });
        valueContent = [symbol, row.value];
      }
      const valueCell = h('td', { style: { ...style.cell, textAlign: 'right' } }, valueContent);
      result.push(h('tr', {}, [labelCell, valueCell]));
    });
  });
  if (content.numberInExcess) {
    const attributes = {
      style: style.cell,
      colspan: 2,
    };
    const cell = h('td', attributes, translator.get('Object.ChartTooltip.NMore', content.numberInExcess));
    const row = h('tr', {}, [cell]);
    result.push(row);
  }
  return result;
}
