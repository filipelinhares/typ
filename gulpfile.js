var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var clean        = require('gulp-clean');

gulp.task('compile', function () {
  return gulp.src('src/*.scss')
         .pipe(sass())
         .pipe(autoprefixer())
         .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function () {
  return gulp.src('dist/')
         .pipe(clean({force: true}))
});

gulp.task('min', ['compile', 'clean'], function () {
  return gulp.src('dist/*.css')
         .pipe(csso())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['compile', 'min']);
