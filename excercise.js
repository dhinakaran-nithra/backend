var obj = { name: "John", age: 30, city: "New York" };
var myJSON = JSON.stringify(obj);
// console.log(obj);
// console.log(myJSON);
// console.log(JSON.parse(myJSON))

var jsontext = '[{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}, {"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}]';
var contact = JSON.parse(jsontext);
console.log(contact)
console.log(jsontext)