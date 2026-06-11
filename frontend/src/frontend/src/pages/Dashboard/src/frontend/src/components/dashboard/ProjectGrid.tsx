import { projects } from "@/data/mockData";
import type { Project } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const TIER_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  studio_max: {
    label: "Studio Max",
    color: "oklch(0.85 0.15 55)",
    bg: "oklch(0.35 0.12 55 / 0.3)",
  },
  pro: {
    label: "Pro",
    color: "oklch(0.75 0.18 255)",
    bg: "oklch(0.3 0.15 255 / 0.3)",
  },
  fast: {
    label: "Fast",
    color: "oklch(0.72 0.16 160)",
    bg: "oklch(0.28 0.12 160 / 0.3)",
  },
};

function getRelativeTime(updatedAt: string): string {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffMs = now.getTime() - updated.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMins < 60)
    return `Edited ${diffMins <= 1 ? "a minute" : `${diffMins} minutes`} ago`;
  if (diffHours < 24)
    return `Edited ${diffHours === 1 ? "an hour" : `${diffHours} hours`} ago`;
  if (diffDays < 30)
    return `Edited ${diffDays === 1 ? "1 day" : `${diffDays} days`} ago`;
  return `Edited ${diffMonths === 1 ? "a month" : `${diffMonths} months`} ago`;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tier = TIER_CONFIG[project.tier] ?? TIER_CONFIG.fast;

  return (
    <motion.div
      data-ocid={`project_grid.item.${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.06,
      }}
      whileHover={{ scale: 1.035, y: -5 }}
      className="relative flex-shrink-0 cursor-pointer rounded-xl overflow-hidden"
      style={{
        width: "210px",
        background: "oklch(0.11 0.03 255 / 0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: hovered
          ? "1px solid oklch(0.55 0.2 255 / 0.55)"
          : "1px solid oklch(0.22 0.05 260 / 0.35)",
        boxShadow: hovered
          ? "0 0 24px oklch(0.55 0.2 255 / 0.25), 0 8px 32px oklch(0 0 0 / 0.5)"
          : "0 4px 16px oklch(0 0 0 / 0.35)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* 16:9 Thumbnail */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, oklch(0.08 0.03 250 / 0.7) 100%)",
            opacity: hovered ? 1 : 0.4,
          }}
        />
        {/* Tier badge */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: tier.bg,
            color: tier.color,
            border: `1px solid ${tier.color}40`,
            backdropFilter: "blur(8px)",
          }}
        >
          {tier.label}
        </div>
      </div>

      {/* Card info */}
      <div className="px-3 pt-2.5 pb-3">
        <p
          className="text-sm font-semibold truncate leading-snug"
          style={{ color: "oklch(0.93 0.02 240)" }}
        >
          {project.title}
        </p>
        <p
          className="text-xs mt-0.5 truncate"
          style={{ color: "oklch(0.5 0.03 250)" }}
        >
          {getRelativeTime(project.updatedAt)}
        </p>
      </div>
    </motion.div>
  );
}

export function ProjectGrid() {
  const [activeTab, setActiveTab] = useState<"recent" | "templates">("recent");
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -460 : 460,
      behavior: "smooth",
    });
  }

  return (
    <section data-ocid="project_grid.section" className="px-8 pb-14">
      {/* Section title */}
      <motion.h2
        className="font-display font-bold text-xl mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ color: "oklch(0.88 0.03 240)" }}
      >
        Your Projects
      </motion.h2>

      {/* CENTERED TAB SWITCHER */}
      <div className="flex justify-center mb-6">
        <motion.div
          className="flex rounded-full p-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          style={{
            background: "oklch(0.1 0.03 260 / 0.7)",
            border: "1px solid oklch(0.22 0.05 260 / 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          {(["recent", "templates"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const label =
              tab === "recent" ? "Recent Projects" : "Public Templates";
            return (
              <motion.button
                key={tab}
                type="button"
                data-ocid={`project_grid.${tab}_tab`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive
                    ? "oklch(0.95 0.05 240)"
                    : "oklch(0.52 0.03 250)",
                  zIndex: 1,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.22 255 / 0.28), oklch(0.5 0.2 285 / 0.28))",
                      border: "1px solid oklch(0.55 0.2 255 / 0.45)",
                      boxShadow: "0 0 14px oklch(0.55 0.22 255 / 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* HORIZONTAL SCROLL ROW with nav arrows */}
      <div className="relative">
        {/* Left arrow */}
        <motion.button
          type="button"
          data-ocid="project_grid.scroll_left"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 flex items-center justify-center rounded-full"
          style={{
            background: "oklch(0.14 0.04 260 / 0.85)",
            border: "1px solid oklch(0.3 0.08 260 / 0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px oklch(0 0 0 / 0.5)",
          }}
        >
          <ChevronLeft
            className="w-4 h-4"
            style={{ color: "oklch(0.7 0.06 255)" }}
          />
        </motion.button>

        {/* Right arrow */}
        <motion.button
          type="button"
          data-ocid="project_grid.scroll_right"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scrollBy("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 flex items-center justify-center rounded-full"
          style={{
            background: "oklch(0.14 0.04 260 / 0.85)",
            border: "1px solid oklch(0.3 0.08 260 / 0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px oklch(0 0 0 / 0.5)",
          }}
        >
          <ChevronRight
            className="w-4 h-4"
            style={{ color: "oklch(0.7 0.06 255)" }}
          />
        </motion.button>

        {/* Cards row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            ref={scrollRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="flex gap-4 overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingLeft: "2px",
              paddingRight: "2px",
              paddingBottom: "8px",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* VIEW ALL link */}
      <div className="flex justify-center mt-5">
        <motion.button
          type="button"
          data-ocid="project_grid.view_all_link"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-1.5 text-sm font-medium transition-smooth"
          style={{ color: "oklch(0.68 0.18 255)" }}
        >
          <span
            className="relative"
            style={{
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s ease",
            }}
          >
            View all projects
          </span>
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
