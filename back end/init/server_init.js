/* IMPORT REQUIRED MODULEs */
/*********************************************/
var express = require("express");
var app = express();
var server_address = 8001;

/* INTERNAL METHODS */
/*********************************************/
exports.initialize = function() {
  var server = app.listen(server_address, function() {
    var host = server.address().address;
    var port = server.address().port;
    //console.log("Example app listening at http://%s:%s", host, port);
    console.log("Server Running at: " + host + port);
  });

  // 02. allow access from other domains
  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  return app;
};
