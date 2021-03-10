$(function() {
  //console.log("jquery loaded!");

  function showUsers() {
    $('#users').empty();
    $("#users").append("Loading data ...");
    $.ajax({
      type: "GET",
      url: "users",
      success: function(json) {
        //console.log(JSON.stringify(json));
        if (!json.success) {
          alert(json.message);
        } else {
          $('#users').empty();
        }
      },
      error: function() {
        alert("Request failed!");
      }
    });
  }
  showUsers();

  $("#submit_button").click(function() {
    let universityId = $("#InputID").val();
    // date functionality added
    let today = new Date();
    let dd = ("0" + (today.getDate())).slice(-2);
    let mm = ("0" + (today.getMonth() + 1)).slice(-2);
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $("#todays-date").attr("value", today);

    // select drop-down
    let selectTypeUniversity = $("#inputGroupSelect01 :selected").val();
    // ends with selected date
    let firstName = $("#InputFirstName1").val();
    let lastName = $("#InputLastName1").val();
    let email = $("#InputEmail1").val();
    let exposure = Number($('input[name=exposure]:checked', '#covidform').val());
    let testResult = Number($('input[name=test]:checked', '#covidform').val());
    let feverChills = Number($('input[name=feverChills]:checked', '#covidform').val());
    let cough = Number($('input[name=cough]:checked', '#covidform').val());
    let breathing = Number($('input[name=breathing]:checked', '#covidform').val());
    let lossOfTasteSmell = Number($('input[name=smell]:checked', '#covidform').val());
    let bodyAches = Number($('input[name=bodyAches]:checked', '#covidform').val());
    let quarantineStatus = Number($('input[name=status]:checked', '#covidform').val());

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
        selectTypeUniversity: selectTypeUniversity,
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
      error: function() {
        alert("Request failed!");
      }
    });
  });

});

let close = document.getElementsByClassName("closebtn");
let i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    let div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
    alert("Survey has been submitted");
  }
}