const User = require('../models/user');
const Student = require('../models/studentDetails');

// render dashboard page with student details
module.exports.dashboard = async function(req, res){
    if(req.isAuthenticated()){
        let students = await Student.find({});
        return res.render('dashboard', {title: "PlacementCell", students: students});
    }
    else{
        return res.redirect('users/signIn');
    }
    
}