'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');

gulp.task('sass', function () {
  console.log('Llego a sass');
  return gulp.src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

/*
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});
*/

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./scss/*.scss', ['postcss']);
});

gulp.task('postcss', ['sass'], function() {
  var processors = [
    cssnano({
      preset: ['default', {"discardComments": {"removeAll": true}}]
    })
  ];

  return gulp.src('./css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['browserSync', 'sass', 'postcss']);
