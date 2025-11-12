// frontend/script.js
async function detectFakeNews() {
  const news = document.getElementById("newsInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!news) {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = "⚠️ Please enter some news content.";
    resultDiv.style.background = "#ffa726";
    return;
  }

  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = "⏳ Checking...";
  resultDiv.style.background = "#607d8b";

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: news })
    });

    const data = await response.json();
    const isFake = data.prediction.toUpperCase() === "FAKE";

    resultDiv.innerHTML = isFake
      ? "❌ This news seems to be <strong>FAKE</strong>!"
      : "✅ This news appears to be <strong>REAL</strong>.";

    resultDiv.style.background = isFake ? "#f44336" : "#4caf50";
  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error while checking. Please try again.";
    resultDiv.style.background = "#e57373";
  }
}

function clearInput() {
  document.getElementById("newsInput").value = "";
  const resultDiv = document.getElementById("result");
  resultDiv.classList.add("hidden");
}

