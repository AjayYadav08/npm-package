import { UNIT_FACTORS } from './constants.js';

export function parseBytes(size) {
  if (typeof size !== 'string') {
    throw new TypeError('Expected a string input for size');
  }

  const trimmed = size.trim();
  if (trimmed.length === 0) {
    throw new Error('Input size string cannot be empty');
  }

  const match = trimmed.match(/^([+-]?\d+(?:\.\d+)?)\s*([a-zA-Z]+)?$/);
  if (!match) {
    throw new Error(`Invalid file size format: "${size}"`);
  }

  const rawValue = parseFloat(match[1]);
  if (Number.isNaN(rawValue) || !Number.isFinite(rawValue) || rawValue < 0) {
    throw new RangeError('File size value must be a non-negative finite number');
  }

  const rawUnit = (match[2] || 'b').toLowerCase();
  const factor = UNIT_FACTORS[rawUnit];

  if (factor === undefined) {
    throw new Error(`Unsupported or unknown file size unit: "${match[2]}"`);
  }

  return Math.round(rawValue * factor);
}
