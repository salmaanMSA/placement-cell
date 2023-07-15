$(document).on("click", "#editModal", function () {
    var stud_id = $(this).attr('data-id');
    var batch = $(this).attr('data-batch');
    var name = $(this).attr('data-name');
    var college = $(this).attr('data-college');
    var status = $(this).attr('data-status');
    var dsascore = $(this).attr('data-dsascore');
    var webdscore = $(this).attr('data-webdscore');
    var reactscore = $(this).attr('data-reactscore');

    $("#editStudent #editForm").attr('action', '/student/edit-student/' + stud_id);
    $("#editStudent #edit_batch").val(batch);
    $("#edit_name").val(name);
    $("#editStudent #edit_college").val(college);
    if (status === "Placed"){
        $("#editStudent #edit_status option[value=1]").attr('selected', 'selected');
    }
    else{
        $("#editStudent #edit_status option[value=2]").attr('selected', 'selected');
    }
    $("#editStudent #edit_dsascore").val(dsascore);
    $("#editStudent #edit_webdscore").val(webdscore);
    $("#editStudent #edit_reactscore").val(reactscore);
   });