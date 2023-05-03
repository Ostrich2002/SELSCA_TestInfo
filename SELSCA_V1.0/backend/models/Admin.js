const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    studentID : {
        type : String,
    },
    address : {
        type : String,
    
    },
    gender : {
        type : String,
    }
})

module.exports = Admin = mongoose.model('Admin' , AdminSchema);