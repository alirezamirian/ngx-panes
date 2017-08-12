const gulp = require('gulp');

gulp.task('watch-api-docs', ['api-docs'], watchApiDocs);

function watchApiDocs() {
  gulp.watch('lib/**/*.ts', ['api-docs']);
}
