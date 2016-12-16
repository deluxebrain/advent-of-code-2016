'use strict';

const _ = require('lodash');

const data = [
  [, , '1', , ],
  [, '2', '3', '4', ],
  ['5', '6', '7', '8', '9'],
  [, 'A', 'B', 'C', ],
  [, , 'D', , ]

];

function indexOf(element, data, row = 0) {
  if (_.isEmpty(data)) return -1;

  const index = _.indexOf(_.head(data), element);
  if (index === -1) return indexOf(element, _.tail(data), ++row);
  return [index, row];
}

var indexOfx = _.curry(indexOf)('5');

console.log(indexOfx(data));
