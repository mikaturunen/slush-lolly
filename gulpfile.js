/**
 * Gulp usage file for the whole project. 
 * Usage cases: Compiling all the typescript files.
 */
 
"use strict";

var gulp = require("gulp");
var ts = require("gulp-typescript");
var eventStream = require("event-stream");
var jade = require("gulp-jade");
var path = require("path");
var tslint = require('gulp-tslint');
var install = require("gulp-install");

// common target locations
var serverReleaseLocation = "./release/server";
var clientReleaseLocation = "./release/client";
var jadeReleaseLocation = path.join(clientReleaseLocation, "html");
var jsClientReleaseLocation = path.join(clientReleaseLocation, "js");
var jsServerReleaseLocation = path.join(serverReleaseLocation);

// TYPEDEFINITION RELATED
var typeDefinitions = [];
var projectDefinitions = [ ];
var fromDefinitelyTypedServer = [
	"definitions/server.d.ts"
];
var fromDefinitelyTypedClient = [
    "definitions/client.d.ts"
];
// concantenate a set for server side compilation
var typeDefinitionsServer = fromDefinitelyTypedServer
	.concat(projectDefinitions)
	.concat([ "1.server/**/*.ts" ]);

var typeDefinitionsClient = fromDefinitelyTypedClient
    .concat(projectDefinitions)
    .concat([ "2.client/**/*.ts" ]);

// JADE RELATED
var jadeLocation = [
    "2.client/**/*.jade"
];

// TASK NAMES
var taskTsLint = "tslint";
var taskJade = "jade";
var taskTsc = "ts";
var taskTscServer = "ts-server";
var taskTscClient = "ts-client";
var taskBower = "bower";
var taskNpm = "npm";
var taskBuild = "build";

// TODO  // merging all the streams for output. -> return eventStream.merge(...args);

gulp.task(taskTsLint, function() {
    // LINTING TS
    console.log("Linting Server side TS: " + JSON.stringify(typeDefinitionsServer, null, 2));
    gulp.src(typeDefinitionsServer).pipe(tslint()).pipe(tslint.report("verbose"));

    console.log("Linting Client side TS: " + JSON.stringify(typeDefinitionsClient, null, 2));
    gulp.src(typeDefinitionsClient).pipe(tslint()).pipe(tslint.report("verbose"));
});

gulp.task(taskJade, function() {
    console.log("Compiling jade files from locations: " + JSON.stringify(jadeLocation, null, 2));
    gulp.src(jadeLocation).pipe(jade()).pipe(gulp.dest(jadeReleaseLocation));
});

gulp.task(taskTsc, function() {
    gulp.task(taskTscServer);
    gulp.task(taskTscClient);
});

gulp.task(taskTscServer, function() {
    console.log("Listed definitions to add for server compilation: " + JSON.stringify(typeDefinitionsServer, null, 2));
    var tsServerResult = gulp.src(typeDefinitionsServer)
                            .pipe(ts({
                                declarationFiles: false,
                                noExternalResolve: false,
                                removeComments: true,
                                target: "ES5",
                                module: "amd",
                                showErrors: true
                            }));

    tsServerResult.js.pipe(gulp.dest(jsServerReleaseLocation));
});

gulp.task(taskTscClient, function() {
    console.log("Listed definitions to add for client compilation: " + JSON.stringify(typeDefinitionsClient, null, 2));                        
    var tsClientResult = gulp.src(typeDefinitionsClient)
                            .pipe(ts({
                                declarationFiles: false,
                                noExternalResolve: false,
                                removeComments: true,
                                target: "ES5",
                                module: "commonjs",
                                showErrors: true
                            }));

    tsClientResult.js.pipe(gulp.dest(jsClientReleaseLocation));
});


gulp.task(taskBower, function() {
    gulp.src(["./bower.json"]).pipe(install());
});

gulp.task(taskNpm, function() {
     gulp.src(["./bower.json"]).pipe(install());
});

gulp.task(taskBuild, function() {
    gulp.start(taskJade, taskTsLint, taskTsc);
});

// defining the tasks gulp runs -- in default we do basically all the tasks in one
gulp.task("default", function() {
    gulp.start(taskNpm, taskBower, taskJade, taskTsLint, taskTsc);
});