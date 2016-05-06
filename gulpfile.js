'use strict';

(function() {
  var gulp = require("gulp"),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync'),
      sourcemaps = require('gulp-sourcemaps');

  gulp.task("default", function() {
    browserSync.init({
      server: "./"
    });

    gulp.watch("scss/**/*.scss", ["styles", "reload"]);
    gulp.watch("scripts/**/*.js", ["reload"]);
    gulp.watch("*", browserSync.reload);
  });

  gulp.task("styles", function() {
    return gulp.src("scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("css"));
  });

  gulp.task("reload", function() {
    browserSync.reload();
  });



})();
