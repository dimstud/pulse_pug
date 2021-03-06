const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const del = require('del');
const fs = require('fs');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Таск для сборки Gulp файлов
gulp.task('pug', function(callback) {
	return gulp.src('./src/pug/pages/**/*.pug')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Pug',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe( pug({
			pretty: true
		}) )
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe( gulp.dest('./dist/') )
		.pipe( browserSync.stream() )
	callback();
});

// Таск для компиляции sass в CSS
gulp.task('sass', function(callback) {
	return gulp.src('./src/sass/style.sass')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
				title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe( sourcemaps.init() )
		.pipe( sass() )
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./dist/css/') )
		.pipe( browserSync.stream() )
	callback();
});

// Копирование CSS
gulp.task('copy:css', function(callback) {
	return gulp.src('./src/css/**/*.*')
		.pipe(gulp.dest('./dist/css/'))
	callback();
});
// Копирование Изображений
gulp.task('copy:img', function(callback) {
	return gulp.src('./src/img/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'))
	callback();
});

// Копирование Mailer
gulp.task('copy:mailer', function(callback) {
	return gulp.src('./src/mailer/**/*.*')
		.pipe(gulp.dest('./dist/mailer/'))
	callback();
});

// Копирование Шрифты
gulp.task('copy:fonts', function(callback) {
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./dist/fonts/'))
	callback();
});

// Копирование Скриптов
gulp.task('copy:js', function(callback) {
	return gulp.src('./src/js/**/*.*')
		.pipe(gulp.dest('./dist/js/'))
	callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {

	// Следим за картинками и скриптами и обновляем браузер
	watch( ['./dist/js/**/*.*', './dist/img/**/*.*'], gulp.parallel(browserSync.reload) );

	// Запуск слежения и компиляции sass с задержкой
	watch('./src/sass/**/*.sass', function(){
		setTimeout( gulp.parallel('sass'), 500 )
	})

	// Слежение за PUG и сборка
	watch(['./src/pug/**/*.pug', './html-data.json'], gulp.parallel('pug'))

	// Следим за картинками и скриптами, и копируем их в dist
	watch('./src/img/**/*.*', gulp.parallel('copy:img'))
	watch('./src/js/**/*.*', gulp.parallel('copy:js'))

});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		}
	})
});

gulp.task('clean:dist', function() {
	return del('./dist')
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task(
		'default', 
		gulp.series( 
			gulp.parallel('clean:dist'),
			gulp.parallel('sass', 'pug','copy:fonts', 'copy:img', 'copy:css', 'copy:js', 'copy:mailer'), 
			gulp.parallel('server', 'watch'), 
			)
	);