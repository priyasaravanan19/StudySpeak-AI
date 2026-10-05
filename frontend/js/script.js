``
`javascript
const textInput = document.getElementById("textInput");

let fontSize = 16;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;


// =====================================
// TEXT INPUT
// =====================================

textInput.addEventListener("input", function () {

    updateStats();

    const text = textInput.value.trim();

    if (text.length > 0) {
        document.getElementById("textStatus").textContent =
            "Ready to convert your notes into speech.";
    } else {
        document.getElementById("textStatus").textContent =
            "Start typing your study material...";
    }
});


// =====================================
// UPDATE STATISTICS
// =====================================

function updateStats() {

    const text = textInput.value.trim();

    const words = text
        ? text.split(/\s+/).filter(word => word.length > 0)
        : [];

    const characters = text.length;

    const sentences = text
        ? text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
        : [];

    document.getElementById("wordCount").textContent =
        words.length;

    document.getElementById("charCount").textContent =
        characters;

    document.getElementById("sentenceCount").textContent =
        sentences.length;

    // Average reading speed = 200 words/minute
    const minutes = words.length === 0
        ? 0
        : Math.ceil(words.length / 200);

    document.getElementById("readingTime").textContent =
        minutes + " min";
}


// =====================================
// TEXT TO SPEECH
// =====================================

async function generateSpeech() {

    const text = textInput.value.trim();

    if (!text) {
        alert("Please enter or upload some study notes first.");
        return;
    }

    const button = document.querySelector(".speak-btn");

    button.disabled = true;
    button.textContent = "⏳ Generating...";

    try {

        const response = await fetch("/text-to-speech", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        if (data.success) {

            const audioPlayer =
                document.getElementById("audioPlayer");

            audioPlayer.src = data.audio_url;

            audioPlayer.load();

            document.getElementById("audioStatus").textContent =
                "Your study audio is ready. Press play to listen.";

            document.getElementById("audio").scrollIntoView({
                behavior: "smooth"
            });

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Could not generate speech.");

    } finally {

        button.disabled = false;
        button.textContent = "🔊 Convert to Speech";
    }
}


// =====================================
// PDF UPLOAD
// =====================================

async function uploadPDF() {

    const input = document.getElementById("pdfInput");

    if (!input.files.length) {
        return;
    }

    const file = input.files[0];

    const status = document.getElementById("pdfStatus");

    status.textContent =
        "⏳ Reading " + file.name + "...";

    const formData = new FormData();

    formData.append("pdf", file);

    try {

        const response = await fetch("/upload-pdf", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        if (data.success) {

            textInput.value = data.text;

            updateStats();

            status.textContent =
                "✅ PDF loaded successfully.";

            document.getElementById("textStatus").textContent =
                "PDF content loaded. Ready to convert to speech.";

            document.getElementById("notes").scrollIntoView({
                behavior: "smooth"
            });

        } else {

            status.textContent =
                "❌ " + data.message;

        }

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Could not process PDF.";

    }
}


// =====================================
// CLEAR TEXT
// =====================================

function clearText() {

    textInput.value = "";

    updateStats();

    document.getElementById("textStatus").textContent =
        "Start typing your study material...";

    document.getElementById("audioPlayer").removeAttribute("src");

    document.getElementById("audioStatus").textContent =
        "Generate speech from your notes to listen here.";
}


// =====================================
// FONT SIZE
// =====================================

function increaseFont() {

    if (fontSize < 28) {
        fontSize += 2;
        textInput.style.fontSize = fontSize + "px";
    }
}


function decreaseFont() {

    if (fontSize > 12) {
        fontSize -= 2;
        textInput.style.fontSize = fontSize + "px";
    }
}


// =====================================
// SCROLL TO NOTES
// =====================================

function scrollToNotes() {

    document.getElementById("notes").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        textInput.focus();
    }, 600);
}


// =====================================
// SPEECH TO TEXT
// =====================================

async function toggleRecording() {

    const button = document.getElementById("recordBtn");
    const status = document.getElementById("recordStatus");

    // Stop recording
    if (isRecording) {

        mediaRecorder.stop();

        isRecording = false;

        button.classList.remove("recording");

        button.textContent = "🎤 Start Recording";

        status.textContent =
            "⏳ Converting speech to text...";

        return;
    }


    // Browser MediaRecorder
    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        audioChunks = [];

        mediaRecorder =
            new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {

            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }

        };


        mediaRecorder.onstop = async () => {

            stream.getTracks().forEach(track => {
                track.stop();
            });

            const audioBlob =
                new Blob(audioChunks, {
                    type: "audio/wav"
                });

            const formData =
                new FormData();

            formData.append(
                "audio",
                audioBlob,
                "recording.wav"
            );

            try {

                const response =
                    await fetch(
                        "/speech-to-text",
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                const data =
                    await response.json();

                if (data.success) {

                    const existing =
                        textInput.value.trim();

                    if (existing) {
                        textInput.value =
                            existing + " " + data.text;
                    } else {
                        textInput.value =
                            data.text;
                    }

                    updateStats();

                    status.textContent =
                        "✅ Speech converted successfully.";

                } else {

                    status.textContent =
                        "❌ " + data.message;

                }

            } catch (error) {

                console.error(error);

                status.textContent =
                    "❌ Speech conversion failed.";

            }
        };


        mediaRecorder.start();

        isRecording = true;

        button.classList.add("recording");

        button.textContent =
            "⏹ Stop Recording";

        status.textContent =
            "🔴 Recording... Speak now.";

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Microphone permission was denied.";

    }
}


// =====================================
// INITIALIZE
// =====================================

updateStats();

`