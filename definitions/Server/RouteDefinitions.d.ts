/**
 * Route definition for all the HTTP traffic related operations. When hooking new routes in place
 * the class needs to implement the following functions to be compatible with the slush-lollys interfaces for 
 * adding dynamic routes. 
 */
interface HttpRouteDefinition {
  /** 
   * Function for initializing and telling Express about the routes the class is going to provide.
   * @param application {Express.Application} Application to inject the routes to.
   */
  init: (application: Express.Application) => void;
};

/**
 * Route definition for all the Socket traffic related operations. When hooking new socket routes in place
 * the class needs to implement the following functions to be compatible with the slush-lollys interfaces for 
 * adding dynamic socket routes.
 */
interface SocketRouteDefinition {
  /** 
   * Function for initializing and telling Socket server about the socket routes.
   * @param socket {any} Socket server.
   */
  init: (socket: any) => void;
};