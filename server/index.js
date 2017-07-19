var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})  

app.post('/', function (req, res) {
  res.send('POST example')
})

app.listen(8080, function () {
  console.log('listening on port 8080')
})
//http://localhost:8080/