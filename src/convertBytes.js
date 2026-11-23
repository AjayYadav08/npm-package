import { UNIT_FACTORS } from './constants.js';

export function convertBytes(bytes, targetUnit, options = {}) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError('Expected a finite non-negative number for bytes');
  }

  if (typeof targetUnit !== 'string' || targetUnit.trim().length === 0) {
    throw new TypeError('Expected a valid unit string');
  }

  const normalizedUnit = targetUnit.trim().toLowerCase();
  const factor = UNIT_FACTORS[normalizedUnit];
  if (factor === undefined) {
    throw new Error(`Unsupported or unknown unit: "${targetUnit}"`);
  }

  const { decimals = 2 } = options;
  if (typeof decimals !== 'number' || decimals < 0 || !Number.isInteger(decimals)) {
    throw new RangeError('Decimals option must be a non-negative integer');
  }

  const converted = bytes / factor;
  return parseFloat(converted.toFixed(decimals));
}
