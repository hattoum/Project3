var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
app.use(express.static(__dirname+"/public"));
io.on("connection",function(client){
	client.on("productReq",function(data){
		console.log("Hello, product");
	});
	client.on("resourceReq",function(data){
		console.log("Hello, resource");
	})
})
server.listen(1337,"127.0.0.1",function(){console.log("listening on 127.0.0.1:1337")});