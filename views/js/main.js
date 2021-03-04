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
        } else {
          $("#users").empty();
          var rows = json.data;
          for (var i = 0; i < rows.length; i++) {
            $("#users").append(null);
          }
        }
      },
      error: function(textStatus, errorThrown) {
        alert("Request failed!");
      }
    });
  }
  showUsers();

  $("#submit_button").click(function() {
    var found = 0;
    var universityId = $("#InputID").val();
    // date functionality added
    var today = new Date();
    var dd = ("0" + (today.getDate())).slice(-2);
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $("#todays-date").attr("value", today);
    // ends with selected date
    var firstName = $("#InputFirstName1").val();
    var lastName = $("#InputLastName1").val();
    var email = $("#InputEmail1").val();
    var exposure = $('input[name=exposure]:checked', '#exposure').val() === "on" ? 0 : 1;
    for (var i = 0; i < exposure.length; i++) {
      if (exposure[i].checked) {
        found == 1
      } else {
        found == 0
      }
    }


    var testResult = $('input[name=test]:checked', '#testResult').val() === "on" ? 0 : 1;
    var feverChills = $('input[name=feverChills]:checked', '#feverChills').val() === "on" ? 0 : 1;
    var cough = $('input[name=cough]:checked', '#cough').val() === "on" ? 0 : 1;
    var breathing = $('input[name=breathing]:checked', '#breathing').val() === "on" ? 0 : 1;
    var lossOfTasteSmell = $('input[name=smell]:checked', '#smell').val() === "on" ? 0 : 1;
    var bodyAches = $('input[name=bodyAches]:checked', '#bodyAches').val() === "on" ? 0 : 1;
    var quarantineStatus = $('input[name=status]:checked', '#quarantineStatus').val() === "on" ? 0 : 1;

    // more to added
    console.log($("#exposure").val());
    console.log(universityId, "universityId");
    console.log(firstName, "firstName");
    console.log(email, "email");
    console.log(today, "today");
    console.log(exposure, "exposure");
    console.log(testResult, "testResult");
    console.log(feverChills, "feverChills");
    console.log(cough, "cough");
    console.log(breathing, "breathing");
    console.log(lossOfTasteSmell, "smell");
    console.log(bodyAches, "bodyAches");
    console.log(quarantineStatus, "quarantineStatus");
    $.ajax({
      type: "POST",
      url: "add_user",
      data: JSON.stringify({
        universityId: universityId,
        today: today,
        firstName: firstName,
        lastName: lastName,
        email: email,
        exposure: exposure,
        testResult: testResult,
        feverChills: feverChills,
        cough: cough,
        breathing: breathing,
        lossOfTasteSmell: lossOfTasteSmell,
        bodyAches: bodyAches,
        quarantineStatus: quarantineStatus
      }),
      success: function(json) {
        //console.log(JSON.stringify(json));
        if (!json.success) {
          alert(json.message);
        } else {
          showUsers();
        }
      },
      error: function(textStatus, errorThrown) {
        alert("Request failed!");
      }
    });
  });

});
