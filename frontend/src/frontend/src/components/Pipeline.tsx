import {
  Camera,
  FileText,
  Globe,
  Layout,
  Scissors,
  Users,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const stages = [
  { icon: FileText, label: "Script", color: "primary" },
  { icon: Layout, label: "Storyboard", color: "secondary" },
  { icon: Users, label: "Casting", color: "primary" },
  { icon: Camera, label: "Cinematics", color: "secondary" },
  { icon: Wand2, label: "VFX", color: "primary" },
  { icon: Scissors, label: "Editing", color: "secondary" },
  { icon: Globe, label: "Publishing", color: "primary" },
];

type Stage = (typeof stages)[0];

function ConnectionLine({ index }: { index: number }) {
  return (
    <svg
      className="absolute top-1/2 left-full w-12 h-2 -translate-y-1/2 hidden md:block"
      viewBox="0 0 48 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
    >
      <line
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        stroke="oklch(0.62 0.20 265 / 0.3)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <circle
        cx="24"
        cy="4"
        r="2"
        fill="oklch(0.62 0.20 265)"
        strokeDasharray="4 300"
        className="animate-data-flow"
        style={{ animationDelay: `${index * 0.3}s` }}
      />
    </svg>
  );
}

function PipelineNode({
  stage,
  index,
}: {
  stage: Stage;
  index: number;
}) {
  const Icon = stage.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex flex-col items-center"
    >
      <div className="relative preserve-3d">
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            scale: hovered ? 1.1 : 1,
            y: hovered ? -5 : 0,
            rotateY: hovered ? 15 : 0,
            z: hovered ? 15 : 0,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`w-20 h-20 rounded-2xl glass flex items-center justify-center animate-node-pulse cursor-default preserve-3d ${
            stage.color === "primary"
              ? "border-primary/40"
              : "border-secondary/40"
          }`}
          style={{
            animationDelay: `${index * 0.4}s`,
            perspective: 500,
          }}
        >
          <motion.div
            animate={{ rotateY: hovered ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <Icon
              className={`w-8 h-8 ${
                stage.color === "primary" ? "text-primary" : "text-secondary"
              }`}
            />
          </motion.div>
        </motion.div>
        {index < stages.length - 1 && <ConnectionLine index={index} />}
      </div>
      <span className="mt-4 text-sm font-medium text-muted-foreground">
        {stage.label}
      </span>
    </motion.div>
  );
}

export default function Pipeline() {
  const ref = useRef(null);

  return (
    <section
      id="pipeline"
      className="relative py-24 bg-muted/20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Production Pipeline
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            AI Film Pipeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Seven autonomous AI agents collaborate in real-time to transform
            your concept into a finished film.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-0">
          {stages.map((stage, i) => (
            <PipelineNode key={stage.label} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
