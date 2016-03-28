var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// For assignments
var userModel = require("./public/assignment/server/models/user.model.js")();
require("./public/assignment/server/services/user.service.server.js")(app, userModel);

var formModel = require("./public/assignment/server/models/form.model.js")();
require("./public/assignment/server/services/form.service.server.js")(app, formModel);
require("./public/assignment/server/services/field.service.server.js")(app, formModel);

// For the project
var trainerModel = require("./public/project/server/models/trainer.model.js")();
require("./public/project/server/services/trainer.service.server.js")(app, trainerModel);
require("./public/project/server/services/pokemon.service.server.js")(app, trainerModel);

var leagueModel = require("./public/project/server/models/league.model.js")();
require("./public/project/server/services/league.service.server.js")(app, leagueModel);

app.listen(port, ipaddress);