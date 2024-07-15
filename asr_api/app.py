# This is the backend for meeting transcription
from flask import Flask, request, jsonify, Response
from transformers import pipeline
from flask_cors import CORS
from dotenv import load_dotenv
import os
import torch

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"]="YOUR-SECRET"
CORS(app, supports_credentials=True, resources=r"/*")

def authenticate_api_key(api_key):
    key = os.getenv("API_KEY")
    return api_key == key

@app.before_request
def before_request():
    if request.method != "OPTIONS":
        request.get_data()
        api_key = request.headers.get("Authorization")
        if not api_key or not authenticate_api_key(api_key=api_key):
            return Response("Unauthorized access", status=401)

@app.route("/", methods=["GET"])
def test():
    return Response("Successful setup", status=200)
        
@app.route("/transcribe", methods=["POST"])
def transcribe():
    device = -1
    asr_pipe = pipeline("automatic-speech-recognition", model="openai/whisper-base", device=device)
    
    if 'audio' not in request.files:
        return Response("No audio file provided", status=400)
    
    audio_file = request.files['audio']
    audio_path = os.path.join("./downloads", audio_file.filename)
    audio_file.save(audio_path)

    result = asr_pipe(audio_path)
    os.remove(audio_path)
    return jsonify({"script": result["text"]})

if __name__=="__main__":
    app.run(port=8000)
