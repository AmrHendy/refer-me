/* IMPORT REQUIRED MODULEs */
/*********************************************/
var session = require('express-session');

/* INTERNAL METHODS */
/*********************************************/
exports.initialize = function(server)
{
	server.use(session({secret: 'ssshhhhh'}));
	return session;
}