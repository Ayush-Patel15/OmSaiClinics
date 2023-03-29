from flask import Flask, render_template, request
from db_connect import connect_to_the_database, insert_in_collection

app = Flask(__name__)

@app.route("/")
def home_page():
    return render_template("home.html")

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

if __name__ == "__main__":
    app.run()
