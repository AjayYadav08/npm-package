import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBytes,
  parseBytes,
  convertBytes,
  getSizeInfo,
  compareSizes,
  isValidSize
} from '../src/index.js';

test('index exports all 6 core utilities correctly', () => {
  assert.equal(typeof formatBytes, 'function');
  assert.equal(typeof parseBytes, 'function');
  assert.equal(typeof convertBytes, 'function');
  assert.equal(typeof getSizeInfo, 'function');
  assert.equal(typeof compareSizes, 'function');
  assert.equal(typeof isValidSize, 'function');
});

test('end-to-end usage integration test', () => {
  const bytes = parseBytes('5 MB');
  assert.equal(bytes, 5242880);

  const formatted = formatBytes(bytes);
  assert.equal(formatted, '5 MB');

  const converted = convertBytes(bytes, 'KB');
  assert.equal(converted, 5120);

  const info = getSizeInfo(bytes);
  assert.equal(info.unit, 'MB');
  assert.equal(info.value, 5);

  const comparison = compareSizes('5 MB', '2 MB');
  assert.equal(comparison.larger, 'first');

  assert.equal(isValidSize('500 KB'), true);
  assert.equal(isValidSize(-50), false);
});
