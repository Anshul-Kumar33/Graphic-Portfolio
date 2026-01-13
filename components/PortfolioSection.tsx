'use client';

import { useState } from 'react';

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    "All",
    "Print Design",
    "Banner",
    "Infographic Design",
    "Social Media",
  ];
  
  const projects = [
    {
      id: 1,
      title: "Corporate Brand Identity",
      description:
        "Complete brand identity design including logo, business cards, and stationery",
      category: "Print Design",
      tools: "Corel Draw, Illustrator",
      image: "/image/Corporate Brand Identity.png",
    },
    {
      id: 2,
      title: "Social Media Campaign",
      description:
        "Instagram post series for lifestyle brand with consistent visual theme",
      category: "Social Media",
      tools: "Gemini, Photoshop",
      image: "/image/Social Media.png",
    },
    {
      id: 3,
      title: "Creative Web Banners",
      description:
        "High-impact website banner designs crafted to grab attention, improve visual flow, and communicate brand messages effectively.",
      category: "Banner",
      tools: "Gemini, Photoshop",
      image: "/image/Banners for Websites.png",
    },
    // {
    //   id: 4,
    //   title: "Event Poster Design",
    //   description:
    //     "Eye-catching poster design for music festival with dynamic typography",
    //   category: "Digital Posters",
    //   tools: "Illustrator, Photoshop",
    //   image:
    //     "https://readdy.ai/api/search-image?query=dynamic%20music%20festival%20event%20poster%20design%20with%20bold%20typography%2C%20vibrant%20gradient%20colors%2C%20abstract%20geometric%20elements%2C%20modern%20layout%20composition%2C%20concert%20promotional%20material&width=600&height=400&seq=portfolio-004&orientation=landscape",
    // },
    // {
    //   id: 5,
    //   title: "Certificate Template Series",
    //   description:
    //     "Professional certificate templates for educational institutions",
    //   category: "Print Design",
    //   tools: "Corel Draw, Illustrator",
    //   image: "/image/New Pamphelate.jpg",
    // },
    // {
    //   id: 6,
    //   title: "Digital Marketing Banner",
    //   description: "Web banners for e-commerce platform promotional campaigns",
    //   category: "Digital Posters",
    //   tools: "Photoshop, Illustrator",
    //   image:
    //     "https://readdy.ai/api/search-image?query=modern%20e-commerce%20promotional%20web%20banner%20design%2C%20sale%20announcement%20layout%2C%20product%20showcase%2C%20vibrant%20call-to-action%20buttons%2C%20digital%20marketing%20advertisement%20format&width=600&height=400&seq=portfolio-006&orientation=landscape",
    // },
    {
      id: 7,
      title: "Infographic Poster Design",
      description:
        "Data-driven infographic poster designs crafted to communicate information clearly, effectively, and visually.",
      category: "Infographic Design",
      tools: "Corel Draw, Photoshop",
      image: "/image/InfoGraphic.png",
    },
    // {
    //   id: 8,
    //   title: "Brand Social Assets",
    //   description:
    //     "Complete social media asset pack including stories, posts, and highlights",
    //   category: "Social Media",
    //   tools: "Figma, Canva",
    //   image:
    //     "https://readdy.ai/api/search-image?query=comprehensive%20social%20media%20brand%20asset%20collection%2C%20Instagram%20stories%20templates%2C%20highlight%20covers%2C%20post%20layouts%2C%20consistent%20brand%20colors%20and%20typography%2C%20digital%20marketing%20materials&width=600&height=400&seq=portfolio-008&orientation=landscape",
    // },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Project Highlights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my latest design projects spanning various mediums and creative challenges
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500">{project.tools}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}