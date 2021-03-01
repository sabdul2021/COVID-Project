var http = require("http");
var fs = require("fs");
var mysql = require("mysql");
var qs = require("querystring");
var credentials = require("./credentials");

http.createServer(function(req, res) {
  try {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    if (path === "/users") {
      users(req, res);
    } else if (path === "/add_user") {
      addUser(req, res);
    } else {
      serveStaticFile(res, path);
    }
  } catch (e) {
    try {
      console.log("ERROR(500): " + e);
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end("500 Internal Server error");
    } catch (e) {
      console.log("ERROR(^^^): " + e);
    }
  }
}).listen(3000);

function serveStaticFile(res, path, contentType, responseCode) {
  if (!path) path = "/home.html";
  if (!responseCode) responseCode = 200;
  if (!contentType) {
    contentType = "application/octet-stream";
    if (path.endsWith("home.html")) {
      contentType = "text/html; charset=utf-8";
    } else if (path.endsWith("about.html")){
      contentType = "text/html; charset=utf-8";
    } else if (path.endsWith(".js")) {
      contentType = "application/javascript; charset=utf-8";
    } else if (path.endsWith(".json")) {
      contentType = "application/json; charset=utf-8";
    } else if (path.endsWith(".css")) {
      contentType = "text/css; charset=utf-8";
    } else if (path.endsWith(".png")) {
      contentType = "image/png";
    } else if (path.endsWith(".jpg")) {
      contentType = "text/jpeg";
    }
  }
  fs.readFile(__dirname + "/views" + path, function(err, data) {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": contentType
      });
      res.end(data);
    }
  });
}

function sendResponse(req, res, data) {
  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(data));
}

function users(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  // connect to database
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect: " + err);
      return;
    }
    // query the database
    conn.query("SELECT * FROM STUDENT_STAFF", function(err, rows, fields) {
      // build json result object
      var outjson = {};
      if (err) {
        // query failed
        outjson.success = false;
        outjson.message = "Query failed: " + err;
      } else {
        // query successful
        outjson.success = true;
        outjson.message = "Query successful!";
        outjson.data = rows;
      }
      // return json object that contains the result of the query
      sendResponse(req, res, outjson);
    });
    conn.query("SELECT * FROM COVID_SYMPTOMS", function(err, rows, fields) {
      // build json result object
      var outjson = {};
      if (err) {
        // query failed
        outjson.success = false;
        outjson.message = "Query failed: " + err;
      } else {
        // query successful
        outjson.success = true;
        outjson.message = "Query successful!";
        outjson.data = rows;
      }
      // return json object that contains the result of the query
      sendResponse(req, res, outjson);
    });
    conn.end();
  });
}

function addUser(req, res) {
  var body = "";
  req.on("data", function(data) {
    body += data;
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      req.connection.destroy();
    }
  });
  req.on("end", function() {
    var injson = JSON.parse(body);
    var conn = mysql.createConnection(credentials.connection);
    // connect to database
    conn.connect(function(err) {
      if (err) {
        console.error("ERROR: cannot connect: " + e);
        return;
      }
      // query the database
      //conn.query("INSERT INTO USERS (NAME) VALUE ('" + injson.name + "')", function(err, rows, fields) {
      conn.query("INSERT INTO STUDENT_STAFF (universityId, firstName, lastName, email) VALUE (?)", [injson.name], function(err, rows, fields) {
        // build json result object
        var outjson = {};
        if (err) {
          // query failed
          outjson.success = false;
          outjson.message = "Query failed: " + err;
        } else {
          // query successful
          outjson.success = true;
          outjson.message = "Query successful!";
        }
        // return json object that contains the result of the query
        sendResponse(req, res, outjson);
      });

      conn.query("INSERT INTO COVID_SYMPTOMS (universityId, symptoms, exposure, testResult, quarantineStatus) VALUE (?)", [injson.name], function(err, rows, fields) {
        // build json result object
        var outjson = {};
        if (err) {
          // query failed
          outjson.success = false;
          outjson.message = "Query failed: " + err;
        } else {
          // query successful
          outjson.success = true;
          outjson.message = "Query successful!";
        }
        // return json object that contains the result of the query
        sendResponse(req, res, outjson);
      });
      conn.end();
    });
  });
}

console.log("Server started on localhost: 3000; press Ctrl-C to terminate....");
