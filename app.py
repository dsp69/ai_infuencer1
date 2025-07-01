import gradio as gr
import replicate
import os
from dotenv import load_dotenv

load_dotenv()

def generate_image(prompt):
    output = replicate.run(
        "stability-ai/sdxl:latest",
        input={"prompt": prompt}
    )
    return output

demo = gr.Interface(fn=generate_image, inputs="text", outputs="image")
demo.launch()
