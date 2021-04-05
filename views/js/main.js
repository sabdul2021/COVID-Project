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
        url: "/testResult",
        success: function (json) {
            console.log(json);
        },
        error: function () {
            alert("error");
        }
    });

    $.ajax({
        type: "GET",
        url: "/quarantineStatus",
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
            alert("please explain any symptoms");
            return false;
        }

        if (document.getElementById(feverChills.toString()) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(underGrad) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(grad) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(staff) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(commuter.toString()) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(explainSymptoms) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(exposure.toString()) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(testResult.toString()) === null) {
            alert('Please answer all questions');
        }
        if (document.getElementById(cough.toString()) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(breathing.toString()) === null) {
            alert('Please answer all questions');
        }
        if (document.getElementById(lossOfTasteSmell.toString()) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(bodyAches.toString()) === null) {
            alert('Please answer all questions');
        }

        if (document.getElementById(quarantineStatus.toString()) === null) {
            alert('Please answer all questions');
        }
        if (document.getElementById(closeContact.toString()) === null) {
            alert('Please answer all questions');
        }
       
        if (document.getElementById(mask.toString()) === null) {
            alert('Please answer all questions');
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
    showBarGraph1();
    showBarGraph2();
    showBarGraph3();
});

function showBarGraph1() {
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
                        backgroundColor: '#0C82F7',
                        borderColor: '#46d5f1',
                        hoverBorderColor: '#666666',
                        data: [exposure],
                    }]
                };

                let graphTarget = $("#canvas1");

                new Chart(graphTarget, {
                    type: 'bar',
                    data: chartdata
                });
            });
    }
}


function showBarGraph2() {
    {
        $.post("/testResults",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(testResult)"]);
                let testResult = [0, data.data[0]["SUM(testResult)"]];

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

                let graphTarget = $("#canvas2");

                new Chart(graphTarget, {
                    type: 'bar',
                    data: chartdata
                });
            });
    }
}


function showBarGraph3() {
    {
        $.post("/quarantineStatus",
            function (data) {
                console.log(data.data);
                console.log((Object.keys((data.data))));
                console.log(data.data[0]["SUM(quarantineStatus)"]);
                let quarantineStatus = [0, data.data[0]["SUM(quarantineStatus)"]];

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

                let graphTarget = $("#canvas3");

                new Chart(graphTarget, {
                    type: 'bar',
                    data: chartdata
                });
            });
    }
}


