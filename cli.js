#!/usr/bin/env node

'use strict';

const {spawn} = require('child_process');
const cypressMoon = require('.');
const input = process.argv.slice(2);

(async () => {
    try {
        const binPath = await cypressMoon();
        spawn(binPath, input, {stdio: 'inherit'})
            .on('exit', process.exit);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();


