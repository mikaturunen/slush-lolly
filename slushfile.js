var gulp = require("gulp");
var install = require("gulp-install");
var conflict = require("gulp-conflict");
var template = require("gulp-template");
var inquirer = require("inquirer");

var userPrompts = [
  { type: "input", name: "name", message: "Application name: ", default: gulp.args.join(' ') }, // Get app name from arguments by default
  { type: "confirm", name: "moveon", message: "Continue?" }
];

var handleAnswers = function(answers) {
  if (!answers.moveon) {
    return done();
  }

  gulp.src(__dirname + "/templates/*/**")     // Note use of __dirname to be relative to generator
    .pipe(template(answers))                  // LoDash template support
    .pipe(conflict("./"))                     // Confirms overwrites on file conflicts
    .pipe(gulp.dest("./"))                    // Without __dirname here = relative to cwd
    .pipe(install())                          // Run `bower install` and/or `npm install` if necessary
    .on("finish", function () {
      done();                                 // Finished!
    });
};

gulp.task("default", function(done) {
  inquirer.prompt(userPrompts, handleAnswers);
});