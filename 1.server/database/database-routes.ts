
import database = require("database");

/** 
 * @class DatabaseRoutes
 * Contains all HTTP routes for Database accessing. Implements HttpRouteDefinitions.
 */
class DatabaseRoutes extends HttpRouteDefinitions {
  private routes: any = {
    /** 
     * GET a single Users game collection.
     * @param request {Express.Request} HTTP request object.
     * @param response {Express.Response} HTTP response object.
     */
    getHelloWorld: (request: Express.Request, response: Express.Response) => {
      // For now this example does nothing and is here just to server an example purpose of how slush-lolly generally
      // advices to inject into the Express routes in a controller manner.
      console.log("/hello/:world");
    }
  };

  /**
   * Initializes all Database specific HTTP routes in place.
   * @param application {Application.Express} Express application.
   */
  export function init(application: Application.Express) {
    // Example of how to dynamically inject routes into the slush-lollys Express context
    application.get("/hello/:world", routes.getHelloWorld);
  }
};

export = DatabaseRoutes;
