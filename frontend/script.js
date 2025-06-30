const IMGUR_CLIENT_ID = 'YOUR_IMGUR_CLIENT_ID';
const API_URL = 'https://your-backend-url.onrender.com/generate'; // update for production

async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
    },
    body: formData
  });

  const data = await response.json();
  if (data.success) {
    return data.data.link;
  } else {
    throw new Error('Image upload failed');
  }
}

async function generateImage() {
  const imageFile = document.getElementById('imageInput').files[0];
  const prompt = document.getElementById('promptInput').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Processing...';

  if (!imageFile || !prompt) {
    resultDiv.innerHTML = 'Please provide an image and a prompt.';
    return;
  }

  try {
    const imageUrl = await uploadImage(imageFile);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url: imageUrl, prompt })
    });

    const data = await res.json();
    if (data.result) {
      const img = document.createElement('img');
      img.src = data.result;
      img.alt = 'Generated Image';
      img.style.maxWidth = '100%';
      resultDiv.innerHTML = '';
      resultDiv.appendChild(img);
    } else {
      resultDiv.innerHTML = data.error || 'Generation failed.';
    }
  } catch (err) {
    resultDiv.innerHTML = `Error: ${err.message}`;
  }
}
