const fs = require('fs');
const mongoose = require('mongoose');
const app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/EmployeeDB");
mongoose.connect("mongodb://localhost:27017/TaskDB", { useNewUrlParser: true })
    .then( () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

var EmployeeSchema = new mongoose.Schema({
    firstname: String,
    LastName: String,
    Contact: { type: Number, unique: true },
    Sex: { type: String, enum: ['male', 'female','transgender']},
    Country: String,
    Age: Number
}); 

app.post('/employee', async(req, res) => {
    var Course = mongoose.model('Employee', EmployeeSchema);    //model.EmployeeSchema);
    var course = new Course (req.body/* {
        firstname: 'Dhinakaran',
        LastName: 'Kumar',
        Sex: 'male',
        Country: 'India',
        Age: 35
    } */);
    console.log('req.body:', + req.body);
    console.log('course:' + course);
    var result = await course.save(function(err, saved){
        if (err) console.log(err);
        else {console.log('data saved'); res.json(req.body);} //.send('is saved');}
        console.log(saved);
    });
    console.log(result);
});

app.listen(3000);

// const entry = new Entry({
//     input: String
// });


