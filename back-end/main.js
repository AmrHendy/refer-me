/* IMPORT REQUIRED MODULEs */
/*********************************************/
var initializer = require('./init/initializer');
var router = require('./routing/router');



/* initialize server components */
var init = initializer.initialize();
var server = init[0];
var connection_par = init[1];
var session = init[2];

/* initialize router */
router.start_listening(server, connection_par, session);






