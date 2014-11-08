var express = require("express");
var app = express();
var path = require("path");

var staticPublichPath = path.normalize(path.join(__dirname, "..", "client"));

app.use("/public", express.static(staticPublichPath));

// TODO we need to start specifying more details routes 
app.get("*", (req: any, res: any) => {
  var indexHtml: string = path.join(__dirname, "..", "client", "html", "index.html");
	res.sendFile(indexHtml);
});

// TODO read details from configuration
var server = app.listen(3000, "127.0.0.1", () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("GameShelves running at http://%s:%s", host, port);
});