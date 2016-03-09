var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var shrink = require('gulp-cssshrink');
var del = require('del');

var postCSSArray = [
  require('autoprefixer')(),
  require('cssnext')(),
  require('postcss-reporter')(),
];

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('postcss', ['clean'], function () {
  return gulp.src(['lib/typ.css', 'lib/typ-rhythm.css'])
    .pipe(postcss(postCSSArray))
    .pipe(gulp.dest('dist/'))
});

gulp.task('min', ['postcss'], function () {
    return gulp.src(['dist/typ.css', 'dist/typ-rhythm.css'])
    .pipe(shrink())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
  gulp.watch('lib/*.css', ['postcss']);
});

gulp.task('default', ['postcss', 'min'] )
