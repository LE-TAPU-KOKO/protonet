
import { Button } from "./ui/button";
import { MessageCircle, Brain, BarChart3, Code2 } from "lucide-react";

const coreSkills = [
  {
    name: "AI",
    icon: <Brain className="h-8 w-8" />,
    color: "from-purple-500 to-violet-500 dark:from-blue-500 dark:to-cyan-500"
  },
  {
    name: "Data Science",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"
  },
  {
    name: "Python",
    icon: <Code2 className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500 dark:from-blue-600 dark:to-blue-400"
  }
];

export const About = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-blue-400 dark:to-cyan-400 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main About Content */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm Ramaswamy B, an aspiring Artificial Intelligence & Data Scientist passionate about building intelligent, scalable solutions that bridge data and decision-making. With hands-on experience in AI-driven projects, decentralized platforms, and open-source contributions, I aim to craft tech that makes a meaningful impact.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Currently pursuing my B.Tech in AI & Data Science, I'm always exploring new technologies and challenging ideas in AI, machine learning, and software engineering.
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Core Skills */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Core Skills</h3>
          <div className="space-y-4">
            {coreSkills.map((skill, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${skill.color} p-2`}>
                  {skill.icon}
                </div>
                <span className={`text-lg font-semibold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
