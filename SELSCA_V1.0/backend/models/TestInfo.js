const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestInfoSchema = new Schema({

    testName : {
        type : String,
        required : true
    },
    testClass : {//here I changed class to testClass to mathch with variable name used in testInfo2.js 
        type : String,
        required : true
    },
    subject: {
        type : String,
        required : true
    } ,
    date : {
        type : Date,
        required : true
    } ,
    maxScore  : {
        type : Number,
        required : true
    },
<<<<<<< HEAD
    //new start
=======
>>>>>>> c1d140789c35ef3291ebd9176cb96e3b64df671b
    gradesDueDate : {
        type : Date
    } , 
    syllabus : {
        type : String
<<<<<<< HEAD
    },
    //new end
=======
    }
>>>>>>> c1d140789c35ef3291ebd9176cb96e3b64df671b
})

module.exports = TestInfo = mongoose.model('TestInfo' , TestInfoSchema);