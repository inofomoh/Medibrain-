function diagnose() {
    const input = document.getElementById("userInput").value.toLowerCase();
    const output = document.getElementById("resultBox");

    if (input.includes("fever") && input.includes("cough")) {
        output.innerText = "Likely Flu or COVID-19. Get tested.";
    } else if (input.includes("headache")) {
        output.innerText = "Possible stress or migraine.";
    } else {
        output.innerText = "Diagnosis unclear. See a doctor.";
    }
}

function suggestLabTest() {
    const input = document.getElementById("userInput").value.toLowerCase();
    const output = document.getElementById("labResultBox");

    if (input.includes("malaria") || input.includes("fever")) {
        output.innerText = "Recommended: Malaria Test, Full Blood Count.";
    } else if (input.includes("covid")) {
        output.innerText = "Recommended: COVID-19 PCR or Antigen test.";
    } else {
        output.innerText = "No specific test. Monitor symptoms.";
    }
}

function chatBot() {
    const input = document.getElementById("chatInput").value.toLowerCase();
    const output = document.getElementById("chatBox");

    let reply = "Sorry, I don’t understand.";

    if (input.includes("headache")) reply = "Take rest and stay hydrated. If it persists, consult a doctor.";
    if (input.includes("fever")) reply = "You may take paracetamol and drink plenty of water. See a doctor if high.";
    if (input.includes("malaria")) reply = "Please get a lab test. Symptoms include chills, fever, and headache.";
    if (input.includes("covid")) reply = "Isolate and check for symptoms like cough, fever, and fatigue.";
    if (input.includes("hello")) reply = "Hello! I’m MediBrain, your health assistant.";
    if (input.includes("thanks")) reply = "You're welcome! Stay healthy.";

    output.innerHTML += `<p><strong>You:</strong> ${input}</p><p><strong>MediBrain:</strong> ${reply}</p>`;
    document.getElementById("chatInput").value = "";
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("voiceOutput").innerText = "You said: " + transcript;
        const userInputBox = document.getElementById("userInput");
        if (userInputBox) userInputBox.value = transcript;
        checkDangerousSymptoms(transcript);
    };

    recognition.onerror = function() {
        alert("❌ Could not understand. Try again.");
    };
}

function saveReport() {
    const reports = JSON.parse(localStorage.getItem('medibrainReports') || '[]');
    const report = {
        name: document.getElementById('patientName')?.value || 'Unknown',
        age: document.getElementById('patientAge')?.value || '',
        weight: document.getElementById('patientWeight')?.value || '',
        diagnosis: document.getElementById('resultBox')?.innerText || '',
        labTest: document.getElementById('labResultBox')?.innerText || '',
        chat: document.getElementById('chatBox')?.innerText || '',
        date: new Date().toLocaleString()
    };
    reports.push(report);
    localStorage.setItem('medibrainReports', JSON.stringify(reports));
}

function viewAllReports() {
    const reports = JSON.parse(localStorage.getItem('medibrainReports') || '[]');
    let reportHtml = "";
    reports.forEach(rep => {
        reportHtml += `<hr><strong>${rep.date}</strong><br>Name: ${rep.name}<br>Age: ${rep.age}<br>Weight: ${rep.weight}<br><strong>Diagnosis:</strong> ${rep.diagnosis}<br><strong>Lab Test:</strong> ${rep.labTest}<br><strong>Chat:</strong><br>${rep.chat}`;
    });
    document.getElementById('allReports').innerHTML = reportHtml;
}

function checkDangerousSymptoms(input) {
    const dangerous = ["chest pain", "unconscious", "seizure", "bleeding"];
    for (let word of dangerous) {
        if (input.includes(word)) {
            alert("⚠️ Dangerous symptom detected! Seek medical help immediately.");
        }
    }
}