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

  // index page
  server.get("/profile/get_positions_held", function(req, res) {
    console.log("accepting route /profile/get_profile_info");

    connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("positions_held")
        .find({"user_id" : req.session.user_id})
        .toArray(function(err, result) {
          if (err) throw err;
          connection.close();

          // valid credentials
          console.log(result);
          var data = {
            msg: "data found",
            status: "success",
            positions_held: result
          };
          // return result
          var ret = JSON.stringify(data);
          res.end(ret);
          return;
        });
    });

  });



  server.post("/profile/update_profile", urlencodedParser, function(req, res) {
    
    console.log("accepting route /signin/submit");
    /* extract data */
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
    var user_firstName = req.body.user_firstName;
    var user_lastName = req.body.user_lastName;

    console.log("email : " + user_email);
    console.log("password : " + user_password);
    console.log("first name : " + user_firstName);
    console.log("last name : " + user_lastName);

    // connect to db
    connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);

      var condition = {"_id" : req.session.user_id};
      var updated_values = {
        $set:
        {
          'login.email': user_email,
          'login.password': user_password,
          'profile.first_name':user_firstName,
          'profile.last_name':user_firstName
        }
      };
      
      dbo.collection("user_accounts").updateOne(condition, updated_values, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        // incorrect password
        var data = {
          msg: "ok",
          status: "success"
        };
        var ret = JSON.stringify(data);
        res.end(ret);
        return;
      });

    });

  });


  server.post("/profile/add_position", urlencodedParser, function(req, res) {
    console.log("accepting route /profile/add_position");

    var new_position = {
      "user_id": req.session.user_id,
      "company": req.body.company,
      "position": req.body.position,
      "office":{
        "city": req.body.office["city"],
        "country": req.body.office["country"],
      },
      "duration":{
        "start_date": req.body.duration["start_date"],
        "end_date": req.body.duration["end_date"]
      }
    };

    console.log(new_position);

    // connect to database
    connection_par["client"].connect(connection_par["url"], function(
      err1,
      connection
    ) {
      if (err1) throw err1;
      var db = connection.db(connection_par["database_name"]);

      // check if user already exists
      db.collection("positions_held")
        .find({/* check if position exists */})
        .toArray(function(err2, result2) {
          if (err2) throw err2;
          // user already exists

          // insert new user into db
          db.collection("positions_held").insertOne(new_position, function(
            err3,
            result3
          ) {
            if (err3) throw err3;
            // valid insert
            console.log("user added successfully");
            // incorrect password
            var data = {
              msg: "ok",
              status: "success"
            };
            var ret = JSON.stringify(data);
            res.end(ret);
            return;
          });
        });
    });
  });

}