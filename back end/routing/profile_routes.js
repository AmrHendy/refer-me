/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require("body-parser");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ObjectID = require('mongodb').ObjectID;

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(
  server,
  connection_par,
  session
) {



  /*
      request : asd
      data = {}
      response = {}
  */
  server.post("/profile/get_user_data", urlencodedParser, function(req, res) {
    console.log("accepting route /profile/get_user_data");

    /* extract data */
    var user_email = req.body.user_email;

    var collected_data = {
      "user_info": {},
      "positions_held": []
    };

    print_stuff(user_email, "profile page")

    get_user_info(connection_par, user_email, collected_data, function(updated_data){
      get_positions_held(connection_par, user_email, updated_data, function(updated_data2){
        print_stuff(updated_data2, "before return");
        var ret = JSON.stringify(updated_data2);
        res.end(ret);
        return;
      });
    });

  });



}




// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function get_user_info(connection_par, user_email, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("user_accounts")
        .find({"login.email" : user_email})
        .toArray(function(err2, result) {
          if (err2) throw err2;
          connection.close();
          // valid credentials
          var tmp = {
            "first_name" : result[0]["profile"]["first_name"],
            "last_name" : result[0]["profile"]["last_name"],
            "email" : result[0]["login"]["email"],
            "password" : result[0]["login"]["password"],
            "img_link": "http://localhost:8000/profile.png",
            "resume_link": "http://localhost:8000/resume.pdf"
          };
          data_collected["user_info"] = tmp;
          print_stuff(data_collected["user_info"], "user info");
          callback(data_collected);
      });
  });

}

function get_positions_held(connection_par, user_email, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("positions_held")
        .find({"email" : user_email})
        .toArray(function(err2, result) {
          if (err2) throw err2;
          connection.close();
          // valid credentials
          data_collected["positions_held"] = result;
          print_stuff(data_collected["positions_held"], "positions_held");
          callback(data_collected);
      });
  });





}




function print_stuff(data , message)
{
  console.log("****************************************");
  console.log("****************************************");
  console.log(message, data);
  console.log("****************************************");
  console.log("****************************************");
}