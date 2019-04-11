/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(server, connection_par, directory_table, session)
{

	/* signin submit form */
	server.post('/signin/submit', urlencodedParser, function (req, res) {

		console.log("accepting route /signin/submit");

		/* extract data */
		var user_email = req.body.user_email;
		var user_password = req.body.user_password;

		console.log("email : " + user_email);
		console.log("password : " + user_password);

		//db.user_accounts.find({"login.email": "mohamed.shaapan.1@gmail.com"}).pretty()

		connection_par["client"].connect(connection_par["url"], function(err, connection) {
			if (err) throw err;
			var db = connection.db(connection_par["database_name"]);
			db.collection("user_accounts").find({"login.email": user_email}).toArray(function(err, result) {
				if (err) throw err;
				connection.close();

				// user not found
				if(result.length == 0){
					var data = {
						"msg": "invalid credentials"
					}
					var ret = JSON.stringify(data);
					res.end(ret);
					return;
				}

				// incorrect password
				if(result[0]["login"]["password"] != user_password){
					var data = {
						"msg": "incorrect password"
					}
					var ret = JSON.stringify(data);
					res.end(ret);
					return;
				}

				// valid credentials
				console.log(result);
				var data = {
					"msg": "valid login",
					"session_info": {
						"user_email": result[0]["login"]["email"],
						"user_name": result[0]["profile"]["name"]
					}
				}
				// store session variables
				req.session.user_id = result[0]["_id"]
				// return result
				var ret = JSON.stringify(data);
				res.end(ret);
				return;
		
			});
		});

	});



	// index page
	server.get('/signout', function (req, res) {

		console.log("accepting route /signout");

		// valid session
		console.log("\nsigning out");
		req.session.destroy(function(err) {
			if(err) {
				console.log(err);
				return;
			}
			// redirect to signin page
			var data = {
				"msg": "user logged out"
			}
			var ret = JSON.stringify(data);
			res.end(ret);
		});
		
	});



}