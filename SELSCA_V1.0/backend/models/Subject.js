const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true,
        unique : true
    }
});

module.exports = Subject = mongoose.model('Subject', SubjectSchema);
