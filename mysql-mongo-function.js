
var express = require('express');
var app = express();
// var _ = require('lodash');
const server = require('http').createServer(app);

const fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const jsonfile = require('./oldpost.json');

mongoose.Promise = global.Promise;




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
    //    app.listen(3000);
       console.log('Server listening on port 3000');
 }
});

mongoose.connect("mongodb://localhost:27017/node-demo", { useNewUrlParser: true }, (err, result)=>{
   if (err) throw err;
   else console.log('Mongo DB is Connected');
});



var oldpost = new mongoose.Schema({
    RowDataPacket: {
    id: Number,
    app: String,
    title: String,
    des: String,
    imgurl: String,
    date: String,
    time: String
}
   });

   var oldpost1 = new mongoose.Schema ({

   });
// var OldPost = mongoose.model("OldPosts", oldpost);
var OldPost1 = mongoose.model("OldPosts1", oldpost1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 function mongodb_from_mysql(req, res) {  
    connection.query("SELECT * FROM oldpost where id=14;", function (err, result, fields) {
        if (err) throw err;
        else {
            var OldPost = mongoose.model("OldPosts", oldpost);   //model.EmployeeSchema);
            var oldpost1 = new OldPost (result/* {
                firstname: 'Dhinakaran',
                LastName: 'Kumar',
                Sex: 'male',
                Country: 'India',
                Age: 35
            } */);
            // console.log('fields', fields);
            console.log('data', oldpost1);
            // console.log(data.app)
            console.log('result of mysql' , result.imgurl)
            oldpost1.save()
            .then(item => {
                console.log('item' , item)
                res.json("Hi, Your data is saved");
                })
            .catch(err => {
                    res.status(400).send("unable to save to database");
            });
 
        }
        });  
    // var OldPost = mongoose.model("OldPosts", oldpost);   //model.EmployeeSchema);
    // var oldpost = new OldPost (result/* {
    //     firstname: 'Dhinakaran',
    //     LastName: 'Kumar',
    //     Sex: 'male',
    //     Country: 'India',
    //     Age: 35
    // } */);
    // console.log('req.body:', + req.body);
    // console.log('course:' + course);
    // var result = await course.save(function(err, saved){
    //     if (err) console.log(err);
    //     else {console.log('data saved'); res.json(req.body);} //.send('is saved');}
    //     console.log(saved);
    // });
    // console.log(result);
    }
    mongodb_from_mysql();


// app.get('/', (req, res) => {
//   res.status(200).send('Welcome to MYSQL to MongoDB Conversion');
// });

// app.post('/mysql-mongod',  (req, res) => { 
//     // var MongoClient = require('mongodb').MongoClient;
//     // var url = "mongodb://localhost:27017/";
//     // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     //     if (err) throw err;
//     //     else{
//     //     var dbo = db.db("node-demo");
        
//     //             console.log('Connected to MySQL');
//     //             // Start the app when connection is ready
//     //             // app.listen(3000);
//     //             console.log('Server listening on port 3000');
         
//     //     connection.query("SELECT * FROM oldpost LIMIT 1", function (err, result, fields) {
//     //          if (err) throw err;
        
//     //     var myobj = result;
//     //     dbo.collection("oldposts").insertOne(myobj, function(err, res) {
//     //       if (err) throw err;
//     //       console.log("1 document inserted");
//     //       db.close();
//     //     });
        
//     // })

//     // }
//     //   });


//     connection.query("SELECT * FROM oldpost LIMIT 1;", function (err, result, fields) {
//         if (err) throw err;
//         else {
//             var data = new OldPost1(result);
//             console.log('data', data);
//             console.log(data.app)
//             console.log('result of mysql' , result)
//              data.save()
//             .then(item => {
//                 console.log('item' , item)
//                 res.json("Hi, Your data is saved");
//                 })
//             .catch(err => {
//                     res.status(400).send("unable to save to database");
//             });
 
//         }
//         });  
// });



// app.get('/insert', (req, res) => {  
      
//     connection.query("SELECT * FROM oldpost LIMIT 1;", function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//     res.end();
//     });  
// });
// app.post('/insertall', (req, res) => { 
//   var Num = req.body.Num; 
//   var sql    = 'SELECT * FROM oldpost ORDER BY id DESC LIMIT 10'; //  + connection.escape(Num) + ' DESC LIMIT 10';
//   //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
//   console.log(sql);
//   connection.query(sql, function (err, result, fields) {
//   if (err) {
//     throw err;
//     console.log(err);
//   }
//   else {
//           var data = JSON.stringify(result); 
//           console.log(result.length);
//           if(result.length) {
//             console.log('Data available');
//             res.send(result);
//             //res.json(JSON.parse(data));
//             res.end();
//            }
//            else {
//             //res.send(404);
//             console.log('No data');
//             res.json({
//               "message": "Data Not Available"
//             });
//             //send('Data not Available');
//            }
//           res.end();
//         }
//   });  
// });

// app.post('/insertall/:Num', (req, res) => { 
//   var Num = req.params.Num; 
//   var sql    = 'SELECT * FROM oldpost WHERE id < '   + connection.escape(Num) + ' ORDER BY id DESC LIMIT 10';
//   //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
//   console.log(sql);
//   connection.query(sql, function (err, result, fields) {
//   if (err) {
//     throw err;
//     console.log(err);
//   }
//   else {
//           var data = JSON.stringify(result); 
//           if(result.length) {
//             console.log('Data available');
//             res.json(JSON.parse(data));
//             res.end();
//            }
//            else {
//             //res.send(404);
//             console.log('No data');
//             res.json({
//               "message": "Data Not Available"
//             });
//             //send('Data not Available');
//            }
//           res.end();
//         }
//   });  
// });

// app.get('/listofApps', (req, res)=>{
//   //var listofApps = req.params.listofApps;
//   var sql = 'SELECT DISTINCT app FROM oldpost;';
//   connection.query(sql, function (err, result, fields) {
//     if (err) {
//       throw err;
//       console.log(err);
//     }
//     else {
//         res.json(result);
//         res.end();
//     }
//   });
// });

// app.post('/sortbyApp/', (req, res) => { 
//   var app = req.body.app;
//   var id = req.body.id; 
//   if (id === 0){
//     var sql = 'SELECT * From oldpost WHERE app =' + connection.escape(app) + ' ORDER BY id DESC LIMIT 10;';
//     }
//   else{
//     var sql = 'SELECT * From oldpost WHERE app =' + connection.escape(app) + ' AND id < ' +connection.escape(id) + ' ORDER BY id DESC LIMIT 10;';
//   }
//   //var sql = 'SELECT Max (id) AS "Last Input" FROM oldpost';
//   //var sql1 = 'SELECT * FROM oldpost WHERE id = 12565';
//   console.log(sql);
//   connection.query(sql, function (err, result, fields) {
//   if (err) {
//     throw err;
//     console.log(err);
//   }
//   else {
//           var data = JSON.stringify(result); 
//           if(result.length) {
//             console.log('Data available');
//             res.json(JSON.parse(data));
//             res.end();
//            }
//            else {
//             //res.send(404);
//             console.log('No data');
//             res.json({
//               "message": "Data Not Available"
//             });
//             //send('Data not Available');
//            }
//           res.end();
//         }
//   });  
// });


