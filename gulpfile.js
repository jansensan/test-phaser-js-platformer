// include gulp and plugins
var gulp = require('gulp'),
    requireDir = require('require-dir');


// require tasks directory
requireDir('./lib/tasks', {recurse: true});


/**
 *  Main Tasks
 */
gulp.task('build', ['dev:build']);
gulp.task('serve', ['serve:dev']);


/**
 *  Development Sub Tasks
 */
gulp.task('dev:build', [
  // 'clean:dest',
  // 'lint',
  // 'copy:vendors',
  // 'build:js',
  // 'jade:index'
  'copy:vendors'
]);