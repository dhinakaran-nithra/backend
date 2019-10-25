//CallBack Function

function greeting(name) {
   console.log('Hello ' + name);
 }
function hello(name){
  console.log('hi ' + name);
}
function processUserInput(callback1, callback2) {
  var name = 'Dhinakaran';
  callback1(name);
  callback2(name);

}
// var b, x=1, y=0;
// var a = 200; 
// while(a>0) 
//  { 
//      b =  x +y; 
//      if (a % b ===0)  
//      console.log(a); 
// } 
processUserInput(greeting, hello);
/*
var promise1 = new Promise(function(resolve, reject) {
    resolve('Success!');
  });
  
  promise1.then(function(value) {
    console.log(value);
    // expected output: "Success!"
  });

  */