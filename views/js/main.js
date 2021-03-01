$(function() {
  //console.log("jquery loaded!");

  function showUsers() {
    $("#users").empty();
    $("#users").append("Loading data ...");
    $.ajax({
      type: "GET",
      url: "users",
      success: function(json) {
        //console.log(JSON.stringify(json));
        if (!json.success) {
          alert(json.message);
        }
        else {
          $("#users").empty();
          var rows = json.data;
          for (var i = 0; i < rows.length; i++) {
            $("#users").append(rows[i].ID + " " + rows[i].NAME + "<br>");
          }
        }
      },
      error: function (textStatus, errorThrown) {
        alert("Request failed!");
      }
    });
  }
  showUsers();

  $("#submit_button").click(function() {
    var student_id = $("#InputID").val();
    var firstName = $("#InputFirstName1").val();
    var lastName = $("#InputLastName1").val();
    var email = $("#InputEmail1").val();
    var exposure = $('input[name="exposure"]:unchecked').val();
    var testResult = $('input[name="test"]:unchecked').val();
    var symptoms = $('input[name="exampleRadios"]:unchecked').val();
    var quarantineStatus = $('input[name="status"]:unchecked').val();
    // more to added
    $.ajax({
      type: "POST",
      url: "add_user",
      data: JSON.stringify({
        student_id: student_id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        exposure: exposure,
        testResult: testResult,
        symptoms: symptoms,
        quarantineStatus: quarantineStatus
      }),
      success: function(json) {
        //console.log(JSON.stringify(json));
        if (!json.success) {
          alert(json.message);
        }
        else {
          showUsers();
        }
      },
      error: function (textStatus, errorThrown) {
        alert("Request failed!");
      }
    });
  });

});
