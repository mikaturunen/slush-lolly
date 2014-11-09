var express = require("express");
var app = express();
var path = require("path");

import collectionRoutes = require("./collection/collection-routes");

var staticPublichPath = path.normalize(path.join(__dirname, "..", "client"));

app.use("/public", express.static(staticPublichPath));

// Initialize the additional routes for route modules
collectionRoutes.init(app);

app.get("*", (req: any, res: any) => {
  console.log("Route: *");
  var indexHtml: string = path.join(__dirname, "..", "client", "html", "index.html");
	res.sendFile(indexHtml);
});

// TODO read details from configuration
var server = app.listen(3000, "127.0.0.1", () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("GameShelves running at http://%s:%s", host, port);
});