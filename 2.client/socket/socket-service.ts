
// we store the factory for the sockets into the gameshelf base application itself

module Socket {
  declare var io: any;

  export var moduleName: string = "gameshelf";
  export var factoryName: string = "socket";

  export function factory(socketFactory: any) {
    console.log("socket factory");
    // TODO create type definition for socketFactory (angular-socket-io) and PR into DefinitelyTyped
    return socketFactory();
  };
};

// initiating the socket factory 
angular
  .module(Socket.moduleName)
  .factory(Socket.factoryName, [
      "socketFactory",
      Socket.factory
    ]);