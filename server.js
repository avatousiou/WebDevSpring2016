var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "TOP_SECRET",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/WebDev');

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

var trainerModel = require("./public/project/server/models/trainer.model.js")(trainer, pokemon, comment, gymLeader, eliteFour, league);
require("./public/project/server/services/trainer.service.server.js")(app, trainerModel);

var leagueModel = require("./public/project/server/models/league.model.js")(league);
require("./public/project/server/services/league.service.server.js")(app, leagueModel);

app.listen(port, ipaddress);