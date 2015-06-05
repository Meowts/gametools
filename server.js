var express = require('express');

var server = express();
server.use(express.static(__dirname));

var port = 8080;

server.listen(port);
console.log("I'm listening, darling, I swear (on port "+port+")");