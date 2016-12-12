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
  '0, position, distance': function([x, y], distance) {
    return _.chain(_.range(distance))
      .map(step => [0, x, y + step + 1])
      .reverse()
      .value();
  },
  '90, position, distance': function([x, y], distance) {
    return _.chain(_.range(distance))
      .map(step => [90, x + step + 1, y])
      .reverse()
      .value();
  },
  '180, position, distance': function([x, y], distance) {
    return _.chain(_.range(distance))
      .map(step => [180, x, y - step - 1])
      .reverse()
      .value();
  },
  '270, position, distance': function([x, y], distance) {
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
  '[head, ...tail], positions': ([rotate, move], commands, positions) => {

    const movements = moveMap(calcuateHeading(_.head(positions), rotate), _.slice(_.head(positions), 1), move);

    var done = _.chain(movements)
      .intersectionWith(positions, (a, b) => _.isEqual(_.slice(a, 1), _.slice(b, 1)))
      .head()
      .value();
    if (!_.isEmpty(done)) return done;

    return executeMap(commands,
      _.concat(movements, positions));
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
