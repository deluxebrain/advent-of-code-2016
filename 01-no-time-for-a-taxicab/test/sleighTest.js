'use strict';

const chai = require('chai');
const should = chai.should();
const sleigh = require('../app/sleigh.js');

describe('sleigh', () => {

  it('stays put when not moved', () => {
    sleigh.move('').should.equal(0);
  });

  it('can calculate distance for single movement', () => {
    sleigh.move('R1').should.equal(1);
  });

  it('can calculate distance for compound movement', () => {
    sleigh.move('L2, R300').should.equal(302);
  });

  it('stops when visits first place twice', () => {
    sleigh.move('R2, L1, L1, L1, L1, L1').should.equal(2);
  });
});
