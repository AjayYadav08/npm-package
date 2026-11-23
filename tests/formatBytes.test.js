import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes } from '../src/formatBytes.js';

test('formatBytes formats standard byte sizes accurately', () => {
  assert.equal(formatBytes(0), '0 Bytes');
  assert.equal(formatBytes(500), '500 Bytes');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(1048576), '1 MB');
  assert.equal(formatBytes(1073741824), '1 GB');
});

test('formatBytes respects options for decimals and binary units', () => {
  assert.equal(formatBytes(1536, { decimals: 2, binary: true }), '1.50 KiB');
  assert.equal(formatBytes(1048576, { binary: true }), '1 MiB');
  assert.equal(formatBytes(1536, { decimals: 3 }), '1.500 KB');
});

test('formatBytes handles validation errors appropriately', () => {
  assert.throws(() => formatBytes(-1), /Expected a finite non-negative number/);
  assert.throws(() => formatBytes(NaN), /Expected a finite non-negative number/);
  assert.throws(() => formatBytes(Infinity), /Expected a finite non-negative number/);
  assert.throws(() => formatBytes('1024'), /Expected a finite non-negative number/);
  assert.throws(() => formatBytes(1024, { decimals: -1 }), /Decimals option must be a non-negative integer/);
});
