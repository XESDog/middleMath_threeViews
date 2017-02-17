var gulp = require('gulp');
var pug = require('gulp-pug');//html模版
var uglify = require('gulp-uglify');//压缩js
var babel = require('gulp-babel');//es6->es2015
var sass = require('gulp-sass');

gulp.task('default', ['uglify', 'sass', 'copy'], function () {



});
gulp.task('uglify', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'));
});
gulp.task('sass', function () {
    gulp.src('./src/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dest/css/'))
});
gulp.task('copy', function () {
    gulp.src('./src/html/**/*.html')
        .pipe(gulp.dest('./dest/html/'));
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dest/'));
});