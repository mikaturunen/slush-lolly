/**
 * Gulp usage file for the whole project. 
 * Usage cases: Compiling all the typescript files.
 */
 
"use strict";

var gulp  		= require("gulp");
var ts 			= require("gulp-typescript");
var eventStream = require("event-stream");
var jade        = require("gulp-jade");
var path        = require("path");

// common target locations
var serverReleaseLocation   = "./release/server";
var clientReleaseLocation   = "./release/client";
var jadeReleaseLocation     = path.join(clientReleaseLocation, "html");
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

// defining the tasks gulp runs -- in default we do basically all the tasks in one
gulp.task("default", function() {
    // TODO convert all ts compilations into their own gulp tasks that we can either execute one-by-one (for faster testing) or all by running 'default'
    // servet ts
	console.log("Listed definitions to add for server compilation: " + JSON.stringify(typeDefinitionsServer, null, 2));
    var tsServerResult = gulp
						.src(typeDefinitionsServer)
						.pipe(ts({
							declarationFiles: false,
							noExternalResolve: false,
							removeComments: true,
							target: "ES5",
							module: "amd",
							showErrors: true
						}));
    // client ts
    console.log("Listed definitions to add for client compilation: " + JSON.stringify(typeDefinitionsClient, null, 2));                        
    var tsClientResult = gulp
                        .src(typeDefinitionsClient)
                        .pipe(ts({
                            declarationFiles: false,
                            noExternalResolve: false,
                            removeComments: true,
                            target: "ES5",
                            module: "commonjs",
                            showErrors: true
                        }));

    console.log("Compiling jade files from locations: " + JSON.stringify(jadeLocation, null, 2));
    // TODO convert all jade compilations into its own gulp task
    gulp.src(jadeLocation).pipe(jade()).pipe(gulp.dest(jadeReleaseLocation));

    // merging all the streams for output.
    return eventStream.merge(
            tsServerResult.js.pipe(gulp.dest(jsServerReleaseLocation)), 
            tsClientResult.js.pipe(gulp.dest(jsClientReleaseLocation))
        );
});