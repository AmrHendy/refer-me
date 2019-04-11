/* IMPORT REQUIRED MODULEs */
/*********************************************/
var express = require('express');
var app = express();
var server_address = 8001;

/* INTERNAL METHODS */
/*********************************************/
exports.initialize = function()
{
	var server = app.listen(server_address, function () {
	   var host = server.address().address;
	   var port = server.address().port;
	   //console.log("Example app listening at http://%s:%s", host, port);
	   console.log("Server Running at: " + host + port);
	});

	return app;
}