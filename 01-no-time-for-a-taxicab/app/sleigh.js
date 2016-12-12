'use strict';

const pattern = require('matches').pattern;
const _ = require('lodash');

const origin = [0, 0, 0];

const parseMap = pattern({
  '"R", x': (x) => {
    return [90, parseInt(x, 10)];
  },
  '"L", x': (x) => {
    return [-90, parseInt(x, 10)];
  }
});

const moveMap = pattern({
  '0, position, distance': ([x, y], distance) => {
    return [0, x, y + distance];
  },
  '90, position, distance': ([x, y], distance) => {
    return [90, x + distance, y];
  },
  '180, position, distance': ([x, y], distance) => {
    return [180, x, y - distance];
  },
  '270, position, distance': ([x, y], distance) => {
    return [270, x - distance, y];
  },
});

const executeMap = pattern({
  '[], [head, ...tail]': (head) => {
    return head;
  },
  'commands': (commands) => {
    return executeMap(commands, [origin]);
  },
  '[head, ...tail], [head, ...tail]': ([rotate, move], commands, current_position, visited) => {
    if (!_.chain(visited)
      .map((position) => _.slice(position, 1))
      .find((position) => _.isEqual(_.slice(current_position, 1), position))
      .isEmpty()
      .value()) return current_position;

    return executeMap(commands,
      _.concat([moveMap(
        calcuateHeading(current_position, rotate),
        _.slice(current_position, 1), move)], [current_position], visited));
  }
});

function move(value) {
  return _.chain(_.split(value, ', '))
    .map(_.trim)
    .compact()
    .map(token => parseMap(token[0], _.chain(_.slice(token, 1).join('')).value()))
    .execute()
    .slice(1)
    .reduce(function(sum, n) {
      return sum + Math.abs(n);
    }, 0)
    .value();
}

function calcuateHeading([bearing], rotation) {
  var heading = (bearing + rotation) % 360;
  if (heading < 0) heading = 360 + heading;
  return heading;
}

_.mixin({
  execute: executeMap,
});

module.exports.move = move;
