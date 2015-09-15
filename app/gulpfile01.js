var gulp = require('gulp'),

    // run a webserver (with LiveReload)
    connect = require('gulp-connect'),
    // compass = require('gulp-compass'),
    // 合併並且壓縮js檔案
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


// 創建一個web server(命名為server)，同時使用livereload
gulp.task('server', function(){
  connect.server({
    livereload: true
  });
});

// gulp.task('default',['server'],function(){});
gulp.task('default', ['connect']);

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});



// gulp.task('html', ['server', 'watch']);



// 合併並且壓縮js檔案
gulp.task('js',function(){
    gulp.src('./js/*.js')
      .pipe(concat('app.js')) //將所有js合併成app.js
      .pipe(uglify()) //壓縮js
      .pipe(gulp.dest('./dist/js/'))
});

gulp.task('default',['js'], function(){
  // 其他task預設不執行，可以透過default預先載入
  gulp.watch('./js/*',['js']);  //監聽js
});







// min css
// gulp.task('compass',function(){
//   gulp.src('./sass/*.sass')
//   .pipe(compass())
//   .pipe(gulp.dest('./css'))
//   .pipe(connect.reload());
// });
//
// gulp.task('default',['server','compass'],function(){
//   gulp.watch('./sass/*',['compass']);
// })
