# backend/app.py
from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Load model and vectorizer
model = joblib.load("fake_news_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    news_text = data["text"]
    vectorized_input = vectorizer.transform([news_text])
    prediction = model.predict(vectorized_input)[0]
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True)
