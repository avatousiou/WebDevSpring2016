var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/WebDev';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

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




// For assignments
var userSchema = require('./public/assignment/server/models/user.schema.server.js')(mongoose);
var formSchema = require('./public/assignment/server/models/form.schema.server.js')(mongoose);
var fieldSchema = require('./public/assignment/server/models/field.schema.server.js')(mongoose);

var user = mongoose.model('User', userSchema);
var form = mongoose.model('Form', formSchema);
var field = mongoose.model('Field', fieldSchema);

var userModel = require("./public/assignment/server/models/user.model.js")(user);
require("./public/assignment/server/services/user.service.server.js")(app, userModel);

var formModel = require("./public/assignment/server/models/form.model.js")(form, field);
require("./public/assignment/server/services/form.service.server.js")(app, formModel);
require("./public/assignment/server/services/field.service.server.js")(app, formModel);

// For the project
var TrainerSchema = require('./public/project/server/models/trainer.schema.server.js')(mongoose);
var GymLeaderSchema = require('./public/project/server/models/gymleader.schema.server.js')(mongoose);
var EliteFourSchema = require('./public/project/server/models/elitefour.schema.server.js')(mongoose);
var PokemonSchema = require('./public/project/server/models/pokemon.schema.server.js')(mongoose);
var CommentSchema = require('./public/project/server/models/comment.schema.server.js')(mongoose);
var LeagueSchema = require('./public/project/server/models/league.schema.server.js')(mongoose);
var RequestSchema = require('./public/project/server/models/request.schema.server.js')(mongoose);

var trainer = mongoose.model('Trainer', TrainerSchema);
var gymLeader = mongoose.model('GymLeader', GymLeaderSchema);
var eliteFour = mongoose.model('EliteFour', EliteFourSchema);
var pokemon = mongoose.model('Pokemon', PokemonSchema);
var comment = mongoose.model('Comment', CommentSchema);
var league = mongoose.model('League', LeagueSchema);
var request = mongoose.model('Request', RequestSchema);

var trainerModel = require("./public/project/server/models/trainer.model.js")(trainer, pokemon, comment, gymLeader, eliteFour, league);
require("./public/project/server/services/trainer.service.server.js")(app, trainerModel);

var leagueModel = require("./public/project/server/models/league.model.js")(league);
require("./public/project/server/services/league.service.server.js")(app, leagueModel);

app.listen(port, ipaddress);