'use strict';

var browserify = require('browserify');
var gulp       = require('gulp');
var transform  = require('vinyl-transform');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
  var browserified = transform(function(filename) {
    var b = browserify({entries: filename, debug: true});
    return b.bundle();
  });

  return gulp.src('./src/scripts/app.js')
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts/'));
});
