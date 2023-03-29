// URLS..
InsertPatientDataUrl = "http://127.0.0.1:5000/post/patientData"

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});

// DOMContentLoaded functions
document.addEventListener("DOMContentLoaded",
    function (event) {
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var date = dt.getDate();

        if (month < 10) {
            month = "0" + month;
        }

        if (date < 10) {
            date = "0" + date;
        }

        currentDate = year + "-" + month + "-" + date;
        document.getElementById("date").setAttribute("min", currentDate);
    }
);

// Appointment booking function
var confirmationHTML = "templates/confirmation_popup.html";
function bookAppointment() {
    // console.log("Book Appointment button clicked");
    var username = document.querySelector("#username").value;
    var phoneNumber = document.querySelector("#phone").value;
    var appointmentDate = document.querySelector("#date").value;
    var slot = document.querySelector("#slots").value;
    var message = document.querySelector("#message").value;

    if ((username) && (phoneNumber) && (appointmentDate) && (slot)) {
        patientObj = {
            "username": username,
            "phoneNumber": phoneNumber,
            "appointmentDate": appointmentDate,
            "slot": slot,
            "message": message
        }
        // console.log(patientObj)
        // Post request to insert data
        $ajaxUtils.sendPostRequest(
            InsertPatientDataUrl,
            function (response) {
                console.log("Post request called");
            },
            JSON.stringify(patientObj)
        );
        // Confirmation Pop-Up
        successMsg = "Dear " + "<b>" + username + "</b>";
        successMsg += ", appointment on " + appointmentDate + " at " + slot + " is booked.";
        successMsg += " Have a nice day ahead..!";
        document.querySelector(".modal-subheadline").innerHTML = successMsg;
        $("#staticBackdrop").modal("show");
    }
    else {
        errorMsg = "* All fields are compulsory except the message field *";
        document.querySelector("#errorMsg").innerHTML = errorMsg;
    }
}