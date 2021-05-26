/**
 * Generate a 32 bit integer hash code from a string
 */
export default function hashFromString(str) {
  let hash = 0;

  if (!str || !str.length) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    /* eslint-disable no-bitwise */
    hash = (hash << 5) - hash + chr;
    hash &= hash;
    /* eslint-enable no-bitwise */
  }
  return hash;
}
