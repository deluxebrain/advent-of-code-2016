'use strict';

const chai = require('chai');
const should = chai.should();
const heredoc = require('heredoc');
const R = require('ramda');
const part1 = require('./part1');

describe('smoke test', () => {
  it('should pass', () => {
    true.should.be.true;
  });
});

describe('part 1', () => {
  const triangles = heredoc.strip(() => {
    /*
      883  357  185
      572  189  424
      842  206  272
       */
  });
  it('can parse triangle', () => {
    part1.parse(triangles.split('\n')[0]).should.deep.equal([
      [883, 357, 185]
    ]);
  });

  it('can parse triangles', () => {
    part1.parse(triangles).should.deep.equal([
      [883, 357, 185],
      [572, 189, 424],
      [842, 206, 272]
    ]);
  });

  it('can find all permutations of edges', () => {
    part1.findPermutations([3, 4, 5]).should.deep.equal([
      [3, 4, 5],
      [3, 5, 4],
      [4, 3, 5],
      [4, 5, 3],
      [5, 3, 4],
      [5, 4, 3]
    ]);
  });

  {
    const data = [
      [
        [3, 4, 5], true
      ],
      [
        [5, 10, 25], false
      ]
    ];

    R.forEach(([triangle, is_valid]) => {
      return it('can calculate triangle validity', () => part1.isValidTriangle(triangle).should.equal(is_valid));
    }, data);

    it('can find valid triangles', () => part1.findValidTriangles(R.map(R.head, data)).should.deep.equal([
      [3, 4, 5]
    ]));

    xit('can find number of valid triangles', () => part1.solve(R.map(R.head, data)).should.equal(1));
  }
});
