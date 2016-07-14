var moment = require('moment'); // Moment.js for parsing/displaying date
var express = require('express');
var app = express();
var date;
var port = process.env.PORT || 8080;

app.get('/:timestamp', function (req, res) {
    var unix = null;
    var natural = null;
    var time = req.params.timestamp;
    
    // Check if argument is natural language date or unix timestamp
    if (isNaN(time)) {
        date = moment(new Date(time));
    } else {
        date = moment.unix(parseInt(time));
    }
    
    if (date.isValid()){
        unix = date.unix();
        natural = date.format('MMMM D, YYYY');
    }
    
    res.send({
        "unix": unix,
        "natural": natural
    });
});

// Serve default page
app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname});
});

app.listen(port);