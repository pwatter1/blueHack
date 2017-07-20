var express = require('express')
var app = express()

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

