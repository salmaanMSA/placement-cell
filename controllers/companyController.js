const Company = require('../models/companyDetails');
const Interview = require('../models/InterviewDetails');

// List all the company details
module.exports.companyLists = async function(req, res){
    if (req.isAuthenticated()){
        try{
            let companyList = await Company.find({});
            return res.render('companyList', {title: "Company Lists", companies: companyList});
        }
        catch(err){
            req.flash('error', "Error in fetching company lists");
            return res.redirect('back');
        }
        
    }
    return res.redirect('back');
}

// create new company details
module.exports.addCompany = async function(req, res){
    if (req.isAuthenticated()){
        try{
            let doi = req.body.doi;
            let name = req.body.company_name;
            let jobRole = req.body.job_role;

            let new_company = await Company.create({
                companyName: name,
                jobRole: jobRole,
                doi: doi,
            });
            
            if (new_company){
                req.flash('success', "New Company Details Created");
                return res.redirect('back');
            }
            else{
                req.flash('error', "Error in creating new company");
                return res.redirect('back');
            }
        }
        catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        return res.redirect('users/signIn');
    }
}

// edit the existing company details
module.exports.editCompany = async function(req, res){
    if (req.isAuthenticated()){
        try{
            let company = await Company.findById(req.params.id);
            if (company){
                company.doi = req.body.edit_doi;
                company.companyName = req.body.edit_company_name;
                company.jobRole = req.body.edit_job_role;
                company.save();
                req.flash('success', "Company Details Updated Successfully");
                return res.redirect('back');
            }
            else{
                req.flash('error', "Invalid Company Id");
                return res.redirect('back');
            }
        }
        catch(err){
            req.flash('error', err.message);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', "Invalid Request");
        return res.redirect('users/signIn');
    }
}

// delete the company details from the params id
module.exports.removeCompany = async function(req, res){
    if (req.isAuthenticated()){
        let company = await Company.deleteOne({_id: req.params.id});
        if (company){
            await Interview.deleteMany({company: req.params.id});
            req.flash('success', "Company Deleted Successfully");
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