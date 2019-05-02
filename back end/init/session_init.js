/* IMPORT REQUIRED MODULEs */
/*********************************************/
var session = require("express-session");
var cookieParser = require('cookie-parser');

/* INTERNAL METHODS */
/*********************************************/
exports.initialize = function(server) {
  //server.use(session({ secret: "ssshhhhh" }));
  //server.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));

	server.use(cookieParser());

	server.use(session({
		resave: false,
		saveUninitialized: true,
		secret: 'sdlfjljrowuroweu',
		cookie: { secure: false }
	}));


  return session;
};
