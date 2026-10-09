"use client";

import { useEffect, useRef, useState } from "react";

export default function SkillsSection() {
  const [barsVisible, setBarsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

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
      title: "AI",
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

  const stats = [
    {
      icon: "ri-award-line",
      label: "20+ Projects",
      desc: "Completed",
    },
    {
      icon: "ri-user-smile-line",
      label: "5+ Clients",
      desc: "Satisfied",
    },
    {
      icon: "ri-time-line",
      label: "2+ Years",
      desc: "Experience",
    },
    {
      icon: "ri-star-line",
      label: "4.9/5",
      desc: "Rating",
    },
  ];

  /* =========================================================
     SKILL BAR SCROLL ANIMATION
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBarsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     ICON INTERACTION
  ========================================================= */

  const handleIconMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget;

    /*
      Only activate on desktop / mouse devices.
      Touch devices won't get the cursor interaction.
    */

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const rect = element.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);

    const y = event.clientY - (rect.top + rect.height / 2);

    const rotateY = (x / (rect.width / 2)) * 10;

    const rotateX = (-y / (rect.height / 2)) * 10;

    const moveX = x * 0.08;
    const moveY = y * 0.08;

    element.style.transform = `
      translate3d(${moveX}px, ${moveY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.08)
    `;
  };

  /* =========================================================
     ICON RESET
  ========================================================= */

  const handleIconLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget;

    element.style.transform =
      "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="
        py-20
        bg-[var(--surface)]
        transition-colors
        duration-300
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
           SECTION HEADING
        ===================================================== */}

        <div
          className="
            text-center
            mb-12
            animate-fadeInUp
          "
        >
          <h2
            className="
              text-4xl
              font-bold
              text-[var(--text-primary)]
              mb-4
              transition-colors
              duration-300
            "
          >
            Skills & Expertise
          </h2>

          <p
            className="
              text-xl
              text-[var(--text-secondary)]
              max-w-3xl
              mx-auto
              transition-colors
              duration-300
            "
          >
            Comprehensive skill set across design tools and emerging
            technologies
          </p>
        </div>

        {/* =====================================================
           SKILL CARDS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
        >
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="
                  group
                  bg-[var(--card)]
                  rounded-2xl
                  p-6
                  shadow-lg
                  hover:shadow-xl
                  border
                  border-[var(--border)]
                  hover:bg-[var(--card-hover)]
                  transition-all
                  duration-300
                  animate-fadeInUp
                "
              style={{
                animationDelay: `${categoryIndex * 100}ms`,
              }}
            >
              {/* =========================================
                   CARD HEADER
                ========================================= */}

              <div className="flex items-center mb-6">
                {/* =====================================
                     INTERACTIVE ICON
                  ===================================== */}

                <div
                  onPointerMove={handleIconMove}
                  onPointerLeave={handleIconLeave}
                  className="
                      relative
                      w-12
                      h-12
                      bg-blue-100
                      dark:bg-blue-950/60
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mr-4
                      transition-all
                      duration-200
                      ease-out
                      will-change-transform
                      cursor-pointer
                      transform-gpu
                      shadow-sm
                      group-hover:shadow-md
                    "
                  style={{
                    perspective: "500px",
                  }}
                >
                  {/* Subtle glow */}

                  <div
                    className="
                        absolute
                        inset-0
                        rounded-xl
                        bg-blue-400/0
                        group-hover:bg-blue-400/10
                        blur-md
                        transition-all
                        duration-300
                        pointer-events-none
                      "
                  />

                  <i
                    className={`
                        ${category.icon}
                        relative
                        z-10
                        text-2xl
                        text-blue-600
                        dark:text-blue-400
                        transition-colors
                        duration-300
                      `}
                  />
                </div>

                {/* TITLE */}

                <h3
                  className="
                      text-xl
                      font-bold
                      text-[var(--text-primary)]
                      transition-colors
                      duration-300
                    "
                >
                  {category.title}
                </h3>
              </div>

              {/* =================================================
                   SKILLS
                ================================================= */}

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    {/* NAME + PERCENTAGE */}

                    <div
                      className="
                            flex
                            justify-between
                            items-center
                            mb-2
                          "
                    >
                      <span
                        className="
                              text-sm
                              font-medium
                              text-[var(--text-secondary)]
                              transition-colors
                              duration-300
                            "
                      >
                        {skill.name}
                      </span>

                      <span
                        className="
                              text-sm
                              text-[var(--text-muted)]
                              transition-colors
                              duration-300
                            "
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* PROGRESS BAR */}

                    <div
                      className="
                            w-full
                            bg-[var(--surface-hover)]
                            rounded-full
                            h-2
                            overflow-hidden
                            transition-colors
                            duration-300
                          "
                    >
                      <div
                        className="
                              bg-gradient-to-r
                              from-blue-500
                              to-purple-600
                              h-2
                              rounded-full
                              transition-all
                              duration-[1400ms]
                              ease-[cubic-bezier(0.22,1,0.36,1)]
                            "
                        style={{
                          width: barsVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${skillIndex * 120}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
           STATS
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            grid-cols-2
            md:grid-cols-4
            gap-8
          "
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                text-center
                animate-fadeInUp
                group
              "
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* =========================================
                 STAT ICON
              ========================================= */}

              <div
                onPointerMove={handleIconMove}
                onPointerLeave={handleIconLeave}
                className="
                  w-16
                  h-16
                  bg-blue-600
                  dark:bg-blue-500
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                  transition-all
                  duration-200
                  ease-out
                  will-change-transform
                  cursor-pointer
                  transform-gpu
                  shadow-md
                  group-hover:shadow-xl
                "
                style={{
                  perspective: "500px",
                }}
              >
                <i
                  className={`
                    ${stat.icon}
                    text-2xl
                    text-white
                    transition-transform
                    duration-300
                  `}
                />
              </div>

              {/* NUMBER */}

              <div
                className="
                  text-2xl
                  font-bold
                  text-[var(--text-primary)]
                  mb-1
                  transition-colors
                  duration-300
                "
              >
                {stat.label}
              </div>

              {/* DESCRIPTION */}

              <div
                className="
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-300
                "
              >
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
