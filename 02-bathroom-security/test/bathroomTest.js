'use strict';

const _ = require('lodash');
const chai = require('chai');
const should = chai.should();
const bathroom = require('../app/bathroom.js');
const heredoc = require('heredoc');


describe('square keypad', () => {

  const commands = heredoc.strip(() => {
    /*
          ULL
          RRDDD
          LURDL
          UUUUD
          */
  });

  it('can tokenise multiline commands into nested array', () => {
    bathroom.tokenise(commands).should.eql([
      ['U', 'L', 'L'],
      ['R', 'R', 'D', 'D', 'D'],
      ['L', 'U', 'R', 'D', 'L'],
      ['U', 'U', 'U', 'U', 'D']
    ]);
  });

  {
    const data = [
      ['ULL', '1'],
      ['RRDDD', '9'],
      ['LURDL', '4'],
      ['UUUUD', '5']
    ];
    _(data).forEach(([command, position]) => it('can process a single line', () => {
      bathroom.solve(command, 'square').should.equal(position);
    }));
  }

  {
    const data = [
      [commands, '1985']
    ];
    _(data).forEach(([command, position]) => it('can process multiple lines', () => {
      bathroom.solve(command, 'square').should.equal(position);
    }));
  }
});

describe('diamond keypad', () => {

  const commands = heredoc.strip(() => {
    /*
          ULL
          RRDDD
          LURDL
          UUUUD
          */
  });

  {
    const data = [
      [commands, '5DB3']
    ];
    _(data).forEach(([command, position]) => it('can process multiple lines', () => {
      bathroom.solve(command, 'diamond').should.equal(position);
    }));
  }
});
