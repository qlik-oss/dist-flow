/** @jsx h */

function getStyle(dock, rect) {
  const style = {
    pointerEvents: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#7b7a78',
    fontStyle: 'italic',
    fontSize: '13px',
  };

  switch (dock) {
    case 'left':
      style.width = `${rect.height}px`;
      style.transform = `rotate(-90deg) translate(-${rect.height}px, 0)`;
      style.transformOrigin = 'top left';
      break;

    case 'right':
      style.width = `${rect.height}px`;
      style.transform = `rotate(90deg) translate(0, -${rect.width}px)`;
      style.transformOrigin = 'top left';
      break;

    case 'center':
      style.width = `${rect.width}px`;
      style.height = `${rect.height}px`;
      style.color = '#595959';
      style.fontStyle = 'normal';
      style.fontSize = '1.2em';
      style.textAlign = 'center';
      break;

    default:
    case 'top':
    case 'bottom':
      style.justifyContent = 'flex-start';
      style.alignItems = 'flex-start';
      break;
  }
  return style;
}

export default {
  renderer: 'dom',
  disableTriggers: true,
  preferredSize: function preferredSize() {
    return 22;
  },
  render(h) {
    const {
      settings: { label, rtl },
      layout: { dock },
    } = this.settings;
    const dir = (dock === 'top' || dock === 'bottom') && rtl ? 'rtl' : 'ltr';
    const style = getStyle(dock, this.rect);

    const modifiedLabel = dock === 'center' ? label : `* ${label}`;

    const spanStyle = dock !== 'center' ? { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } : {};

    return (
      <div style={style} dir={dir}>
        <span ref={this.alignToRef} style={spanStyle} title={modifiedLabel}>
          {modifiedLabel}
        </span>
      </div>
    );
  },
};
