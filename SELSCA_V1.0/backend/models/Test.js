const mongoose   = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    testName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    score: {
        type: Number,
    },
<<<<<<< HEAD
    //new start
    gradesDueDate : {
        type : Date,
    },
    //new end
=======
    gradesDueDate : {
        type : Date,
    }
>>>>>>> c1d140789c35ef3291ebd9176cb96e3b64df671b
});

module.exports = TestSchema