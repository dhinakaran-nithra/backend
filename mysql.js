var mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "qwerty123",
  database: "nithra"
});

con.connect(function(err) {
  if (err) throw err;
  var data = con.query("SELECT * FROM oldpost", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
  });
  fs.writeFile("temp.txt", data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});
});