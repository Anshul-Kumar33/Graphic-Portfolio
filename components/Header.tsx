"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Apply selected theme and update logo
  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    let darkMode = false;

    if (selectedTheme === "light") {
      root.classList.add("light");
    } else if (selectedTheme === "dark") {
      root.classList.add("dark");
      darkMode = true;
    } else {
      darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

      root.classList.add(darkMode ? "dark" : "light");
    }

    setIsDarkMode(darkMode);
  };

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;

    const initialTheme: Theme =
      savedTheme === "light" || savedTheme === "dark" || savedTheme === "system"
        ? savedTheme
        : "system";

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Automatically detect system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const savedTheme = localStorage.getItem("portfolio-theme");

      if (!savedTheme || savedTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Change theme
  const changeTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem("portfolio-theme", selectedTheme);
    applyTheme(selectedTheme);
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-[var(--background)]/90
        backdrop-blur-md
        shadow-lg
        border-b border-[var(--border)]
        transition-all duration-300
      "
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* THEME-ADAPTIVE LOGO */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              aria-label="Anshul Kumar - Home"
              className="inline-flex items-center"
            >
              <img
                src={isDarkMode ? "/logo/White.png" : "/logo/Black.png"}
                alt="Anshul Kumar Logo"
                className="
                  h-[50px] sm:h-[55px]
                  w-auto max-w-[160px]
                  object-contain
                "
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="
                    relative
                    text-[var(--text-secondary)]
                    hover:text-[var(--accent)]
                    px-4 py-2 text-sm font-semibold
                    transition-all duration-300
                    cursor-pointer whitespace-nowrap
                    rounded-lg hover:bg-[var(--surface)]
                    group
                  "
                >
                  {item.name}

                  <span
                    className="
                      absolute bottom-0 left-1/2
                      w-0 h-0.5
                      bg-[var(--accent)]
                      transition-all duration-300
                      group-hover:w-full
                      group-hover:left-0
                    "
                  />
                </a>
              ))}
            </div>

            {/* DESKTOP THEME SELECTOR */}
            <div
              className="
                ml-5 flex items-center gap-1 p-1
                rounded-xl border border-[var(--border)]
                bg-[var(--surface)]
              "
            >
              <button
                type="button"
                onClick={() => changeTheme("system")}
                title="System theme"
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-all duration-200
                  ${
                    theme === "system"
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <i className="ri-computer-line text-lg" />
              </button>

              <button
                type="button"
                onClick={() => changeTheme("light")}
                title="Light mode"
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-all duration-200
                  ${
                    theme === "light"
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <i className="ri-sun-line text-lg" />
              </button>

              <button
                type="button"
                onClick={() => changeTheme("dark")}
                title="Dark mode"
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-all duration-200
                  ${
                    theme === "dark"
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <i className="ri-moon-line text-lg" />
              </button>
            </div>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-2">
            <div
              className="
                flex items-center gap-1 p-1
                rounded-xl border border-[var(--border)]
                bg-[var(--surface)]
              "
            >
              <button
                type="button"
                onClick={() => changeTheme("system")}
                title="System theme"
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-all
                  ${
                    theme === "system"
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-muted)]"
                  }
                `}
              >
                <i className="ri-computer-line text-base" />
              </button>

              <button
                type="button"
                onClick={() => changeTheme("light")}
                title="Light mode"
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-all
                  ${
                    theme === "light"
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-muted)]"
                  }
                `}
              >
                <i className="ri-sun-line text-base" />
              </button>

              <button
                type="button"
                onClick={() => changeTheme("dark")}
                title="Dark mode"
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-all
                  ${
                    theme === "dark"
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-muted)]"
                  }
                `}
              >
                <i className="ri-moon-line text-base" />
              </button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="
                inline-flex items-center justify-center p-2
                rounded-lg text-[var(--text-secondary)]
                hover:text-[var(--accent)]
                hover:bg-[var(--surface)]
                cursor-pointer transition-all duration-300
              "
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i
                  className={
                    isMenuOpen
                      ? "ri-close-line text-xl"
                      : "ri-menu-line text-xl"
                  }
                />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className="
                px-2 pt-2 pb-3 space-y-1 sm:px-3
                bg-[var(--background)]/95
                backdrop-blur-sm
                border-t border-[var(--border)]
                shadow-lg
              "
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="
                    text-[var(--text-secondary)]
                    hover:text-[var(--accent)]
                    hover:bg-[var(--surface)]
                    block px-4 py-3 text-base font-medium
                    cursor-pointer rounded-lg
                    transition-all duration-300
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
