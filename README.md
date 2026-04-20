# Employee Attrition Prediction System

A full-stack web application designed to predict the likelihood of an employee leaving the company. It uses a modern React frontend for the user interface and a Python FastAPI backend powered by a Machine Learning model.

## Features

- **Predictive Analytics:** Uses a trained Machine Learning model (`scikit-learn`) to evaluate an employee's flight risk based on factors like age, department, distance from home, salary, and job satisfaction.
- **FastAPI Backend:** A fast and responsive API with automatic OpenAPI documentation.
- **Modern React Frontend:** Built with Vite and React for a smooth and fast user experience.

## Project Structure

```
employee_system/
├── backend/                  # Python FastAPI Backend
│   ├── main.py               # Application entry point & API endpoints
│   ├── train_model.py        # ML training script to generate the model
│   ├── model.pkl             # Serialized trained Random Forest model
│   └── requirements.txt      # Python dependencies
└── frontend/                 # React + Vite Frontend
    ├── package.json          # Node dependencies and scripts
    ├── src/                  # React components, styles, and logic
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.9+ 

### 1. Backend Setup

Navigate to the `backend` directory and set up the Python environment:

```bash
cd backend

# Create and activate a virtual environment (Optional but Recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```

The FastAPI backend will run on `http://127.0.0.1:8000`. You can access the automatic interactive API documentation at `http://127.0.0.1:8000/docs`.

**Note:** If the ML model file (`model.pkl`) is missing or you want to retrain it, run `python train_model.py` in the backend directory.

### 2. Frontend Setup

Open a new terminal window, navigate to the `frontend` directory, and start the Vite development server:

```bash
cd frontend

# Install dependencies
npm install

# Run the frontend server
npm run dev
```

The React frontend will be accessible at `http://localhost:5173` (or the port specified by Vite). It will communicate with the backend API to retrieve attrition predictions.

## Contributing

Feel free to fork the repository, make enhancements, and submit a pull request!
