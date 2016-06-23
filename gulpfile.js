var gulp = require('gulp'),               // 載入 gulp
    gulpUglify = require('gulp-uglify'),  // 載入 gulp-uglify
    gulpSass = require('gulp-sass'),      // 載入 gulp-sass
    gulpPlumber = require('gulp-plumber'),// 載入 gulp-plumber
    gulpLivereload = require('gulp-livereload'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync');

gulp.task('watch', function () {
    gulpLivereload.listen();

    gulp.watch('**/*.html').on('change', function () {
        browserSync.reload();
    });

    gulp.watch('js/original/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['styles']);
});

gulp.task('connect-sync', function() {
    connect.server({}, function (){
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });
 
  
});

gulp.task('script', function () {
    gulp.src('js/original/*.js')        // 指定要處理的原始 JavaScript 檔案目錄
        .pipe(gulpPlumber())                    // 使用 gulp-plumber 處理例外
        .pipe(gulpUglify())                     // 將 JavaScript 做最小化
        .pipe(gulp.dest('js/minify'))  // 指定最小化後的 JavaScript 檔案目錄
        .pipe(gulpLivereload());                // 當檔案異動後自動重新載入頁面
});

gulp.task('styles', function () {
    gulp.src('scss/*.scss')    // 指定要處理的 Scss 檔案目錄
        .pipe(gulpPlumber())      // 使用 gulp-plumber 處理例外
        .pipe(gulpSass({          // 編譯 Scss
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('css'))  // 指定編譯後的 css 檔案目錄
        .pipe(gulpLivereload());  // 當檔案異動後自動重新載入頁面
});

gulp.task('default', ['connect-sync','styles', 'script', 'watch']);
