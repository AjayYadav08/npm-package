import { METRIC_UNITS, BINARY_UNITS } from './constants.js';

export function formatBytes(bytes, options = {}) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError('Expected a finite non-negative number for bytes');
  }

  const { decimals = 2, binary = false } = options;
  if (typeof decimals !== 'number' || decimals < 0 || !Number.isInteger(decimals)) {
    throw new RangeError('Decimals option must be a non-negative integer');
  }

  const units = binary ? BINARY_UNITS : METRIC_UNITS;

  if (bytes === 0) {
    return `0 ${units[0]}`;
  }

  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, i);
  const formatted = options.decimals !== undefined
    ? value.toFixed(decimals)
    : String(parseFloat(value.toFixed(2)));

  return `${formatted} ${units[i]}`;
}
