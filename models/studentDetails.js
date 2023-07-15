const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    batch: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        require: true
    },

    college: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }, 

    DSAScore: {
        type: Number
    },

    WebDScore: {
        type: Number
    },

    ReactScore: {
        type: Number
    }
}, {
    timestamps: true
});

const Student = mongoose.model('StudentDet', studentSchema);

module.exports = Student;