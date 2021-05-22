'use strict';

const path = require('path');
const BinWrapper = require('bin-wrapper');
const { moonVersion } = require('../package.json');

const baseUrl = `https://github.com/aerokube/moon-cypress/releases/download/${moonVersion}/`;
const dest = path.join(__dirname, '../vendor');
const isWindows = process.platform === 'win32';
const binName = isWindows ? 'moon-cypress.exe' : 'moon-cypress';

module.exports = new BinWrapper()
    .src(`${baseUrl}moon-cypress_darwin_amd64`, 'darwin', 'x64')
    .src(`${baseUrl}moon-cypress_linux_amd64`, 'linux', 'x64')
    .src(`${baseUrl}moon-cypress_windows_amd64`, 'win32', 'x64')
    .src(`${baseUrl}moon-cypress_windows_386`, 'win32', 'x86')
    .dest(dest)
    .use(binName);
