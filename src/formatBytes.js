import { METRIC_UNITS, BINARY_UNITS } from './constants.js';

export function formatBytes(bytes, options = {}) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError('Expected a finite non-negative number for bytes');
  }

  const { decimals = 2, binary = false } = options;
  if (typeof decimals !== 'number' || decimals < 0 || !Number.isInteger(decimals)) {
    throw new RangeError('Decimals option must be a non-negative integer');
  }

  const base = binary ? 1024 : 1024;
  const unitList = binary ? BINARY_UNITS : METRIC_UNITS;

  if (bytes === 0) {
    return `0 ${unitList[0]}`;
  }

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(base)),
    unitList.length - 1
  );

  const rawValue = bytes / Math.pow(base, exponent);
  const formattedNumber = options.decimals !== undefined
    ? rawValue.toFixed(decimals)
    : String(parseFloat(rawValue.toFixed(2)));

  return `${formattedNumber} ${unitList[exponent]}`;
}
