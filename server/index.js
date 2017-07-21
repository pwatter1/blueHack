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
            //process.exit();
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

app.post('/getLastItem', function (req, res) {    
 var itemURL=baseBlockURL+"Item"
    var getReq ={
        method: "GET",
        uri: baseBlockURL+"/system/transactions",
        headers: {
                    'content-type': 'application/json' 
            }
    }
    request(getReq).then(function(body){
               console.log("HERE" + body);

      body=JSON.parse(body);
        body=body.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        console.log(body);
        for(i=0;i<body.length;i++){
            if(body[i].$class=="org.acme.mynetwork.Approve") break;
        }
        var checkExists={
            method: 'GET',
            uri: itemURL+"/"+(body[i].item.substring(body[i].item.indexOf("#") + 1))
        }
        request(checkExists).then(function(data){
            data=JSON.parse(data);
            console.log(data)
                returndata={
                    "name":(body[i].item.substring(body[i].item.indexOf("#") + 1)),
                    "price":data.Price
            }
                res.send(returndata.name+ ": " + data.Price);
        })




    }).catch(function(err){
      console.log(err);
    });
})


app.post('/approve', function (req, res) {    
console.log(req.body);
var getReq ={
        method: "GET",
        uri: baseBlockURL+"/system/transactions",
        headers: {
                    'content-type': 'application/json' 
            }
    }
    request(getReq).then(function(body){
      body=JSON.parse(body);
        body=body.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        for(i=0;i<body.length;i++){
            if(body[i].$class=="org.acme.mynetwork.Approve") break;
        }
        
    var approveData={
          "$class": "org.acme.mynetwork.Approve",
          "item": body[i].item.substring(body[i].item.indexOf("#") + 1) ,
          "approver": req.body.email
    }

    var approveReq ={
        method: "POST",
        uri: baseBlockURL+"Approve",
        headers: {
                    'content-type': 'application/json' 
            },
        body: JSON.stringify(approveData)
    }
    request(approveReq).then(function(data ){
        console.log(data);
        res.send((body[i].item.substring(body[i].item.indexOf("#") + 1)))
      //res
    }).catch(function(err){
      console.log(err);
    });



    }).catch(function(err){
      console.log(err);
    });



    })

app.post('/getUserData', function (req, res) { 
console.log("GETTING BALANCE");

    var fundReq ={
        method: "GET",
        uri: baseBlockURL+"Roomate/"+req.body.email,
        headers: {
                    'content-type': 'application/json' 
            }
    }
    request(fundReq).then(function(body){
        body=JSON.parse(body);
      res.send(""+body.balance);
    }).catch(function(err){
      console.log(err);
    });

})

app.post('/addFunds', function (req, res) {    
console.log(req.body)

    var fundData={
        "$class": "org.acme.mynetwork.AddFunds",
        "amount": req.body.price,
        "roomate": req.body.email,
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
      console.log(err);
    });

})


app.post('/addNewItem', function (req, res) {
    console.log(req.body);
    var itemURL=baseBlockURL+"Item"
    var itemName=req.body.name;
    var price=req.body.price;
    var userId=req.body.email;
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
          "owner": userId
        }
console.log("HEREEER")
console.log(JSON.stringify(itemData));
        
        var postItem={
            method: 'PUT',
            uri: itemURL+"/"+itemName,
            headers: {
                    'content-type': 'application/json' 
            },
            body: JSON.stringify(itemData)
        }
        request(postItem).then(function(body){
            var approveData={
                  "$class": "org.acme.mynetwork.Approve",
                  "item": itemName ,
                  "approver": userId
            }
            var approveReq ={
                method: "POST",
                uri: baseBlockURL+"Approve",
                headers: {
                            'content-type': 'application/json' 
                    },
                body: JSON.stringify(approveData)
            }
            request(approveReq).then(function(data ){
                console.log(data);
                res.send("updating item, and approved")
            }).catch(function(err){
              console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        })






    }).catch(function(err){
        var itemData={
          "$class": "org.acme.mynetwork.Item",
          "purchaseName": itemName,
          "Price":price,
          "owner": userId
        }
        console.log("HEREEER")
console.log(JSON.stringify(itemData));
        var postItem={
            method: 'POST',
            uri: itemURL,
            headers: {
                    'content-type': 'application/json' 
            },
            body: JSON.stringify(itemData)
        }
        request(postItem).then(function(body){
            var approveData={
                  "$class": "org.acme.mynetwork.Approve",
                  "item": itemName ,
                  "approver": userId
            }
            var approveReq ={
                method: "POST",
                uri: baseBlockURL+"Approve",
                headers: {
                            'content-type': 'application/json' 
                    },
                body: JSON.stringify(approveData)
            }
            request(approveReq).then(function(data ){
                console.log(data);
                res.send("new item, and approved")
            }).catch(function(err){
              console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        })

    });
})





