$(function () {
    //console.log("jquery loaded!");

    function showUsers() {
        $('#users').empty();
        $("#users").append("Loading data ...");
        $.ajax({
            type: "GET",
            url: "users",
            success: function (json) {
                //console.log(JSON.stringify(json));
                if (!json.success) {
                    alert(json.message);
                } else {
                    $('#users').empty();
                }
            },
            error: function () {
                alert("Request failed!");
            }
        });
    }

    $.ajax({
        type: "GET",
        url: "/exposure",
        success: function (json) {
            console.log(json);
        },
        error: function () {
            alert("error");
        }
    });


    showUsers();

    $("#submit_button").click(function () {
        let universityId = $("#InputID").val();
        // date functionality added
        let today = new Date();
        let dd = ("0" + (today.getDate())).slice(-2);
        let mm = ("0" + (today.getMonth() + 1)).slice(-2);
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        $("#todays-date").attr("value", today);
        let underGrad = $("#underGrad").prop("checked");
        let grad = $("#grad").prop("checked");
        let faculty = $("#faculty").prop("checked");
        let staff = $("#staff").prop("checked");
        let firstName = $("#InputFirstName1").val();
        let lastName = $("#InputLastName1").val();
        let email = $("#InputEmail1").val();
        let commuter = Number($('input[name=commuter]:checked', '#covidform').val());
        let exposure = Number($('input[name=exposure]:checked', '#covidform').val());
        let testResult = Number($('input[name=test]:checked', '#covidform').val());
        let feverChills = Number($('input[name=feverChills]:checked', '#covidform').val());
        let cough = Number($('input[name=cough]:checked', '#covidform').val());
        let breathing = Number($('input[name=breathing]:checked', '#covidform').val());
        let lossOfTasteSmell = Number($('input[name=smell]:checked', '#covidform').val());
        let bodyAches = Number($('input[name=bodyAches]:checked', '#covidform').val());
        let quarantineStatus = Number($('input[name=status]:checked', '#covidform').val());
        let closeContact = Number($('input[name=closeContact]:checked', '#covidform').val());
        let explainSymptoms = $("#explainSymptoms").val();
        let mask = Number($('input[name=wearMask]:checked', '#covidform').val());


        // more to added
        console.log("underGrad : " + underGrad);
        console.log("grad: " + grad);
        console.log("faculty: " + faculty);
        console.log("staff: " + staff);
        console.log("testResult: " + testResult);
        console.log("feverChills: " + feverChills);
        console.log("cough: " + cough);
        console.log("breathing: " + breathing);
        console.log("smell: " + lossOfTasteSmell,);
        console.log("bodyAches: " + bodyAches);
        console.log("quarantineStatus: " + quarantineStatus);
        console.log("closeContact: " + closeContact);
        console.log("explainSymptoms: " + explainSymptoms);
        console.log("mask: " + mask);
        $.ajax({
            type: "POST",
            url: "add_user",
            data: JSON.stringify({
                universityId: universityId,
                today: today,
                underGrad: underGrad,
                grad: grad,
                faculty: faculty,
                staff: staff,
                firstName: firstName,
                lastName: lastName,
                email: email,
                commuter: commuter,
                exposure: exposure,
                testResult: testResult,
                feverChills: feverChills,
                cough: cough,
                breathing: breathing,
                lossOfTasteSmell: lossOfTasteSmell,
                bodyAches: bodyAches,
                quarantineStatus: quarantineStatus,
                closeContact: closeContact,
                explainSymptoms: explainSymptoms,
                mask: mask
            }),
            success: function (json) {
                //console.log(JSON.stringify(json));
                if (!json.success) {
                    alert(json.message);
                } else {
                    showUsers();
                }
            },
            error: function () {
                alert("Request failed!");
            }
        });
    });

});

let close = document.getElementsByClassName("closebtn");
let i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
        alert("Survey has been submitted");
    }
}

$(document).ready(function () {
    showLineGraph();
});

function showLineGraph() {
    {
        $.post("/exposure",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(exposure)"]);
                let exposure = [0, data.data[0]["SUM(exposure)"]];

                console.log(exposure);
                let chartdata = {
                    labels: ["exposure"],
                    datasets: [{
                        label: 'Exposure',
                        backgroundColor: '#1E90FF',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: [exposure]
                    }]
                };

                let graphTarget = $("#canvas");

                new Chart(graphTarget, {
                    type: 'bar',
                    data: chartdata
                });
            });
    }
}

let ctx = document.getElementById('canvas').getContext('2d');
let canvas = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});