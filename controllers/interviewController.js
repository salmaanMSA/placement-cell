const Interview = require('../models/InterviewDetails');
const Student = require('../models/studentDetails');

// fetch interview details
module.exports.fetchInterviewDetails = async function(req, res){
    if (req.xhr){
        let interviews = await Interview.find({company: req.params.id})
        .populate('student')
        .populate('company');
        return res.status(200).json({
            data: {
                interviews: interviews
            },
            message: 'Interview Details Fetched Successfully'   
        });
    }
}

// fetch all students
module.exports.fetchAllStudents = async function(req, res){
    if (req.xhr){
        let students = await Student.find({});
        return res.status(200).json({
            data: {
                students: students
            },
            message: 'All Students Details Fetched Successfully'
        });
    }
}

// create a new interview or allocate student to the interview
module.exports.createInterview = async function(req, res){
    if (req.isAuthenticated()){
        try {
            let company_id = req.body.company_id;
            let student_id = req.body.select_student;
            await Interview.create({
                company: company_id[0],
                student: student_id,
            });
            req.flash('success', "New Student Allocated for the Interview");
            return res.redirect('back')
        }
        catch(err){
            req.flash('error', err.message);
            return res.redirect('back');
        }
    }
    return res.redirect('users/signIn');
}

// remove tha allocated student from interview
module.exports.deleteInterview = async function(req, res) {
    if (req.isAuthenticated()){
        try{
            await Interview.deleteOne({_id: req.params.id});
            req.flash('success', 'Student Interview Allocation removed');
            return res.redirect('back');
        }
        catch(err){
            req.flash('error', err.message);
            return res.redirect('back');
        }
    }
    return res.redirect('users/signIn');
}

// update the student interview result
module.exports.updateInterviewResults = async function(req, res){
    if (req.xhr){
        let interviewDet = await Interview.findOne({_id: req.params.id});
        if (interviewDet){
            interviewDet.interviewResult = req.query.result;
            interviewDet.save();

            return res.status(200).json({
                data: {
                    interviewDet: interviewDet,
                },
                message: 'All Students Details Fetched Successfully'
            });
        }
        return res.status(500).json({
            message: 'Error in Updating interview result'
        });
    }
}