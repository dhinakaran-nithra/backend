//app.js
var htt = require('http');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
//var fs = require('fs');
var express = require("express");
var app = express();
var port = 3000;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//  res.send("Hello World");
// });
 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/hello.html");
    console.log(req.query)
   });


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo", { useNewUrlParser: true }, (err, result)=>{
   if (err) throw err;
   else console.log('DB is Connected');
});
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
   });
var User = mongoose.model("Users", nameSchema);

var feedbackSchema = new mongoose.Schema({
    email: String,
    comments: String,
    date: { type: Date, default: Date.now },
   });
var FeedBack = mongoose.model("FeedBack", feedbackSchema);

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
            .then(item => {
                res.send("item saved to database");
                })
            .catch(err => {
                    res.status(400).send("unable to save to database");
            });
 
});

app.post("/addfeedback", async (req, res) => {
    var myData = new FeedBack(req.body);
	await myData.save()
            .then(item => {
                res.json("Hi " +req.body.email+ ", Your comment is sent");
                })
            .catch(err => {
                    res.status(400).send("unable to save to database");
            });
 
});
var personDetailSchema = new mongoose.Schema({
   firstname: String,
   lastname: String,
   country: { type: String, enum: ['australia', 'canada','usa']},
   subject: String
});
var Person = mongoose.model("Person", personDetailSchema);

app.post('/action_page', async (req, res)=>{
   var contactPerson = new Person(req.body);
   console.log('contactPerson:' + contactPerson);
   await contactPerson.save()
            .then(item => {
                res.send("item saved to database");
                })
            .catch(err => {
                    res.status(400).send("unable to save to database");
            });
});

var User = new mongoose.Schema({
   uname: String,
   psw: String,
   remember: { type: Boolean}
});
var User = mongoose.model("User", personDetailSchema);

app.post('/login', async (req, res)=>{
   var user = new User(req.body);
   await User.findOne({uname: user.uname, psw: user.psw}, (err, user) => {
      if (err) throw err;
      if(!user){ console.log('No User'); res.status(404).send('No User');}
      else {
         res.json({
            "message": req.body.uname + " is logged in"
         });
      }
   });
   res.send()
});

app.post('/google', (req, res)=>{
   res.redirect('http://www.google.com');
   console.log('google');
});

// redirection1);

// async function redirection1(req, res){
//    var url = 'http://www.google.com';
//    console.log('goole');
//    await res.redirect(url);
  
// }
   // res.redirect("code");
   
   //res.redirect('http://google.com');
//    request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
// });
//});

// //POST /product?sku=123
// app.get("/addname/:firstName?firstName=hi", async (req, res) => {
//    var myData = new User();
   
//    myData.firstName = req.query.firstName;
//    console.log(myData.firstName);
//    await User.findOne({'firstName': myData.firstName}, (err, result)=>{
//    console.log(result);
//    res.json(result);
//    });
// });

// });
//    myData.save()
//            .then(item => {
//                res.send("item saved to database");
//                })
//            .catch(err => {
//                    res.status(400).send("unable to save to database");
//            });

// });

app.listen(port, () => {
 console.log("Server listening on port " + port);
});
