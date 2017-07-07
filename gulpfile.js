var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		autoprefixer = require('gulp-autoprefixer'),
		pug = require('gulp-pug'),
		cssnano = require('gulp-cssnano'),
		imagemin = require('gulp-imagemin');

gulp.task('pug', function buildHTML() {
	return gulp.src('app/templates/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('css', () =>
	gulp.src('app/css/*.css')
		.pipe(gulp.dest('dist/css'))
);

gulp.task('img-min', () =>
	gulp.src('app/img/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng({ optimizationLevel: 15 }),
			imagemin.svgo({ plugins: [{ removeViewBox: true }] })
		]))
		.pipe(gulp.dest('dist/img'))
);

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		port: 8080,
		open: true,
		notify: true
	});
});

gulp.task('build-css', () =>
	gulp.src('app/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 8 versions'],
			cascade: true
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
);

gulp.task('watch', ['pug','css', 'browser-sync'], function () {
	gulp.watch('app/css/**/*.css', ['css']);
	gulp.watch('app/templates/*.pug', ['pug']);
	gulp.watch('dist/css/**/*.css', browserSync.reload);
	gulp.watch('dist/*.html', browserSync.reload);
});