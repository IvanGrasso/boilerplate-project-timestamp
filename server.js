// server.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/** Timestamp Microservice */

app.get('/api', function (req, res) {
  res.json({
    "unix": Date.now(),
    "utc": new Date().toUTCString()
  })
});

app.get('/api/:date', function (req, res) {
  if (isNaN(req.params.date)) {
    var date = new Date(req.params.date)
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" })
    } else {
      res.json({
        "unix": Date.parse(req.params.date),
        "utc": new Date(req.params.date).toUTCString()
      })
    }
  } else {
    var date = parseInt(req.params.date)
    res.json({
      "unix": date,
      "utc": new Date(date).toUTCString()
    })
  }
});

/*
- [x] A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds

- [x] A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT

- [x] A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

- [x] Your project can handle dates that can be successfully parsed by new Date(date_string)

- [x] If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }

- [x] An empty date parameter should return the current time in a JSON object with a unix key

- [x] An empty date parameter should return the current time in a JSON object with a utc key
 */