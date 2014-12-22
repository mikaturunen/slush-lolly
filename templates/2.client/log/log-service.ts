
/** 
 * @module Log
 */
module Log {
  // TODO create type definition for socketFactory (angular-socket-io) and PR into DefinitelyTyped
  var factory = (socket: any) => {
    /**
     * Info log. Sends the logged information to the server too.
     * @param message {string} Log message.
     * @param meta {any} Optional meta object for additional debugs.
     */
    var logInfo = (message: string, meta?: { [fieldName: string]: any; }) => {
      console.log("INFO | " + new Date() + " | " + message);
      socket.emit("log.info", { message: message, meta: meta });
    };

    /**
     * Debug log. Sends the logged information to the server too.
     * @param message {string} Log message.
     * @param meta {any} Optional meta object for additional debugs.
     */
    var logDebug = (message: string, meta?: { [fieldName: string]: any; }) => {
      console.log("DBG  | " + new Date() + " | " + message);
      socket.emit("log.debug", { message: message, meta: meta });
    };

    /**
     * Error log. Sends the logged information to the server too.
     * @param message {string} Log message.
     * @param meta {any} Optional meta object for additional debugs.
     */
    var logError = (message: string, meta?: { [fieldName: string]: any; }) => {
      console.log("ERR  | " + new Date() + " | " + message);
      socket.emit("log.error", { message: message, meta: meta });
    };

    /**
     * Warning log. Sends the logged information to the server too.
     * @param message {string} Log message.
     * @param meta {any} Optional meta object for additional debugs.
     */
    var logWarning = (message: string, meta?: { [fieldName: string]: any; }) => {
      console.log("WARN | " + new Date() + " | " + message);
      socket.emit("log.warn", { message: message, meta: meta });
    };

    // returning the object to the client
    return {
      info: logInfo,
      debug: logDebug,
      error: logError,
      warn: logWarning
    };
  };

  /**
   * Module details for Angular to consume.
   */ 
  export var meta: MetaModule = {
    moduleName: "slush-lolly",
    serviceName: "log",
    serviceFunction: factory
  }
};

// initiating the socket factory 
angular
  .module(Log.meta.moduleName)
  .factory(Log.meta.serviceName, [
      "socket",
      Log.meta.serviceFunction
    ]);