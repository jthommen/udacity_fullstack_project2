var gulp = require ('gulp');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');

var imgInputPath = 'images_src/*.+(png|jpg|jpeg|gif|svg)';
var imgOutputPath = 'images';


gulp.task('scripts', function() {
    return gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('scripts/min'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('styles', function() {
    return gulp.src('styles/*.css')
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('styles/min'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('htmlreload', function() {
    return gulp.src('*.html')
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        port: 8000
    })
});

gulp.task('imgCompress', function() {
    return gulp.src(imgInputPath)
        .pipe(imagemin())
        .pipe(gulp.dest(imgOutputPath))
});

gulp.task('imgLarge', function() {
    return gulp.src('images_src/*')
    .pipe(responsive({
        '*': {
            width: 1200,
            rename: {suffix: '-large'},
        },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
      withoutEnlargement: false,
    }))
        .pipe(gulp.dest(imgOutputPath));
});

gulp.task('imgMedium', function() {
    return gulp.src('images_src/*')
    .pipe(responsive({
        '*': {
            width: 800,
            rename: {suffix: '-medium'},
        },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
      withoutEnlargement: false,
    }))
        .pipe(gulp.dest(imgOutputPath));
});

gulp.task('imgSmall', function() {
    return gulp.src('images_src/*')
    .pipe(responsive({
        '*': {
            width: 400,
            rename: {suffix: '-small'},
        },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
      withoutEnlargement: false,
    }))
        .pipe(gulp.dest(imgOutputPath));
});

gulp.task('imgResponsive', ['imgLarge', 'imgMedium', 'imgSmall']);

gulp.task ('watch', ['browserSync', 'scripts', 'styles'], function() {
    gulp.watch('scripts/*.js', ['scripts']);
    gulp.watch('styles/*.css', ['styles']);
    gulp.watch('*.html', ['htmlreload']);
});