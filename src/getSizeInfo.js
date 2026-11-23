import { METRIC_UNITS } from './constants.js';

export function getSizeInfo(bytes) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError('Expected a finite non-negative number for bytes');
  }

  if (bytes === 0) {
    return {
      bytes: 0,
      value: 0,
      unit: METRIC_UNITS[0],
      formatted: `0 ${METRIC_UNITS[0]}`
    };
  }

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    METRIC_UNITS.length - 1
  );

  const rawValue = bytes / Math.pow(1024, exponent);
  const value = parseFloat(rawValue.toFixed(2));
  const unit = METRIC_UNITS[exponent];

  return {
    bytes,
    value,
    unit,
    formatted: `${value} ${unit}`
  };
}
