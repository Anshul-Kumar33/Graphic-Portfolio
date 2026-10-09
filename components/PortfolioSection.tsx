"use client";
import { useEffect, useRef, useState } from "react";
type MediaItem = {
  name: string;
  url: string;
  type: "image" | "video";
};
type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  category: string;
  tools: string;
  image: string;
  folder: string;
};
const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "Corporate Brand Identity",
    description:
      "Complete brand identity design including logo, business cards, and stationery.",
    category: "Print Design",
    tools: "Corel Draw, Illustrator",
    image: "/image/Corporate Brand Identity.png",
    folder: "corporate-brand-identity",
  },
  {
    id: 2,
    title: "Social Media Campaign",
    description:
      "Instagram post series for lifestyle brands with consistent visual themes.",
    category: "Social Media",
    tools: "Gemini, Photoshop",
    image: "/image/Social Media.png",
    folder: "social-media",
  },
  {
    id: 3,
    title: "Creative Web Banners",
    description:
      "High-impact website banner designs crafted to grab attention, improve visual flow, and communicate brand messages effectively.",
    category: "Banner",
    tools: "Gemini, Photoshop",
    image: "/image/Banners for Websites.png",
    folder: "banners",
  },
  {
    id: 4,
    title: "Infographic Poster Design",
    description:
      "Data-driven infographic poster designs crafted to communicate information clearly, effectively, and visually.",
    category: "Infographic Design",
    tools: "Corel Draw, Photoshop",
    image: "/image/InfoGraphic.png",
    folder: "infographics",
  },
  {
    id: 5,
    title: "Print Design",
    description:
      "Creative print designs including brochures, pamphlets, posters and other marketing materials.",
    category: "Print Design",
    tools: "Corel Draw, Illustrator, Photoshop",
    image: "/image/Print Design.png",
    folder: "print-design",
  },
  {
    id: 6,
    title: "Reels & Video",
    description:
      "Short-form video editing, promotional reels, motion graphics and social media videos.",
    category: "Reels",
    tools: "Premiere Pro, After Effects, CapCut",
    image: "/image/Social Media.png",
    folder: "reels",
  },
];
const categories = [
  "All",
  "Print Design",
  "Banner",
  "Infographic Design",
  "Social Media",
  "Reels",
];
type VideoGalleryItemProps = {
  item: MediaItem;
  active: boolean;
  onOpen: (item: MediaItem) => void;
};
/** Loads each gallery video only when it approaches the viewport. */
function VideoGalleryItem({ item, active, onOpen }: VideoGalleryItemProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const isInView = useRef(false);
  useEffect(() => {
    const video = videoElement.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
        if (entry.isIntersecting && !active) {
          if (video.dataset.loaded !== "true") {
            video.src = item.url;
            video.dataset.loaded = "true";
            video.load();
          }
          video.muted = true;
          video.play().catch(() => {
            // Autoplay may be restricted by the browser; the tile remains usable.
          });
        } else {
          video.pause();
        }
      },
      { root: null, rootMargin: "160px 0px", threshold: 0.1 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [item.url, active]);
  useEffect(() => {
    const video = videoElement.current;
    if (!video) return;
    if (active) {
      video.pause();
    } else if (isInView.current && video.dataset.loaded === "true") {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [active]);
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Play ${item.name} with sound`}
      className="block w-full cursor-pointer bg-black"
    >
      <video
        ref={videoElement}
        muted
        loop
        playsInline
        preload="none"
        controls={false}
        aria-label={item.name}
        className="block w-full aspect-[9/16] object-contain bg-black"
      />
    </button>
  );
}
export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [media, setMedia] = useState<Record<string, MediaItem[]>>({});
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // Video preview state and custom player controls
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  /* =========================================================*
*     LOAD PORTFOLIO FILES*
*  ========================================================= */
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) {
          throw new Error("Failed to load portfolio");
        }
        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error("Portfolio loading error:", error);
      }
    };
    loadPortfolio();
  }, []);
  /* =========================================================*
*     BODY SCROLL LOCK*
*  ========================================================= */
  useEffect(() => {
    if (selectedProject || selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, selectedVideo]);
  /* =========================================================*
*     ESC KEY*
*  ========================================================= */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedVideo) {
          setSelectedVideo(null);
        } else {
          closeProject();
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedVideo]);
  /* =========================================================*
*     FILTER PROJECTS*
*  ========================================================= */
  // Temporarily hidden projects: keep their data above so they can be restored later.
  const visibleProjects = projects.filter(
    (project) => project.id !== 1 && project.id !== 4,
  );
  const filteredProjects =
    activeFilter === "All"
      ? visibleProjects
      : visibleProjects.filter((project) => project.category === activeFilter);
  /* =========================================================*
*     CARD MOUSE MOVE*
*     IMPORTANT:*
*     Cursor position is calculated relative to IMAGE AREA,*
*     not the whole card. This keeps the arrow exactly*
*     centered on the cursor.*
*  ========================================================= */
  const handleCardMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const imageArea = event.currentTarget;
    const rect = imageArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    /* Cursor position */
    imageArea.style.setProperty("--cursor-x", `${x}px`);
    imageArea.style.setProperty("--cursor-y", `${y}px`);
    /* Subtle card parallax */
    const card = imageArea.closest("button");
    if (card instanceof HTMLElement) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = ((centerY - y) / centerY) * 3;
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
      `;
    }
  };
  /* =========================================================*
*     CARD MOUSE LEAVE*
*  ========================================================= */
  const handleCardLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const imageArea = event.currentTarget;
    imageArea.style.setProperty("--cursor-x", "50%");
    imageArea.style.setProperty("--cursor-y", "50%");
    const card = imageArea.closest("button");
    if (card instanceof HTMLElement) {
      card.style.transform = "";
    }
  };
  /* =========================================================*
*     OPEN PROJECT*
*  ========================================================= */
  const openProject = (project: PortfolioProject) => {
    /* Shuffle gallery every time project opens */
    setMedia((currentMedia) => {
      const folderMedia = [...(currentMedia[project.folder] || [])];
      for (let i = folderMedia.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [folderMedia[i], folderMedia[randomIndex]] = [
          folderMedia[randomIndex],
          folderMedia[i],
        ];
      }
      return {
        ...currentMedia,
        [project.folder]: folderMedia,
      };
    });
    setSelectedProject(project);
    setLoading(true);
    /* Small delay gives card-to-modal animation */
    setModalVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setModalVisible(true);
      });
    });
    setTimeout(() => {
      setLoading(false);
    }, 250);
  };
  /* =========================================================*
*     CLOSE PROJECT*
*  ========================================================= */
  const closeProject = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 250);
  };
  /* =========================================================*
*     CURRENT PROJECT MEDIA*
*  ========================================================= */
  const projectMedia = selectedProject
    ? media[selectedProject.folder] || []
    : [];
  /* =========================================================*
*     RENDER*
*  ========================================================= */
  return (
    <>
      {/* =====================================================*
*          PORTFOLIO SECTION*
*      ===================================================== */}
      <section
        id="portfolio"
        className="
          py-20
          bg-[var(--background)]
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
          {/* =================================================*
*              SECTION HEADING*
*          ================================================= */}
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
              Project Highlights
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
              Explore my latest design projects spanning various mediums and
              creative challenges
            </p>
          </div>
          {/* =================================================*
*              FILTER BUTTONS*
*          ================================================= */}
          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-3
              sm:gap-4
              mb-12
            "
          >
            {categories
              .filter((category) => category !== "Infographic Design")
              .map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`
                  px-5
                  sm:px-6
                  py-2.5
                  sm:py-3
                  rounded-full
                  font-medium
                  text-sm
                  sm:text-base
                  transition-all
                  duration-300
                  cursor-pointer
                  whitespace-nowrap
                  ${
                    activeFilter === category
                      ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg scale-105"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                  }
                `}
                >
                  {category}
                </button>
              ))}
          </div>
          {/* =================================================*
*              PROJECT CARDS*
*          ================================================= */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-8
            "
          >
            {filteredProjects.map((project, index) => {
              const projectCount = media[project.folder]?.length || 0;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => openProject(project)}
                  className="
                      group
                      text-left
                      bg-[var(--card)]
                      rounded-2xl
                      shadow-lg
                      overflow-hidden
                      hover:shadow-2xl
                      border
                      border-[var(--border)]
                      transition-all
                      duration-500
                      ease-out
                      animate-fadeInUp
                      cursor-pointer
                      transform-gpu
                      will-change-transform
                    "
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* =====================================*
*                        CARD IMAGE AREA*
*                    ===================================== */}
                  <div
                    onPointerMove={handleCardMove}
                    onPointerLeave={handleCardLeave}
                    className="
                        relative
                        overflow-hidden
                        h-64
                        [--cursor-x:50%]
                        [--cursor-y:50%]
                      "
                  >
                    {/* IMAGE */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="
                          w-full
                          h-full
                          object-cover
                          object-top
                          group-hover:scale-110
                          transition-transform
                          duration-700
                          ease-out
                          will-change-transform
                        "
                    />
                    {/* ===================================*
*                          DARK HOVER OVERLAY*
*                      =================================== */}
                    <div
                      className="
                          absolute
                          inset-0
                          bg-black/0
                          group-hover:bg-black/55
                          transition-all
                          duration-300
                          pointer-events-none
                        "
                    />
                    {/* ===================================*
*                          CURSOR FOLLOW ARROW*
*                          THIS IS NOW EXACTLY CENTERED*
*                          ON THE REAL CURSOR.*
*                      =================================== */}
                    <div
                      className="
                          absolute
                          left-[var(--cursor-x)]
                          top-[var(--cursor-y)]
                          -translate-x-1/2
                          -translate-y-1/2
                          w-16
                          h-16
                          rounded-full
                          bg-white/15
                          backdrop-blur-md
                          border
                          border-white/30
                          text-white
                          flex
                          items-center
                          justify-center
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          duration-200
                          pointer-events-none
                          z-20
                        "
                    >
                      <span
                        className="
                            text-3xl
                            leading-none
                            translate-y-[-1px]
                          "
                      >
                        ↗
                      </span>
                    </div>
                    {/* ===================================*
*                          VIEW PROJECT PILL*
*                      =================================== */}
                    <div
                      className="
                          absolute
                          left-1/2
                          top-1/2
                          -translate-x-1/2
                          -translate-y-1/2
                          opacity-0
                          group-hover:opacity-100
                          transition-all
                          duration-300
                          bg-white
                          text-gray-900
                          px-5
                          py-3
                          rounded-full
                          font-semibold
                          whitespace-nowrap
                          shadow-xl
                          pointer-events-none
                          z-10
                        "
                    >
                      View Project →
                    </div>
                    {/* ===================================*
*                          CATEGORY REVEAL*
*                      =================================== */}
                    <div
                      className="
                          absolute
                          left-4
                          bottom-4
                          opacity-0
                          translate-y-3
                          group-hover:opacity-100
                          group-hover:translate-y-0
                          transition-all
                          duration-300
                          bg-white/95
                          text-gray-900
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          shadow-lg
                          pointer-events-none
                          z-20
                        "
                    >
                      {project.category}
                    </div>
                    {/* ===================================*
*                          WORK COUNT*
*                          NOTE:*
*                          Project numbers 01/02/03 etc.*
*                          have been COMPLETELY REMOVED.*
*                          This is only the work count.*
*                      =================================== */}
                    {projectCount > 0 && (
                      <div
                        className="
                            absolute
                            top-4
                            right-4
                            bg-black/70
                            backdrop-blur-sm
                            text-white
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-medium
                            z-20
                          "
                      >
                        {projectCount}{" "}
                        {project.category === "Reels" ? "Videos" : "Works"}
                      </div>
                    )}
                  </div>
                  {/* =====================================*
*                        CARD CONTENT*
*                    ===================================== */}
                  <div className="p-6">
                    <div
                      className="
                          flex
                          items-center
                          justify-between
                          gap-3
                          mb-3
                        "
                    >
                      {/* CATEGORY */}
                      <span
                        className="
                            inline-block
                            px-3
                            py-1
                            bg-blue-100
                            dark:bg-blue-950/60
                            text-blue-800
                            dark:text-blue-300
                            text-xs
                            font-medium
                            rounded-full
                            transition-all
                            duration-300
                            group-hover:-translate-y-0.5
                          "
                      >
                        {project.category}
                      </span>
                      {/* TOOLS */}
                      <span
                        className="
                            text-sm
                            text-[var(--text-muted)]
                            text-right
                            transition-colors
                            duration-300
                          "
                      >
                        {project.tools}
                      </span>
                    </div>
                    {/* TITLE */}
                    <h3
                      className="
                          text-xl
                          font-bold
                          text-[var(--text-primary)]
                          mb-2
                          transition-all
                          duration-300
                          group-hover:text-blue-500
                          dark:group-hover:text-blue-400
                        "
                    >
                      {project.title}
                    </h3>
                    {/* DESCRIPTION */}
                    <p
                      className="
                          text-[var(--text-secondary)]
                          leading-relaxed
                          transition-colors
                          duration-300
                        "
                    >
                      {project.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {/* =====================================================*
*          PROJECT GALLERY MODAL*
*      ===================================================== */}
      {selectedProject && (
        <div
          className={`
            fixed
            inset-0
            z-[9999]
            bg-black/70
            dark:bg-black/85
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-2
            sm:p-4
            md:p-6
            transition-opacity
            duration-300
            ${modalVisible ? "opacity-100" : "opacity-0"}
          `}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeProject();
            }
          }}
        >
          {/* =============================================*
*              MODAL CONTAINER*
*          ============================================= */}
          <div
            className={`
              relative
              w-[94vw]
              sm:w-[90vw]
              lg:w-[80vw]
              max-w-[1500px]
              h-[92vh]
              sm:h-[88vh]
              lg:h-[85vh]
              bg-[var(--card)]
              rounded-2xl
              sm:rounded-3xl
              shadow-2xl
              overflow-hidden
              flex
              flex-col
              border
              border-[var(--border)]
              transition-all
              duration-300
              ease-out
              ${
                modalVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-[0.94] translate-y-4"
              }
            `}
          >
            {/* =========================================*
*                MODAL HEADER*
*            ========================================= */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                px-4
                sm:px-6
                lg:px-8
                py-4
                sm:py-5
                border-b
                border-[var(--border)]
                bg-[var(--card)]
                shrink-0
                transition-colors
                duration-300
              "
            >
              <div className="min-w-0">
                <h2
                  className="
                    text-lg
                    sm:text-xl
                    lg:text-2xl
                    font-bold
                    text-[var(--text-primary)]
                    leading-tight
                  "
                >
                  {selectedProject.title}
                </h2>
                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-[var(--text-muted)]
                    mt-1
                  "
                >
                  {projectMedia.length}{" "}
                  {selectedProject.category === "Reels" ? "videos" : "projects"}
                </p>
              </div>
              {/* CLOSE */}
              <button
                type="button"
                onClick={closeProject}
                _aria-label_="Close gallery"
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-[var(--surface)]
                  hover:bg-[var(--surface-hover)]
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                  flex
                  items-center
                  justify-center
                  text-lg
                  sm:text-xl
                  transition-all
                  duration-200
                  hover:rotate-90
                  cursor-pointer
                  shrink-0
                  border
                  border-[var(--border)]
                "
              >
                ✕
              </button>
            </div>
            {/* =========================================*
*                GALLERY*
*            ========================================= */}
            <div
              className="
                flex-1
                overflow-y-auto
                p-3
                sm:p-4
                lg:p-5
              "
            >
              {/* LOADING */}
              {loading ? (
                <div
                  className="
                    h-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-9
                      h-9
                      sm:w-10
                      sm:h-10
                      border-4
                      border-[var(--surface-hover)]
                      border-t-blue-600
                      rounded-full
                      animate-spin
                    "
                  />
                </div>
              ) : projectMedia.length === 0 ? (
                /* =====================================*
*                   EMPTY STATE*
*                ===================================== */
                <div
                  className="
                    h-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-6
                  "
                >
                  <div className="text-5xl mb-4">🖼️</div>
                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    No projects yet
                  </h3>
                  <p
                    className="
                      text-[var(--text-muted)]
                      mt-2
                      max-w-md
                    "
                  >
                    Add your work to the{" "}
                    <strong>
                      public/portfolio/
                      {selectedProject.folder}
                    </strong>{" "}
                    folder and it will automatically appear here.
                  </p>
                </div>
              ) : (
                /* =====================================*
*                   GALLERY GRID*
*                ===================================== */
                <div
                  className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-2
                    sm:gap-4
                    auto-rows-max
                  "
                >
                  {projectMedia.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="
                          group
                          relative
                          overflow-hidden
                          rounded-lg
                          sm:rounded-xl
                          bg-[var(--surface)]
                          border
                          border-[var(--border)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-xl
                        "
                    >
                      {item.type === "video" ? (
                        <VideoGalleryItem
                          item={item}
                          active={Boolean(selectedVideo)}
                          onOpen={(video) => {
                            setSelectedVideo(video);
                            setVideoCurrentTime(0);
                            setVideoDuration(0);
                            setVideoMuted(false);
                            setVideoPlaying(true);
                          }}
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="
                              block
                              w-full
                              h-auto
                              object-contain
                              transition-transform
                              duration-500
                              group-hover:scale-[1.015]
                            "
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedVideo(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedVideo.name} video player`}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-2xl text-white transition hover:bg-black"
            >
              ×
            </button>
            <video
              ref={videoRef}
              key={selectedVideo.url}
              src={selectedVideo.url}
              autoPlay
              playsInline
              preload="auto"
              controls={false}
              onClick={() => {
                const video = videoRef.current;
                if (!video) return;
                if (video.paused) {
                  video
                    .play()
                    .then(() => setVideoPlaying(true))
                    .catch(() => {});
                } else {
                  video.pause();
                  setVideoPlaying(false);
                }
              }}
              onLoadedMetadata={(event) => {
                setVideoDuration(event.currentTarget.duration || 0);
                event.currentTarget.muted = videoMuted;
              }}
              onTimeUpdate={(event) =>
                setVideoCurrentTime(event.currentTarget.currentTime)
              }
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              className="block max-h-[72vh] w-full bg-black object-contain"
            />
            <div className="space-y-3 bg-[#0d111b] px-4 py-4 sm:px-6">
              <input
                type="range"
                min={0}
                max={videoDuration || 0}
                step={0.1}
                value={Math.min(videoCurrentTime, videoDuration || 0)}
                onChange={(event) => {
                  const nextTime = Number(event.target.value);
                  if (videoRef.current) videoRef.current.currentTime = nextTime;
                  setVideoCurrentTime(nextTime);
                }}
                aria-label="Seek video"
                className="w-full cursor-pointer accent-blue-500"
              />
              <div className="flex items-center gap-4 text-sm text-white">
                <button
                  type="button"
                  onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;
                    if (video.paused) {
                      video
                        .play()
                        .then(() => setVideoPlaying(true))
                        .catch(() => {});
                    } else {
                      video.pause();
                      setVideoPlaying(false);
                    }
                  }}
                  aria-label={videoPlaying ? "Pause video" : "Play video"}
                  className="min-w-16 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  {videoPlaying ? "Ⅱ Pause" : "▶ Play"}
                </button>
                <span className="tabular-nums text-white/75">
                  {Math.floor(videoCurrentTime / 60)}:
                  {String(Math.floor(videoCurrentTime % 60)).padStart(2, "0")}
                  {" / "}
                  {Math.floor(videoDuration / 60)}:
                  {String(Math.floor(videoDuration % 60)).padStart(2, "0")}
                </span>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;
                    video.muted = !video.muted;
                    setVideoMuted(video.muted);
                  }}
                  aria-label={videoMuted ? "Unmute video" : "Mute video"}
                  className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  {videoMuted ? "🔇 Muted" : "🔊 Sound"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}