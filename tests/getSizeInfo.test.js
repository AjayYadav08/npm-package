import test from 'node:test';
import assert from 'node:assert/strict';
import { getSizeInfo } from '../src/getSizeInfo.js';

test('getSizeInfo returns detailed breakdown of byte size', () => {
  assert.deepEqual(getSizeInfo(1048576), {
    bytes: 1048576,
    value: 1,
    unit: 'MB',
    formatted: '1 MB'
  });

  assert.deepEqual(getSizeInfo(1536), {
    bytes: 1536,
    value: 1.5,
    unit: 'KB',
    formatted: '1.5 KB'
  });

  assert.deepEqual(getSizeInfo(0), {
    bytes: 0,
    value: 0,
    unit: 'Bytes',
    formatted: '0 Bytes'
  });
});

test('getSizeInfo validates input types', () => {
  assert.throws(() => getSizeInfo(-10), /Expected a finite non-negative number/);
  assert.throws(() => getSizeInfo(NaN), /Expected a finite non-negative number/);
  assert.throws(() => getSizeInfo('1024'), /Expected a finite non-negative number/);
});
