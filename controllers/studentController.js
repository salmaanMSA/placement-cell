const Student = require('../models/studentDetails');


module.exports.addStudent = async function(req, res){
    if(req.isAuthenticated()){
        try{
            batch = req.body.batch;
            studname = req.body.name;
            college = req.body.college;
            stud_status = req.body.status;
            dsascore = req.body.dsaScore;
            webdscore = req.body.webDScore;
            reactscore = req.body.reactScore;
            console.log(batch, studname, college, stud_status, dsascore, webdscore, reactscore);

            let newStud = Student.create({
                batch: batch,
                name: studname,
                college: college,
                status: stud_status,
                DSAScore: dsascore,
                WebDScore: webdscore,
                ReactScore: reactscore,
            });

            if (newStud){
                req.flash('success', "New Student Details Added");
                return res.redirect('back');
            }
        }
        catch(err){
            console.log(err);
            req.flah("Error in Adding Student");
            return res.redirect('back');
        }
    }
}

module.exports.removeStudent = async function(req, res){
    if (req.isAuthenticated()){
        let student = await Student.deleteOne({_id: req.params.id});
        if (student){
            req.flash('success', "Student Deleted Successfully");
            return res.redirect('back');
        }
        else{
            req.flash('error', "Error in deleting student")
            return res.redirect('back');
        }
    }
    else{
        return res.redirect('users/signIn');
    }
}

module.exports.editStudent = async function(req, res){
    if (req.isAuthenticated()){
        let student = await Student.findOne({_id: req.params.id});
        if (student){
            student.batch = req.body.edit_batch;
            student.name = req.body.edit_name;
            student.college = req.body.edit_college;
            student.status = req.body.edit_status == '1' ? 'Placed' : 'Not Placed';
            student.DSAScore = req.body.edit_dsaScore;
            student.WebDScore = req.body.edit_webDScore;
            student.ReactScore = req.body.edit_reactScore;
            student.save();

            req.flash('sucess', "Student Details Updated");
            return res.redirect('back')
        }
        else{
            req.flash('error', 'Invalid User');
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Invalid Request');
        return res.redirect('users/signIn');
    }
}