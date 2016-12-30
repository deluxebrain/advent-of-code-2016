'use strict';

const part1 = require('./part1');
const fs = require('fs');

const triangles = fs.readFileSync('triangles.txt', 'utf-8');
console.log(part1.solve(triangles));
