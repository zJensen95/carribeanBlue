var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('app/web/assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/web/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
		
});

gulp.task('useref', function() {
	return gulp.src('app/templates/**/*.html')
		.pipe(useref())
		.pipe(gulp.dest('dist/web/assets'))
})

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/web/assets/**/*.scss', ["sass"]);
	gulp.watch('app/web/assets/**/*.js', browserSync.reload);
	gulp.watch('app/templates/**/*.html', browserSync.reload);
})

gulp.task('browserSync', function() {
	browserSync.init({
		proxy: 'localhost/cb/app/web'
	})
})