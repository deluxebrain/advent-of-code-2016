'use strict';

const bathroom = require('./app/bathroom.js');
const fs = require('fs');

const commands = fs.readFileSync('commands.txt', 'utf8');
console.log(bathroom.solve(commands, 'square'));
console.log(bathroom.solve(commands, 'diamond'));
