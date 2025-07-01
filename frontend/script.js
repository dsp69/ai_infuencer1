const backendURL = "https://ai-infuencer1.onrender.com";

document.getElementById("generate-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const imageFile = document.getElementById("image").files[0];
  const prompt = document.getElementById("prompt").value;

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("prompt", prompt);

  document.getElementById("status").innerText = "⏳ Generating image...";

  try {
    const response = await fetch(`${backendURL}/generate`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.output) {
      document.getElementById("result-image").src = result.output;
      document.getElementById("status").innerText = "✅ Image generated!";
    } else {
      document.getElementById("status").innerText = "❌ Image generation failed.";
    }
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("status").innerText = "❌ Something went wrong.";
  }
});
