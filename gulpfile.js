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
  //return gulp.src('F:/КПІ/3 курс/2 семестр/Веб/лаб 1/Project/src/html/pages/page2.html')
   return gulp.src('./src/html/pages/*.html')  //path.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest('./build/html/'))//path.build.html))
    .pipe(browserSync.stream());
    //.pipe(console.log("buildPages DONE"));
  //done();
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
  //gulp.buildComp;
  //gulp.start('buildComp');
  //buildComp;
  //gulp.task('buildComp',buildComponents);
  console.log("func html: buildComponents DONE");
  //buildPages();
  console.log("func html: buildPages DONE");
  return gulp.src('./src/index.html')//path.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest('./build'))//path.build.html))
    .pipe(browserSync.stream());
}

gulp.task('default2', gulp.parallel(sync,watchFiles,html));
//gulp.task('default', gulp.parallel(sync,watchFiles,html));
gulp.task('buildComp',buildComponents);
gulp.task('buildPg',buildPages);

//gulp.task('default',['buildComp','default1']);

//gulp.task('default',['dist','default2']);
//gulp.task('default2', ['buildComp', 'default1']);

gulp.task('default',gulp.series("buildComp","buildPg",gulp.parallel(sync,watchFiles,html)))


//exit watchSacc
//gulp.task(copy);
