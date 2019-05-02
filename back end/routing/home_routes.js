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
      request 1 - get list of all names for companies, countries, people
      type = GET
      result = {
        company_list = [],
        country_list = [],
        employee_list = []
      }
  **************************************************************************/
  server.get("/home/search/init/get_search_data", function(req, res) {
    console.log("accepting route /home/search/init/get_search_data");

      var data = {
        "company_list": [],
        "country_list": [],
        "employee_list": []
      };


      get_country_list(connection_par, data, function(updated_data){
        get_company_list(connection_par, updated_data, function(updated_data2){
          get_employee_list(connection_par, updated_data2, function(updated_data3){
            var ret = JSON.stringify(updated_data3);
            res.end(ret);
            return;
          });
        });
      });

  });


  /**************************************************************************
      request 2 - search POSITIONS_HELD
      type = POST
      data = {
        search_criteria = "company or country or person",
        search_term = "query"
      }
      result = {
        msg: "data found",
        status: "success",
        position_list: [{position record}]
      };
  **************************************************************************/
  server.post("/home/search", urlencodedParser, function(req, res) {
    console.log("accepting route /home/search");

    /* extract data */
    var search_data = {
      "table_name" : "",
      "attribute": "",
      "value": req.body.search_term
    };

    console.log(req.body);

    switch(req.body.search_criteria)
    {
      case "init":
        search_data["table_name"] = "positions_held";
        search_data["attribute"] = "init";
        break;
      case "company_list":
        search_data["table_name"] = "positions_held";
        search_data["attribute"] = "company";
        break;
      case "country_list":
        search_data["table_name"] = "positions_held";
        search_data["attribute"] = "office.country";
        break;
      case "employee_list":
        // not yet supported
        //search_data["table_name"] = "user_accounts";
        //search_data["attribute"] = "profile";
    }

    console.log(search_data);

    search_db(connection_par, search_data, function(result_data){
      // valid credentials
      var data = {
        msg: "data found",
        status: "success",
        position_list: group_positions_by_office(result_data)
      };
      console.log("RESULT ************************************");
      console.log(data);
      
      var ret = JSON.stringify(data);
      res.end(ret);
      return;
    });

  });




  /**************************************************************************
      request 3 - submit 
      type = POST
      data = {
        recipientUserID = "company or country or person",
        company = "query",
        city = "",
        country = "",
        message = "",
        position = ""
      }
      result = {
        msg: "data found",
        status: "success",
      };
  **************************************************************************/
  server.post("/home/view/refer_request/submit", urlencodedParser, function(req, res) {
    console.log("accepting route /home/view/refer_request/submit");

    /* extract data */
    var new_request = {
        "user_id":{
          "sender": req.session.user_id,
          "recipient": req.body.recipientUserID
        },
        "position_info":{
          "company": req.body.company,
          "position": req.body.position,
          "city": req.body.city,
          "country": req.body.country,
          "message": req.body.message
        }
    };

    register_new_request(connection_par, new_request, function(message){
      // valid credentials
      var data = {
        status: message
      };
      var ret = JSON.stringify(data);
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
function search_db(connection_par, search_data, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      if(search_data["attribute"] == 'init')
      {
        console.log("init view");
        db.collection(search_data["table_name"])
          /*.aggregate([
            { $lookup:
              {
                from: 'user_accounts',
                localField: 'email',
                foreignField: 'profile.email',
                as: 'user_info'
              }
            }
          ])*/
          .find()
          .toArray(function(err, result) {
            if (err) throw err;
            connection.close();
            //console.log(result);
            // return result
            callback(result);
            return;
        });
      }else{

        console.log("normal search");
        var attribute = search_data["attribute"];
        var value = search_data["value"]
        db.collection(search_data["table_name"])
        .find({attribute : value})
        .toArray(function(err, result) {
          if (err) throw err;
          connection.close();
          // return result
          callback(result);
          return;
        });

      }

    });
}

function group_positions_by_office(position_list){

  var result = {};

  position_list.forEach( position => {
      var key = position["company"] + ", " + position["office"]["city"] + ", " + position["office"]["country"];
      if(result[key] === undefined){
        result[key] = {
          company: position["company"],
          office: position["office"],
          employees: [position]
        };
      }else{
        result[key]["employees"].push(position);
      }
    }
  )

  console.log("el result aheee ***************************");
  var values = [];
  var keys = Object.keys(result);
  keys.forEach(function(key){
    values.push(result[key]);
  });
  console.log(values);
  return values;
}



function register_new_request(connection_par, new_request, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("refer_requests").insertOne(new_request, function(
          err,
          result
        ) {
          if (err) throw err;
          // valid entry
          console.log("request registered successfully");
          // get user id for session management
          callback("success");
        });
    });
}













function get_country_list(connection_par, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("positions_held")
        .aggregate(
          [
            {$match: {}},
            {$group : {_id : "$office.country"}}
          ],
          function(err, cursor) {
            cursor.toArray(function(err, documents) {
              connection.close();
              console.log(documents);
              data_collected["country_list"] = documents;
              for(var i = 0; i < data_collected["country_list"].length; i++)
              {
                data_collected["country_list"][i] = data_collected["country_list"][i]["_id"];
              }
              callback(data_collected);
            });
          }
        );
    });
}

function get_company_list(connection_par, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("positions_held")
        .aggregate(
          [
            {$match: {}},
            {$group : {_id : "$company"}}
          ],
          function(err, cursor) {
            cursor.toArray(function(err, documents) {
              connection.close();
              console.log(documents);
              data_collected["company_list"] = documents;
              for(var i = 0; i < data_collected["company_list"].length; i++)
              {
                data_collected["company_list"][i] = data_collected["company_list"][i]["_id"];
              }
              callback(data_collected);
            });
          }
        );
    });
}

function get_employee_list(connection_par, data_collected, callback)
{
  connection_par["client"].connect(connection_par["url"], function(
      err,
      connection
    ) {
      if (err) throw err;
      var db = connection.db(connection_par["database_name"]);
      db.collection("user_accounts")
        .find({})
        .toArray(function(err, documents) {
          if (err) throw err;
          connection.close();
          console.log(documents);
          data_collected["employee_list"] = documents;
          for(var i = 0; i < data_collected["employee_list"].length; i++)
          {
            var name = data_collected["employee_list"][i]["profile"];
            data_collected["employee_list"][i] = name["first_name"] + " " + name["last_name"];
          }
          callback(data_collected);
        });
    });
}



