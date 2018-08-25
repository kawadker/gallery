var gulp = require('gulp'),
  create = require('gulp-cordova-create'),
  version = require('gulp-cordova-version');
var del = require('del');


gulp.task('default', function () {
  return gulp.src('')
    .pipe(version(require('./package.json').version));
});

gulp.task('build-web', function () {
  return del([
    'dist/assets/Android',
    'dist/assets/iOS',
  ]);

});
