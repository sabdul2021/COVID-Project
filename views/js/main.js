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
    var student_id = $("#student_id").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var exposure = $('input[name="exposure"]:checked').val();
    // more to added
    $.ajax({
      type: "POST",
      url: "add_user",
      data: JSON.stringify({
        student_id: student_id,
        firstName: firstName,
        lastName: lastName,
        email: email
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
