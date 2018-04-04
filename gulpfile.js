var path = require("path")
var gulp = require("gulp")
var del = require("del")
var browserify = require("browserify")
var exorcist = require("exorcist")
var source = require("vinyl-source-stream")
var streamify = require("gulp-streamify")
var uglify = require("gulp-uglify")
var rename = require("gulp-rename")

var browserifyOptions = {
  debug: true,
  insert_global_vars: false, // jshint ignore:line
  detectGlobals: false,
  bundleExternal: true
}

var DEST = path.join(__dirname, "dist/")
var entry_file = "./src/index.js"
var dst = "web3-cmt"

gulp.task("clean", function() {
  return del(["dist/**/*"])
})

gulp.task("build", function() {
  return browserify(browserifyOptions)
    .require(entry_file, { expose: dst })
    .require("bignumber.js") // expose it to dapp users
    .add(entry_file)
    .bundle()
    .pipe(exorcist(path.join(DEST, dst + ".js.map")))
    .pipe(source(dst + ".js"))
    .pipe(gulp.dest(DEST))
    .pipe(streamify(uglify()))
    .pipe(rename(dst + ".min.js"))
    .pipe(gulp.dest(DEST))
})

gulp.task("default", ["clean", "build"])
