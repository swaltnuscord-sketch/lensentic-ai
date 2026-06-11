import { Play, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Particles({ count = 25 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: `particle-hero-${i}`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${12 + Math.random() * 10}s`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
    opacity: 0.4 + Math.random() * 0.6,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle animate-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.width,
            height: p.height,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function FloatingOrb({
  orbRotateX,
  orbRotateY,
}: {
  orbRotateX: ReturnType<typeof useSpring>;
  orbRotateY: ReturnType<typeof useSpring>;
}) {
  const ringRotateX = useTransform(orbRotateX, (v) => v * 1.5);
  const ringRotateY = useTransform(orbRotateY, (v) => v * 1.5);
  const dotRotateX = useTransform(orbRotateX, (v) => v * 0.5);
  const dotRotateY = useTransform(orbRotateY, (v) => v * 0.5);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Outer rings — 1.5× intensity */}
      <motion.div
        className="absolute inset-0 preserve-3d"
        style={{
          perspective: 1000,
          rotateX: ringRotateX,
          rotateY: ringRotateY,
        }}
      >
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-ring-pulse" />
        <div
          className="absolute inset-4 rounded-full border border-secondary/15 animate-ring-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute inset-8 rounded-full border border-primary/10 animate-ring-pulse"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>

      {/* Core orb — full intensity */}
      <motion.div
        className="preserve-3d"
        style={{
          perspective: 1000,
          rotateX: orbRotateX,
          rotateY: orbRotateY,
        }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/20 animate-pulse-glow flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/60 to-secondary/40" />
          <Sparkles className="relative w-10 h-10 text-foreground drop-shadow-[0_0_10px_oklch(0.62_0.20_265)]" />
        </div>
      </motion.div>

      {/* Orbiting dots — 0.5× intensity */}
      <motion.div
        className="absolute inset-0 preserve-3d"
        style={{
          perspective: 1000,
          rotateX: dotRotateX,
          rotateY: dotRotateY,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={`orbit-dot-${i}`}
            className="absolute w-3 h-3 rounded-full bg-primary animate-orbit"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-6px",
              marginLeft: "-6px",
              animationDelay: `${i * 6.67}s`,
              animationDuration: "20s",
              boxShadow: "0 0 10px oklch(0.62 0.20 265)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Raw mouse motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed rotation values
  const orbRotateX = useSpring(rawY, { stiffness: 60, damping: 18 });
  const orbRotateY = useSpring(rawX, { stiffness: 60, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const section = heroRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) * 0.02);
      rawY.set((cy - e.clientY) * 0.02);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 radial-bloom" />
      <Particles count={30} />

      {/* Floating storyboard frames */}
      <div
        className="absolute top-20 left-10 w-20 h-28 rounded-lg glass opacity-40 animate-float hidden lg:block"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-16 w-16 h-22 rounded-lg glass opacity-30 animate-float hidden lg:block"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-32 left-20 w-14 h-20 rounded-lg glass opacity-35 animate-float hidden lg:block"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Autonomous AI Film Production
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            <span className="text-foreground">From Idea to Film</span>
            <br />
            <span className="text-primary text-glow">— Fully Autonomous.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            LensAI uses agentic AI systems to write, direct, animate, edit,
            voice, score, and publish complete films automatically.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.03, rotateX: -8 }}
              whileTap={{ scale: 0.97, rotateX: 5 }}
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background preserve-3d"
              style={{ perspective: 400 }}
              data-ocid="hero.create_film_button"
            >
              <Sparkles className="w-5 h-5" />
              Create Your Film
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, rotateX: -8 }}
              whileTap={{ scale: 0.97, rotateX: 5 }}
              onClick={() => scrollTo("#showcase")}
              className="px-8 py-4 rounded-xl border border-border/60 text-foreground font-semibold text-base hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background preserve-3d"
              style={{ perspective: 400 }}
              data-ocid="hero.watch_demo_button"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* AI Core Orb */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <FloatingOrb orbRotateX={orbRotateX} orbRotateY={orbRotateY} />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
