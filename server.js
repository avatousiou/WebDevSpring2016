var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// For assignments
var userModel = require("./public/assignment/server/models/user.model.js")();
require("./public/assignment/server/services/user.service.server.js")(app, userModel);

var formModel = require("./public/assignment/server/models/form.model.js")();
require("./public/assignment/server/services/form.service.server.js")(app, formModel);
require("./public/assignment/server/services/field.service.server.js")(app, formModel);

// For the project
var TrainerSchema = require('./public/project/server/models/trainer.schema.server.js')(mongoose);
var GymLeaderSchema = require('./public/project/server/models/gymleader.schema.server.js')(mongoose);
var EliteFourSchema = require('./public/project/server/models/elitefour.schema.server.js')(mongoose);
var PokemonSchema = require('./public/project/server/models/pokemon.schema.server.js')(mongoose);
var CommentSchema = require('./public/project/server/models/comment.schema.server.js')(mongoose);
var LeagueSchema = require('./public/project/server/models/league.schema.server.js')(mongoose);

var trainer = mongoose.model('Trainer', TrainerSchema);
var gymLeader = mongoose.model('GymLeader', GymLeaderSchema);
var eliteFour = mongoose.model('EliteFour', EliteFourSchema);
var pokemon = mongoose.model('Pokemon', PokemonSchema);
var comment = mongoose.model('Comment', CommentSchema);
var league = mongoose.model('League', LeagueSchema);

var trainerModel = require("./public/project/server/models/trainer.model.js")(trainer, pokemon, comment, gymLeader, eliteFour);
require("./public/project/server/services/trainer.service.server.js")(app, trainerModel);

var leagueModel = require("./public/project/server/models/league.model.js")(league);
require("./public/project/server/services/league.service.server.js")(app, leagueModel);

app.listen(port, ipaddress);