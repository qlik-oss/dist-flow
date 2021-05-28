export default function isNumeric(v) {
  return !Number.isNaN(parseFloat(v)) && Number.isFinite(+v);
}
