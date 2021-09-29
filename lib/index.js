'use strict';

const path = require('path');
const fs = require('fs');
const {https} = require('follow-redirects');
const {moonVersion} = require('../package.json');

async function cypressMoon() {
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

    const {
        platform,
        arch
    } = process;
    const binName = (binNameMap[platform] && binNameMap[platform][arch]) || '';
    if (binName === '') {
        await Promise.reject(new Error(`Unsupported platform or architecture: ${platform} ${arch}`));
    }

    const outputPath = path.join(dest, binName);
    await fs.promises.mkdir(dest, {recursive: true});
    const cypressMoonMirror = process.env.npm_config_CYPRESS_MOON_MIRROR;
    const binaryUrlOverride = process.env.CYPRESS_MOON_BINARY
    const binaryUrlIsLocalPath = await fileExists(binaryUrlOverride);
    if (binaryUrlIsLocalPath) {
        console.log(`Using local binary from ${binaryUrlOverride}...`);
        await fs.promises.copyFile(binaryUrlOverride, outputPath);
    }
    const exists = await fileExists(outputPath);
    if (!exists) {
        let url
        if (cypressMoonMirror) {
            url = `${cypressMoonMirror}/${moonVersion}/${binName}`
        } else if (binaryUrlOverride) {
            url = binaryUrlOverride
        } else {
            url = `https://github.com/aerokube/moon/releases/download/${moonVersion}/${binName}`;
        }
        console.log(`Downloading binary from ${url}...`);
        await downloadFile(url, outputPath);
        await fs.promises.chmod(outputPath, 0o755);
    }
    return outputPath;
}

async function fileExists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}

async function downloadFile(url, outputPath) {
    return new Promise(function (resolve, reject) {
        const file = fs.createWriteStream(outputPath);
        const req = https.get(url, resp => {
            if (resp.statusCode < 200 || resp.statusCode > 303) {
                reject(new Error(`Failed to download binary. Status code ${resp.statusCode}.`));
            }
            resp.on('data', function (chunk) {
                file.write(chunk);
            });
            resp.on('end', function () {
                file.close();
                resolve(true);
            });
        }).on('error', err => {
            reject(new Error(`Failed to download binary: ${err}`));
        });
        req.end();
    });
}

module.exports = cypressMoon;
