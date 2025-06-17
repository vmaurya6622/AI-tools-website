const toolTemplates = {
  // General
  summarize: (input) => `Summarize the following text:\n\n${input}`,
  math: (input) => `Solve this formula or math problem:\n\n${input}`,
  translate: (input) => `Translate this to Spanish:\n\n${input}`,
  explain: (input) => `Explain the following concept in simple terms:\n\n${input}`,
  code: (input) => `Write code to perform the following task:\n\n${input}`,
  grammar: (input) => `Correct the grammar of the following text:\n\n${input}`,
  emailTone: (input) => `Optimize the tone of this email. Provide versions in formal, friendly, and persuasive styles:\n\n${input}`,
  pressRelease: (input) => `Generate a professional press release based on the following bullet points:\n\n${input}`,
  speechWriter: (input) => `Write a speech on the following topic. Include a short introduction, main points, and conclusion:\n\n${input}`,
  crisisComm: (input) => `Draft a public relations crisis response based on this situation:\n\n${input}`,
  memoGen: (input) => `Write an internal memo for the following topic:\n\n${input}`,
  socialMedia: (input) => `Create social media posts for Twitter, LinkedIn, and Instagram based on the following message:\n\n${input}`,
  sentiment: (input) => `Analyze the sentiment of the following press release or message:\n\n${input}`,
  slideAssistant: (input) => `Create a text-based slide deck from this content. Include a title and 3-5 bullet points per slide:\n\n${input}`,
  voiceEnhancer: (input) => `Provide tips to improve vocal clarity for delivering this script. Analyze and suggest improvements:\n\n${input}`,
  meetingSummary: (input) => `Summarize this meeting transcript into key action items and a short summary:\n\n${input}`,

  // Engineering / CS
  circuitDesign: (input) => `Suggest components and simulate the following circuit:\n\n${input}`,
  signalAnalysis: (input) => `Analyze this waveform or signal data for patterns and noise:\n\n${input}`,
  pcbValidator: (input) => `Check the following PCB layout for common design or routing errors:\n\n${input}`,
  componentRecommender: (input) => `Recommend compatible electronic components based on the following context:\n\n${input}`,
  iotWizard: (input) => `Help configure and simulate the following IoT system:\n\n${input}`,
  powerOptimizer: (input) => `Analyze the following circuit and suggest ways to optimize power consumption:\n\n${input}`,
  schematicToCode: (input) => `Convert the following schematic or circuit logic into embedded C code:\n\n${input}`,
  sensorAnalyzer: (input) => `Interpret and summarize the following sensor data:\n\n${input}`,
  embeddedDebugger: (input) => `Diagnose issues and suggest fixes for this embedded code or behavior:\n\n${input}`,
  rfVisualizer: (input) => `Map and visualize the RF signal strength based on the following data:\n\n${input}`,

  // Programming / Development
  algorithmExplain: (input) => `Explain this algorithm step-by-step and visualize it if possible:\n\n${input}`,
  codeDebug: (input) => `Find and fix bugs in the following code. Explain your changes:\n\n${input}`,
  apiDesign: (input) => `Audit the following API code or system for security issues:\n\n${input}`,
  systemArchitecture: (input) => `Design or evaluate an API based on this requirement. Include endpoints, data flow, and security considerations:\n\n${input}`,
  cybersecurityAudit: (input) => `Summarize this Git commit history or log. Highlight key changes and security implications:\n\n${input}`,
  databaseQuery: (input) => `Design or evaluate a database system architecture for the following requirements. Include components, data flow, and justification:\n\n${input}`,
  networkConfig: (input) => `Configure network settings based on this system requirement:\n\n${input}`,
  codeOptimize: (input) => `Optimize the following code for performance and readability:\n\n${input}`,
  cloudSetup: (input) => `Write SQL queries or modify schema for the following task:\n\n${input}`,
  dataProcessing: (input) => `Provide cloud deployment steps or infrastructure diagram for the following setup:\n\n${input}`,
};



let selectedTool = null;

// Toggle dropdowns (engineering / cs etc.)
document.querySelectorAll('[data-toggle]').forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-toggle");
    const section = document.getElementById(targetId);
    if (!section) return;
    const isVisible = section.classList.contains("max-h-[1000px]");
    section.classList.toggle("max-h-[1000px]", !isVisible);
    section.classList.toggle("opacity-100", !isVisible);
    section.classList.toggle("max-h-0", isVisible);
    section.classList.toggle("opacity-0", isVisible);
  });
});

// Tool card selection logic
document.querySelectorAll(".tool-card").forEach((card) => {
  let overlay = card.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay absolute inset-0 bg-blue-600 opacity-0 rounded-lg pointer-events-none transition-opacity duration-300";
    card.style.position = "relative";
    card.appendChild(overlay);
  }

  card.addEventListener("click", () => {
    document.querySelectorAll(".tool-card").forEach((c) => {
      c.classList.remove("ring-2", "ring-blue-500");
      const ov = c.querySelector(".overlay");
      if (ov) {
        ov.classList.remove("opacity-50");
        ov.classList.add("opacity-0");
      }
    });

    card.classList.add("ring-2", "ring-blue-500");
    overlay.classList.remove("opacity-0");
    overlay.classList.add("opacity-50");

    selectedTool = card.getAttribute("data-tool");
    console.log("Selected tool:", selectedTool);

    if (!toolTemplates[selectedTool]) {
      console.error(`Tool "${selectedTool}" not found in toolTemplates`);
      document.getElementById("output").textContent = `❌ Tool "${selectedTool}" is not configured.`;
    }
  });
});

// Submit logic
document.getElementById("submitBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  const outputDiv = document.getElementById("output");

  if (!selectedTool) {
    outputDiv.textContent = "⚠️ Please select a tool first.";
    console.warn("No tool selected");
    return;
  }

  if (!input) {
    outputDiv.textContent = "⚠️ Please enter some input.";
    console.warn("No input provided");
    return;
  }

  const toolFunc = toolTemplates[selectedTool];
  if (!toolFunc) {
    outputDiv.textContent = `❌ Tool "${selectedTool}" is not configured.`;
    console.error(`Tool ${selectedTool} not found in toolTemplates`);
    return;
  }

  const prompt = toolFunc(input);
  outputDiv.textContent = "⏳ Running AI...";
  console.log("Generated prompt:", prompt);

  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.response) {
      outputDiv.textContent = data.response;
      console.log("API response:", data.response);
    } else {
      outputDiv.textContent = "⚠️ No response received from AI.";
      console.warn("No response in API data:", data);
    }
  } catch (error) {
    outputDiv.textContent = `❌ Error: ${error.message}`;
    console.error("API error:", error);
  }
});
