import { previewCards } from "@/data/mockData";
import type { PreviewCard } from "@/types";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TIER_STYLES: Record<string, { gradient: string; glow: string }> = {
  "Studio Max": {
    gradient:
      "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
    glow: "0 0 30px oklch(0.55 0.2 285 / 0.5), 0 0 60px oklch(0.55 0.2 285 / 0.2)",
  },
  Pro: {
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.2 255 / 0.9), oklch(0.5 0.18 255 / 0.9))",
    glow: "0 0 30px oklch(0.6 0.22 255 / 0.5), 0 0 60px oklch(0.6 0.22 255 / 0.2)",
  },
  Fast: {
    gradient:
      "linear-gradient(135deg, oklch(0.45 0.15 200), oklch(0.5 0.18 230))",
    glow: "0 0 30px oklch(0.5 0.18 200 / 0.5), 0 0 60px oklch(0.5 0.18 200 / 0.2)",
  },
};

function PreviewCardItem({
  card,
  index,
}: {
  card: PreviewCard;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const tierStyle = TIER_STYLES[card.tier] ?? TIER_STYLES.Fast;
  const isViolet = index % 2 === 1;

  return (
    <motion.div
      data-ocid={`preview_showcase.item.${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: 200,
        height: 280,
        boxShadow: hovered
          ? isViolet
            ? "0 0 30px oklch(0.55 0.2 285 / 0.6), 0 0 60px oklch(0.55 0.2 285 / 0.25)"
            : "0 0 30px oklch(0.6 0.22 255 / 0.6), 0 0 60px oklch(0.6 0.22 255 / 0.25)"
          : "0 8px 24px oklch(0 0 0 / 0.4)",
        border: hovered
          ? isViolet
            ? "1px solid oklch(0.55 0.2 285 / 0.6)"
            : "1px solid oklch(0.6 0.22 255 / 0.6)"
          : "1px solid oklch(0.22 0.03 265 / 0.3)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Image */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.06 0.02 240 / 0.95) 0%, oklch(0.06 0.02 240 / 0.3) 50%, transparent 80%)",
        }}
      />

      {/* Tier badge */}
      <motion.div
        className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
        style={{ background: tierStyle.gradient }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {card.tier}
      </motion.div>

      {/* Play button on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{
                background: "oklch(0.95 0.01 240 / 0.2)",
                border: "2px solid oklch(0.95 0.01 240 / 0.6)",
              }}
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p
          className="text-sm font-semibold"
          style={{ color: "oklch(0.92 0.01 240 / 0.9)" }}
        >
          {card.title}
        </p>
        <p className="text-xs" style={{ color: "oklch(0.65 0.02 240 / 0.7)" }}>
          {card.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export function PreviewShowcase() {
  return (
    <section data-ocid="preview_showcase.section" className="px-8 py-6">
      <div
        className="overflow-x-auto pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: [0, -8, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {previewCards.map((card, i) => (
            <PreviewCardItem key={card.id} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
