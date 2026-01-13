'use client';

export default function AboutSection() {
  const tools = [
    'Photoshop', 'Illustrator', 'CorelDRAW', 'InDesign',  'Canva', 'Figma', 'Capcut Pc', 'ChatGPT', 'Gemini', 'VEO3'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInLeft">
            <div className="relative">
              <img
                src="/image/About1.png"
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
              I’m a passionate graphic designer with a strong foundation in
              visual storytelling and creative problem-solving. I specialize in
              print and digital design, creating impactful visuals for posters,
              banners, certificates, and social media. I’m also AI-friendly and
              use AI tools in my workflow to make the design process faster,
              smarter, and more efficient, delivering high-quality results with
              speed and creativity.
            </p>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Design Tools & Expertise
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Experience Highlights
              </h4>
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
                {/* <li className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-blue-600"></i>
                  </div>
                  3D Modeling & Rendering
                </li> */}
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