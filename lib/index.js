'use strict';

const path = require('path');
const BinWrapper = require('bin-wrapper');
const { moonVersion } = require('../package.json');

const baseUrl = `https://aerokube-dev.fra1.digitaloceanspaces.com/cypress-moon/${moonVersion}/`;
const dest = path.join(__dirname, '../vendor');

const binNameMap = {
    darwin: {
        arm64: 'cypress-moon_darwin_arm64',
        x64: 'cypress-moon_darwin_amd64'
    },
    linux: {
        x64: 'cypress-moon_linux_amd64'
    },
    win32: {
        ia32: 'cypress-moon_windows_386.exe',
        x64: 'cypress-moon_windows_amd64.exe'
    }
};

const binName = (binNameMap[process.platform] && binNameMap[process.platform][process.arch]) || '';
let bw = new BinWrapper();
for (let os in binNameMap) {
    for (let arch in binNameMap[os]) {
        bw = bw.src(`${baseUrl}${binNameMap[os][arch]}`, os, arch);
    }
}

module.exports = bw
    .dest(dest)
    .use(binName);
