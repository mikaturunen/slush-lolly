
module Collection {
  // the actual controller function that takes in what dependencies were injected.
  // parameter list for the function always needs to match the injected object list in the below angular module setup
  // pahse
  var controller = ($scope: CollectionScope, socket: any) => {
    console.log("Started Collection controller!");
    defineScopeFunctions($scope);
  };

  // one place to define the functionality of the objects in the scope
  var defineScopeFunctions = ($scope: CollectionScope) => {  
    $scope.test = () : void => {
      console.log("TEST");
    };
  };

  /**
   * CollectionScope object for $scope usage.
   */
  export interface CollectionScope extends ng.IScope {
    test: () => void;
  };

  /**
   * Module details for Angular to consume.
   */ 
  export var meta: MetaModule = {
    moduleName: "gameshelf.collection",
    controllerName: "CollectionCtrl",
    controllerFunction: controller
  }
}

// Setup angular module, dependencies and behavior
angular
  .module(Collection.meta.moduleName)
  .controller(Collection.meta.controllerName, 
    [
      // list of objects to inject into the controller callback 
      "$scope", "socket", 
      // callback itself
      Collection.meta.controllerFunction 
    ]);