var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

function copy(done){
  gulp.src('./scss/**/*.scss')
    .pipe(sass({
      errorLogToConsole: true
    }))
    .on('eroor', console.error.bind(console))
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());

    console.log('Update scss->css');
  done();
}


function watchSass(){
  gulp.watch('./scss/**/*',copy)
}


function sync(done){
  browserSync.init({
    server:{
      baseDir:'./'
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
  gulp.watch('./scss/**/*',copy);
  gulp.watch('./**/*.html',browserReload);
  gulp.watch('./**/*.js',browserReload);
}
gulp.task('default',gulp.parallel(sync,watchFiles));

//exit watchSacc  ctrl+c
//gulp.task(copy);
