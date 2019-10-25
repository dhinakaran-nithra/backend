//Parse data from JSON POST and insert into MYSQL
//"use strict";
//const app = require('express')();

var express = require('express');
var app = express();
// var _ = require('lodash');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
// app.post('/socket', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
// io.on('connection', function(socket){
//   console.log('a user connected');
// });
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
//   socket.broadcast.emit('hi');
// });
// var chat = fs.readFileSync(__dirname + '/chat.html');
// app.get('/socket-chat', function sendTime() {
//   io.emit('time', { time: new Date().toJSON() }); }, (req, res) => { 
//   res.end(chat);
// });


// Send current time every 10 secs
// setInterval(sendTime, 10000);

// // Emit welcome message on connection
// io.on('connection', function(socket) {
//   // Use socket to communicate with this particular client only, sending it it's own id
//   socket.emit('welcome', { message: 'Welcome!', id: socket.id });

//   socket.on('i am client', console.log);
// });

// function sendTime() {
//   io.emit('time', { time: new Date().toJSON() });
// }

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'qwerty123',
	database: 'nithra'
  })

//Establish MySQL connection
connection.connect(function(err) {
   if (err) 
      throw err
   else {
       console.log('Connected to MySQL');
       // Start the app when connection is ready
       app.listen(3000);
       console.log('Server listening on port 3000');
 }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Dhinmakan');
});


app.get('/insert', (req, res) => {  
      
    connection.query("SELECT * FROM oldpost LIMIT 1;", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    res.end();
    });  
});
app.post('/insertall', (req, res) => { 
  var Num = req.body.Num; 
  var sql    = 'SELECT * FROM oldpost ORDER BY id DESC LIMIT 10'; //  + connection.escape(Num) + ' DESC LIMIT 10';
  //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
  console.log(sql);
  connection.query(sql, function (err, result, fields) {
  if (err) {
    throw err;
    console.log(err);
  }
  else {
          var data = JSON.stringify(result); 
          console.log(result.length);
          if(result.length) {
            console.log('Data available');
            res.send(result);
            //res.json(JSON.parse(data));
            res.end();
           }
           else {
            //res.send(404);
            console.log('No data');
            res.json({
              "message": "Data Not Available"
            });
            //send('Data not Available');
           }
          res.end();
        }
  });  
});

app.post('/insertall/:Num', (req, res) => { 
  var Num = req.params.Num; 
  var sql    = 'SELECT * FROM oldpost WHERE id < '   + connection.escape(Num) + ' ORDER BY id DESC LIMIT 10';
  //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
  console.log(sql);
  connection.query(sql, function (err, result, fields) {
  if (err) {
    throw err;
    console.log(err);
  }
  else {
          var data = JSON.stringify(result); 
          if(result.length) {
            console.log('Data available');
            res.json(JSON.parse(data));
            res.end();
           }
           else {
            //res.send(404);
            console.log('No data');
            res.json({
              "message": "Data Not Available"
            });
            //send('Data not Available');
           }
          res.end();
        }
  });  
});

app.get('/listofApps', (req, res)=>{
  //var listofApps = req.params.listofApps;
  var sql = 'SELECT DISTINCT app FROM oldpost;';
  connection.query(sql, function (err, result, fields) {
    if (err) {
      throw err;
      console.log(err);
    }
    else {
        res.json(result);
        res.end();
    }
  });
});

app.post('/sortbyApp/', (req, res) => { 
  var app = req.body.app;
  var id = req.body.id; 
  if (id === 0){
    var sql = 'SELECT * From oldpost WHERE app =' + connection.escape(app) + ' ORDER BY id DESC LIMIT 10;';
    }
  else{
    var sql = 'SELECT * From oldpost WHERE app =' + connection.escape(app) + ' AND id < ' +connection.escape(id) + ' ORDER BY id DESC LIMIT 10;';
  }
  //var sql = 'SELECT Max (id) AS "Last Input" FROM oldpost';
  //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
  console.log(sql);
  connection.query(sql, function (err, result, fields) {
  if (err) {
    throw err;
    console.log(err);
  }
  else {
          var data = JSON.stringify(result); 
          if(result.length) {
            console.log('Data available');
            res.json(JSON.parse(data));
            res.end();
           }
           else {
            //res.send(404);
            console.log('No data');
            res.json({
              "message": "Data Not Available"
            });
            //send('Data not Available');
           }
          res.end();
        }
  });  
});

/*
app.post('/sortbyApp/:app/:Num', (req, res) => { 
  var app = req.params.app; 
  var Num = req.params.Num;
  // SELECT * FROM oldpost WHERE id < 12410 AND app = 'tc' ORDER BY id DESC LIMIT 10';
  var sql = 'SELECT * From oldpost WHERE app =' + connection.escape(app) + ' AND id < ' + connection.escape(Num) + ' ORDER BY id DESC LIMIT 10;';
  //var sql = 'SELECT Max (id) AS "Last Input" FROM oldpost';
  //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
  console.log(sql);
  connection.query(sql, function (err, result, fields) {
  if (err) {
    throw err;
    console.log(err);
  }
  else {
          var data = JSON.stringify(result); 
          if(result.length) {
            console.log('Data available');
            res.json(JSON.parse(data));
            res.end();
           }
           else {
            //res.send(404);
            console.log('No data');
            res.json({
              "message": "Data Not Available"
            });
            //send('Data not Available');
           }
          res.end();
        }
  });  
});

*/
