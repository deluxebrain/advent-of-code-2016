'use strict';

const _ = require('lodash');

const keypadMaps = {
  'square': {
    'map': [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9']
    ],
    'start': '5'
  },
  'diamond': {
    'map': [
      [, , '1', , ],
      [, '2', '3', '4', ],
      ['5', '6', '7', '8', '9'],
      [, 'A', 'B', 'C', ],
      [, , 'D', , ]
    ],
    'start': '5'
  }
};

const commandMap = {
  'U': (keypad, [x, y]) => !_.isEmpty(keypad[y - 1]) && !_.isEmpty(keypad[y - 1][x]) ? [x, y - 1] : [x, y],
  'D': (keypad, [x, y]) => !_.isEmpty(keypad[y + 1]) && !_.isEmpty(keypad[y + 1][x]) ? [x, y + 1] : [x, y],
  'L': (keypad, [x, y]) => _.isEmpty(keypad[y][x - 1]) ? [x, y] : [x - 1, y],
  'R': (keypad, [x, y]) => _.isEmpty(keypad[y][x + 1]) ? [x, y] : [x + 1, y]
};

function tokenise(commands) {
  return _.chain(_.split(commands, '\n'))
    .compact()
    .reduce((sum, n) => {
      return _.concat(sum, [_.split(n, '')]);
    }, [])
    .value();
}

function solve(commands, map) {
  const curriedResolvePosition = _.curry(resolvePosition)(keypadMaps[map].map);
  const curriedSolveLine = _.curry(solveLine)(keypadMaps[map]);
  return _.chain(commands)
    .tokenise()
    .reduce((position, commands) => {
      return _.concat(curriedSolveLine(commands, _.head(position)), position);
    }, [])
    .reverse()
    .join('')
    .value();
}

function solveLine(keypad, commands, number) {
  if (_.isEmpty(commands)) return number;
  if (_.isEmpty(number)) number = keypad.start;
  const newNumber = resolvePosition(keypad.map, commandMap[_.head(commands)](keypad.map, indexOfKey(number, keypad.map)));
  return solveLine(keypad, _.tail(commands), newNumber);
}

function resolvePosition(keypadMap, [x, y]) {
  return keypadMap[y][x];
}

function indexOfKey(key, keypad, row = 0) {
  if (_.isEmpty(keypad)) return -1;
  const index = _.indexOf(_.head(keypad), key);
  if (index !== -1) return [index, row];
  return indexOfKey(key, _.tail(keypad), ++row);
}

_.mixin({
  tokenise: tokenise
});

module.exports.tokenise = tokenise;
module.exports.solve = solve;
