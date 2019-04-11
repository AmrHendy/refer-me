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
	// signup page
	server.get('/signup', function (req, res) {

		if(req.session.user_id)
		{
			// user already signed in
			console.log("\nuser already signed in");
			var page_path = path.join(__dirname + directory_table["home"]);
			res.sendFile(page_path);
			return;
		}

		console.log("\nuser first time signup");
		var page_path = path.join(__dirname + directory_table["signup"]);
		res.sendFile(page_path);
	});

	/* signin submit form */
	server.post('/signup/submit', urlencodedParser, function (req, res) {

		/* extract data */
		var user_name = req.body.user_name;
		var user_password = req.body.user_password;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var user_email = req.body.user_email;
		var user_phone = req.body.user_phone;
		var user_address = req.body.user_address;

		/* check database */
		var sql_query = "INSERT INTO user_account "+
						"(email, login_password, user_name, credentials, first_name, last_name, address, phone) "+
						"VALUES (\""+user_email+"\", \""+user_password+"\", \""+user_name+"\", 0, "+
						"\""+first_name+"\", \""+last_name+"\", \""+user_address+"\", \""+user_phone+"\") ;";

		database.query(sql_query, function (err, rows, fields) {

			if (err)
			{
				// invalid data
				console.log("\nincorrect data");
				var page_path = path.join(__dirname + directory_table["signup"]);
				res.sendFile(page_path);
				return;
			}

			console.log("\nvalid signup info");
			// manage user session
			var query = "SELECT id FROM user_account WHERE email='"+user_email+"' ;";
			database.query(query, function (err2, rows2, fields2) {

				// handle errors
				if (err2) throw err2;
				// retrieve data
				var user_id = rows2[0].id;

				req.session.user_id = user_id;
				req.session.user_name = user_name;
				req.session.credentials = 0;
				console.log("\nuser session saved");

				var page_path = path.join(__dirname + directory_table["home"]);
				res.sendFile(page_path);

			});

			
			
		});

		

	});

}