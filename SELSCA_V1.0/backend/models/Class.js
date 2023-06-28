const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    students: [
        {
            type: String,
        }
    ],
    tests: [
        {
            type: String
        }
    ],
<<<<<<< HEAD
    //new start
    subject : [
        {
            type : String
        }
    ]
    //new end
=======
    subjects : [
        {
            type :mongoose.Schema.Types.ObjectId,
            ref : "Subject"
        }
    ]
>>>>>>> c1d140789c35ef3291ebd9176cb96e3b64df671b
});

module.exports = Class = mongoose.model('Class', ClassSchema);
