# LittleTest

> A little testing library.

## Installation

```shell
npm install --save-dev littletest

# or via yarn
yarn add --dev littletest
```

## Usage

```js
import { describe } from 'littletest';

describe('My Test Suite', it => {
    it('Should run some tests.', expect => {
        expect(true).to.equal(true);
        expect(false).not.to.equal(true);

        expect({ x: [4] }).to.deep.equal({ x: [4] });
        expect(null).to.weak.equal(undefined)
    });
});
```
