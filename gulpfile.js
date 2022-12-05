'use strict';

const gulp = require('gulp');
const gzip = require('gulp-gzip');
const brotli = require('gulp-brotli');

const fileGlob = ['./dist/**/*.js', './dist/**/*.css'];
const outPath = './dist';

gulp.task('compress', ['brotli'], function() {
  gulp.src(fileGlob)
    .pipe(gzip({ gzipOptions: { level: 9 } }))
    .pipe(gulp.dest(outPath));
});

gulp.task('brotli', function() {
  return gulp.src(fileGlob)
    .pipe(brotli.compress({
      extension: 'brotli',
      skipLarger: true,
      mode: 0,
      quality: 11,
      lgblock: 0
    }))
    .pipe(gulp.dest(outPath));
});
