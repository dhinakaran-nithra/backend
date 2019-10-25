// https://github.com/felixge/node-mysql
// npm install mysql
var mysql = require('mysql');
var app = require('express')();
// http://nodejs.org/docs/v0.6.5/api/fs.html#fs.writeFile
var fs = require('fs');

var client = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "qwerty123",
    database: "nithra"
});

client.query('select * from oldpost LIMIT 10, 10;', function(err, results, fields) {
  if(err) throw err;
  fs.writeFile('limited.json', JSON.stringify(results), function (err) {
    if (err) throw err;
    //res.send('Done')
    console.log('Saved!');
  });
  client.end();   
});

// app.get('/', (req, res, next)=>{
//   client.query('select * from oldpost LIMIT 10, 10;', function(err, results, fields) {
//     if(err) throw err;
//     fs.writeFile('limited.json', JSON.stringify(results), function (err) {
//       if (err) throw err;
//       res.send('Done')
//       console.log('Saved!');
//     });
//     client.end();   
// });
// next();
// });
// function greeting(){
//   console.log("Hi greetings");
//   //res.send('Hi Inner Loop');
//   //greeting();
// }
// app.listen(3000);
// app.get('/api', (req, res)=> {
// res.send('Welcome');
// greeting();
// });
