const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;

const JS_SRC_DIR = 'src/js/';
const JS_OUTPUT_DIR = 'public/js/';
const JS_OUTPUT_FILE = 'visseria.min.js';

gulp.task('js', function () {
  return gulp.src([
      JS_SRC_DIR + 'util.js',
      JS_SRC_DIR + 'input_number.js',
      JS_SRC_DIR + 'select.js',
      JS_SRC_DIR + 'classes.js',
      JS_SRC_DIR + 'gear.js',
      JS_SRC_DIR + 'character.js',
      JS_SRC_DIR + 'app.js',
  ])
  .pipe(concat('visseria.js'))
  .pipe(rename(JS_OUTPUT_FILE))
  .pipe(uglify())
  .pipe(gulp.dest(JS_OUTPUT_DIR));
});
