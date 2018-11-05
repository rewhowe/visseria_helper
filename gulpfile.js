const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');

const JS_SRC_DIR = 'src/js/';
const JS_OUTPUT_DIR = 'public/js/';
const JS_OUTPUT_FILE = 'visseria';

gulp.task('js', function () {
  return gulp.src([
      JS_SRC_DIR + 'util.js',
      JS_SRC_DIR + 'input_number.js',
      JS_SRC_DIR + 'select.js',
      JS_SRC_DIR + 'gear.js',
      JS_SRC_DIR + 'classes.js',
      JS_SRC_DIR + 'character.js',
      JS_SRC_DIR + 'character/*.js',
      JS_SRC_DIR + 'app.js',
  ])
  .pipe(concat(JS_OUTPUT_FILE + '.js'))
  .pipe(rename(JS_OUTPUT_FILE + '.min.js'))
  .pipe(uglify()).on('error', (e) => console.log(e))
  .pipe(gulp.dest(JS_OUTPUT_DIR));
});

const CSS_SRC_DIR = 'src/css/';
const CSS_OUTPUT_DIR = 'public/css/';
const CSS_OUTPUT_FILE = 'visseria';

gulp.task('css', function () {
  return gulp.src([
      CSS_SRC_DIR + 'app.css',
      CSS_SRC_DIR + 'classes.css',
  ])
  .pipe(concat(CSS_OUTPUT_FILE + '.css'))
  .pipe(rename(CSS_OUTPUT_FILE + '.min.css'))
  .pipe(uglifycss())
  .pipe(gulp.dest(CSS_OUTPUT_DIR));
});
