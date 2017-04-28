// required packages
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
// take whatever PORT is defined by the deployment site or 8080
// work on local host & don't reconfigured when deployed live
var PORT = process.env.PORT || 8080;

// aloow us to serve static files (images, CSS, etc.)
// dirname evalutes to folder path 
app.use(express.static(__dirname));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// include routes in this server file and pass in express
// include API route first because that's where we're pulling data to display inside out html pages
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// show server running when executing 'node server.js'
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
