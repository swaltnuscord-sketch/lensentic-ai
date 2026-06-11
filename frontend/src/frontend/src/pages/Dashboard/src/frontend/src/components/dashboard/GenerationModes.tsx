import { motion } from "motion/react";
import { useState } from "react";

const MODES = [
  { id: "fast", label: "Fast", icon: "⚡", credits: "~18 credits/min" },
  { id: "pro", label: "Pro", icon: "👑", credits: "~190 credits/min" },
  {
    id: "studio_max",
    label: "Studio Max",
    icon: "✦",
    credits: "~600 credits/min",
  },
] as const;

export function GenerationModes() {
  const [activeMode, setActiveMode] = useState<string>("pro");

  return (
    <section className="px-8 pb-2 flex justify-center">
      <motion.fieldset
        className="flex items-center p-1 border-0"
        style={{
          background: "oklch(0.1 0.04 260 / 0.7)",
          border: "1px solid oklch(0.3 0.1 260 / 0.4)",
          backdropFilter: "blur(12px)",
          borderRadius: "9999px",
        }}
        aria-label="Generation mode selector"
        variants={{ container: { transition: { staggerChildren: 0.08 } } }}
        animate="container"
      >
        {MODES.map((mode) => {
          const isActive = mode.id === activeMode;
          return (
            <motion.button
              key={mode.id}
              type="button"
              data-ocid={`generation_mode.${mode.id}_tab`}
              onClick={() => setActiveMode(mode.id)}
              className="relative flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, oklch(0.55 0.22 255), oklch(0.5 0.2 285))"
                  : "transparent",
                boxShadow: isActive
                  ? "0 0 16px oklch(0.55 0.22 255 / 0.5), 0 0 32px oklch(0.5 0.2 285 / 0.25)"
                  : "none",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow:
                      "0 2px 0 oklch(0.7 0.22 255 / 0.8) inset, 0 -1px 0 oklch(0.5 0.2 285 / 0.6) inset",
                    background: "transparent",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className="text-sm leading-none shrink-0"
                style={{
                  filter: isActive
                    ? "drop-shadow(0 0 4px oklch(0.85 0.05 260 / 0.9))"
                    : "none",
                }}
              >
                {mode.icon}
              </span>
              <span
                className="text-sm font-medium whitespace-nowrap"
                style={{
                  color: isActive
                    ? "oklch(0.96 0.01 240)"
                    : "oklch(0.6 0.05 260)",
                }}
              >
                {mode.label}
              </span>
              <span
                className="text-xs whitespace-nowrap"
                style={{
                  color: isActive
                    ? "oklch(0.8 0.05 260)"
                    : "oklch(0.5 0.05 260)",
                }}
              >
                {mode.credits}
              </span>
            </motion.button>
          );
        })}
      </motion.fieldset>
    </section>
  );
}
