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
      request 1 - get list of all requests i sent
      type = GET
      result = {
        sent_requests = []
      }
  **************************************************************************/
  server.get("/requests/nav/get_sent_requests", function(req, res) {

    console.log("accepting route /requests/init/get_sent_requests");

	get_sent_requests(connection_par, req.session.user_id, function(result){
		var data = {
			sent_requests : result
		};
		var ret = JSON.stringify(data);
		res.end(ret);
		return;
	});

  });

  /**************************************************************************
      request 2 - get list of all requests i received
      type = GET
      result = {
        received_requests = []
      }
  **************************************************************************/
  server.get("/requests/nav/get_received_requests", function(req, res) {

    console.log("accepting route /requests/init/get_received_requests");

	get_received_requests(connection_par, req.session.user_id, function(result){
		var data = {
			received_requests : result
		};
		var ret = JSON.stringify(data);
		res.end(ret);
		return;
	});

  });


  /**************************************************************************
      request 3 - handle request (approve, reject)
      type = POST
      data = {
        request_id = "id of target request",
        new_status = "approve or reject"
      }
      result = {
        status: "success"
      };
  **************************************************************************/
  server.post("/requests/handle_recevied_request", urlencodedParser, function(req, res) {
    console.log("accepting route /requests/handle_recevied_request");

	var update_data = {
		match_criteria: req.body.request_id,
		match_value: req.body.new_status
	};

    handle_request(connection_par, update_data, function(message){
      // valid credentials
      var ret = JSON.stringify(message);
      res.end(ret);
      return;
    });

  });



}


//**************************************************************************
//**************************************************************************
//**************************************************************************
//  DB request handlers
//**************************************************************************
//**************************************************************************
//**************************************************************************
function get_sent_requests(connection_par, user_id, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      var attribute = "user_id.sender";
      var value = user_id;
      db.collection("refer_requests")
        .find({ attribute : value })
        .toArray(function(err, result) {
          if (err) throw err;
          connection.close();
          // return result
          callback(result);
          return;
        });
    });
}

function get_received_requests(connection_par, user_id, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      var attribute = "user_id.recipient";
      var value = user_id;
      db.collection("refer_requests")
        .find({ attribute : value })
        .toArray(function(err, result) {
          if (err) throw err;
          connection.close();
          // return result
          callback(result);
          return;
        });
    });
}

function handle_request(connection_par, update_data, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("refer_requests").updateOne(update_data["match_criteria"], update_data["match_value"], function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();

        callback("success");
      });

    });
}
