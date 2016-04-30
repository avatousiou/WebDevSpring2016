module.exports = function(app, db){
    var userModel    = require("./models/user.model.js")(app, db);
    var userService  = require("./services/user.service.server.js")(app, userModel);

    var formModel    = require("./models/form.model.js")(app, db);
    var formService  = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};