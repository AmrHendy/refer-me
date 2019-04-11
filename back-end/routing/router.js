/* IMPORT REQUIRED MODULEs */
/*********************************************/
var signin_routes = require('./signin_routes');
var signup_routes = require('./signup_routes');
/*var home_routes = require('./home_routes');
var account_routes = require('./account_routes');
var cart_routes = require('./cart_routes');
var checkout_routes = require('./checkout_routes');
var my_orders_routes = require('./my_orders_routes');*/



/* setup directory table */
var directory_table = {
	signin : "/../../web-pages/signin.html",
	signup : "/../../web-pages/signup.html",
	/*home : "/../../web-pages/customer-view/home.html",
	account : "/../../web-pages/customer-view/account.html",
	cart : "/../../web-pages/customer-view/cart.html",
	checkout : "/../../web-pages/customer-view/checkout.html",
	my_orders : "/../../web-pages/customer-view/my_orders.html"*/
}



/* REQUEST-ROUTING TABLE */
/*********************************************/
exports.start_listening = function(server, database, session)
{
	signin_routes.handle_routes(server, database, directory_table, session);
	signup_routes.handle_routes(server, database, directory_table, session);
	/*home_routes.handle_routes(server, database, directory_table, session);
	account_routes.handle_routes(server, database, directory_table, session);
	cart_routes.handle_routes(server, database, directory_table, session);
	checkout_routes.handle_routes(server, database, directory_table, session);
	my_orders_routes.handle_routes(server, database, directory_table, session);*/
}



















