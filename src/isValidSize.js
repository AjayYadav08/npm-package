import { parseBytes } from './parseBytes.js';

export function isValidSize(size) {
  if (typeof size === 'number') {
    return !Number.isNaN(size) && Number.isFinite(size) && size >= 0;
  }

  if (typeof size === 'string') {
    try {
      parseBytes(size);
      return true;
    } catch {
      return false;
    }
  }

  return false;
}
