var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080, function () {
  console.log('listening on port 8080')
})

/*
 * STATIC RESOURCES
 */
app.use(express.static('res'))

/*
 * GET REQUESTS
 */

// get requests for resources
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
})  

app.get('/login', function (req, res) {
  res.sendFile('res/login.html', { root: __dirname });
})  


/*
 * POST RESPONSES
 */

app.post('/', function (req, res) {
  var response = {
    data:"hello",
    code:200
    }
  res.send(JSON.stringify(response));
})

app.post('/login', function (req, res) {
  console.log(req.body);
  // send a response 
  var response = {
    data:"hello",
    code:200
    }
  res.send(JSON.stringify(response));
})
