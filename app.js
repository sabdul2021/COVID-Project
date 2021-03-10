

let http = require("http");
let fs = require("fs");
let mysql = require("mysql");
let credentials = require("./credentials");

http.createServer(function(req, res) {
  try {
    let path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    if (path === "/users") {
      users(req, res);
    } else if (path === "/exposure") {
      exposure(req, res);
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
    } else if (path.endsWith(".html")){
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
  let conn = mysql.createConnection(credentials.connection);
  // connect to database
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect: " + err);
      return;
    }
    // query the database
    conn.query("SELECT * FROM STUDENT_STAFF", function(err, rows) {
      // build json result object
      let outjson = {};
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

function exposure(req, res) {
  let conn = mysql.createConnection(credentials.connection);
  // connect to database
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect: " + err);
      return;
    }
    // query the database
    conn.query("SELECT SUM(exposure) FROM STUDENT_STAFF WHERE exposure = 1", function(err, rows) {
      // build json result object
      let outjson = {};
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
  let body = "";
  req.on("data", function(data) {
    body += data;
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      req.connection.destroy();
    }
  });
  req.on("end", function() {
    let injson = JSON.parse(body);
    let conn = mysql.createConnection(credentials.connection);
    // connect to database
    conn.connect(function(err) {
      if (err) {
        console.error("ERROR: cannot connect: " + e);
        return;
      }
      // query the database
      //conn.query("INSERT INTO USERS (NAME) VALUE ('" + injson.name + "')", function(err, rows, fields) {
      console.log([injson.universityId, injson.today, injson.selectTypeUniversity, injson.firstName, injson.lastName, injson.email, injson.feverChills, injson.cough, injson.breathing, injson.lossOfTasteSmell, injson.bodyAches, injson.exposure, injson.testResult, injson.quarantineStatus]);
      conn.query("INSERT INTO STUDENT_STAFF (universityId, today, selectTypeUniversity,, firstName, lastName, email, feverChills, cough, breathing, lossOfTasteSmell, bodyAches, exposure, testResult, quarantineStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [injson.universityId, injson.today, injson.selectTypeUniversity, injson.firstName, injson.lastName, injson.email, injson.feverChills, injson.cough, injson.breathing, injson.lossOfTasteSmell, injson.bodyAches, injson.exposure, injson.testResult, injson.quarantineStatus], function(err) {
        // build json result object
        let outjson = {};
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
