# 🧠 AI Tools Hub

AI Tools Hub is a web-based application that consolidates various powerful AI utilities across domains like Communication, Engineering, and Computer Science. Users can interact with tools like summarizers, translators, code generators, and circuit designers — all from one dynamic interface.

![AI Tools Hub UI](img.png)

## 🚀 Features

### 🧰 General Tools
- **Summarizer** – Summarize lengthy texts instantly.
- **Formula Solver** – Solve math problems.
- **Translator** – Translate text between languages.
- **Explainer** – Break down complex topics.
- **Code Generator** – Generate code based on prompts.
- **Grammar Fixer** – Correct grammar mistakes.

### 📣 Communication Tools
- Email Tone Optimizer
- Press Release Generator
- Speech Writer AI
- Crisis Comm Assistant
- Memo Generator
- Social Media Content Generator
- Sentiment Analyzer
- Slide Assistant
- Voice Enhancer
- Meeting Summarizer

### ⚙️ Electronics Engineering Tools
- Circuit Design Helper
- Signal Analysis Tool
- PCB Layout Validator
- Component Recommender
- IoT Config Wizard
- Power Optimizer
- Schematic to Code Generator
- Sensor Analyzer
- Embedded Debug Helper
- RF Visualizer

### 💻 CS / IT Tools
- Code Explainer
- Bug Fix Assistant
- API Integration Wizard
- System Architecture Mapper
- Version Control Summarizer
- SQL Query Generator
- Network Troubleshooter AI
- Codebase Search Assistant
- Algorithm Visualizer
- Tech Stack Suggestion Tool

## 🖼️ Interface Preview

The interface dynamically categorizes tools and uses a video background for a futuristic, immersive feel:

![Interface Preview](img.png)

## 🧩 Architecture

- **HTML/CSS**: TailwindCSS is used for responsive design and clean UI.
- **JavaScript**: Frontend logic in `style.js` handles tool selection, input validation, and output rendering.
- **Backend Integration**: Sends prompts to an AI model (e.g., LLaMA 3 via Ollama).

## 🗂️ Project Structure
  ├── index.html # Main page UI
  ├── style.js # Logic to manage tools and fetch AI output
  ├── README.md # Documentation
  ├── LICENSE # Open source license
  ├── runner.bat # (Optional) Local launcher
  └── uploads/
  └── img.png # Screenshot used in documentation

## 🧠 How it Works

1. Select an AI tool from any category.
2. Enter your input text.
3. Click “Run AI Tool.”
4. The tool generates a response using a locally hosted AI model (e.g., Ollama’s LLaMA 3).

> Example prompt generation is handled by `toolTemplates` in `style.js`.

## 📷 Screenshots

### 🔎 Tool Selection

![Tool Selection](img.png)

### 📤 Output Section

Once a tool is selected and input is provided, the response is shown in the dynamic output box.

## 🔧 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ai-tools-website.git
cd ai-tools-website
2. Run Locally
Ensure Ollama and the required model (e.g., llama3) are running.

Then, simply open index.html in a browser or launch via:
runner.bat

