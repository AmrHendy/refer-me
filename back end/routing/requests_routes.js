/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require("body-parser");

const {ObjectId} = require('mongodb');

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
      request 1 - get list of all requests i have
      type = POST
      result = {
        sent_requests = []
      }
  **************************************************************************/
  server.post("/requests/get_refer_requests", urlencodedParser, function(req, res) {

    console.log("accepting route /requests/get_sent_requests");
    //console.log("Requests for email = ", req.body.user_email);
    get_refer_requests(connection_par, req.body.user_email, function(result){
      var data = {
        "requests" : conform_data(result)
      };
      var ret = JSON.stringify(data);
      res.end(ret);
      return;
    });

  });


  /**************************************************************************
      request 2 - handle request (approve, reject)
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

    //console.log("Request ID = ", req.body.id);
    //console.log("New Status = ", req.body.status);

    
    var update_data = {
      "request_id": req.body.id,
      "new_status": req.body.status
    };

    handle_request(connection_par, update_data, function(message){
      // valid credentials
      var ret = JSON.stringify(message);
      res.end(ret);
      return;
    });
    
  });

}


// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function get_refer_requests(connection_par, user_email, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("refer_requests")
        .aggregate([
            {$match:
              {$or:
                [{"user_id.sender": user_email}, {"user_id.recipient": user_email}]
              }
            },
            { $lookup:
              {
                from: 'user_accounts',
                localField: 'user_id.sender',
                foreignField: 'login.email',
                as: 'sender_data'
              }
            },
            { $lookup:
              {
                from: 'user_accounts',
                localField: 'user_id.recipient',
                foreignField: 'login.email',
                as: 'recipient_data'
              }
            }
          ])
        .toArray(function(err, result) {
          if (err) throw err;
          connection.close();
          // return result
          callback(result);
          return;
        });
    });
}

// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function conform_data(request_list)
{
  var result = [];
  request_list.forEach( request => {
      //console.log("==> request = ", request);
      var conformed_request = {
          "user_info":{
              "sender": {},
              "recipient": {}
          },
          "position_info": request["position_info"],
          "status": request["status"],
          "id": request["_id"]
      };

      if(request["sender_data"].length > 0)
      {
          //console.log("in sender");
          //console.log(request["sender_data"]);
          var sender_data = {
            "email": request["sender_data"][0]["login"]["email"],
            "firstName": request["sender_data"][0]["profile"]["first_name"],
            "lastName": request["sender_data"][0]["profile"]["last_name"],
            "profileImage": "http://localhost:8000/profile.png",
            "resumeLink": "http://localhost:8000/resume.pdf"
          };
          conformed_request["user_info"]["sender"] = sender_data;
      }

      if(request["recipient_data"].length > 0)
      {
        //console.log("in recipient");
        //console.log(request["recipient_data"]);
        var recipient_data = {
          "email": request["recipient_data"][0]["login"]["email"],
          "firstName": request["recipient_data"][0]["profile"]["first_name"],
          "lastName": request["recipient_data"][0]["profile"]["last_name"],
          "profileImage": "http://localhost:8000/profile.png",
          "resumeLink": "http://localhost:8000/resume.pdf"
        };
        conformed_request["user_info"]["recipient"] = recipient_data;
      }
      
      result.push(conformed_request);
  });

  return result;
}


// *****************************************************************************
// UTILITY FUNCTIONS
// *****************************************************************************
function handle_request(connection_par, update_data, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      /*var condition = {
          $and:
          [{"user_id.sender": update_data["sender_email"]}, {"user_id.recipient": update_data["recipient_email"]}]
      };*/
      var match = {"_id": ObjectId(update_data["request_id"])};
      var new_values = {
        $set: {"status": update_data["new_status"]}
      };
      db.collection("refer_requests").updateMany(match, new_values, function(err2, res) {
        if (err2) throw err2;
        //console.log("1 document updated");
        connection.close();
        callback("success");
      });

    });
}