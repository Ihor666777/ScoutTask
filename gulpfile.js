var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');


//livereload task
gulp.task('livereload', function(){
  browserSync.init({
    server: 'src/'
  })
  gulp.watch('src/*.html');
  gulp.watch("src/scripts/*.js");
  gulp.watch("src/styles/*.css");
  gulp.watch("src/scripts/*.js").on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/styles/*.css').on('change', browserSync.reload);
})

gulp.task('default', ['livereload']);

