
import { Database, Globe, Code, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Solidity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" }
    ],
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
    icon: <Code className="h-8 w-8" />
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Web3.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
    ],
    color: "from-green-500 to-emerald-500 dark:from-blue-500 dark:to-cyan-500",
    icon: <Globe className="h-8 w-8" />
  },
  {
    title: "Frameworks",
    skills: [
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Keras", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg" },
      { name: "Hugging Face", logo: "https://huggingface.co/favicon.ico" },
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
    ],
    color: "from-purple-500 to-violet-500 dark:from-blue-600 dark:to-blue-400",
    icon: <Database className="h-8 w-8" />
  },
  {
    title: "Tools",
    skills: [
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "Streamlit", logo: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
      { name: "Replit", logo: "https://replit.com/public/icons/apple-icon-180.png" }
    ],
    color: "from-orange-500 to-red-500 dark:from-blue-700 dark:to-blue-300",
    icon: <Wrench className="h-8 w-8" />
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-blue-400 dark:to-cyan-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${category.color} p-3 mr-4`}>
                {category.icon}
              </div>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-5">
              {category.skills.map((skill, skillIndex) => (
                <div 
                  key={skillIndex}
                  className="flex flex-col items-center group"
                >
                  <div className="w-12 h-12 bg-white/30 rounded-lg p-2 flex items-center justify-center hover:bg-white/40 transition-all duration-200">
                    <img 
                      src={skill.logo} 
                      alt={skill.name} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="mt-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
