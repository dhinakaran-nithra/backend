// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


var request = require("request");

var options = { method: 'POST',
  url: 'https://mercury-uat.phonepe.com/v3/debit',
  headers:
   { 'x-verify': '8289e078-be0b-484d-ae60-052f117f8deb',
     'content-type': 'application/json' },
  body: { request: 'M2306160483220675579140' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log(body);
});