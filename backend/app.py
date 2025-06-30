from flask import Flask, request, jsonify
import replicate
import os
from flask_cors import CORS
from dotenv import load_dotenv
import logging

load_dotenv()
app = Flask(__name__)
CORS(app)

# Disable Werkzeug debugger pin to avoid _multiprocessing error in restricted environments
os.environ["WERKZEUG_DEBUG_PIN"] = "off"

@app.route("/generate", methods=["POST"])
def generate():
    try:
        image_url = request.json.get("image_url")
        prompt = request.json.get("prompt")

        if not image_url or not prompt:
            return jsonify({"error": "Missing image_url or prompt"}), 400

        output = replicate.run(
            "stability-ai/sdxl:latest",
            input={
                "image": image_url,
                "prompt": prompt
            }
        )
        return jsonify({"result": output})

    except Exception as e:
        logging.exception("Error generating image")
        return jsonify({"error": str(e)}), 500

# Note: Do not run the server directly in restricted/sandboxed environments.
# This file should be served using a WSGI server like gunicorn or through a host-controlled entry point.

# Optional: WSGI entry point
application = app
