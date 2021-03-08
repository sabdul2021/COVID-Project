var mysql = require('mysql'); var con = mysql.createConnection({
  host: "db.it.pointpark.edu:3306",
  user: "covidchecker",
  password: "covidchecker",
  database: "covidchecker"
});

con.connect(function(err) {
  if (err) throw err;
  /*Select all customers with the address "Park Lane 38":*/
  con.query("SELECT SUM(exposure) FROM STUDENT_STAFF WHERE exposure = 1";, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});


//quarantineStatus
//testResult
