import {
  Aperture,
  Mic2,
  PenTool,
  Rocket,
  Scissors,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const features = [
  {
    icon: PenTool,
    title: "Autonomous Screenplay Generation",
    description:
      "AI writers craft compelling narratives with deep character arcs, dialogue, and plot structure from a single prompt.",
    color: "primary",
  },
  {
    icon: Aperture,
    title: "AI Cinematography",
    description:
      "Intelligent camera systems plan shots, lighting, and composition with cinematic precision and artistic vision.",
    color: "secondary",
  },
  {
    icon: Mic2,
    title: "AI Actors & Voice Synthesis",
    description:
      "Lifelike digital performers with emotionally expressive voices, lip-sync, and natural body language.",
    color: "primary",
  },
  {
    icon: Scissors,
    title: "Automated Editing",
    description:
      "AI editors assemble footage, apply color grading, add transitions, and pace the narrative for maximum impact.",
    color: "secondary",
  },
  {
    icon: Rocket,
    title: "Instant Publishing",
    description:
      "One-click distribution to streaming platforms, social media, and film festivals with optimized metadata.",
    color: "primary",
  },
  {
    icon: UsersRound,
    title: "Real-time Collaboration",
    description:
      "Invite your team to review, comment, and direct the AI agents with natural language feedback loops.",
    color: "secondary",
  },
];

type TiltState = {
  rotateX: number;
  rotateY: number;
  specX: number;
  specY: number;
};
const FLAT: TiltState = { rotateX: 0, rotateY: 0, specX: 50, specY: 50 };

function TiltCard({
  children,
  className,
  ocid,
}: {
  children: React.ReactNode;
  className?: string;
  ocid: string;
}) {
  const [tilt, setTilt] = useState<TiltState>(FLAT);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0–1
    const y = (e.clientY - rect.top) / rect.height; // 0–1
    const rotateX = (0.5 - y) * 24; // ±12 deg
    const rotateY = (x - 0.5) * 24; // ±12 deg
    setTilt({ rotateX, rotateY, specX: x * 100, specY: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt(FLAT), []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-ocid={ocid}
      className={`tilt-card ${className ?? ""}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition:
          tilt === FLAT
            ? "transform 0.45s cubic-bezier(0.23,1,0.32,1)"
            : "transform 0.08s ease-out",
      }}
    >
      {/* Specular highlight overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at ${tilt.specX}% ${tilt.specY}%, oklch(1 0 0 / 0.07) 0%, transparent 60%)`,
          transition: tilt === FLAT ? "opacity 0.45s ease-out" : "none",
        }}
      />
      {children}
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 radial-bloom opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Capabilities
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Make Films
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete studio filled of every aspect of production grade film
            making
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <TiltCard
                  ocid={`feature.card.${i + 1}`}
                  className="group relative p-8 rounded-2xl glass cursor-default transition-all duration-500 hover:border-primary/50 hover:shadow-glow h-full"
                >
                  <div className="tilt-inner relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                        feature.color === "primary"
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/10 border border-secondary/30"
                      }`}
                      style={{ transform: "translateZ(18px)" }}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          feature.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    </div>

                    <h3
                      className="font-display text-lg font-semibold text-foreground mb-3"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 to-secondary/5" />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
