const backendURL = "https://ai-infuencer1.onrender.com";

document.getElementById("generate-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("image");
  const promptInput = document.getElementById("prompt");

  const imageFile = imageInput.files[0];
  const prompt = promptInput.value;

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("prompt", prompt);

  try {
    const response = await fetch(`${backendURL}/generate`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.output) {
      document.getElementById("result-image").src = result.output;
    } else {
      alert("Image generation failed.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
});
