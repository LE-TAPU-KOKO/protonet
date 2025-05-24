
const achievements = [
    {
    year: "2025",
    title: "Introduction to Large Language Models (NPTEL)",
    description: "Successfully completed certification course on Large Language Models.",
    priority: "medium"
  },

  {
    year: "2025*",
    title: "GitHub Open Source Contributor Recognition",
    description: "Recognized for significant contributions to open-source projects on GitHub.",
    priority: "high"
  },

  {
  year: "2024",
  title: "OpenAI Prompt Engineering Certification (Unofficial)",
  description: "Completed self-guided learning and hands-on implementation of advanced prompt engineering techniques using OpenAI models across various applications.",
  priority: "high"
},
{
  year: "2024",
  title: "Hugging Face Transformers Course Certificate",
  description: "Completed Hugging Face's official course, covering the use and fine-tuning of Transformer-based models such as BERT, GPT-2, and T5.",
  priority: "high"
},

{
  year: "2023",
  title: "OpenStack Cloud Deployment",
  description: "Completed a hands-on course on deploying, configuring, and managing OpenStack services for private cloud infrastructure, including compute, storage, networking, and dashboard components.",
  priority: "high"
},

{
  year: "2022",
  title: "Red Hat Certified System Administrator",
  description: "Earned Red Hat's official RHCSA certification, demonstrating proficiency in Linux system administration tasks including user management, security policies, networking, and storage in enterprise environments.",
  priority: "high"
},

  {
    year: "2022",
    title: "Networking Internship Certificate",
    description: "Completed networking internship with distinction and received certificate of excellence.",
    priority: "medium"
  },
    {
    year:"2025*",
    title: "10+ udemy Courses Completed",
    description: "Completed over 10 courses on Udemy, enhancing skills in various domains including linux, data science, and machine learning.",
    priority: "medium"
  }
];

export const Achievements = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Certifications & Achievements</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400"></div>

        {achievements.map((achievement, index) => (
          <div key={index} className="relative flex items-start mb-12 last:mb-0">
            {/* Timeline Dot */}
            <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-slate-900 z-10 ${
              achievement.priority === 'high' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-purple-400 to-pink-400'
            }`}></div>

            {/* Content */}
            <div className={`ml-16 backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${
              achievement.priority === 'high' 
                ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/30 hover:from-yellow-500/20 hover:to-orange-500/20' 
                : 'bg-white/10 border-white/20 hover:bg-white/15'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 ${
                  achievement.priority === 'high' 
                    ? 'bg-yellow-500/20 text-yellow-300' 
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {achievement.year}
                </span>
              </div>
              <p className="text-gray-300">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
