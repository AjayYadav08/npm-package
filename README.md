# @ajayyadav08/file-size-utils

A zero-dependency JavaScript utility toolkit for formatting, parsing, converting, and comparing byte sizes.

## Installation

```bash
npm install @ajayyadav08/file-size-utils
```

## Quick Start

```javascript
import {
  formatBytes,
  parseBytes,
  convertBytes,
  getSizeInfo,
  compareSizes,
  isValidSize
} from '@ajayyadav08/file-size-utils';
```

## Core Methods

### `formatBytes(bytes, options)`
Converts raw bytes to human-readable strings.
- Options:
  - `decimals`: number of fractional digits (default: 2)
  - `binary`: when true, outputs binary units (KiB, MiB, GiB, etc.)

```javascript
formatBytes(1024); // "1 KB"
formatBytes(1536, { decimals: 2, binary: true }); // "1.50 KiB"
```

### `parseBytes(sizeString)`
Converts size strings into number of bytes.

```javascript
parseBytes('1.5 GB'); // 1610612736
parseBytes('5 mb');    // 5242880
```

### `convertBytes(bytes, targetUnit, options)`
Converts bytes into specific units such as `KB`, `MB`, `GB`.

```javascript
convertBytes(1048576, 'MB'); // 1
convertBytes(5000000, 'MB', { decimals: 3 }); // 4.768
```

### `getSizeInfo(bytes)`
Returns a metadata object with details for a given byte count.

```javascript
getSizeInfo(1536);
// { bytes: 1536, value: 1.5, unit: 'KB', formatted: '1.5 KB' }
```

### `compareSizes(a, b)`
Compares two sizes (numbers or string expressions).

```javascript
compareSizes('5 MB', '2 MB');
// { first: 5242880, second: 2097152, difference: 3145728, larger: 'first', smaller: 'second' }
```

### `isValidSize(input)`
Checks whether an input can be parsed as a valid size.

```javascript
isValidSize('500 KB'); // true
isValidSize(-100);     // false
```

## Testing

```bash
npm test
```

## License

MIT
