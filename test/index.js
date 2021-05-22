/* eslint-env mocha */

'use strict';

const assert = require('assert');
const binCheck = require('bin-check');
const moonCypress = require('..');

describe('moon-cypress', () => {
  it('should return path to binary and work', () => {
    return binCheck(moonCypress, ['--help']).then(works => {
      assert(works);
    });
  });
});
