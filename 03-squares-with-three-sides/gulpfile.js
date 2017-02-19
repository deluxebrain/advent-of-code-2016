'use strict'

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

gulp.task('test', () =>
    gulp.src(['*_tests.js'], {
        read: false
    })
    .pipe(mocha({
        reporter: 'nyan'
    }))
    .on('error', gutil.log)
);

gulp.task('watch', () =>
    gulp.watch(['*.js'], ['test'])
);
