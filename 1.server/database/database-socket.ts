import database = require("database");

/** 
 * @class DatabaseSocket
 * Contains all socket routes for Database accessing. Implements SocketRouteDefinition.
 */
class DatabaseSocket extends SocketRouteDefinition {
  private events: any = {
    /**
     * Hello world socket event message
     */
    helloWorld: {
      message: "slush.hello.world",
      fn: (socket: any) => {
        console.log("Socket: Hello World!");
      }
    }
  };

  // TODO typedefinitions for socket.io
  /** 
   * Hooks set of Database related socket messages in place.
   * @param io {any} socket.io object.
   */
  export function init(io: any) {
    // Example of dynamically hooking the socket messages in place in slush-lolly
    io.on(events.helloWorld.message, events.helloWorld.fn);
  }
}

export = DatabaseSocket;
