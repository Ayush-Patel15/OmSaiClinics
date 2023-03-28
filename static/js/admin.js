// Global paths - file paths and URLS
loginHTML = "login.html";
adminHomeHTML = "adminHome.html";
loginAuthUrl = "https://omsaiclinics.onrender.com/authLogin"
AllAppointmentDataUrl = "https://omsaiclinics.onrender.com/appointments/data"
TodayAppointmentDataUrl = "https://omsaiclinics.onrender.com/appointments/data/today"
TomorrowAppointmentDataUrl = "https://omsaiclinics.onrender.com/appointments/data/tomorrow"
YesterdayAppointmentDataUrl = "https://omsaiclinics.onrender.com/appointments/data/yesterday"

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
        loginHTML,
        function (response) {
            // console.log(response.responseText);
            document.querySelector("#mainContent").innerHTML = response.responseText;
        }
    );
}

// Global helper function to load the admin Page
function LoadAdminPage() {
    $ajaxUtils.sendGetRequest(
        adminHomeHTML,
        function (response) {
            // console.log(response.responseText);
            document.querySelector("#mainContent").innerHTML = response.responseText;
        }
    );
}

// function to insert the data in the table
function loadTableData (data) {
    for (var i=0; i < data.length; i++) {
        // console.log(data[i]);
        $("tbody").append("<tr id=data" + [i] + "></tr>");
        tableData = "";
        tableData += "<td>" + data[i][0] + "</td>";
        tableData += "<td>" + data[i][1] + "</td>";
        tableData += "<td>" + data[i][2] + "</td>";
        tableData += "<td>" + data[i][3] + "</td>";
        tableData += "<td>" + data[i][4] + "</td>";
        tableData += "<td>" + data[i][5] + "</td>";
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
        // post request to authenticate login
        $ajaxUtils.sendPostRequest(
            loginAuthUrl,
            function (response) {
                res = JSON.parse(response.responseText);
                if (res["status"] == 200) {
                    todaysPatients();
                    localStorage.setItem("username", email);
                }
                // not success
                else {
                    LoadLoginPage();
                    errorMessage = "<b>* Invalid credentials. Please try again..! *</b>"
                    document.querySelector("#errorMsg").innerHTML = errorMessage;
                }
            },
            JSON.stringify(loginDetails)
        );
    }
    else {
        LoadLoginPage();
        errorMessage = "<b>* Please enter emailId and password *</b>"
        document.querySelector("#errorMsg").innerHTML = errorMessage;
    }
}

// Function to get today's patients records from the database
function todaysPatients() {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        TodayAppointmentDataUrl,
        function (response) {
            // console.log(response.responseText);
            data = JSON.parse(response.responseText)["data"];
            loadTableData(data);
        }
    );
}

// Function to get tomorrow's patients records from the database
function tomorrowPatients() {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        TomorrowAppointmentDataUrl,
        function (response) {
            // console.log(response.responseText);
            data = JSON.parse(response.responseText)["data"];
            loadTableData(data);
        }
    );
}

// Function to get yesterday's patients records from the database
function yesterdayPatients() {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        YesterdayAppointmentDataUrl,
        function (response) {
            // console.log(response.responseText);
            data = JSON.parse(response.responseText)["data"];
            loadTableData(data);
        }
    );
}

// Function to get all patients records from the database
function allPatients () {
    LoadAdminPage();
    $ajaxUtils.sendGetRequest(
        AllAppointmentDataUrl,
        function (response) {
            // console.log(response.responseText);
            data = JSON.parse(response.responseText)["data"];
            loadTableData(data);
        }
    );
}

// function to LogOut Admin login and delete the session
function logOutAdmin () {
    localStorage.clear();
}
