import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidSize } from '../src/isValidSize.js';

test('isValidSize returns true for valid sizes', () => {
  assert.equal(isValidSize(1024), true);
  assert.equal(isValidSize('5 MB'), true);
  assert.equal(isValidSize('500 KB'), true);
  assert.equal(isValidSize(0), true);
  assert.equal(isValidSize('0 B'), true);
  assert.equal(isValidSize('1.5 GB'), true);
});

test('isValidSize returns false for invalid sizes and types', () => {
  assert.equal(isValidSize(-100), false);
  assert.equal(isValidSize('abc'), false);
  assert.equal(isValidSize('5 XYZ'), false);
  assert.equal(isValidSize(''), false);
  assert.equal(isValidSize(null), false);
  assert.equal(isValidSize(undefined), false);
  assert.equal(isValidSize(NaN), false);
  assert.equal(isValidSize(Infinity), false);
  assert.equal(isValidSize({}), false);
});
