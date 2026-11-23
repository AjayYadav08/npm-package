import test from 'node:test';
import assert from 'node:assert/strict';
import { compareSizes } from '../src/compareSizes.js';

test('compareSizes compares string size expressions correctly', () => {
  const result = compareSizes('5 MB', '2 MB');
  assert.deepEqual(result, {
    first: 5242880,
    second: 2097152,
    difference: 3145728,
    larger: 'first',
    smaller: 'second'
  });
});

test('compareSizes compares numeric byte sizes correctly', () => {
  const result = compareSizes(500, 1000);
  assert.deepEqual(result, {
    first: 500,
    second: 1000,
    difference: 500,
    larger: 'second',
    smaller: 'first'
  });
});

test('compareSizes handles equal sizes correctly', () => {
  const result = compareSizes('1 MB', '1024 KB');
  assert.deepEqual(result, {
    first: 1048576,
    second: 1048576,
    difference: 0,
    larger: 'equal',
    smaller: 'equal'
  });
});

test('compareSizes throws on invalid inputs', () => {
  assert.throws(() => compareSizes('invalid', '1 MB'), /Invalid file size format/);
  assert.throws(() => compareSizes(-10, 100), /Expected first to be a finite non-negative number/);
  assert.throws(() => compareSizes(100, null), /Expected second to be a number or size string/);
});
