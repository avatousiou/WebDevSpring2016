var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var userModel = require("./public/assignment/server/models/user.model.js")();
require("./public/assignment/server/services/user.service.server.js")(app, userModel);

var formModel = require("./public/assignment/server/models/form.model.js")();
require("./public/assignment/server/services/form.service.server.js")(app, formModel);
require("./public/assignment/server/services/field.service.server.js")(app, formModel);

app.listen(port, ipaddress);