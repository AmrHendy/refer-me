/* IMPORT REQUIRED MODULEs */
/*********************************************/
var signin_routes = require("./signin_routes");
var signup_routes = require("./signup_routes");
var home_routes = require('./home_routes');
var profile_routes = require('./profile_routes');
var requests_routes = require('./requests_routes');
var topnav_routes = require('./topnav_routes');

/* REQUEST-ROUTING TABLE */
/*********************************************/
exports.start_listening = function(server, connection_par, session) {
  signin_routes.handle_routes(server, connection_par, session);
  signup_routes.handle_routes(server, connection_par, session);
  home_routes.handle_routes(server, connection_par, session);
  profile_routes.handle_routes(server, connection_par, session);
  requests_routes.handle_routes(server, connection_par, session);
  topnav_routes.handle_routes(server, connection_par, session);
};
