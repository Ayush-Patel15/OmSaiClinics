// Global paths - file paths and URLS
adminLoginUrl = "https://omsaiclinics.onrender.com/adminLogin"
adminHomeUrl = "https://omsaiclinics.onrender.com/adminHome"
loginAuthUrl = "https://omsaiclinics.onrender.com/authLogin"
AllAppointmentDataUrl = "http://127.0.0.1:5000/appointments/data"
TodayAppointmentDataUrl = "http://127.0.0.1:5000/appointments/data/today"
TomorrowAppointmentDataUrl = "http://127.0.0.1:5000/appointments/data/tomorrow"
YesterdayAppointmentDataUrl = "http://127.0.0.1:5000/appointments/data/yesterday"

// as soon as the document loaded, lauch the function
$(function () {
    if (localStorage.getItem("username")) {
        todaysPatients();
    }
    else {
        LoadLoginPage();
    }
});

// Function to load the Login Page 
function LoadLoginPage() {
    $ajaxUtils.sendGetRequest(
        adminLoginUrl,
        function (response) {
            // console.log(response.responseText);
            document.querySelector("#mainContent").innerHTML = response.responseText;
        }
    );
}

// Global helper function to load the admin Page
function LoadAdminPage() {
    $ajaxUtils.sendGetRequest(
        adminHomeUrl,
        function (response) {
            // console.log("Admin Page");
            document.querySelector("#mainContent").innerHTML = response.responseText;
        }
    );
}

// function to insert the data in the table
function loadTableData (data) {
    for (var i=0; i < data.length; i++) {
        // console.log(data[i]);
        $("tbody").append("<tr id=data" + i + "></tr>");
        tableData = "";
        tableData += "<td>" + (i+1) + "</td>";
        tableData += "<td>" + data[i]["username"] + "</td>";
        tableData += "<td>" + data[i]["phoneNumber"] + "</td>";
        tableData += "<td>" + data[i]["appointmentDate"] + "</td>";
        tableData += "<td>" + data[i]["slot"] + "</td>";
        tableData += "<td>" + data[i]["message"] + "</td>";
        document.querySelector("#data" + [i]).innerHTML = tableData;
    }
}

// Admin Login function to load out the main page
function loginAdmin() {
    var email = document.querySelector("#emailId").value;
    var password = document.querySelector("#password").value;

    // If both email and password entered
    if ((email) && (password)) {
        loginDetails = {
            "email": email,
            "password": password
        }
        // console.log(loginDetails);
        // post request to authenticate login
        $ajaxUtils.sendPostRequest(
            loginAuthUrl,
            function (response) {
                res = JSON.parse(response.responseText);
                if (res["status"] == 200) {
                    console.log("Login Successful");
                    todaysPatients();
                    localStorage.setItem("username", email);
                }
                // not success
                else {
                    console.log("Login UnSuccessful");
                    errorMessage = "<b>* Invalid credentials. Please try again..! *</b>"
                    document.querySelector("#errorMsg").innerHTML = errorMessage;
                }
            },
            JSON.stringify(loginDetails)
        );
    }
    else {
        errorMessage = "<b>* Please enter emailId and password *</b>"
        document.querySelector("#errorMsg").innerHTML = errorMessage;
    }
}

// Function to get today's patients records from the database
function todaysPatients () {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        TodayAppointmentDataUrl,
        function (response) {
            data = JSON.parse(response.responseText)["data"];
            // console.log(data);
            loadTableData(data);
        }
    );
}

// Function to get yesterday's patients records from the database
function yesterdayPatients () {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        YesterdayAppointmentDataUrl,
        function (response) {
            data = JSON.parse(response.responseText)["data"];
            // console.log(data);
            loadTableData(data);
        }
    );
}

// Function to get tomorrow's patients records from the database
function tomorrowPatients () {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        TomorrowAppointmentDataUrl,
        function (response) {
            data = JSON.parse(response.responseText)["data"];
            // console.log(data);
            loadTableData(data);
        }
    );
}

// Function to get all patients records from the database
function allPateints () {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        AllAppointmentDataUrl,
        function (response) {
            data = JSON.parse(response.responseText)["data"];
            // console.log(data);
            loadTableData(data);
        }
    );
}

// function to LogOut Admin login and delete the session
function logOutAdmin () {
    localStorage.clear();
}
