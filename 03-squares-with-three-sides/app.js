'use strict';

const part1 = require('./part1.js');
const fs = require('fs')

var data = fs.readFileSync('./triangles.txt', 'utf-8');
const solution = part1.solve(data);

console.log(solution);
