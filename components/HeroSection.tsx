
'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{
          backgroundImage: `url('/image/BG1.png')`,
        }}
      ></div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp">
          I'm{" "}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Anshul kumar
          </span>
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 animate-fadeInUp animation-delay-200">
          Crafting Visual Stories Through Design
        </h2>
        <p className="text-xl sm:text-2xl mb-8 text-gray-200 animate-fadeInUp animation-delay-400">
          Graphic Designer | Creative Thinker | Visual Problem Solver
        </p>

        <Link href="#portfolio">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeInUp animation-delay-600 whitespace-nowrap">
            View My Work
          </button>
        </Link>
      </div>

      {/* Floating design elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-500/20 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-pink-500/20 rounded-full animate-float animation-delay-500"></div>
    </section>
  );
}
