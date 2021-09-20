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
    }).timeout(60000);
    it('should work with local binary path', async () => {
        process.env.CYPRESS_MOON_BINARY = 'test/test-script.js';
        const outputPath = await cypressMoon();
        return binCheck('node', [outputPath]).then(works => {
            assert(works);
        });
    });
});
