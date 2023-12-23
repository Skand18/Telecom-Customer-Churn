# Building a Flask Backend for our model to be used with an API call

import os
import copy
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier 
from sklearn import metrics
from flask import Flask, request, send_file
from flask_cors import CORS
import pickle
import json
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads'
DOWNLOAD_FOLDER = 'downloads'
ALLOWED_EXTENSIONS = {'xslx', 'csv'}

demo_df =  pd.read_csv("first_telc.csv")

def predict(filename):
    '''
    SeniorCitizen
    MonthlyCharges
    TotalCharges
    gender
    Partner
    Dependents
    PhoneService
    MultipleLines
    InternetService
    OnlineSecurity
    OnlineBackup
    DeviceProtection
    TechSupport
    StreamingTV
    StreamingMovies
    Contract
    PaperlessBilling
    PaymentMethod
    tenure
    '''
    
    try:
        # Load .csv files and cleanup
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        input_df=pd.read_csv(file_path)
        input_df.TotalCharges = pd.to_numeric(input_df.TotalCharges, errors='coerce')
        input_df.MonthlyCharges = pd.to_numeric(input_df.MonthlyCharges, errors='coerce')
        input_df.SeniorCitizen = pd.to_numeric(input_df.SeniorCitizen, errors='coerce')
        input_df.tenure = pd.to_numeric(input_df.tenure, errors='coerce')
        input_df.dropna(how = 'any', inplace = True)
        df = copy.deepcopy(input_df)

        # join demo df with input df after necessary cleanups
        df.drop(columns=['customerID'], axis=1, inplace=True)
        demo_df = pd.read_csv("first_telc.csv")
        demo_df.TotalCharges = pd.to_numeric(demo_df.TotalCharges, errors='coerce')
        demo_df.MonthlyCharges = pd.to_numeric(demo_df.MonthlyCharges, errors='coerce')
        demo_df.SeniorCitizen = pd.to_numeric(demo_df.SeniorCitizen, errors='coerce')
        demo_df.tenure = pd.to_numeric(demo_df.tenure, errors='coerce')
        demo_df.dropna(how = 'any', inplace = True)
        working_df = pd.concat([demo_df, df], ignore_index = True)

        # Load the model fitted by us
        model = pickle.load(open("final_model", "rb"))

        # Group the tenure in bins of 12 months
        labels = ["{0} - {1}".format(i, i + 11) for i in range(1, 72, 12)]
        working_df['tenure_group'] = pd.cut(working_df.tenure.astype(int), range(1, 80, 12), right=False, labels=labels)

        # Drop column tenure
        working_df.drop(columns= ['tenure'], axis=1, inplace=True)

        # Get dummies
        new_df__dummies = pd.get_dummies(working_df)

        # Get result
        result = model.predict(new_df__dummies.tail(input_df.shape[0]))
        probability = model.predict_proba(new_df__dummies.tail(input_df.shape[0]))[:,1]
        input_df['Churn'] = result
        input_df['Confidence'] = [val * 100 for val in probability]

        # Store result
        full_path = os.path.join(app.config['DOWNLOAD_FOLDER'], filename)
        input_df.to_csv(full_path, index=False)
        
        return "Processed"
    except Exception as e:
        print(e)
        return "Failed"

def predict_data(json_data):
    try:
       
        # input_data = json.loads(json_data)
        input_df = pd.DataFrame(json_data)
        input_df.TotalCharges = pd.to_numeric(input_df.TotalCharges, errors='coerce')
        input_df.MonthlyCharges = pd.to_numeric(input_df.MonthlyCharges, errors='coerce')
        input_df.SeniorCitizen = pd.to_numeric(input_df.SeniorCitizen, errors='coerce')
        input_df.tenure = pd.to_numeric(input_df.tenure, errors='coerce')
        input_df.dropna(how = 'any', inplace = True)
        df = copy.deepcopy(input_df)

        # join demo df with input df after necessary cleanups
        df.drop(columns=['customerID'], axis=1, inplace=True)
        demo_df = pd.read_csv("first_telc.csv")
        demo_df.TotalCharges = pd.to_numeric(demo_df.TotalCharges, errors='coerce')
        demo_df.MonthlyCharges = pd.to_numeric(demo_df.MonthlyCharges, errors='coerce')
        demo_df.SeniorCitizen = pd.to_numeric(demo_df.SeniorCitizen, errors='coerce')
        demo_df.tenure = pd.to_numeric(demo_df.tenure, errors='coerce')
        demo_df.dropna(how = 'any', inplace = True)
        working_df = pd.concat([demo_df, df], ignore_index = True)
    
        # Load the model fitted by us
        model = pickle.load(open("final_model", "rb"))

        # Group the tenure in bins of 12 months
        labels = ["{0} - {1}".format(i, i + 11) for i in range(1, 72, 12)]
        working_df['tenure_group'] = pd.cut(working_df.tenure.astype(int), range(1, 80, 12), right=False, labels=labels)

        # Drop column tenure
        working_df.drop(columns=['tenure'], axis=1, inplace=True)

        # Get dummies
        new_df__dummies = pd.get_dummies(working_df)

        # Get result
        result = model.predict(new_df__dummies.tail(input_df.shape[0]))
        probability = model.predict_proba(new_df__dummies.tail(input_df.shape[0]))[:,1]
        input_df['Churn'] = result
        input_df['Confidence'] = [val * 100 for val in probability]

        # Store result
        full_path = os.path.join(app.config['DOWNLOAD_FOLDER'], "result.csv")
        input_df.to_csv(full_path, index=False)
        
        return "Processed"
    except Exception as e:
        print(e)
        return "Failed"

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER

@app.route("/")
def getStatus():
    return "Server up and running."

@app.route("/data", methods=["POST"])
def getPredictionResultsData():
    try:
        json_data = request.get_json()
        print(json_data)
        result = predict_data(json_data)
        print(result)
        if result == "Processed":
            resultant_file = os.path.join(app.config['DOWNLOAD_FOLDER'], 'result.csv')
            return send_file(resultant_file, as_attachment=True)
        else:
            return "Error encounterd in generating result"       
    except Exception as e:
        print(e)
        return f"Unexpected Error: {e}"

@app.route("/file", methods=["POST"])
def getPredictionResultsFile():
    try:
        if 'file' not in request.files:
            return 'No file part received.'
        file = request.files['file']
        print(file)
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            if predict(filename) == 'Processed':
                resultant_file = os.path.join(app.config['DOWNLOAD_FOLDER'], filename)
                return send_file(resultant_file, as_attachment=True)
            else:
                return 'Error encountered in generating result.'
    except Exception as e:
        return f"Unexpected Error: {e}"

app.run(debug=True, port=8080)

