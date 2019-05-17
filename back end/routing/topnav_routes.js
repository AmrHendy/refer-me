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


  /**************************************************************************
      request 1 - get count of refer requests i received
      type = POST
      data = {
        email = "user email"
      }
      result = {
        msg: "data found",
        status: "success",
        request_count: number
      };
  **************************************************************************/
  server.post("/topnav/get_request_count", urlencodedParser, function(req, res) {
    console.log("accepting route /topnav/get_request_count");

    /* extract data */
	var user_email = req.body.email;

    get_request_count(connection_par, user_email, function(result_data){
      // valid credentials
      var data = {
        msg: "data found",
        status: "success",
        request_count: result_data
      };
      
      var ret = JSON.stringify(data);
      res.end(ret);
      return;
    });

  });

}

// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function get_request_count(connection_par, user_email, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("refer_requests")
        .aggregate(
          [
            {$match:
              {$and:
                [{"user_id.recipient": user_email}, {"status": "pending"}]
              }
            }
          ],
          function(err, cursor) {
            cursor.toArray(function(err, documents) {
              connection.close();
              //console.log(documents);
              callback(documents.length);
            });
          }
        );
    });
}
