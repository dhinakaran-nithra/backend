var http = require('http');
http.createServer('/ww', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
//res.send('Hello World!');
  res.end();
}).listen(8080);

http.createServer('/ww/:Num', (req, res) => {
    var Num = req.params.Num;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(Num);
    res.end('Okay');
}).listen(3000);;

// http.get({
//     hostname: 'localhost',
//     port: 8080,
//     path: '/w',
//     agent: false  // Create a new agent just for this one request
//   }, (res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('Welcome');
//     res.end();
// });