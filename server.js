var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");
app.use(express.static(__dirname+"/public"));
io.on("connection",function(client){
	client.on("productReq",function(data){
		console.log("Hello, product");
	});
	client.on("resourceReq",function(data){
		fs.writeFileSync("resources/"+data[0]+".json","{\"resource\":\""+data[0]+"\",cost:\""+data[1]+"\"}")
		console.log(data[0]+": for $"+data[1]+" per unit");
	})
})
server.listen(1337,"127.0.0.1",function(){console.log("listening on 127.0.0.1:1337")});