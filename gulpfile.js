var gulp = require('gulp'),
    // php server & livereload
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    // minify js
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // minify css
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');;


// open pbp webserver & livereload
gulp.task('connect-sync', function() {
  connect.server({}, function (){
    browserSync({
      proxy: 'localhost:8000'
    });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});


// minify js
gulp.task('js',function() {
  gulp.src('./js/*.js')
    .pipe(concat('app.js')) //let all js file into app.js
    .pipe(uglify()) //minify js
    .pipe(rename({
          suffix: '.min'
      }))
    .pipe(gulp.dest('./js'))
});

// minify css
gulp.task('minify-css', function() {
  gulp.src('./css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({
          suffix: '.min'
      }))
    .pipe(gulp.dest('./css'))
});


gulp.task('default', ['connect-sync','minify-css','js'],function() {
  gulp.watch('./js/*',['js']); //監聽js file
});
