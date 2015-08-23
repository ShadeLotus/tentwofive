var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
	scripts: [
		'bower_components/progressbar.js/dist/progressbar.js',
		'bower_components/moment/moment.js',
		'bower_components/favico.js/favico.js',
		'assets/piecon.js',
		'assets/main.js'
	],
	styles: [
		'assets/main.css'
	]
};
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'));
});
gulp.task('minify-css', function() {
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'));
});
gulp.task('default', ['scripts', 'minify-css']);
