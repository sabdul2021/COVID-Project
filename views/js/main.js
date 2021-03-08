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
    var exposure = Number($('input[name=exposure]:checked', '#covidform').val());
    console.log("exposure:" + exposure);
    for (var i = 0; i < exposure.length; i++) {
      if (exposure[i].checked) {
        found == 1
      } else {
        found == 0
      }
    }


    var testResult = Number($('input[name=test]:checked', '#covidform').val());
    var feverChills = Number($('input[name=feverChills]:checked', '#covidform').val());
    var cough = Number($('input[name=cough]:checked', '#covidform').val());
    var breathing = Number($('input[name=breathing]:checked', '#covidform').val());
    var lossOfTasteSmell = Number($('input[name=smell]:checked', '#covidform').val());
    var bodyAches = Number($('input[name=bodyAches]:checked', '#covidform').val());
    var quarantineStatus = Number($('input[name=status]:checked', '#covidform').val());

    // more to added
    console.log("testResult: " + testResult);
    console.log("feverChills: " + feverChills);
    console.log("cough: " + cough);
    console.log("breathing: " + breathing);
    console.log("smell: " + lossOfTasteSmell,);
    console.log("bodyAches: " + bodyAches);
    console.log("quarantineStatus: " + quarantineStatus);
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
