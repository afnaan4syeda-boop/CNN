from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
from PIL import Image
import numpy as np
import io
import os

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)  # Enable CORS for all routes

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "car_bike_model.pkl")
CLASS_NAMES_PATH = os.path.join(BASE_DIR, "class_names.txt")
IMG_SIZE = 64

# Global model and class names
model = None
class_names = []

def load_resources():
    global model, class_names
    print(f"Looking for model at: {MODEL_PATH}")
    print(f"Model path exists: {os.path.exists(MODEL_PATH)}")
    if os.path.exists(MODEL_PATH):
        try:
            model = joblib.load(MODEL_PATH)
            print(f"Model loaded successfully. Model type: {type(model)}")
        except Exception as e:
            print(f"Error loading model: {e}")
            model = None
    else:
        print(f"Model file not found at {MODEL_PATH}")
        model = None

    if os.path.exists(CLASS_NAMES_PATH):
        with open(CLASS_NAMES_PATH, "r") as f:
            class_names = [line.strip() for line in f.readlines()]
    else:
        class_names = ["Bike", "Car"]
        print("Class names file not found. Using defaults.")

# Load resources at startup
load_resources()

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"message": "Car vs Bike Classification API (Flask) is running"})

@app.post("/predict")
def predict():
    global model
    print(f"Prediction requested. Model cached: {model is not None}")
    
    if model is None:
        print("Model missing during request, attempting reload...")
        load_resources()
        if model is None:
            return jsonify({"error": "Model not loaded on server. Please ensure training is complete."}), 503

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read and preprocess image
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((IMG_SIZE, IMG_SIZE))
        img_array = np.array(img).flatten().reshape(1, -1)

        # Predict
        prediction = model.predict(img_array)[0]
        # Scikit-learn doesn't give confidence scores directly for all models, 
        # but RandomForest has predict_proba
        proba = model.predict_proba(img_array)[0]
        confidence = proba[prediction] * 100

        return jsonify({
            "class": class_names[prediction],
            "confidence": f"{confidence:.2f}%"
        })

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
