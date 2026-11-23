import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBytes } from '../src/parseBytes.js';

test('parseBytes parses valid file size strings', () => {
  assert.equal(parseBytes('1 KB'), 1024);
  assert.equal(parseBytes('1 MB'), 1048576);
  assert.equal(parseBytes('1.5 GB'), 1610612736);
  assert.equal(parseBytes('500 B'), 500);
  assert.equal(parseBytes('2 TB'), 2199023255552);
  assert.equal(parseBytes('0 B'), 0);
  assert.equal(parseBytes('100'), 100);
});

test('parseBytes handles case-insensitivity properly', () => {
  assert.equal(parseBytes('5 mb'), 5242880);
  assert.equal(parseBytes('5 MB'), 5242880);
  assert.equal(parseBytes('5 Mb'), 5242880);
  assert.equal(parseBytes('10 kb'), 10240);
  assert.equal(parseBytes('1.5 gb'), 1610612736);
});

test('parseBytes rejects invalid inputs and edge cases', () => {
  assert.throws(() => parseBytes(''), /Input size string cannot be empty/);
  assert.throws(() => parseBytes('invalid'), /Invalid file size format/);
  assert.throws(() => parseBytes('10 XYZ'), /Unsupported or unknown file size unit/);
  assert.throws(() => parseBytes('-5 MB'), /File size value must be a non-negative finite number/);
  assert.throws(() => parseBytes(null), /Expected a string input/);
  assert.throws(() => parseBytes(1024), /Expected a string input/);
});
