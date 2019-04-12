/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require("body-parser");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(server, database, directory_table, session) {
  // account window
  server.get("/my_orders", function(req, res) {
    // check session first
    if (!req.session.user_id) {
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    }

    // valid session
    var page_path = path.join(__dirname + directory_table["my_orders"]);
    res.sendFile(page_path);
  });

  // refresh huser account info
  server.get("/my_orders/refresh_table", function(req, res) {
    // check session first
    if (!req.session.user_id) {
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    }

    // valid session
    var user_id = req.session.user_id;
    // get data from user SESSION
    var sql_query =
      "SELECT B.title AS title, C.quantity AS quantity, C.unit_price AS price, C.date AS date " +
      "FROM ((SELECT * FROM customer_order WHERE user_id=" +
      user_id +
      " ) AS C) " +
      "JOIN (book_info AS B) ON (C.isbn = B.isbn) ;";

    database.query(sql_query, function(err, rows, fields) {
      // handle errors
      if (err) throw err;
      //console.log('User: ', rows[0].Title);
      //console.log(rows[0]);
      res.end(JSON.stringify(rows));
    });
  });
};
