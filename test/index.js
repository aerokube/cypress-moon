/* eslint-env mocha */

'use strict';

const assert = require('assert');
const binCheck = require('bin-check');
const cypressMoon = require('..');

describe('cypress-moon', () => {
    it('should return path to binary and work', async () => {
        const outputPath = await cypressMoon();
        return binCheck(outputPath, ['--version']).then(works => {
            assert(works);
        });
    });
});
