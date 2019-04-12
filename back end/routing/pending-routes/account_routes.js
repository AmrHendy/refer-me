/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(server, database, directory_table, session)
{

	// account window
	server.get('/account', function (req, res) {

		// check session first
		if(!req.session.user_id)
		{
			console.log("\nPLEASE SIGNIN FIRST\n");
			var page_path = path.join(__dirname + directory_table["signin"]);
			res.sendFile(page_path);
			return;
		}
		
		// valid session
		var page_path = path.join(__dirname + directory_table["account"]);
		res.sendFile(page_path);

	});

	// refresh huser account info
	server.get('/account/refresh_info', function (req, res) {

		// check session first
		if(!req.session.user_id)
		{
			console.log("\nPLEASE SIGNIN FIRST\n");
			var page_path = path.join(__dirname + directory_table["signin"]);
			res.sendFile(page_path);
			return;
		}

		// valid session

		var user_id = req.session.user_id;
		// get data from user SESSION
		var sql_query = "SELECT email, login_password AS password, user_name, first_name, last_name, address, phone "+
						"FROM user_account WHERE id="+user_id+" ;";

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('User: ', rows[0].Title);
			res.end(JSON.stringify(rows));
		});

	});

	/* search books */
	server.post('/account/update_info', urlencodedParser, function (req, res) {

		// check session first
		if(!req.session.user_id)
		{
			console.log("\nPLEASE SIGNIN FIRST\n");
			var page_path = path.join(__dirname + directory_table["signin"]);
			res.sendFile(page_path);
			return;
		}

		// valid session

		var user_id = req.session.user_id;
		// prepare sql statement
		var user_name = req.body.user_name;
		var user_password = req.body.user_password;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var user_email = req.body.user_email;
		var user_phone = req.body.user_phone;
		var user_address = req.body.user_address;

		var sql_query = "UPDATE user_account "+
						"SET email='"+user_email+"', login_password='"+user_password+"', user_name='"+user_name+"' "+
							", first_name='"+first_name+"', last_name='"+last_name+"' "+
							", address='"+user_address+"', phone='"+user_phone+"' "+
						"WHERE id="+user_id+" ;";

		//console.log(sql_query);
		req.session.user_name = user_name;
		console.log("\nuser name session : %s\n", req.session.user_name);

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			//update session variables
			req.session.user_name = user_name;
		});

	});

	

}