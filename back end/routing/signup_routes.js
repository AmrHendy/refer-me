/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require("body-parser");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(
  server,
  connection_par,
  directory_table,
  session
) {
  // signup submit form
  server.post("/signup/submit", urlencodedParser, function(req, res) {
    console.log("accepting route /signup/submit");

    // extract data
    var new_user = {
      login: {
        email: req.body.user_email,
        password: req.body.user_password
      },
      profile: {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    };

    // connect to database
    connection_par["client"].connect(connection_par["url"], function(
      err1,
      connection
    ) {
      if (err1) throw err1;
      var db = connection.db(connection_par["database_name"]);

      // check if user already exists
      db.collection("user_accounts")
        .find({ "login.email": new_user["login"]["email"] })
        .toArray(function(err2, result2) {
          if (err2) throw err2;

          // user already exists
          if (result2.length != 0) {
            connection.close();
            var data = {
              msg: "user already exists!",
              status: "error"
            };
            var ret = JSON.stringify(data);
            res.end(ret);
            return;
          }

          // insert new user into db
          db.collection("user_accounts").insertOne(new_user, function(
            err3,
            result3
          ) {
            if (err3) throw err3;

            // valid signup
            console.log("user added successfully");

            // get user id for session management
            db.collection("user_accounts")
              .find({ "login.email": new_user["login"]["email"] })
              .toArray(function(err4, result4) {
                if (err4) throw err4;
                connection.close();
                var data = {
                  msg: "valid signup",
                  status: "success"
                };
                // store session variables
                console.log(result4);
                req.session.user_id = result4[0]["_id"];
                // return result
                var ret = JSON.stringify(data);
                res.end(ret);
                return;
              });
          });
        });
    });
  });
};
