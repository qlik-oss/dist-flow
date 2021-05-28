export default function isInteger(v) {
  return !Number.isNaN(parseInt(v, 10)) && parseFloat(v, 10) === parseInt(v, 10);
}
