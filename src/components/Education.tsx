

const educationData = [
  {
    year: "2020",
    degree: "SSLC",
    institution: "Rosily Matriculation Hr Sec School",
    isRecent: false
  },
  {
    year: "2020–2023",
    degree: "Diploma in Computer Science Engineering",
    institution: "Bharath Polytechnic College",
    isRecent: false
  },
  {
    year: "2023–2026*",
    degree: "B.Tech Artificial Intelligence & Data Science",
    institution: "Anna University Regional Campus, Coimbatore",
    isRecent: true
  }
];

export const Education = () => {
  return (
    <section id="education" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Education</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-blue-400 dark:to-cyan-400 mx-auto"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400 dark:from-blue-400 dark:to-cyan-400"></div>

        {educationData.map((item, index) => (
          <div key={index} className="relative flex items-start mb-12 last:mb-0">
            {/* Timeline Dot */}
            <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
              item.isRecent ? 'bg-purple-400 border-purple-400 dark:bg-blue-400 dark:border-blue-400' : 'bg-pink-400 border-pink-400 dark:bg-cyan-400 dark:border-cyan-400'
            } z-10`}></div>

            {/* Content */}
            <div className="ml-16 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  item.isRecent ? 'bg-purple-500/20 text-purple-300 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-pink-500/20 text-pink-300 dark:bg-cyan-500/20 dark:text-cyan-300'
                }`}>
                  {item.year}
                </span>
              </div>
              <p className="text-gray-300">{item.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
