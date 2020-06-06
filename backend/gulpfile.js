const gulp = require('gulp');
const { exec } = require('child_process');

const compile = function (done) {
  exec('tsc -p tsconfig.json', function (error, stdOut, stdErr) {
    if (error) {
      done(error);
    } else {
      done();
    }
  });
}

const copy = function () {

  return gulp.src('src/**', { ignore: ['src/**/*.ts', 'src/**/*.json'] })
    .pipe(gulp.dest('./dist'));
}

const build = gulp.series(compile, copy);

module.exports = {
  compile,
  build,
  default: gulp.series(build)
}
