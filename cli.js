#!/usr/bin/env node

'use strict';

const { spawn } = require('child_process');
const moonCypress = require('.');

const input = process.argv.slice(2);

spawn(moonCypress, input, { stdio: 'inherit' })
  .on('exit', process.exit);
