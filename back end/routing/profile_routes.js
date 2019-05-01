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
  server.get("/profile/get_user_data", function(req, res) {
    console.log("accepting route /profile/get_user_data");

    var collected_data = {
      "user_info": {},
      "positions_held": []
    };

    var user_id = req.session.user_id;
    console.log(user_id, "*****************---------------------*************");
    get_user_info(connection_par, user_id, collected_data, function(updated_data){
      get_positions_held(connection_par, user_id, updated_data, function(updated_data2){
        console.log(collected_data);
        var ret = JSON.stringify(collected_data);
        res.end(ret);
        return;
      });
    });

  });



}




// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function get_user_info(connection_par, user_id, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      console.log("************************************");
      console.log(typeof(user_id));
      console.log(user_id);
      var db = connection.db(connection_par["database_name"]);
      db.collection("user_account")
        .find({"_id" : new ObjectID("" + user_id)})
        .toArray(function(err2, result) {
          if (err2) throw err2;
          connection.close();
          // valid credentials
          data_collected["user_info"] = result[0];
          console.log("profile info");
          console.log(result);
          callback(data_collected);
      });
  });

}

function get_positions_held(connection_par, user_id, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("positions_held")
        .find({"user_id" : user_id})
        .toArray(function(err2, result) {
          if (err2) throw err2;
          connection.close();
          // valid credentials
          data_collected["positions_held"] = result;
          console.log("positions_held");
          console.log(result);
          callback()
      });
  });





}