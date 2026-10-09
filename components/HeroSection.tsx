"use client";

import MagneticButton from "./MagneticButton";

export default function HeroSection() {
  const name = "Anshul Kumar";

  const tagline = ["Crafting", "Visual", "Stories", "Through", "Design"];

  const description = [
    "Graphic Designer",

    "Creative Thinker",

    "Visual Problem Solver",
  ];

  return (
    <section
      id="home"
      className="

        relative

        h-screen

        flex

        items-center

        justify-center

        overflow-hidden

        bg-[var(--background)]

        transition-colors

        duration-300

      "
    >
      {/* =====================================================*

          AMBIENT MOTION BACKGROUND

      ===================================================== */}

      {/* Base Background */}

      <div
        className="

          absolute

          inset-0

          bg-[var(--background)]

        "
      />

      {/* Soft Moving Orb 1 */}

      <div
        className="

          absolute

          -top-32

          -left-32

          w-[500px]

          h-[500px]

          rounded-full

          bg-blue-500/10

          dark:bg-blue-400/10

          blur-[100px]

          animate-hero-orb-one

          pointer-events-none

        "
      />

      {/* Soft Moving Orb 2 */}

      <div
        className="

          absolute

          -right-40

          top-[15%]

          w-[600px]

          h-[600px]

          rounded-full

          bg-purple-500/10

          dark:bg-purple-400/10

          blur-[120px]

          animate-hero-orb-two

          pointer-events-none

        "
      />

      {/* Soft Moving Orb 3 */}

      <div
        className="

          absolute

          left-[25%]

          -bottom-52

          w-[550px]

          h-[550px]

          rounded-full

          bg-pink-500/8

          dark:bg-pink-400/8

          blur-[120px]

          animate-hero-orb-three

          pointer-events-none

        "
      />

      {/* =====================================================*

          SLOW MOVING BLURRED BALL

      ===================================================== */}

      <div
        className="

          absolute

          top-[18%]

          left-[-180px]

          w-[320px]

          h-[320px]

          rounded-full

          bg-blue-500/10

          dark:bg-blue-400/10

          blur-[70px]

          animate-hero-ball

          pointer-events-none

        "
      />

      {/* Subtle Moving Gradient */}

      <div
        className="

          absolute

          inset-0

          opacity-40

          dark:opacity-25

          animate-hero-gradient

          pointer-events-none

          bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.07),transparent_35%)]

        "
      />

      {/* Subtle Grid */}

      <div
        className="

          absolute

          inset-0

          opacity-[0.035]

          dark:opacity-[0.025]

          pointer-events-none

          bg-[linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)]

          bg-[size:70px_70px]

        "
      />

      {/* Background Image — Very Subtle */}

      <div
        className="

          absolute

          inset-0

          bg-cover

          bg-center

          bg-no-repeat

          opacity-[0.06]

          dark:opacity-[0.04]

          pointer-events-none

        "
        style={{
          backgroundImage: "url('/image/BG1.png')",
        }}
      />

      {/* =====================================================*

          HERO CONTENT

      ===================================================== */}

      <div
        className="

          relative

          z-10

          text-center

          text-[var(--text-primary)]

          px-4

          sm:px-6

          lg:px-8

          max-w-6xl

          mx-auto

        "
      >
        {/* Intro */}

        <div
          className="

            mb-5

            text-xs

            sm:text-sm

            uppercase

            tracking-[0.4em]

            text-[var(--accent)]

            font-medium

            hero-fade-up

          "
          style={{
            animationDelay: "100ms",
          }}
        >
          Graphic Designer
        </div>

        {/* Main Heading */}

        <h1
          className="

            text-5xl

            sm:text-7xl

            lg:text-8xl

            font-medium

            tracking-[-0.045em]

            mb-6

            leading-[0.95]

          "
        >
          <span
            className="

              inline-block

              whitespace-nowrap

              hero-name-style

              custom-hero-font

            "
          >
            {name.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="

                  inline-block

                  opacity-0

                  text-[var(--text-primary)]

                  hero-letter-reveal

                  custom-hero-font

                "
                style={{
                  animationDelay: `${250 + index * 55}ms`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}

        <h2
          className="

            text-2xl

            sm:text-3xl

            lg:text-4xl

            font-light

            mb-5

            leading-tight

            tracking-tight

            flex

            flex-wrap

            justify-center

            gap-x-2

            sm:gap-x-3

          "
        >
          {tagline.map((word, index) => (
            <span
              key={word}
              className="

                inline-block

                opacity-0

                hero-word-reveal

              "
              style={{
                animationDelay: `${1000 + index * 110}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Description */}

        <p
          className="

            text-base

            sm:text-lg

            lg:text-xl

            mb-9

            text-[var(--text-secondary)]

            flex

            flex-wrap

            justify-center

            gap-x-2

            sm:gap-x-3

            tracking-wide

          "
        >
          {description.map((item, index) => (
            <span
              key={item}
              className="

                inline-block

                opacity-0

                hero-word-reveal

              "
              style={{
                animationDelay: `${1600 + index * 120}ms`,
              }}
            >
              {item}

              {index !== description.length - 1 && (
                <span
                  className="

                    ml-2

                    sm:ml-3

                    text-[var(--accent)]

                  "
                >
                  /
                </span>
              )}
            </span>
          ))}
        </p>

        {/* =====================================================*

            CTA

        ===================================================== */}

        <div
          className="

            opacity-0

            hero-button-reveal

          "
          style={{
            animationDelay: "2150ms",
          }}
        >
          <MagneticButton
            href="#portfolio"
            strength={0.22}
            className="

              bg-[var(--accent)]

              hover:bg-[var(--accent-hover)]

              text-white

              px-8

              py-4

              rounded-full

              text-base

              font-semibold

              shadow-lg

              hover:shadow-2xl

              whitespace-nowrap

              cursor-pointer

              transition-all

              duration-300

            "
          >
            View My Work
          </MagneticButton>
        </div>
      </div>

      {/* =====================================================*

          SMALL FLOATING ACCENTS

      ===================================================== */}

      <div
        className="

          absolute

          top-24

          left-[8%]

          w-2

          h-2

          rounded-full

          bg-[var(--accent)]

          shadow-[00_25pxvar(--accent)]

          animate-float

          opacity-70

        "
      />

      <div
        className="

          absolute

          bottom-[18%]

          right-[10%]

          w-3

          h-3

          rounded-full

          bg-[var(--accent)]

          shadow-[00_30pxvar(--accent)]

          animate-float

          animation-delay-1000

          opacity-60

        "
      />

      <div
        className="

          absolute

          top-[42%]

          left-[12%]

          w-1.5

          h-1.5

          rounded-full

          bg-[var(--accent)]

          shadow-[00_20pxvar(--accent)]

          animate-float

          animation-delay-500

          opacity-50

        "
      />
    </section>
  );
}
