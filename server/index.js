var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var request=require('request-promise');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var baseBlockURL="http://testhyp.localtunnel.me/api/";
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

app.post('/addFunds', function (req, res) {    
    var fundData={
        "$class": "org.acme.mynetwork.AddFunds",
        "amount": 100,
        "roomate": "Alice",
    }
    var fundReq ={
        method: "POST",
        uri: baseBlockURL+"AddFunds",
        headers: {
                    'content-type': 'application/json' 
            },
        body: JSON.stringify(fundData)
    }
    request(fundReq).then(function(body){
      //res
    }).catch(function(err){
      //err
    });

})


app.post('/createItem', function (req, res) {
    var itemURL=baseBlockURL+"Item"
    var itemName="jafjkl";
    var price=200;
    var userId="Alice";
    console.log(itemURL);
    var checkExists={
        method: 'GET',
        uri: itemURL+"/"+itemName
    }
    request(checkExists).then(function(body){
        var itemData={
          "$class": "org.acme.mynetwork.Item",
          "purchaseName": itemName,
          "Price":price,
          "owner": "Alice"
        }
        
        var postItem={
            method: 'PUT',
            uri: itemURL+"/"+itemName,
            headers: {
                    'content-type': 'application/json' 
            },
            body: JSON.stringify(itemData)
        }
        request(postItem).then(function(body){
            //res
        }).catch(function(err){
            console.log(err);
        })






    }).catch(function(err){
        var itemData={
          "$class": "org.acme.mynetwork.Item",
          "purchaseName": itemName,
          "Price":price,
          "owner": "Alice"
        }
        
        var postItem={
            method: 'POST',
            uri: itemURL,
            headers: {
                    'content-type': 'application/json' 
            },
            body: JSON.stringify(itemData)
        }
        request(postItem).then(function(body){
            //res
        }).catch(function(err){
            console.log(err);
        })

    });
})





