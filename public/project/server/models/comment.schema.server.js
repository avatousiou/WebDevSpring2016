module.exports = function(mongoose) {

    var CommentSchema = mongoose.Schema({
        "user": String,
        "comment": String
    });

    return CommentSchema;
};