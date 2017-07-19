var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
})  
app.post('/', function (req, res) {
  var response = {
    data:"hello",
    code:200
    }
  res.send(JSON.stringify(response));
})

app.listen(8080, function () {
  console.log('listening on port 8080')
})
//http://localhost:8080/
