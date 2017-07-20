var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(8080, function () {
  console.log('listening on port 8080');
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

// login POST request
app.post('/login', function (req, res) {
    console.log(req.body);
    
    // email and password of person trying to login
    var email = req.body.email;
    var password = req.body.password;
    // Verify the user
    var userData;
    fs.readFile('../paypal/users.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        userData = JSON.parse(data);
        var userList = userData.users;

        var validEntry = false;
        for (i in userList){
            var user = userList[i];
            if (user.email == email && user.password == password){
                // we found the user!
                validEntry = true;
                console.log("User found!");
                break;
            }
        }
        // construct a response
        var response;
        if (!validEntry){
            // unimplemented please help
            console.log("dead");
            process.exit();
        }
        else {
            response = {
                data: email
            };
        }
        // send a response 
        res.send(JSON.stringify(response));
    });
})
