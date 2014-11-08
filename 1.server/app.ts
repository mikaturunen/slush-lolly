var express = require("express");
var app 	= express();
var path    = require("path");

var staticPublichPath = path.normalize(path.join(__dirname, "..", "client"));

app.use("/public", express.static(staticPublichPath));

app.get("*", (req: any, res: any) => {
  var indexHtml: string = path.join(__dirname, "..", "client", "html", "index.html");
  console.log("path for index: " + indexHtml);
	res.sendFile(indexHtml);
});

var server = app.listen(3000, "127.0.0.1", () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});