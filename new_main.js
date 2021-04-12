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
        //  functionality added
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
            alert("please explain any symptoms");
            return false;
        }

        if (document.getElementById(feverChills) = null {
            alert('Please answer all questions');
        }

        if (document.getElementById(underGrad) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(grad) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(staff) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(commuter) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(explainSymptoms) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(exposure) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(test) = null) {
            alert('Plese answer all questions');
        }
        if (document.getElementById(cough) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(breathing) = null) {
            alert('Plese answer all questions');
        }
        if (document.getElementById(lossOfTasteSmell) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(bodyAches) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(status) = null) {
            alert('Plese answer all questions');
        }
        if (document.getElementById(closeContact) = null) {
            alert('Plese answer all questions');
        }

        if (document.getElementById(wearMask) = null) {
            alert('Plese answer all questions');
        }


        $(document).ready(function(){
            $('input[name="commuter"]').change(function () {
                if($(this).val() ==='1') {
                    $('#underGrad').prop('required',true);
                } else {
                    $('#underGrad').prop('required',false);
                }
            });
        });

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
    showLineGraph();
});

function showLineGraph() {
    {
        $.post("/exposure",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(exposure)"]);
                let exposure = [0, data.data[0]["SUM(exposure)"], data.data[0]["today"]];

                console.log(exposure);
                let chartdata = {
                    labels: ["exposure"],
                    datasets: [{
                        label: 'Exposure',
                        backgroundColor: '#0C82F7',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: [exposure],
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


function showLineGraph1() {
    {
        $.post("/testResult",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(testResult)"]);
                let testResult = [0, data.data[0]["SUM(testResult)"], data.data[0]["today"]];

                console.log(testResult);
                let chartdata = {
                    labels: ["testResult"],
                    datasets: [{
                        label: 'testResult',
                        backgroundColor: '#95F308',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: [testResult],
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


function showLineGraph1() {
    {
        $.post("/quarantineStatus",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(quarantineStatus)"]);
                let quarantineStatus = [0, data.data[0]["SUM(quarantineStatus)"], data.data[0]["today"]];

                console.log(quarantineStatus);
                let chartdata = {
                    labels: ["quarantineStatus"],
                    datasets: [{
                        label: 'quarantineStatus',
                        backgroundColor: '#F36E08',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: [quarantineStatus],
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

//admin.html data visuals --> line chart
function showLineGraph4() {
    {
        $.post("/exposure",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(exposure)"]);
                let exposure = [0, data.data[0]["SUM(exposure)"], data.data[0]["today"]];

                console.log(exposure);
                let chartdata = {
                    labels: ["exposure"],
                    datasets: [{
                        label: 'Exposure',
                        backgroundColor: '#0C82F7',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: [exposure],
                    }]
                };

                let graphTarget = $("#canvas");

                new Chart(graphTarget, {
                    type: 'line',
                    data: chartdata
                });
            });
    }
}

//example
function showLineGraph5() {
  {
    $.post("/exposure",
        function (data) {
            console.log(data.data);
            console.log((Object.keys((data.data))));
            console.log(data.data[0]["SUM(exposure)"]);
            let exposure = [0, data.data[0]["SUM(exposure)"], data.data[0]["today"]];

            console.log(exposure);

            let graphTarget = $("#canvas");

            new Chart(document.getElementById("line-chart"), {
              type: 'line',
              data: {
                labels: ["today"],
                dataset: [{
                    data: [exposure],
                    label: "Exposure",
                    borderColor: "#3e95cd",
                    fill: false
                  }]
              },
              options: {
                title: {
                  display: true,
                  text: 'Exposure Over Time'
                }
              }
            };
