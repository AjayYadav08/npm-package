import test from 'node:test';
import assert from 'node:assert/strict';
import { convertBytes } from '../src/convertBytes.js';

test('convertBytes converts bytes into specified units correctly', () => {
  assert.equal(convertBytes(1048576, 'KB'), 1024);
  assert.equal(convertBytes(1048576, 'MB'), 1);
  assert.equal(convertBytes(1073741824, 'GB'), 1);
  assert.equal(convertBytes(5000000, 'MB'), 4.77);
  assert.equal(convertBytes(5000000, 'MB', { decimals: 3 }), 4.768);
});

test('convertBytes handles unit case-insensitivity and options', () => {
  assert.equal(convertBytes(2048, 'kb'), 2);
  assert.equal(convertBytes(1024, 'b'), 1024);
  assert.equal(convertBytes(1536, 'kb', { decimals: 1 }), 1.5);
});

test('convertBytes throws on invalid inputs', () => {
  assert.throws(() => convertBytes(-100, 'MB'), /Expected a finite non-negative number/);
  assert.throws(() => convertBytes(1024, 'XYZ'), /Unsupported or unknown unit/);
  assert.throws(() => convertBytes('1024', 'KB'), /Expected a finite non-negative number/);
  assert.throws(() => convertBytes(1024, 123), /Expected a valid unit string/);
});
