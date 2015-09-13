var
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync');


var logError = function (error) {
	console.log(error.toString());
	this.emit('end');
};

var paths = {
	bower: './bower_components/',
	assets: './assets/',
	public: './public/'
};


gulp.task('default', ['watch']);

gulp.task('styles', function () {
	gulp.src(paths.bower + 'bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest(paths.public + 'css'));

	gulp.src(paths.assets + 'sass/**/*.scss')
		.pipe(concat('style.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', logError))
		.pipe(gulp.dest(paths.public + 'css'));
});

gulp.task('scripts', function () {
	gulp.src([
			paths.assets + 'js/modules/**/*.js',
			paths.assets + 'js/services/**/*.js',
			paths.assets + 'js/directives/**/*.js',
			paths.assets + 'js/routes/**/*.js',
			paths.assets + 'js/controllers/**/*.js'
		])
		.pipe(concat('app.js'))
		//.pipe(uglify().on('error', logError))
		.pipe(gulp.dest(paths.public + 'js'));
});

gulp.task('styles-watch', ['styles'], browserSync.reload);
gulp.task('scripts-watch', ['scripts'], browserSync.reload);

gulp.task('watch', function () {

	browserSync({
		server: {
			baseDir: 'public/'
		}
	});

	gulp.watch(paths.assets + 'sass/**/*.scss', ['styles-watch']);
	gulp.watch(paths.assets + 'js/**/*.js', ['scripts-watch']);
	gulp.watch(paths.public + '**/*.html').on('change', browserSync.reload);
});