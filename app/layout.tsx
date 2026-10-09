import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anshul Kumar - Graphic Designer Portfolio",
  description:
    "Professional graphic designer specializing in visual storytelling, print design, digital media, and 3D visualization. Explore my creative portfolio.",
  icons: {
    icon: "/logo/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const savedTheme = localStorage.getItem("portfolio-theme");

                  if (savedTheme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else if (savedTheme === "light") {
                    document.documentElement.classList.add("light");
                  } else {
                    const prefersDark = window.matchMedia(
                      "(prefers-color-scheme: dark)"
                    ).matches;

                    if (prefersDark) {
                      document.documentElement.classList.add("dark");
                    }
                  }
                } catch (error) {
                  console.error("Theme initialization error:", error);
                }
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
