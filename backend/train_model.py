import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib

print("Starting Model Training Pipeline...")

# 1. Load Data
# We use a publicly hosted raw version of the IBM HR Analytics dataset from GitHub
url = "https://raw.githubusercontent.com/IBM/employee-attrition-aif360/master/data/emp_attrition.csv"
print(f"Downloading dataset from {url}...")
df = pd.read_csv(url)

print(f"Dataset loaded. Shape: {df.shape}")

# 2. Select Features matching our UI
# The IBM dataset has many columns, but we only use a subset for our simple UI right now.
# Note: UI gives "Annual Salary", IBM dataset uses "MonthlyIncome".
# For training, we will use MonthlyIncome. At prediction time, we divide UI salary by 12.
features = [
    'Age', 
    'Department', 
    'DistanceFromHome', 
    'JobRole', 
    'MonthlyIncome', 
    'JobSatisfaction', 
    'YearsAtCompany'
]
target = 'Attrition'

X = df[features]
y = df[target]

# Convert Attrition 'Yes'/'No' to numeric 1/0 for better handling with some models,
# but RandomForestClassifier handles string labels natively.
# Let's keep 'Yes' and 'No' so predict() outputs strings directly!

# 3. Define Pipeline
numeric_features = ['Age', 'DistanceFromHome', 'MonthlyIncome', 'JobSatisfaction', 'YearsAtCompany']
categorical_features = ['Department', 'JobRole']

numeric_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Create the Random Forest pipeline
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# 4. Train the Model
print("Splitting data into 80% train / 20% test...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print("Training Random Forest Classifier on IBM HR Data...")
pipeline.fit(X_train, y_train)

score = pipeline.score(X_test, y_test)
print(f"Model Test Accuracy: {score * 100:.2f}%")

# 5. Save the trained pipeline
model_filename = "model.pkl"
print(f"Saving trained model to {model_filename}...")
joblib.dump(pipeline, model_filename)

print("Training Pipeline Complete!")
