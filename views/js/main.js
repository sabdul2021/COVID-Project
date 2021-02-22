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

  $("#submit button").click(function() {
    var exposurer = $('input:checkbox[name=exposure]:unchecked').val();
    var test = $('input:checkbox[name=test]:unchecked').val();
    var symptom = $('select:dropdown[name=dropdown1]:').val();
    for( var i = 0; i < symptom; i++){
        var symptomType = symptom[i]['symptom'];
        $("#symptom").append("<option value=''>"+symptomType+"</option>");
    }
    var quarantineStatus = $('select:dropdown[name=dropdown2]:').val();
    for( var i = 0; i < symptom; i++){
        var uarantineType = quarantineStatus[i]['quarantine'];
        $("#quarantine").append("<option value=''>"+symptomType+"</option>");
    }
    $.ajax({
      type: "POST",
      url: "add_user",
      data: JSON.stringify({
        exposurer: exposurer,
        test: test,
        symptom: symptom,
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
