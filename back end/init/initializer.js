/* IMPORT REQUIRED MODULEs */
/*********************************************/
var server_init = require('./server_init');
var database_init = require('./database_init');
var session_init = require('./session_init');


/* INTERFACE METHOD */
/*********************************************/
exports.initialize = function()
{
	var server = server_init.initialize();
	var session = session_init.initialize(server);
	var connection_par = database_init.initialize();

	return [server, connection_par, session];
}