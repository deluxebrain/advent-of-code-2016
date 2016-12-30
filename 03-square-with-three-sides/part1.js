'use strict';

const R = require('ramda');

// parse :: String -> [[a]]
function parse(data) {
  const parseLine = R.pipe(
    R.trim,
    R.split(/\s+/),
    R.map(parseInt));

  const parseParagraph = R.pipe(
    R.split('\n'),
    R.reject(R.isEmpty),
    R.map(parseLine));

  return parseParagraph(data);
}

// findPermutations :: [a] -> [[a]]
const findPermutations = (tokens, subperms = [
  []
]) => {
  if (R.isEmpty(tokens)) return subperms;

  return R.addIndex(R.chain)((token, idx) =>
    findPermutations(R.remove(idx, 1, tokens),
      R.map(R.append(token), subperms)), tokens);
};

// isValidTriangle :: [a] -> Boolean
const isValidTriangle = triangle => {
  return R.pipe(
      findPermutations,
      R.all(([head, ...tail]) => R.sum(tail) > head))
    (triangle);
};

// findValidTriangles :: [[a]] -> [[a]]
const findValidTriangles = triangles => {
  return R.filter(isValidTriangle, triangles);
};

// solve :: String -> Integer
const solve = triangles => {
  return R.pipe(
    parse,
    findValidTriangles,
    R.length)(triangles);
};

module.exports.parse = parse;
module.exports.findPermutations = findPermutations;
module.exports.isValidTriangle = isValidTriangle;
module.exports.findValidTriangles = findValidTriangles;
module.exports.solve = solve;
