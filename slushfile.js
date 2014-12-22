/*
 * slush-lolly
 * https://github.com/mikaturunen/slush-lolly
 *
 * Copyright (c) 2014, Mika Turunen
 * Licensed under the MIT license.
 */

"use strict";

var gulp = require("gulp");
var install = require("gulp-install");
var conflict = require("gulp-conflict");
var template = require("gulp-template");
var rename = require("gulp-rename");
var _u = require("underscore.string");
var _ = require("lodash");
var inquirer = require("inquirer");
var iniparser = require("iniparser");
var Q = require("q");
var fs = require("fs");

/** 
 * Formats user string.
 */
function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, "");
}

/** 
 * Constructor for creating a simple object.
 */
var createDefault = function(applicationName, userName, email) {
    return {
        appName: applicationName,
        userName: userName,
        authorEmail: email || ""
    };
};

/** 
 * Handles the user results from user prompts.
 */
var handlingPromptResults = function(answers) {
    if (!answers.moveon) {
        return done();
    }

    answers.appNameSlug = _u.slugify(answers.appName);
    gulp.src(__dirname + "/templates/**")
        .pipe(template(answers))
        .pipe(rename(function (file) {
            if (file.basename[0] === "_") {
                file.basename = "." + file.basename.slice(1);
            }
        }))
        .pipe(conflict("./"))
        .pipe(gulp.dest("./"))
        .pipe(install())
        .on("end", function () {
            done();
        });
};

/** 
 * Gets the default information about the user.
 */
var getDefaults = function() {
    var deferred = Q.defer();

    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var workingDirName = process.cwd().split("/").pop().split("\\").pop();
    var osUserName = homeDir && homeDir.split("/").pop() || "root";
    var configFile = homeDir + "/.gitconfig";
    var user = { };

    fs.exists(configFile, function(exists) {
        if(!exists) {
            deferred.resolve(createDefault(workingDirName, osUserName));
            return;
        }

        iniparser.parse(configFile, function(error, data) {
            if (error) {
                console.log("Error in iniparse, skipping .gitconfig parsing: " + error);
                deferred.resolve(createDefault(workingDirName, osUserName)); 
                return;
            }

            user = data.user;
            deferred.resolve(createDefault(workingDirName, format(user.name), user.email));
        });
    });

    return deferred.promise;
};

gulp.task("default", function (done) {
    // making sure the defaults are loaded with Q chain
    getDefaults()
        .then(function(defaults) {
            // user prompts
            var prompts = [
                { name: "appName", message: "What is the name of your project?", default: defaults.appName }, 
                { name: "appDescription", message: "What is the description?" }, 
                { name: "appVersion", message: "What is the version of your project?", default: "0.1.0" }, 
                { name: "authorName", message: "What is the author name?" }, 
                { name: "authorEmail", message: "What is the author email?", default: defaults.authorEmail }, 
                { name: "userName", message: "What is the github username?", default: defaults.userName }, 
                { type: "confirm", name: "moveon", message: "Continue?" }
            ];

            inquirer.prompt(prompts, handlingPromptResults);
        })
        .catch(function(error) {
            console.log("Error running the generator: " + error);
        })
        .done();
});
