/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require("body-parser");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(server, database, directory_table, session) {
  // home window
  server.get("/home", function(req, res) {
    if (!req.session.user_id) {
      // invalid session
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    } else {
      // valid session
      console.log("\nVALID SESSION\n");
      var page_path = path.join(__dirname + directory_table["home"]);
      res.sendFile(page_path);
    }
  });

  // refresh home page
  server.get("/home/refresh_table", function(req, res) {
    // check session first
    if (!req.session.user_id) {
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    }

    // valid session
    // prepare SQL query
    var sql_query =
      "SELECT I.isbn AS isbn, B.title AS title, C.category_name as category_name, B.year AS year, P.name AS publisher_name, I.price AS price " +
      "FROM ((((inventory AS I) JOIN (book_info AS B) ON (I.isbn = B.isbn)) " +
      "JOIN (publishing_house AS P) ON (B.publisher_id = P.id)) " +
      "JOIN (book_category AS C) ON (B.category_id = C.id)) ;";

    database.query(sql_query, function(err, rows, fields) {
      // handle errors
      if (err) throw err;
      // return data
      res.end(JSON.stringify(rows));
    });
  });

  // obtain personalized info
  server.get("/home/update_views", function(req, res) {
    // check session first
    if (!req.session.user_id) {
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    }

    // valid session
    var response = {
      user_name: req.session.user_name,
      credentials: req.session.credentials
    };

    res.end(JSON.stringify(response));
  });

  /* search books */
  server.post("/home/search", urlencodedParser, function(req, res) {
    // check session first
    if (!req.session.user_id) {
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    }

    // valid session
    // extract data
    var term = req.body.search_term;
    var criteria = req.body.search_criteria;
    switch (criteria) {
      case "title":
        criteria = "B.title";
        break;
      case "author":
        criteria = "B.title"; // authors not handled yet
        break;
      case "publisher":
        criteria = "P.name";
        break;
    }

    // prepare SQL query
    var sql_query =
      "SELECT I.isbn AS isbn, B.title AS title, C.category_name as category_name, B.year AS year, P.name AS publisher_name, I.price AS price " +
      "FROM ((((inventory AS I) JOIN (book_info AS B) ON (I.isbn = B.isbn)) " +
      "JOIN (publishing_house AS P) ON (B.publisher_id = P.id)) " +
      "JOIN (book_category AS C) ON (B.category_id = C.id)) " +
      "WHERE " +
      criteria +
      ' LIKE "%' +
      term +
      '%" ;';

    database.query(sql_query, function(err, rows, fields) {
      // handle errors
      if (err) throw err;
      //console.log('Book Title: ', rows[0].Title);
      // return data
      res.end(JSON.stringify(rows));
    });
  });

  /* add to cart */
  server.post("/home/add_to_cart", urlencodedParser, function(req, res) {
    // check session first
    if (!req.session.user_id) {
      console.log("\nPLEASE SIGNIN FIRST\n");
      var page_path = path.join(__dirname + directory_table["signin"]);
      res.sendFile(page_path);
      return;
    }
    // valid session

    // extract data
    var user_id = req.session.user_id;
    var book_isbn = req.body.book_isbn;

    var sql_query =
      "INSERT INTO customer_cart " +
      "VALUES (" +
      user_id +
      ", " +
      book_isbn +
      ", " +
      user_id +
      ") ;";

    //console.log(sql_query);

    database.query(sql_query, function(err, rows, fields) {
      // handle errors
      if (err) {
        // book alread exists in database
      }
      //console.log('Book Title: ', rows[0].Title);
      var page_path = path.join(__dirname + directory_table["cart"]);
      res.sendFile(page_path);
    });
  });
};
