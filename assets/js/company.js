// Edit Company details
$(document).on("click", "#company-edit-modal-launch", function () {
    var company_id = $(this).attr('data-id');
    var doi = $(this).attr('data-doi');
    var name = $(this).attr('data-companyName');
    var jobRole = $(this).attr('data-jobRole');
    $("#editCompany #company-edit-form").attr('action', '/company/edit-company/' + company_id);
    $("#editCompany #edit_doi").val(doi);
    $("#editCompany #edit_company_name").val(name);
    $("#editCompany #edit_job_role").val(jobRole);
});

// on click event for accordian
$("[data-bs-toggle]").on("click", function () {
    if ($(this).attr("id") === "company_accordian") {
        var company_id = $(this).attr("data-id");
        $.ajax({
            type: 'GET',
            url: '/interview/fetch/' + company_id,
            success: function (data) {
                let newDom = interviewDom(data);
                $('#interviewTable_' + company_id).html('')
                $('#interviewTable_' + company_id).append(newDom);
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
});

// interview DOM
let interviewDom = function (data) {
    if (data.data.interviews.length === 0) {
        return $(`
        <table class="table table-bordered">
            <thead>
              <tr class="text-center">
                <th scope="col">Batch</th>
                <th scope="col">Student Name</th>
                <th scope="col">College</th>
                <th scope="col">Interview Result</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
                <tr class="text-center">
                    <td colspan="5">No Records Found</td>
                </tr>
            </tbody>
        </table>`)
    }
    else {
        let dom1 = `<table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th scope="col">Batch</th>
            <th scope="col">Student Name</th>
            <th scope="col">College</th>
            <th scope="col">Interview Result</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>`

        let dom2 = ``

        for (let i = 0; i < data.data.interviews.length; i++) {
            dom2 += `
            <tr class="text-center">
                <td>${data.data.interviews[i].student.batch}</td>
                <td>${data.data.interviews[i].student.name}</td>
                <td>${data.data.interviews[i].student.college}</td>`

            if (data.data.interviews[i].interviewResult == "Pass"){
                dom2 += `<td>
                            <select class="select" id="interviewRes" name="interviewRes" value="${data.data.interviews[i].interviewResult}" data-id="${data.data.interviews[i]._id}">
                                <option value="">Select</option>
                                <option value="Pass" selected>Pass</option>
                                <option value="Fail">Fail</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Didn't Attempt">Didn't Attempt</option>
                            </select>
                        </td>`
            }
            else if(data.data.interviews[i].interviewResult == "Fail"){
                dom2 += `<td>
                            <select class="select" id="interviewRes" name="interviewRes" value="${data.data.interviews[i].interviewResult}" data-id="${data.data.interviews[i]._id}">
                                <option value="">Select</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail" selected>Fail</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Didn't Attempt">Didn't Attempt</option>
                            </select>
                        </td>`
            }
            else if (data.data.interviews[i].interviewResult == "On Hold"){
                dom2 += `<td>
                            <select class="select" id="interviewRes" name="interviewRes" value="${data.data.interviews[i].interviewResult}" data-id="${data.data.interviews[i]._id}">
                                <option value="">Select</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                                <option value="On Hold" selected>On Hold</option>
                                <option value="Didn't Attempt">Didn't Attempt</option>
                            </select>
                        </td>`
            }
            else if(data.data.interviews[i].interviewResult == "Didn't Attempt"){
                dom2 += `<td>
                            <select class="select" id="interviewRes" name="interviewRes" value="${data.data.interviews[i].interviewResult}" data-id="${data.data.interviews[i]._id}">
                                <option value="">Select</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Didn't Attempt" selected>Didn't Attempt</option>
                            </select>
                        </td>`
            }
            else{
                dom2 += `<td>
                            <select class="select" id="interviewRes" name="interviewRes" value="${data.data.interviews[i].interviewResult}" data-id="${data.data.interviews[i]._id}">
                                <option value="" selected>Select</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Didn't Attempt">Didn't Attempt</option>
                            </select>
                        </td>`
            }
            
            dom2 += `<td>
                        <a href="/interview/delete-interview/${data.data.interviews[i]._id}" class="btn btn-sm btn-danger">Delete</a>
                    </td>
                </tr>`
        }

        let dom3 = `</tbody>
                    </table>`

        return dom1 + dom2 + dom3;
    }
}

// on click event for allocate student button
$("[data-bs-toggle]").on("click", function () {
    if ($(this).attr("id") === "interview-modal-launch") {
        var company_id = $(this).attr("data-id");
        $.ajax({
            type: 'GET',
            url: '/interview/fetch-students/',
            success: function (data) {
                let studentDom = studentSelectDom(data.data);
                $('#company_id').val(company_id);
                $('#allocateInterview #select_student').html('');
                $('#allocateInterview #select_student').append(studentDom);
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
});

let studentSelectDom = function (data) {
    if (data.students.length === 0) {
        return $(`<option selected>No Students Records Found</option>`)
    }
    else {
        let dom = `<option selected>Select Students</option>\n`;
        for (let i = 0; i < data.students.length; i++) {
            dom += `<option value="${data.students[i]._id}">Name: ${data.students[i].name} || College: ${data.students[i].college}</option>\n`
        }
        return dom;
    }
}

// on click event for select option change
$(document).on('change', 'select', function(){
    if ($(this).attr('id') === "interviewRes"){
        $.ajax({
            type: "POST",
            url:  "/interview/update-result/" + $(this).attr('data-id') + "?result=" + $(this).val(),
            data: {},
            dataType: "json",
            contentType: "application/json",
            success: function(response){
                new Noty({
                    theme: 'relax',
                    text: "Student Result Updated Successfully",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error: function(err){
                alert('Error occured ' + err.message);
            }
        });
    }
})