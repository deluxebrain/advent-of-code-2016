'use strict';

const R = require('ramda');
const chai = require('chai');
const should = chai.should();
const heredoc = require('heredoc');
const solver = require('./part1.js');

const triangles = heredoc.strip(() => {
  /*
  883 357 185
  572 189 424
  842 206 272
  */
});

describe('smoke test', () =>
  it('should pass', () =>
    true.should.be.true
  )
);

describe('parser', () => {

  it('can parse a single triangle representation', () =>
    solver.parse('5 10 25').should.deep.equal([
      [5, 10, 25]
    ])
  );

  it('can parse a collection of triangle representations', () => {


    solver.parse(triangles).should.deep.equal([
      [883, 357, 185],
      [572, 189, 424],
      [842, 206, 272]
    ]);
  });
});

describe('utility functions', () => {
  it('can shift right an array', () =>
    solver.shiftR([1, 2, 3]).should.deep.equals([2, 3, 1]))

  it('can shift right an array twice', () =>
    solver.shiftR(solver.shiftR([1, 2, 3])).should.deep.equals([3, 1, 2])
  );

  it('can form permutations of an array', () =>
    solver.formPerms([1, 2, 3]).should.deep.equal([
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2]
    ]));
});

describe('solver', () => {

  it('can idenitfy an invalid triangle', () =>
    solver.isValidTriangle([5, 10, 25]).should.be.false);

  it('can identify a valid triangle', () =>
    solver.isValidTriangle([3, 4, 5]).should.be.true);

  it('can get count of valid triangles', () =>
    solver.solve(triangles).should.equal(1));
});
