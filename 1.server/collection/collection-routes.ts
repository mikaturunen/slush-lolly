
import collection = require("collection");

var routes: any = {
  /** 
   * GET a single Users game collection.
   * @param request {Express.Request} HTTP request object.
   * @param response {Express.Response} HTTP response object.
   */
  getUsersCollection: (request: Express.Request, response: Express.Response) => {
    console.log("/collection/:id");
  }
}

/** 
 * @module collection_routes.
 * Contains all HTTP routes for collection accessing.
 */
module collection_routes {
  export function init(application: any) {
    application.get("/collection/:id", routes.getUsersCollection);
  }
};

export = collection_routes;
