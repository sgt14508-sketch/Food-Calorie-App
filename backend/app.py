from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
from model import FoodEstimator

app = Flask(__name__)
CORS(app)  # Allow requests from http://localhost:3000

print("Initializing estimator...")
estimator = FoodEstimator()

@app.route("/")
def home():
    return {"status": "Food API is running"}

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    img = Image.open(io.BytesIO(file.read())).convert("RGB")

    result = estimator.predict(img)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)