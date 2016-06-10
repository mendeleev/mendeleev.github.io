(function() {
  /*include modules*/
  var gulp = require("gulp"),
      sass = require("gulp-sass"),
      browserSync = require("browser-sync");

  /**
   * Default task
   */
  gulp.task("default", function() {
    /* initializing a webserver */
    browserSync.init({
      server: "./"
    });

    /* watching files for changes */
    gulp.watch("./**/*.html", ["reload"]);
    gulp.watch("./source/scss/**/*.scss", ["styles"]);
    gulp.watch("./application/css/**/*.css", ["reload"]);
  });

  /**
   * Compile stylesheets task
   */
  gulp.task("styles", function() {
    gulp.src('./source/scss/**/*.scss')
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("./application/css"));
  });

  /**
   * Reload page task
   */
  gulp.task("reload", function() {
    browserSync.reload();
  });

})();
