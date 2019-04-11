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
	// index page
	server.get('/', function (req, res) {

		if(!req.session.user_id)
		{
			// first time to sign in
			console.log("\nuser first time to signin");
			var page_path = path.join(__dirname + directory_table["signin"]);
			res.sendFile(page_path);
			return;
		}

		//console.log("harabt meneehom");

		// valid session
		console.log("\nuser already signed in");
		var page_path = path.join(__dirname + directory_table["home"]);
		res.sendFile(page_path);
		return;
		
	});

	/* signin submit form */
	server.post('/signin/submit', urlencodedParser, function (req, res) {
		/* extract data */
		var user_email = req.body.user_email;
		var user_password = req.body.user_password;

		/* check database */
		var sql_query = "SELECT id, login_password, user_name, credentials "+
						"FROM user_account "+
						"WHERE email=\""+user_email+"\" ;";

		database.query(sql_query, function (err, rows, fields) {

			// incorrect email (no result found)
			if (err || rows == undefined || rows.length == 0)
			{
				console.log("\nincorrect email");
				var page_path = path.join(__dirname + directory_table["signin"]);
				res.sendFile(page_path);
				return;
			}

			// check if password is correcr
			var retrieved_id = rows[0]["id"];
			var retrieved_password = rows[0]["login_password"];
			var retrieved_user_name = rows[0]["user_name"];
			var retrieved_credentials = rows[0]["credentials"];
			if(retrieved_password != user_password)
			{
				// incorrect password
				console.log("\nincorrect password");
				var page_path = path.join(__dirname + directory_table["signin"]);
				res.sendFile(page_path);
				return;
			}
			
			// correct data
			console.log("\nvalid signin");
			// manage session
			req.session.user_id = retrieved_id;
			req.session.user_name = retrieved_user_name;
			req.session.credentials = retrieved_credentials;
			console.log("\nuser session saved");

			var page_path = path.join(__dirname + directory_table["home"]);
			res.sendFile(page_path);
			
		});

	});



	// index page
	server.get('/signout', function (req, res) {

		// valid session
		console.log("\nsigning out");
		req.session.destroy(function(err) {
			if(err) {
				console.log(err);
				return;
			}
			// redirect to signin page
			var page_path = path.join(__dirname + directory_table["signin"]);
			res.sendFile(page_path);
		});
		
	});



}