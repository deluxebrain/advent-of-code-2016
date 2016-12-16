'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('test', function() {
  return gulp.src(['test/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'nyan'
    }))
    .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['test/*.js', 'app/*.js'], ['test']);
});
