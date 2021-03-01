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
    // date functionality added
    var today = new Date();
    var dd = ("0" + (today.getDate())).slice(-2);
    var mm = ("0" + (today.getMonth() +　1)).slice(-2);
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd ;
    $("#todays-date").attr("value", today);
    // ends with selected date
    var firstName = $("#InputFirstName1").val();
    var lastName = $("#InputLastName1").val();
    var email = $("#InputEmail1").val();
    var exposure = $('input[name="exposure"]:checked').val();
    var testResult = $('input[name="test"]:checked').val();
    var symptoms = $('input[name="exampleRadios"]:checked').val();
    var quarantineStatus = $('input[name="status"]:checked').val();
    // more to added
    $.ajax({
      type: "POST",
      url: "add_user",
      data: JSON.stringify({
        student_id: student_id,
        today: today,
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
