

var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var firebase = require('firebase');
var firebaseService = firebase.initializeApp({
    apiKey: "AIzaSyAUykmXEOreOqb1W2w_XsRR-UxobaI4SkM",
    authDomain: "instahack-d127e.firebaseapp.com"
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
             // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.post('/login', function (req, res) {
    var username = req.email;
    var password = req.password;
    var auth = firebase.auth();
    auth.signInWithEmailAndPassword(username, password).then(function (result) {
        // Handle Errors here.
        res.json({'success': result});


        // ...
    }, function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        res.json({'error': error});

    });
})
// more routes for our API will happen here



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);