var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// spinning up server
var browserSync = require('browser-sync'),
	php = require('gulp-connect-php');
// concatenate JS & CSS
var useref = require('gulp-useref');
// minify
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
// Optimizing Images
var imagemin = require('gulp-imagemin');



gulp.task('php', function(){
	php.server({base:"app",port:8080});
});

gulp.task('browserSync',['php'], function(){
	browserSync({
        proxy: '127.0.0.1:8080',
        port: 8080
    });
});

gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass()) //Converts Sass to css with gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
});


gulp.task('watch', ['browserSync','sass'], function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/**/*.php', browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});


gulp.task('default', ['watch']);

// gulp.task('useref',function() {
// 	// return gulp.src('app/*.php')
// 	return gulp.src('app/source/footer.php')
// 		.pipe(useref())
		
//     	.pipe(gulpIf('*.js', uglify()))
// 		.pipe(gulp.dest('dist'))
// });


// gulp.task('images', function(){
// 	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
// 	.pipe(imagemin())
// 	.pipe(gulp.dest('dist/images'))
// });














