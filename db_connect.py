## All CRUD operation functions related to the mongodb database.

# IMPORTS
from pymongo import MongoClient
from datetime import datetime
import os

# Load the env file
# load_dotenv()

# Function to create a connection, with mongodb database
def connect_to_the_database(database):
    try:
        client = MongoClient(
            os.getenv("MONGODB_URI")
        )
        db = client[database]
        return db
    except Exception as e:
        print("MongoDb Database connection request falied..!")
        return f"error: {e}"

# Function to insert a new data document or update an existing data document in a collection
def insert_in_collection(db, collection, data):
    try:
        cursor = db[collection]
        data["created_at"] = datetime.now()
        data["updated_at"] = datetime.now()
        cursor.insert_one(data)
        return "success: data is inserted"
    except Exception as e:
        print("MongoDb insert data in collection request falied..!")
        return f"error: {e}"

# Function to delete all the documents present in a collection
def delete_all_documents_from_collection(db, collection):
    try:
        cursor = db[collection]
        cursor.delete_many({})
        return "success: all documents from the collection deleted"
    except Exception as e:
        print("MongoDb delete documents from collection request falied..!")
        return f"error: {e}"

if __name__ == "__main__":
    db = connect_to_the_database(database="OmSaiClinics")
    # print(delete_all_documents_from_collection(db, "patient_appointments"))
