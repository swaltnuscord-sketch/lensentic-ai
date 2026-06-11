import { BarChart3, Brain, Lightbulb, Network } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const nodes = [
  {
    icon: Brain,
    title: "Neural Orchestration",
    description:
      "Central AI conductor that coordinates all production agents in real-time.",
    position: "top",
  },
  {
    icon: Lightbulb,
    title: "Creative Decision Engine",
    description:
      "Evaluates artistic choices against cinematic principles and audience engagement models.",
    position: "right",
  },
  {
    icon: Network,
    title: "Multi-Agent Collaboration",
    description:
      "Specialized AI agents communicate and negotiate to resolve creative conflicts.",
    position: "bottom",
  },
  {
    icon: BarChart3,
    title: "Production Intelligence",
    description:
      "Predicts budgets, timelines, and resource needs with 98.7% accuracy.",
    position: "left",
  },
];

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTilt, setSectionTilt] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tiltX = Math.max(
      -5,
      Math.min(5, ((e.clientX - cx) / (rect.width / 2)) * 5),
    );
    const tiltY = Math.max(
      -5,
      Math.min(5, ((e.clientY - cy) / (rect.height / 2)) * 5),
    );
    setSectionTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => setSectionTilt({ x: 0, y: 0 });

  return (
    <section
      id="technology"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 radial-bloom opacity-40" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Architecture
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Multi-Agent AI Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A distributed network of specialized AI agents working in harmony to
            deliver cinematic excellence.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-3xl mx-auto"
          animate={{
            rotateX: -sectionTilt.y * 0.005 * 100,
            rotateY: sectionTilt.x * 0.005 * 100,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {/* Circuit SVG background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 600 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            role="presentation"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.62 0.20 265 / 0.4)" />
                <stop offset="100%" stopColor="oklch(0.64 0.22 300 / 0.4)" />
              </linearGradient>
            </defs>
            {/* Connecting lines */}
            <line
              x1="300"
              y1="80"
              x2="520"
              y2="300"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-data-flow"
            />
            <line
              x1="520"
              y1="300"
              x2="300"
              y2="520"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-data-flow"
              style={{ animationDelay: "0.5s" }}
            />
            <line
              x1="300"
              y1="520"
              x2="80"
              y2="300"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-data-flow"
              style={{ animationDelay: "1s" }}
            />
            <line
              x1="80"
              y1="300"
              x2="300"
              y2="80"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-data-flow"
              style={{ animationDelay: "1.5s" }}
            />
            <line
              x1="300"
              y1="80"
              x2="300"
              y2="520"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-data-flow"
              style={{ animationDelay: "0.3s" }}
            />
            <line
              x1="80"
              y1="300"
              x2="520"
              y2="300"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-data-flow"
              style={{ animationDelay: "0.8s" }}
            />
          </svg>

          {/* Central hub */}
          <div className="preserve-3d absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 animate-pulse-glow flex items-center justify-center z-10">
            <div className="animate-hub-rotate w-16 h-16 rounded-full bg-primary/20 animate-node-pulse flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-32 md:gap-y-24 py-12">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              const isHovered = hoveredNode === i;
              return (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={{
                    scale: isHovered ? 1.03 : 1,
                    rotateY: isHovered ? -15 : 0,
                    z: isHovered ? 20 : 0,
                  }}
                  style={{ perspective: 600, transformStyle: "preserve-3d" }}
                  transition={{
                    delay: isHovered ? 0 : i * 0.15,
                    duration: isHovered ? 0.3 : 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className={`relative p-6 rounded-2xl glass-strong ${
                    i % 2 === 0
                      ? "md:justify-self-end"
                      : "md:justify-self-start"
                  } max-w-xs`}
                  data-ocid={`tech.node.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    {node.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {node.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
