'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var pugInheritance = require('yellfy-pug-inheritance');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync').create();
var nib = require('nib');

var reload = browserSync.reload;

gulp.task('copy', function() {
  return gulp.src([
    'src/fonts/*.{woff,woff2}',
    'src/img/**',
    'src/js/**'
  ], {
    base: './src'
  })
    .pipe(gulp.dest('build'));
});

// SCSS COMPILATOR
gulp.task('style', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(csscomb())
    .pipe(gulp.dest('build/css'))
    .pipe(minify({
      restructure: false
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('beautify', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(csscomb())
    .pipe(gulp.dest('src/sass'));
});

let pugInheritanceCache = {};

// WATCH TASK
gulp.task('watch', () => {
  global.watch = true;
  browserSync.init(['build/css/*.css', 'build/*.html'], {
      server: './build/'
  });
  gulp.watch(['src/sass/**/*.scss'], gulp.series('style'));
  gulp.watch(['src/pug/**/*.pug'], gulp.series('pug'))
    .on('all', (event, filepath) => {
      global.changedTempalteFile = filepath.replace(/\\/g, '/');
    });
    gulp.watch('build/*.html').on('change', reload);
});

// PUG GENERATING, CHANGES CHECK
function pugFilter(file, inheritance) {
  const filepath = `src/pug/${file.relative}`;
  if (inheritance.checkDependency(filepath, global.changedTempalteFile)) {
    console.log(`Compiling: ${filepath}`);
    return true;
  }
  return false;
}

// PUG GENERATING
gulp.task('pug', () => {
  return new Promise((resolve, reject) => {
    const changedFile = global.changedTempalteFile;
    const options = {
      changedFile,
      treeCache: pugInheritanceCache
    };

    pugInheritance.updateTree('src/pug', options).then((inheritance) => {
      // Save cache for secondary compilationswatch
      pugInheritanceCache = inheritance.tree;

      return gulp.src('src/pug/*.pug')
        .pipe(gulpif(global.watch, filter((file) => pugFilter(file, inheritance))))
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('build'))
        .on('error', console.log)
        .on('end', resolve);
    });
  });
});

gulp.task('default', gulp.series('pug', 'style', 'copy', 'watch'));
