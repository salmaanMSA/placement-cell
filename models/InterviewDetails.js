const mongoose = require('mongoose');


const InterviewSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentDet'
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },

    interviewResult : {
        type: String
    }
}, {
    timestamps: true
});


const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;