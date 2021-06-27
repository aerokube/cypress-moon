'use strict';

const cypressMoon = require('.');

(async () => {
    try {
        const outputPath = await cypressMoon();
        console.log(`Executable successfully saved to ${outputPath}.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
