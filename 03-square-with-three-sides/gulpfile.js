'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('test', function() {
  return gulp.src(['*_test.js'], {
    read: false
  }).pipe(mocha({
    reporter: 'nyan'
  })).on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['*_test.js', 'part*.js'], ['test']);
});
