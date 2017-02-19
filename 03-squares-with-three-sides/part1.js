'use strict';

const R = require('ramda');
const split = R.split;
const pipe = R.pipe;
const map = R.map;
const reject = R.reject;
const isEmpty = R.isEmpty;
const splitAt = R.splitAt;
const reverse = R.reverse;
const flatten = R.flatten;

// parseTriangle :: a --> [a]
const parseTriangle = pipe(
  split(/\s+/),
  map(parseInt));

// parse :: a -> [[a]]
const parse = pipe(
  split('\n'),
  reject(isEmpty),
  map(parseTriangle));

// shiftR :: [a] --> [a]
const shiftR = pipe(
  splitAt(1),
  reverse,
  flatten);

// formPerms :: [a] -> [[a]]
const formPerms = (seed, perms = []) => {
  if (R.length(perms) == R.length(seed)) return perms;
  return formPerms(shiftR(seed), R.append(seed, perms));
}

// isValidTriangle :: [a] -> boolean
const isValidTriangle =
  R.pipe(
    formPerms,
    R.all(
      R.converge(
        R.lt, [R.head, R.pipe(R.tail, R.sum)])));

const getCountOfValidTriangles =
  R.pipe(
    R.filter(isValidTriangle),
    R.length);

const solve =
  R.pipe(
    parse,
    getCountOfValidTriangles);

module.exports.parse = parse;
module.exports.isValidTriangle =
  isValidTriangle;
module.exports.shiftR = shiftR;
module.exports.formPerms = formPerms;
module.exports.solve = solve;
