'use client';

export default function AboutSection() {
  const tools = [
    'Photoshop', 'Illustrator', 'CorelDRAW', 'InDesign', 
    'Blender', '3ds Max', 'Canva', 'Figma'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInLeft">
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20creative%20graphic%20designer%20in%20modern%20office%20setting%2C%20confident%20and%20friendly%20expression%2C%20wearing%20casual%20professional%20attire%2C%20clean%20background%20with%20design%20elements%2C%20natural%20lighting%2C%20high%20quality%20photography%20for%20portfolio%20website&width=600&height=700&seq=about-portrait-001&orientation=portrait"
                alt="Anshul Kumar"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover object-top"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
          
          <div className="animate-fadeInRight">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me</h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I'm a passionate graphic designer with a strong foundation in visual storytelling and creative problem-solving. 
              With extensive experience in both print and digital design, I specialize in creating compelling visual content 
              that resonates with audiences and drives results.
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              My journey in design spans across various mediums - from certificates and posters to banners and social media content. 
              I believe in the power of design to communicate ideas effectively and create meaningful connections between brands and their audiences.
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Design Tools & Expertise</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((tool, index) => (
                  <div 
                    key={index}
                    className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm font-medium text-gray-800">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Experience Highlights</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-blue-600"></i>
                  </div>
                  Print Design (Certificates, Posters, Banners)
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-blue-600"></i>
                  </div>
                  Digital Design & Social Media Content
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-blue-600"></i>
                  </div>
                  3D Modeling & Rendering
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-blue-600"></i>
                  </div>
                  Brand Identity & Visual Communication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}