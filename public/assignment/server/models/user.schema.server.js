module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        "username": String,
        "password": String,
        "firstName": String,
        "lastName": String,
        "roles": [String]
    });
    return UserSchema;
};