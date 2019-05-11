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
  session
) {
  /* signin submit form */
  server.post("/signin/submit", urlencodedParser, function(req, res) {
    //console.log("accepting route /signin/submit");

    /* extract data */
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;

    //db.user_accounts.find({"login.email": "mohamed.shaapan.1@gmail.com"}).pretty()
    find_user(connection_par, req.body.user_email, function(result){
        // user not found
        if (result.length == 0) {
          //console.log("user not found");
          var data = {
            msg: "user not found",
            status: "error"
          };
          var ret = JSON.stringify(data);
          res.end(ret);
          return;
        }

        // incorrect password
        if (result[0]["login"]["password"] != user_password) {
          //console.log("incorrect pasword");
          var data = {
          msg: "incorrect password",
          status: "error"
          };
          var ret = JSON.stringify(data);
          res.end(ret);
          return;
        }

        // valid credentials
        var data = {
          msg: "valid login",
          status: "success",
          user: {
            email: result[0]["login"]["email"],
            firstName: result[0]["profile"]["first_name"],
            lastName: result[0]["profile"]["last_name"]
          }
        };
        // store session variables
        req.session.user_email = result[0]["login"]["email"];

        //console.log(req.session.user_email);
        // return result
        var ret = JSON.stringify(data);
        res.end(ret);
        return;
    });

  });

  // index pa	ge
  server.get("/signout", function(req, res) {
    //console.log("accepting route /signout");

    // valid session
    //console.log("\nsigning out");
    req.session.destroy(function(err) {
      if (err) {
        //console.log(err);
        return;
      }
      // redirect to signin page
      var data = {
        msg: "user logged out"
      };
      var ret = JSON.stringify(data);
      res.end(ret);
    });
  });
};



// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function find_user(connection_par, user_email, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("user_accounts")
        .find({ "login.email": user_email })
        .toArray(function(err2, result) {
          if (err2) throw err2;
          connection.close();
          callback(result);
      });

    });
}