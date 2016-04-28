module.exports = function(mongoose) {

    var CommentSchema = mongoose.Schema({
        "user_id": String,
        "user": String,
        "comment": String
    });

    return CommentSchema;
};