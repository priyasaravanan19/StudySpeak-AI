
from flask import Flask, render_template, request, jsonify, send_file
import pyttsx3
from PyPDF2 import PdfReader
import os
import uuid


# ==========================================
# FLASK CONFIGURATION
# ==========================================

app = Flask(
    __name__,
    template_folder="../frontend/templates",
    static_folder="../frontend",
    static_url_path="/static"
)


# ==========================================
# FOLDER CONFIGURATION
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "..", "uploads")
AUDIO_FOLDER = os.path.join(UPLOAD_FOLDER, "audio")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)


# ==========================================
# HOME PAGE
# ==========================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================
# TEXT TO SPEECH
# ==========================================

@app.route("/text-to-speech", methods=["POST"])
def text_to_speech():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No data received."
            }), 400

        text = data.get("text", "").strip()

        if not text:
            return jsonify({
                "success": False,
                "message": "Please enter some text."
            }), 400

        # Create unique audio filename
        filename = f"speech_{uuid.uuid4().hex}.mp3"

        filepath = os.path.join(
            AUDIO_FOLDER,
            filename
        )

        # Initialize text-to-speech engine
        engine = pyttsx3.init()

        # Voice settings
        engine.setProperty("rate", 150)
        engine.setProperty("volume", 1.0)

        # Save speech as audio
        engine.save_to_file(text, filepath)
        engine.runAndWait()

        engine.stop()

        # Check whether file was created
        if not os.path.exists(filepath):

            return jsonify({
                "success": False,
                "message": "Audio file could not be created."
            }), 500

        return jsonify({
            "success": True,
            "message": "Speech generated successfully.",
            "audio_url": f"/audio/{filename}"
        })

    except Exception as e:

        print("Text-to-Speech Error:", e)

        return jsonify({
            "success": False,
            "message": "Text-to-speech failed."
        }), 500


# ==========================================
# PLAY GENERATED AUDIO
# ==========================================

@app.route("/audio/<filename>")
def play_audio(filename):

    filepath = os.path.join(
        AUDIO_FOLDER,
        filename
    )

    if not os.path.exists(filepath):

        return jsonify({
            "success": False,
            "message": "Audio file not found."
        }), 404

    return send_file(
        filepath,
        mimetype="audio/mpeg"
    )


# ==========================================
# PDF UPLOAD
# ==========================================

@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():

    try:

        # Check file
        if "pdf" not in request.files:

            return jsonify({
                "success": False,
                "message": "No PDF file selected."
            }), 400

        pdf_file = request.files["pdf"]

        # Check filename
        if pdf_file.filename == "":

            return jsonify({
                "success": False,
                "message": "Please select a PDF file."
            }), 400

        # Check extension
        if not pdf_file.filename.lower().endswith(".pdf"):

            return jsonify({
                "success": False,
                "message": "Only PDF files are supported."
            }), 400

        # Generate temporary PDF filename
        filename = f"{uuid.uuid4().hex}.pdf"

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        # Save PDF
        pdf_file.save(filepath)

        # Read PDF
        reader = PdfReader(filepath)

        extracted_text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                extracted_text += page_text + "\n"

        # Delete uploaded PDF after processing
        try:
            os.remove(filepath)
        except OSError:
            pass

        # Check extracted content
        if not extracted_text.strip():

            return jsonify({
                "success": False,
                "message": "No readable text was found in this PDF."
            }), 400

        return jsonify({
            "success": True,
            "message": "PDF processed successfully.",
            "text": extracted_text.strip()
        })

    except Exception as e:

        print("PDF Error:", e)

        return jsonify({
            "success": False,
            "message": "Could not process the PDF."
        }), 500


# ==========================================
# TEXT STATISTICS
# ==========================================

@app.route("/stats", methods=["POST"])
def text_stats():

    try:

        data = request.get_json()

        text = data.get("text", "") if data else ""

        text = text.strip()

        # Words
        words = text.split()

        # Characters
        characters = len(text)

        # Sentences
        sentences = []

        for sentence in text.replace("!", ".").replace("?", ".").split("."):

            if sentence.strip():
                sentences.append(sentence.strip())

        return jsonify({
            "success": True,
            "words": len(words),
            "characters": characters,
            "sentences": len(sentences)
        })

    except Exception as e:

        print("Stats Error:", e)

        return jsonify({
            "success": False,
            "message": "Could not calculate statistics."
        }), 500


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/health")
def health():

    return jsonify({
        "status": "online",
        "application": "StudySpeak AI"
    })


# ==========================================
# ERROR HANDLERS
# ==========================================

@app.errorhandler(404)
def page_not_found(error):

    return jsonify({
        "success": False,
        "message": "Page not found."
    }), 404


@app.errorhandler(500)
def server_error(error):

    return jsonify({
        "success": False,
        "message": "Internal server error."
    }), 500


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    print("")
    print("==========================================")
    print("       STUDYSPEAK AI")
    print("==========================================")
    print("Server starting...")
    print("Open: http://127.0.0.1:5000")
    print("==========================================")
    print("")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
