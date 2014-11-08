
/**
 * Main angular module that initially configures routes in place and maintains order.
 */
module GameShelf {
  /**
   * Name of the main module.
   */
  export var name: string = "gameshelf";

  /**
   * Dependencies for the main module.
   */
  export var depends: string[] = [ "ui.router", "gameshelf.collection" ];

  /**
   * Configuration function for main module. 
   */ 
  export function config($stateProvider: any, $urlRouterProvider: any, $locationProvider: any) {
    $urlRouterProvider.otherwise("/")
    $locationProvider.html5Mode(true);

    // Now set up the states
    $stateProvider
      .state("collection", {
        url: "/",
        templateUrl: "public/html/collection/collection.html",
        controller: "CollectionCtrl"
      });
  }
};

// Initialize the main module of our application
angular
  .module(GameShelf.name, GameShelf.depends)
  .config(GameShelf.config);

// centralized initiation of the modules we are going to declare in other files.
// rationale: this js files gets included first -> declare all modules and initiate them
//            then in other js files we just call the modules and declare controllers, services and such for the
//            modules.
angular
  .module("gameshelf.collection", [ ]);