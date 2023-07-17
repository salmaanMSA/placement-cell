const Interview = require('../models/InterviewDetails');
const csvWriter = require('csv-writer');
const CsvParser = require('json2csv').Parser;
const path = require('path');


// render csv page
module.exports.viewCsvPage = function(req, res){
    if (req.isAuthenticated()){
        return res.render('csvReport', {title: "PlacementCell | CsvReport"});
    }
    return res.redirect('/users/signIn');
}

// generate csv report using from and two date
module.exports.reportGenerate = async function(req, res){
    if (req.isAuthenticated()){
        try{
            let from_date = new Date(req.body.from_date);
            let to_date = new Date(req.body.to_date);
            
            // fetch details
            let interviewDet = await Interview.find({
                createdAt: {$gte: from_date, $lte: to_date}
            }).populate('student').populate('company');

            let csvData = dataToCsv(interviewDet); // convert to json format

            var fieldNames = ['Student Id', 'Student Batch', 'Student Name', 'Student College',
            'Status', 'DSA Final Score', 'WebD Final Score', 'React Final Score', 'Interview Date',
            'Interview Company', 'Job Role', 'Interview Student Result'];

            // parse to csv
            var csvParser = new CsvParser({fieldNames});
            var parsedCsvData = csvParser.parse(csvData);

            // setting headers
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment: filename=interviewResults.csv');

            res.status(200).end(parsedCsvData);
        }
        catch(err){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        
    }
}

// convert db data to json data
function dataToCsv(data){
    var csvData = []
    data.forEach(function(object){
        csvData.push({
            id: object.student._id,
            batch: object.student.batch,
            name: object.student.name,
            college: object.student.college,
            status: object.student.status,
            DSAScore: object.student.DSAScore,
            WebDScore: object.student.WebDScore,
            ReactScore: object.student.ReactScore,
            doi: object.company.doi,
            companyName: object.company.companyName,
            jobRole: object.company.jobRole,
            interviewResult: object.interviewResult
        });
    });
    return csvData;
}