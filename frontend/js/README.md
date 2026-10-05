# 🎙️ StudySpeak AI

### AI-Powered Study Notes to Speech Platform

StudySpeak AI is a simple full-stack learning application that helps students convert their study materials into speech.

Users can enter study notes, upload PDF documents, and listen to their study content using AI-powered text-to-speech technology.

---

## ✨ Features

- 📝 Enter or paste study notes
- 🔊 Convert text into speech
- 📄 Upload PDF study materials
- 📖 Extract text from PDF documents
- 🎧 Listen to generated study audio
- 📊 Word, character, and sentence statistics
- ⏱️ Estimated reading time
- 🎤 Voice input support
- 📱 Responsive user interface
- ⚡ Simple and beginner-friendly architecture

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Flask

### AI / Processing

- pyttsx3 – Text-to-Speech
- PyPDF2 – PDF text extraction

---

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
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── uploads/
│   └── audio/
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/StudySpeak-AI.git
```

### 2. Open the project

```bash
cd StudySpeak-AI
```

### 3. Create a virtual environment

```bash
cd backend
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows

```powershell
venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` has not been created yet:

```bash
pip install flask pyttsx3 PyPDF2
```

Then:

```bash
pip freeze > requirements.txt
```

---

## ▶️ Run the Application

From the `backend` folder:

```bash
python app.py
```

The application will start at:

```text
http://127.0.0.1:5000
```

Open the address in your browser.

---

## 🔄 How It Works

```text
        Student
           │
           ▼
   ┌─────────────────┐
   │ StudySpeak AI   │
   └────────┬────────┘
            │
      ┌─────┴─────┐
      ▼           ▼
   Study        PDF
   Notes       Upload
      │           │
      │           ▼
      │      Text Extraction
      │           │
      └─────┬─────┘
            ▼
       Extracted Text
            │
            ▼
      Text-to-Speech
            │
            ▼
       Audio Output
            │
            ▼
       🎧 Listen & Learn
```

---

## 📄 PDF Processing

Users can upload a PDF containing study material.

StudySpeak AI:

1. Receives the PDF
2. Extracts readable text
3. Displays the extracted content
4. Calculates study statistics
5. Converts the content into speech
6. Provides an audio player

---

## 🔊 Text-to-Speech

The application uses `pyttsx3` to convert written study material into speech.

Users can:

- Enter notes
- Upload a PDF
- Generate speech
- Listen to the generated audio

---

## 📊 Study Statistics

StudySpeak AI automatically calculates:

- Total words
- Total characters
- Number of sentences
- Estimated reading time

This helps students understand the size of their study material.

---

## 🎯 Use Cases

StudySpeak AI can be useful for:

- College students
- School students
- Exam preparation
- Revision
- Listening while travelling
- Reviewing lecture notes
- Accessibility-focused learning

---

## 🚀 Future Enhancements

Possible future improvements include:

- 🤖 AI-powered study summaries
- 🧠 Automatic quiz generation
- ❓ AI question answering
- 🌐 Multiple language support
- 🗣️ Multiple voice options
- 📚 Chapter-wise PDF processing
- ☁️ Cloud storage
- 👤 User accounts
- 📈 Study progress tracking
- 🎯 Personalized study plans

---

## 🔐 Privacy

Uploaded study files are processed by the local application during development.

Do not upload confidential or sensitive documents when deploying the application publicly without adding appropriate security and storage controls.

---

## 👩‍💻 Author

**Priya Saravanan**

StudySpeak AI — AI-powered learning and accessibility project.

---

## 📜 License

This project is created for educational and project-development purposes.
```