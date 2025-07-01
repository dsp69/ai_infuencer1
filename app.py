import gradio as gr
import replicate
import os

replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

def generate_ai_image(prompt):
    try:
        output = replicate.run(
            "stability-ai/sdxl:latest",
            input={"prompt": prompt}
        )
        return output[0]
    except Exception as e:
        return f"Error: {str(e)}"

demo = gr.Interface(
    fn=generate_ai_image,
    inputs=gr.Textbox(label="Enter your prompt"),
    outputs=gr.Image(label="Generated Image"),
    title="AI Influencer Generator"
)

demo.launch()
