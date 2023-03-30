## IMPORT STATEMENTS
from flask import Flask, render_template, request
from flask_cors import CORS
from db_connect import connect_to_the_database, insert_in_collection
import datetime

## Initialisation
app = Flask(__name__)
CORS(app=app)

################# ROUTES #################
# Base path to load the home page / landing page of the website
@app.route("/")
def home_page():
    print("Loading the landing page....")
    return render_template("home.html")

# Path to load the admin login page
@app.route("/admin")
def admin_page():
    print("Loading the admin login page....")
    return render_template("admin.html")

# Reading the adminLogin Template to integrate and display the login form
@app.route("/adminLogin")
def admin_login_page():
    return render_template("adminLogin.html")

# Reading the adminHome template to integrate and display it in the home page
@app.route("/adminHome")
def admin_home_page():
    return render_template("adminHome.html")

# Post method allowed path -> to authenticate the admin login credentials, via database
@app.route("/authLogin", methods=["GET", "POST"])
def authentication_login():
    if request.method == "POST":
        login_data = request.get_json()
        db = connect_to_the_database(database="OmSaiClinics")
        admin_data = db["admin_credentials"].find({})[0]
        if (admin_data["email"] == login_data["email"]) and (admin_data["password"] == login_data["password"]):
            return {
                "msg": True,
                "status": 200
            }
        else:
            return {
                "msg": False,
                "status": 403
            }
    return {
        "msg": "Method Not Allowed",
        "status": 404
    }

# Post Request to post or insert the patient details to the database
@app.route("/post/patientData", methods=["GET","POST"])
def post_patient_data():
    if request.method == "POST":
        patient_json = request.get_json()
        db = connect_to_the_database(database="OmSaiClinics")
        insert_appointment = insert_in_collection(db, "patient_appointments", patient_json)
        print(insert_appointment)
        return {
            "msg": insert_appointment,
            "status": 200
        }
    # if called - get method
    return {
        "msg": "Method Not Allowed",
        "status": 404
    }

# Function to read all the patients appointment details from the database
@app.route("/appointments/data")
def get_all_appointments_data():
    db = connect_to_the_database(database="OmSaiClinics")
    results = list(db["patient_appointments"].find({}))
    for result in results:
        result.pop("_id")
        result.pop("created_at")
        result.pop("updated_at")
    # print(results)
    return {"data": results}

# Function to read today's patient appointment details from the database
@app.route("/appointments/data/today")
def get_today_appointments_data():
    db = connect_to_the_database(database="OmSaiClinics")
    today = str(datetime.date.today())
    results = list(db["patient_appointments"].find({"appointmentDate":today}))
    for result in results:
        result.pop("_id")
        result.pop("created_at")
        result.pop("updated_at")
    # print(results)
    return {"data": results}

# Function to read yesterday's patient appointment details from the database
@app.route("/appointments/data/yesterday")
def get_yesterday_appointments_data():
    db = connect_to_the_database(database="OmSaiClinics")
    yesterday = str(datetime.date.today() - datetime.timedelta(1))
    results = list(db["patient_appointments"].find({"appointmentDate":yesterday}))
    for result in results:
        result.pop("_id")
        result.pop("created_at")
        result.pop("updated_at")
    # print(results)
    return {"data": results}

# Function to read tomorrow's patient appointment details from the database
@app.route("/appointments/data/tomorrow")
def get_tomorrow_appointments_data():
    db = connect_to_the_database(database="OmSaiClinics")
    tomorrow = str(datetime.date.today() + datetime.timedelta(1))
    results = list(db["patient_appointments"].find({"appointmentDate":tomorrow}))
    for result in results:
        result.pop("_id")
        result.pop("created_at")
        result.pop("updated_at")
    # print(results)
    return {"data": results}

## Python main function to run the app
if __name__ == "__main__":
    app.run()
