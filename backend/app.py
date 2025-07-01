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
        if "image" not in request.files or "prompt" not in request.form:
            return jsonify({"error": "Missing image or prompt"}), 400

        image_file = request.files["image"]
        prompt = request.form["prompt"]

        # Convert image to base64 data URL
        import base64
        image_bytes = image_file.read()
        base64_str = base64.b64encode(image_bytes).decode("utf-8")
        image_data_url = f"data:image/jpeg;base64,{base64_str}"

        # Call Replicate with data URL
        output = replicate.run(
            "stability-ai/sdxl:latest",
            input={
                "image": image_data_url,
                "prompt": prompt
            }
        )

        return jsonify({"output": output})

    except Exception as e:
        logging.exception("Error generating image")
        return jsonify({"error": str(e)}), 500
