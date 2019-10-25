var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var dbname = "node-demo";

// MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function (error, client) {
//     if (error) throw error;
//     else {
//         //var db = client.db('node-demo');
//         //console.log(db);
//         var db = client.db('node-demo');
//         var cursor = db.collection('login').find();
//         cursor.each(function(err, doc){
//             console.log(doc);   
            
//         }) 
        
//         console.log("DB is connected")
//     }
// });

var mysqlSchema = new mongoose.Schema({
    id: Number,
    app: String,
    title: String,
    des: String,
    imgurl: String,
    date: String,
    time: String
});



var mysql_con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "qwerty123",
    database: "nithra"
  });

var MySQL = mongoose.model('MySQL', mysqlSchema); 
  
MongoClient.connect("mongodb://localhost:27017/node-demo", { useNewUrlParser: true }, function (error, client) {
    if (error) throw error;
    else {
        mysql_con.connect(function(err) {
            if (err) 
               throw err
            else {
                console.log('Connected to MySQL');
                var db = client.db('node-demo');
                var sql = "SELECT * FROM oldpost LIMIT 2;";
                mysql_con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        //var data = JSON.parse(result);
                        var MySQL = mongoose.model('MySQL', mysqlSchema); 
                        var MySql = new MySQL(result);
                        //MySql = result;
                        console.log(result);
                        console.log(MySql);
                        // console.log(MySql.id);
                        // console.log(MySql.app);
                        MySql.save(function(err, saved) {
                        if (err) throw err;
                        else {
                            console.log("1 document saved");
                        }
                        console.log(saved);
                        });
                    
                    //console.log("record added");
                    }
                    
                  }); 
                } 
                });
            }
            });
   
