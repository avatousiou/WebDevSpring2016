module.exports = function(mongoose){
    var FieldSchema = require('./field.schema.server.js')(mongoose);

    var FormSchema = mongoose.Schema({
        "userId": String,
        "title": {
            "type": String,
            "default": "New Form"
        },
        "fields": [FieldSchema],
        "createdAt": {
            "type": Date,
            "default": Date.now
        },
        "updatedAt": {
            "type": Date,
            "default": Date.now
        }
    });
    return FormSchema;
};