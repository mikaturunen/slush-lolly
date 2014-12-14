import express = require("express");
import path = require("path");
import socket = require("socket.io");

// Example of adding dynamic http routes
import databaseRoutes = require("./database/database-routes");
// Example of adding dynamic socket routes
import databaseSockets = require("./database/database-socket");
var app = express();

app.use("/public", express.static(path.normalize(path.join(__dirname, "..", "client"))));

// Initialize the additional routes for route modules
databaseRoutes.init(app);

app.get("*", (req: any, res: any) => {
  var indexHtml: string = path.join(__dirname, "..", "client", "html", "index.html");
	res.sendFile(indexHtml);
});

// STARTING THE EXPRESS SERVER
// TODO read details from configuration file
var server = app.listen(3000, "127.0.0.1", () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server running at http://%s:%s", host, port);
});

// STARTING THE SOCKET SERVER
// TODO socket.io type definitions
var io: any = socket(server);
io.on("connection", (socket: any) => {
  console.log("Connected to server.");
});

// applying dynamic routes to the socket server
databaseSockets.init(io);
