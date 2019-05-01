/* IMPORT REQUIRED MODULEs */
/*********************************************/
var MongoClient = require("mongodb").MongoClient;

var connection_par = {
  client: MongoClient,
  url: "mongodb://192.168.0.116:27017/",
  database_name: "referme_db"
};

/* INTERFACE METHOD */
/*********************************************/
exports.initialize = function() {
  return connection_par;
};
