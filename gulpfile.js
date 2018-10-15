var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var $ = require('gulp-load-plugins')();

const cssDest = "web/assets/css";
const cssProduction = 'dist/assets/css';

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		.pipe($.autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('app/' + cssDest))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('images', function() { 
	return gulp.src('app/web/assets/images')
		.pipe($.cache($.imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/web/assets/images'))
});

gulp.task('fonts', function() {
	return gulp.src('app/web/assets/fonts')
		.pipe(gulp.dest('dist/web/assets/fonts'))
});

gulp.task('javaBuild', function() {
	return gulp.src('app/web/assets/**/*.js')
		.pipe(gulp.uglify())
		.pipe(gulp.dest('dist/web/assets/js'))
});

gulp.task('cssBuild', function() {
	return gulp.src('app/web/assets/**/*.css')
		.pipe(gulp.cssnano())
		.pipe(gulp.dest('dist/web/assets/css'))
});

gulp.task('htmlBuild', function() {
	return gulp.src('app/templates/*')
		.pipe(gulp.dest('dist/web/templates'))
});

gulp.task('build', function(callback) {
	runSequence(
		['javaBuild', 'cssBuild', 'images', 'fonts'],
		callback
	)
});

gulp.task('browserSync', function() {
	browserSync.init({
		proxy: 'http://localhost/cb/app/web'
	})
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/templates/**/*.html').on("change", browserSync.reload);
	gulp.watch('web/assets/js/**/*.js').on("change", browserSync.reload);
});

gulp.task('default', function(callback) {
	runSequence(['sass','browserSync','watch'])
	callback
});