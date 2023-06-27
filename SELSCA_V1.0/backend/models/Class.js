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
    subjects : [
        {
            type :mongoose.Schema.Types.ObjectId,
            ref : "Subject"
        }
    ]
});

module.exports = Class = mongoose.model('Class', ClassSchema);
