import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <motion.section
      data-ocid="hero.section"
      className="relative pt-16 pb-10 px-8 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {/* Aurora glow orb */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.45 0.18 255 / 0.22) 0%, oklch(0.35 0.15 285 / 0.14) 45%, transparent 75%)",
          filter: "blur(2px)",
          willChange: "transform",
        }}
      />

      {/* Announcement pill */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <motion.div
          data-ocid="hero.announcement_pill"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border cursor-default select-none"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.04 255 / 0.8), oklch(0.15 0.04 285 / 0.8))",
            borderColor: "oklch(0.5 0.18 255 / 0.4)",
            boxShadow: "0 0 20px oklch(0.6 0.22 255 / 0.15)",
            willChange: "transform",
          }}
          initial={{ scale: 0.9, opacity: 0, y: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -4, 0],
          }}
          transition={{
            scale: { duration: 0.5, ease: "easeOut" },
            opacity: { duration: 0.5, ease: "easeOut" },
            y: {
              delay: 0.6,
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "mirror",
            },
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="gradient-text">Introducing Lensentic AI 3.0</span>
        </motion.div>
      </div>

      {/* Headline */}
      <h1
        data-ocid="hero.headline"
        className="font-display font-bold leading-none tracking-tight mb-4 text-center"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          lineHeight: 1.05,
        }}
      >
        <motion.span
          className="block gradient-text text-shimmer"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "opacity, transform", display: "block" }}
        >
          Good evening,
        </motion.span>
        <motion.span
          className="block gradient-text text-shimmer"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "opacity, transform", display: "block" }}
        >
          Director
        </motion.span>
      </h1>

      {/* Subtitle */}
      <motion.p
        data-ocid="hero.subtitle"
        className="text-lg font-body text-center"
        style={{
          color: "oklch(0.75 0.02 240 / 0.7)",
          willChange: "opacity, transform",
        }}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
      >
        What story will you bring to life today?
      </motion.p>
    </motion.section>
  );
}
