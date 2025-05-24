const experiences = [
  {

  year: "2022",
  role: "Networking Intern",
  company: "PANTECH SOLUTIONS",
  description: "Assisted in setting up and maintaining office networks, including configuring routers and troubleshooting connection issues. Helped monitor network performance and documented technical issues for the IT team. Gained practical experience with basic network security and cable management."

  },
{
  year: "2024",
  role: "Data Analyst Intern",
  company: "CLOUDZOO",
  description: "Analyzed shipment delivery predictions by evaluating zones, transport modes, and call interactions to improve ETA accuracy. Developed visualizations and models to identify key factors impacting on-time deliveries for an e-commerce logistics platform."
},
{
  title: "Deep Learning Bootcamp",
  year: "2023",
  duration: "4 weeks (150+ hours)",
  description: "Trained GANs, Transformers, CNN classifier, sentiment analysis tool, and generative text model. Survived the GPU Wars.",
  tech: ["PyTorch", "GANs", "BERT", "OpenAI GPT-2", "Cloud GPUs"]
}


];

export const Experience = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400"></div>

        {experiences.map((experience, index) => (
          <div key={index} className="relative flex items-start mb-12 last:mb-0">
            {/* Timeline Dot */}
            <div className="absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-4 border-slate-900 z-10"></div>

            {/* Content */}
            <div className="ml-16 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  {experience.role && <h3 className="text-xl font-bold text-white">{experience.role}</h3>}
                  {experience.company && <p className="text-purple-300 font-medium">{experience.company}</p>}
                  {experience.title && <h3 className="text-xl font-bold text-white">{experience.title}</h3>}
                  {experience.duration && <p className="text-purple-300 font-medium">{experience.duration}</p>}
                </div>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0">
                  {experience.year}
                </span>
              </div>
              <p className="text-gray-300">{experience.description}</p>
              {experience.tech && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {experience.tech.map((t: string, i: number) => (
                    <span key={i} className="bg-purple-700/30 text-purple-200 px-2 py-1 rounded text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
