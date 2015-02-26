var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname+"/public"));
var io = require("socket.io")(server);
server.listen(1337,"127.0.0.1",function(){console.log("listening on 127.0.0.1:1337")});