# 🎙️ StudySpeak AI

### AI-Powered Study Notes to Speech Platform

StudySpeak AI is a full-stack web application that helps students convert study materials into speech.

Users can type study notes, upload PDF documents, extract their content, and listen to the material using text-to-speech technology.

## ✨ Features

- 📝 Create and edit study notes
- 🔊 Convert study notes into speech
- 📄 Upload PDF study materials
- 📖 Extract text from PDFs
- 🎧 Listen to generated audio
- 📊 Word, character, and sentence statistics
- ⏱️ Estimated reading time
- 🎤 Voice input support
- 📱 Responsive user interface

## 🛠️ Technologies

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### Libraries
- pyttsx3
- PyPDF2

## 📁 Project Structure

```text
StudySpeak-AI/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── templates/
│   │   └── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── uploads/
│
├── README.md
└── .gitignore
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/priyasaravanan19/StudySpeak-AI.git
```

Enter the project:

```bash
cd StudySpeak-AI
```

Go to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## ▶️ Run the Application

From the `backend` folder:

```bash
python app.py
```

Open your browser:

```text
http://127.0.0.1:5000
```

## 🔄 How It Works

```text
Study Notes / PDF
        ↓
   StudySpeak AI
        ↓
   Text Extraction
        ↓
 Text Processing
        ↓
   Text-to-Speech
        ↓
    Audio Output
        ↓
   Listen & Learn
```

## 📄 PDF Processing

Users can upload a PDF containing study material.

The application:

1. Receives the PDF
2. Extracts readable text
3. Displays the extracted content
4. Calculates study statistics
5. Converts the content into speech
6. Provides an audio player

## 🔊 Text-to-Speech

StudySpeak AI uses `pyttsx3` to convert written study material into speech.

## 📊 Study Statistics

The application calculates:

- Total words
- Total characters
- Number of sentences
- Estimated reading time

## 🎯 Use Cases

StudySpeak AI can help:

- Students preparing for exams
- Students reviewing lecture notes
- Users who prefer audio-based learning
- Users studying while travelling
- Accessibility-focused learning

## 🚀 Future Enhancements

- 🤖 AI-powered summaries
- 🧠 Automatic quiz generation
- ❓ AI question answering
- 🌐 Multi-language support
- 🗣️ Multiple AI voices
- 📚 Chapter-wise PDF processing
- 👤 User accounts
- 📈 Study progress tracking
- ☁️ Cloud storage

## 👩‍💻 Author

**Priya Saravanan**

StudySpeak AI — AI-powered learning project.

## 📜 License

This project is created for educational and project-development purposes.