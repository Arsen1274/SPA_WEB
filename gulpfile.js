var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');

function copy(done){
  gulp.src('./src/scss/*.scss')
    .pipe(sass({
      errorLogToConsole: true
    }))
    .on('eroor', console.error.bind(console))
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());

    console.log('Update scss->css');
  done();
}


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
  gulp.watch('./**/*.html',buildHTML);
//  gulp.watch('./**/*.html',browserReload);
  gulp.watch('./**/*.js',browserReload);
}

function buildHTML(done) {
  return gulp.src('./src/pug/**/*.pug')
  .pipe(pug({
    pretty:true
  }))
  .pipe(gulp.dest('./build'))
  browserSync.reload();
done();

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
  return gulp.src('./src/index.html')//path.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest('./build'))//path.build.html))
    .pipe(browserSync.stream());
}

gulp.task('default',gulp.parallel(sync,watchFiles,buildHTML,html));

//exit watchSacc
//gulp.task(copy);
