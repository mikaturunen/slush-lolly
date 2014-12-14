var express = require("express");
var app = express();
var path = require("path");

import socket = require("socket.io");
import collectionRoutes = require("./collection/collection-routes");

app.use("/public", express.static(path.normalize(path.join(__dirname, "..", "client"))));

// Initialize the additional routes for route modules
collectionRoutes.init(app);

app.get("*", (req: any, res: any) => {
  var indexHtml: string = path.join(__dirname, "..", "client", "html", "index.html");
	res.sendFile(indexHtml);
});

// TODO read details from configuration
var server = app.listen(3000, "127.0.0.1", () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server running at http://%s:%s", host, port);
});

var io: any = socket(server);
io.on("connection", (socket: any) => {
  console.log("Socket: Hello World!");
});
