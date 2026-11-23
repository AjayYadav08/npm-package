import { UNIT_FACTORS } from './constants.js';

export function parseBytes(size) {
  if (typeof size !== 'string') {
    throw new TypeError('Expected a string input for size');
  }

  const str = size.trim();
  if (!str) {
    throw new Error('Input size string cannot be empty');
  }

  const match = str.match(/^([+-]?\d+(?:\.\d+)?)\s*([a-zA-Z]+)?$/);
  if (!match) {
    throw new Error(`Invalid file size format: "${size}"`);
  }

  const num = parseFloat(match[1]);
  if (Number.isNaN(num) || !Number.isFinite(num) || num < 0) {
    throw new RangeError('File size value must be a non-negative finite number');
  }

  const unit = (match[2] || 'b').toLowerCase();
  const factor = UNIT_FACTORS[unit];

  if (!factor) {
    throw new Error(`Unsupported or unknown file size unit: "${match[2]}"`);
  }

  return Math.round(num * factor);
}
