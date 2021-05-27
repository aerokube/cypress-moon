'use strict';

const bin = require('.');

bin.run(['--version'])
  .then(() => {
    console.log('cypress-moon binary installed successfully.');
  })
  .catch(error => {
    console.log(`cypress-moon binary installation failed: ${error.message}`);
  });
