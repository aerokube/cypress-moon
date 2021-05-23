'use strict';

const bin = require('.');

bin.run(['--version'])
  .then(() => {
    console.log('moon-cypress binary installed successfully.');
  })
  .catch(error => {
    console.log(`moon-cypress binary installation failed: ${error.message}`);
  });
