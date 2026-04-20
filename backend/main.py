import joblib
import pandas as pd
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Employee Attrition Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained machine learning model
model = None
MODEL_PATH = "model.pkl"
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("Machine Learning Model Loaded Successfully!")
else:
    print("Warning: model.pkl not found!")

class EmployeeData(BaseModel):
    age: int = Field(ge=18, le=65, description="Age must be between 18 and 65")
    department: str
    distance_from_home: int = Field(ge=0, le=200, description="Distance cannot exceed 200km")
    job_role: str
    salary: int = Field(ge=50000, description="Minimum annual salary is ₹50,000")
    job_satisfaction: int = Field(ge=1, le=4)
    years_at_company: int = Field(ge=0, le=50, description="Years at company must be between 0 and 50")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict_attrition(employee: EmployeeData):
    if model is None:
        return {"error": "Machine Learning Model not trained or loaded on backend."}

    # Format the data exactly as the typical pandas DataFrame the Random Forest expects
    # Convert Rupees to USD (approx 1 USD = 83 INR) and KM to Miles (1 Mile = 1.609 KM)
    data = pd.DataFrame([{
        'Age': employee.age,
        'Department': employee.department,
        'DistanceFromHome': employee.distance_from_home / 1.609,
        'JobRole': employee.job_role,
        'MonthlyIncome': (employee.salary / 83.0) / 12.0,
        'JobSatisfaction': employee.job_satisfaction,
        'YearsAtCompany': employee.years_at_company
    }])

    # Get the raw model prediction ('Yes' or 'No')
    prediction = model.predict(data)[0]

    # Get the detailed probabilistic risk score
    probabilities = model.predict_proba(data)[0]
    # Dynamically find which index corresponds to 'Yes'
    yes_index = list(model.classes_).index('Yes')
    risk_score = probabilities[yes_index] * 100
    
    return {
        "prediction": str(prediction),
        "risk_score_percentage": round(risk_score, 1)
    }
