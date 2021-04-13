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

    $.ajax({
        type: "GET",
        url: "/test_results",
        success: function (json) {
            console.log(json);
        },
        error: function () {
            alert("error");
        }
    });

    $.ajax({
        type: "GET",
        url: "/quarantine_status",
        success: function (json) {
            console.log(json);
        },
        error: function () {
            alert("error");
        }
    });

    $.ajax({
        type: "GET",
        url: "/exposure_timeline",
        success: function (json) {
            console.log(json);
        },
        error: function () {
            alert("error");
        }
    });

    $.ajax({
        type: "GET",
        url: "/table_data",
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

        if (universityId === "") {
            alert("University ID is needed");
            return false;
        }

        if (firstName === "") {
            alert("first name is needed");
            return false;
        }

        if (lastName === "") {
            alert("last name is needed");
            return false;
        }

        if (today === false) {
            alert("date is needed");
            return false;
        }

        if (email === "") {
            alert("email is required");
            return false;
        }

        if (explainSymptoms === "") {
            alert("please explain any symptoms you are experiencing");
            return false;
        }

        if (isNaN(commuter)) {
            alert('Please answer if you commute or not');
            return false;
        }

        if (isNaN(exposure)) {
            alert('Please answer if you have been exposed');
            return false;
        }

        if (isNaN(testResult)) {
            alert('Please answer if you receive your test results');
            return false;
        }

        if (isNaN(feverChills)) {
            alert('Please answer if you have experience fever or chills');
            return false;
        }

        if (isNaN(cough)) {
            alert('Please answer if you experience any sign of coughing');
            return false;
        }

        if (isNaN(breathing)) {
            alert('Please answer if you having trouble breathing');
            return false;
        }

        if (isNaN(lossOfTasteSmell)) {
            alert('Please answer if you have loss of taste or smell');
            return false;
        }

        if (isNaN(bodyAches)) {
            alert('Please answer if you experience any body aches');
            return false;
        }

        if (isNaN(quarantineStatus)) {
            alert('Please answer if you have been in quarantine lately');
            return false;
        }

        if (isNaN(mask)) {
            alert('Please answer if you recently are wearing mask or not');
            return false;
        }

        if (isNaN(closeContact)) {
            alert('Please answer if you have been in close contact with anyone in mind');
            return false;
        }

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


$(document).ready(function () {
    showBarGraph();
    showLineGraph();
    showTable();
});

function showBarGraph() {
    $.post("/exposure", function (data) {
        $.post("/test_results", function (test_data) {
            $.post("/quarantine_status", function (survey_data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(exposure)"]);
                let exposure = [0, data.data[0]["SUM(exposure)"]];
                let testResult = [0, test_data.data[0]["SUM(testResult)"]];
                let quarantineStatus = [0, survey_data.data[0]["SUM(quarantineStatus)"]];

                console.log(exposure);
                let chartdata = {
                    labels: ["Exposure ", "Test Result ", "Quarantine Status "],
                    datasets: [{
                        label: ["Exposure ", "Test Result ", "Quarantine Status "],
                        backgroundColor: ['#0C82F7', '#95F308', '#F36E08'],
                        borderColor: ['#0C82F7'],
                        hoverBorderColor: ['#0C82F7', '#95F308', '#F36E08'],
                        data: [exposure, testResult, quarantineStatus],
                    }]
                };

                let graphTarget = $("#canvas1");

                new Chart(graphTarget, {
                    type: 'bar',
                    data: chartdata
                });
            });
        });
    });
}


// function showBarGraph2() {
//     {
//         $.post("/test_results",
//             function (data) {
//                 console.log(data.data);
//                 console.log((Object.keys((data.data))));
//                 console.log(data.data[0]["SUM(testResult)"]);
//                 let testResult = [0, data.data[0]["SUM(testResult)"]];
//
//
//                 console.log(testResult);
//                 let chartdata = {
//                     labels: ["testResult"],
//                     datasets: [{
//                         label: 'TestResult',
//                         backgroundColor: '#95F308',
//                         borderColor: '#46d5f1',
//                         hoverBorderColor: '#666666',
//                         data: [testResult],
//                     }]
//                 };
//
//                 let graphTarget = $("#canvas2");
//
//                 new Chart(graphTarget, {
//                     type: 'bar',
//                     data: chartdata
//                 });
//             });
//     }
// }
//

function showLineGraph() {
    {
        $.post("/exposure_timeline",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(exposure)"]);

                // let exposure = [0, data.data[0]["SUM(exposure)"], data.data[0]["today"]];
                // let today = [data.data[0]["today"]];

                // for (let i in data) {
                //     if (data.hasOwnProperty(i)) {
                //         exposure.push(data[i].exposure);
                //         today.push(data[i].today);
                //     }
                // }
                let exposure = [];
                let today = [];
                for (let i = 0; i < data.data.length; i++) {
                    exposure.push(data.data[i]["SUM(exposure)"]);
                    today.push(data.data[i]["today"]);
                }
                console.log(exposure);
                console.log(today);

                let chartdata = {
                    labels: today,
                    datasets: [{
                        label: 'Exposure',
                        backgroundColor: '#F36E08',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: exposure,
                    }]
                };

                let graphTarget = $("#canvas4");

                new Chart(graphTarget, {
                    type: 'line',
                    data: chartdata
                });
            });

    }
}

function showTable() {
    $.get("/table_data",
        function (data) {
            console.log(data);
            $(data.data).each(function (i, dataShown) {
                $('#dataBody').append($("<tr>")
                    .append($("<td>").append(dataShown.universityId))
                    .append($("<td>").append(dataShown.firstName))
                    .append($("<td>").append(dataShown.lastName))
                    .append($("<td>").append(dataShown.email))
                    .append($("<td>").append(dataShown.exposure))
                    .append($("<td>").append(dataShown.testResult)))
            });
        });
}
