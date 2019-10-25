var express = require("express");
var app = express();
var port = 3000;

app.get('/', (req, res)=>{
    res.send('Hi welcome');
});

app.get('/person', (req, res)=>{
    res.redirect('http://www.google.com');
});


app.listen(port);