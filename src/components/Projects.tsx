
const projects = [
  {
    title: "Underwater AUV ARP Networking Simulation",
    year: "2022",
    description: "Simulated ARP-based communication between AUVs in underwater environments using NS2, focusing on protocol performance in high-latency, low-bandwidth conditions.",
    tech: ["NS2", "TCL", "C++", "Ubuntu", "Xgraph"]
  },
  {
    title: "AI-Powered Gesture Control System",
    year: "2023",
    description: "Developed an intelligent system that recognizes hand gestures using computer vision and machine learning algorithms.",
    tech: ["Python", "OpenCV", "TensorFlow", "MediaPipe"]
  },
  {
    title: "Voice-Controlled IoT Rover with Smart Obstacle Detection",
    year: "2024",
    description: "Engineered an autonomous rover with ultrasonic sensors for obstacle detection, voice controls via a custom app, and real-time crash alerts using Telegram and cloud APIs.",
    tech: ["Arduino", "MIT App Inventor", "Google Speech API", "ThingSpeak", "Telegram Bot API", "ESP8266", "C++", "IFTTT"]
  },
  {
    title: "AI-Augmented SmartChat App",
    year: "2024",
    description: "Android app featuring real-time voice-to-text conversion, AI-powered summarization, and edge-optimized NLP for offline conversation analysis.",
    tech: ["Java", "Android Studio", "ONNX Runtime", "Hugging Face Transformers", "Whisper ASR", "SQLite", "MQTT", "TensorFlow Lite"]
  },
  {
    title: "AI-Driven Structured Data Extractor",
    year: "2024",
    description: "Tool leveraging NLP to automatically extract and structure data from unstructured documents for enhanced accessibility.",
    tech: ["Python", "Hugging Face", "FastAPI", "Docker"]
  },
  {
    title: "BlockExam Decentralized Proctoring",
    year: "2025",
    description: "Blockchain-based exam proctoring system ensuring transparency and cheating prevention through Ethereum smart contracts.",
    tech: ["Solidity", "Web3.js", "React.js", "Ethereum"]
  },
  {
    title: "Brain MRI Tumor Segmentation Using Soft Computing",
    year: "2025",
    description: "Pipeline combining fuzzy logic and CNNs to segment tumors in MRI scans with high diagnostic accuracy.",
    tech: ["Python", "MATLAB", "Fuzzy Logic", "Convolutional Neural Networks", "OpenCV", "NumPy", "Scikit-image", "TensorFlow"]
  },
  {
    title: "Fine-Tuning a Minimal GPT Model",
    year: "2025",
    description: "Optimized lightweight GPT model using domain-specific data and parallel training for efficient low-resource text generation.",
    tech: ["Python", "PyTorch", "CUDA", "wandb", "Hugging Face Datasets"]
  },
  {
    title: "MuseMind: AI-Driven MCP Server for Intelligent User Interaction",
    year: "2025",
    description: "AI-powered server enabling real-time user behavior tracking and automated personalized playlist generation for music apps.",
    tech: ["Python", "WebSocket", "TensorFlow", "Redis", "Docker", "PostgreSQL", "NLP"]
  }







];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Projects</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-blue-400 dark:to-cyan-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
              <span className="bg-purple-500/20 text-purple-300 dark:bg-blue-500/20 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {project.year}
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 dark:from-blue-600/50 dark:to-cyan-600/50 rounded-full text-xs font-medium text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
