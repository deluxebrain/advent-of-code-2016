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
    return _.chain(_.range(distance))
      .map(step => [0, x, y + step + 1])
      .reverse()
      .value();
  },
  '90, position, distance': ([x, y], distance) => {
    return _.chain(_.range(distance))
      .map(step => [90, x + step + 1, y])
      .reverse()
      .value();
  },
  '180, position, distance': ([x, y], distance) => {
    return _.chain(_.range(distance))
      .map(step => [180, x, y - step - 1])
      .reverse()
      .value();
  },
  '270, position, distance': ([x, y], distance) => {
    return _.chain(_.range(distance))
      .map(step => [270, x - step - 1, y])
      .reverse()
      .value();
  }
});

const executeMap = pattern({
  '[], [head, ...tail]': (head) => {
    return head;
  },
  'commands': (commands) => {
    return executeMap(commands, [origin]);
  },
  '[head, ...tail], [head, ...tail]': ([rotate, move], commands, current_position, visited) => {
    const movements = moveMap(calcuateHeading(current_position, rotate), _.slice(current_position, 1), move);
    const history = _.concat([current_position], visited);

    var intersection = _.chain(movements)
      .intersectionWith(history, (a, b) => _.isEqual(_.slice(a, 1), _.slice(b, 1)))
      .value();
    if (!_.isEmpty(intersection)) {
      return intersection[0];
    }

    return executeMap(commands,
      _.concat(movements, history));
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
