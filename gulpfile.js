var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');

function watchSass(){
  gulp.watch('./src/scss/*',copy)
}

function sync(done){
  browserSync.init({
    server:{
      baseDir:'./build'
    },
    port:3000
  });
  done();
}

function browserReload(done){
  browserSync.reload();
  done();
}

function watchFiles(){
  gulp.watch('./src/scss/**/*',copy);
gulp.watch('./src/scss/**/*',browserReload);
  //gulp.watch('.//*.html',buildHTML);
  gulp.watch('./**/*.html',browserReload);
  gulp.watch('./**/*.js',browserReload);
}

function buildComponents(){
    //.pipe(fileinclude())
   return gulp.src('./src/html/components/*.html')
    .pipe(gulp.dest('./build/html/'))//path.build.html))
    .pipe(browserSync.stream());
    //.pipe(console.log("buildComponents DONE"));
  //done();
}

function buildPages(){
   return gulp.src('./src/html/**/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./build/html/'))
    .pipe(browserSync.stream());
}

function buildPagesFull(){
   return gulp.src('./src/html/fullPages/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./build/html/fullPages/'))
    .pipe(browserSync.stream());
}

function copy(){
  // gulp.src('./src/scss/**/*.scss')
  //   .pipe(sass({
  //     errorLogToConsole: true
  //   }))
  //   .on('eroor', console.error.bind(console))
  //   .pipe(gulp.dest('./build/css/'))
  //   .pipe(browserSync.stream());
  //
  //   console.log('Update scss->css');
  // done();
  return gulp.src('./src/scss/pages/*.scss')
    .pipe(sass({
      errorLogToConsole: true
    }))
    .on('eroor', console.error.bind(console))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());

}

function includeMy(done) {
  gulp.src(['./build/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'));
  done();
}

function html(){
  console.log("func html: buildComponents DONE");
  console.log("func html: buildPages DONE");
  return gulp.src('./src/index.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

gulp.task('default2', gulp.parallel(sync,watchFiles,html));
//gulp.task('default', gulp.parallel(sync,watchFiles,html));
gulp.task('buildComp',buildComponents);
gulp.task('buildPg',buildPages);
gulp.task('buildPgF',buildPagesFull)
gulp.task('buildScss',copy)
gulp.task('default',gulp.series("buildScss","buildComp","buildPg","buildPgF",gulp.parallel(sync,watchFiles,html)))
