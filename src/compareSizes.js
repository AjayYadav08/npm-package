import { parseBytes } from './parseBytes.js';

function normalizeToBytes(val, label) {
  if (typeof val === 'number') {
    if (Number.isNaN(val) || !Number.isFinite(val) || val < 0) {
      throw new TypeError(`Expected ${label} to be a finite non-negative number or valid size string`);
    }
    return val;
  }
  if (typeof val === 'string') {
    return parseBytes(val);
  }
  throw new TypeError(`Expected ${label} to be a number or size string`);
}

export function compareSizes(a, b) {
  const first = normalizeToBytes(a, 'first');
  const second = normalizeToBytes(b, 'second');
  const difference = Math.abs(first - second);

  let larger = 'equal';
  let smaller = 'equal';

  if (first > second) {
    larger = 'first';
    smaller = 'second';
  } else if (second > first) {
    larger = 'second';
    smaller = 'first';
  }

  return {
    first,
    second,
    difference,
    larger,
    smaller
  };
}
