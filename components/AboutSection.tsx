"use client";

import { useRef } from "react";

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  const tools = [
    "Photoshop",
    "Illustrator",
    "CorelDRAW",
    "InDesign",
    "Canva",
    "Figma",
    "Capcut Pc",
    "ChatGPT",
    "Gemini",
    "VEO3",
  ];

  const handleImageMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const card = imageRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 6;
    const rotateX = y * -6;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(0)
    `;
  };

  const handleImageLeave = () => {
    const card = imageRef.current;

    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
    `;
  };

  return (
    <section
      id="about"
      className="
        py-20
        bg-[var(--surface)]
        transition-colors
        duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            items-center
          "
        >
          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="animate-fadeInLeft">
            <div className="relative">
              {/* IMAGE TILT WRAPPER */}

              <div
                ref={imageRef}
                onPointerMove={handleImageMove}
                onPointerLeave={handleImageLeave}
                className="
                  relative
                  z-10
                  transform-gpu
                  transition-transform
                  duration-300
                  ease-out
                  will-change-transform
                "
              >
                <img
                  src="/image/About1.png"
                  alt="Anshul Kumar"
                  className="
                    rounded-2xl
                    shadow-2xl
                    w-full
                    max-w-md
                    mx-auto
                    object-cover
                    object-top
                    transition-all
                    duration-300
                  "
                />
              </div>

              {/* =================================================
                  DECORATIVE SHAPES
              ================================================= */}

              <div
                className="
                  absolute
                  -bottom-6
                  -right-6
                  w-32
                  h-32
                  bg-blue-600
                  dark:bg-blue-500
                  rounded-2xl
                  opacity-20
                  transition-all
                  duration-500
                "
              />

              <div
                className="
                  absolute
                  -top-6
                  -left-6
                  w-24
                  h-24
                  bg-purple-500
                  dark:bg-purple-400
                  rounded-2xl
                  opacity-20
                  transition-all
                  duration-500
                "
              />
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="animate-fadeInRight">
            {/* HEADING */}

            <h2
              className="
                text-4xl
                font-bold
                text-[var(--text-primary)]
                mb-6
                transition-colors
                duration-300
              "
            >
              About Me
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                text-lg
                text-[var(--text-secondary)]
                mb-6
                leading-relaxed
                transition-colors
                duration-300
              "
            >
              I’m a passionate graphic designer with a strong foundation in
              visual storytelling and creative problem-solving. I specialize in
              print and digital design, creating impactful visuals for posters,
              banners, certificates, and social media. I’m also AI-friendly and
              use AI tools in my workflow to make the design process faster,
              smarter, and more efficient, delivering high-quality results with
              speed and creativity.
            </p>

            {/* =================================================
                DESIGN TOOLS
            ================================================= */}

            <div className="mb-8">
              <h3
                className="
                  text-2xl
                  font-semibold
                  text-[var(--text-primary)]
                  mb-4
                  transition-colors
                  duration-300
                "
              >
                Design Tools & Expertise
              </h3>

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  gap-3
                "
              >
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="
                      group
                      relative
                      overflow-hidden
                      bg-[var(--card)]
                      px-4
                      py-3
                      rounded-lg
                      shadow-sm
                      border
                      border-[var(--border)]
                      text-center
                      cursor-default

                      transition-all
                      duration-300
                      ease-out

                      hover:-translate-y-1
                      hover:scale-[1.02]
                      hover:shadow-lg
                      hover:border-[var(--accent)]

                      transform-gpu
                    "
                  >
                    {/* SUBTLE LIGHT SWEEP */}

                    <span
                      className="
                        absolute
                        top-0
                        -left-full
                        w-full
                        h-full
                        bg-gradient-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                        transition-all
                        duration-700
                        group-hover:left-full
                        pointer-events-none
                      "
                    />

                    {/* TOOL NAME */}

                    <span
                      className="
                        relative
                        z-10
                        text-sm
                        font-medium
                        text-[var(--text-primary)]
                        transition-all
                        duration-300
                        group-hover:text-[var(--accent)]
                      "
                    >
                      {tool}
                    </span>

                    {/* BOTTOM ACCENT LINE */}

                    <span
                      className="
                        absolute
                        bottom-0
                        left-1/2
                        w-0
                        h-[2px]
                        bg-[var(--accent)]
                        rounded-full
                        transition-all
                        duration-300
                        -translate-x-1/2
                        group-hover:w-10
                      "
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                EXPERIENCE HIGHLIGHTS
            ================================================= */}

            <div
              className="
                group
                bg-blue-50
                dark:bg-blue-950/40
                p-6
                rounded-xl
                border
                border-blue-100
                dark:border-blue-900/50

                transition-all
                duration-300
                ease-out

                hover:-translate-y-1
                hover:shadow-lg
                hover:border-blue-300
                dark:hover:border-blue-700
              "
            >
              <h4
                className="
                  text-lg
                  font-semibold
                  text-gray-900
                  dark:text-gray-100
                  mb-2
                  transition-colors
                  duration-300
                "
              >
                Experience Highlights
              </h4>

              <ul
                className="
                  text-gray-700
                  dark:text-gray-300
                  space-y-2
                  transition-colors
                  duration-300
                "
              >
                <li className="flex items-center">
                  <div
                    className="
                      w-4
                      h-4
                      flex
                      items-center
                      justify-center
                      mr-3
                    "
                  >
                    <i
                      className="
                        ri-check-line
                        text-blue-600
                        dark:text-blue-400
                      "
                    />
                  </div>
                  Print Design (Certificates, Posters, Banners)
                </li>

                <li className="flex items-center">
                  <div
                    className="
                      w-4
                      h-4
                      flex
                      items-center
                      justify-center
                      mr-3
                    "
                  >
                    <i
                      className="
                        ri-check-line
                        text-blue-600
                        dark:text-blue-400
                      "
                    />
                  </div>
                  Digital Design & Social Media Content
                </li>

                <li className="flex items-center">
                  <div
                    className="
                      w-4
                      h-4
                      flex
                      items-center
                      justify-center
                      mr-3
                    "
                  >
                    <i
                      className="
                        ri-check-line
                        text-blue-600
                        dark:text-blue-400
                      "
                    />
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
