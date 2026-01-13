'use client';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Design Tools",
      skills: [
        { name: "Photoshop", level: 90 },
        { name: "Illustrator", level: 80 },
        { name: "CorelDRAW", level: 80 },
      ],
      icon: "ri-palette-line",
    },
    {
      title: "3D & Motion",
      skills: [
        { name: "ChatGPT", level: 90 },
        { name: "Gemini", level: 90 },
      ],
      icon: "ri-blender-fill",
    },
    {
      title: "Other Tools",
      skills: [
        { name: "Canva", level: 80 },
        { name: "Capcut", level: 80 },
        { name: "MS Office", level: 80 },
      ],
      icon: "ri-tools-line",
    },
    {
      title: "Basic Coding/Backend",
      skills: [
        { name: "HTML/CSS", level: 65 },
        { name: "JavaScript", level: 60 },
        { name: "MERN Stack", level: 50 },
      ],
      icon: "ri-code-line",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive skill set across design tools and emerging technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <i className={`${category.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: 'ri-award-line', label: '20+ Projects', desc: 'Completed' },
            { icon: 'ri-user-smile-line', label: '5+ Clients', desc: 'Satisfied' },
            { icon: 'ri-time-line', label: '2+ Years', desc: 'Experience' },
            { icon: 'ri-star-line', label: '4.9/5', desc: 'Rating' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-gray-600">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}