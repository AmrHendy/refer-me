/* IMPORT REQUIRED MODULEs */
/*********************************************/
var express = require('express');
var app = express();

/* INTERNAL METHODS */
/*********************************************/
exports.initialize = function()
{
	var server = app.listen(8081, function () {
	   var host = server.address().address;
	   var port = server.address().port;
	   console.log("Example app listening at http://%s:%s", host, port);
	});

	app.use(express.static('/../../resources'));

	return app;
}