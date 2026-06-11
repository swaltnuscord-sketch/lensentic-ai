import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function Particles({ count = 25 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: `particle-cta-${i}`,
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

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section
      id="cta"
      className="relative py-32 bg-background overflow-hidden flex items-center justify-center"
    >
      {/* Radial bloom background */}
      <div className="absolute inset-0 radial-bloom opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <Particles count={30} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Now in Public Beta
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Future of Filmmaking
            <br />
            <span className="text-primary text-glow">Has Arrived.</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of creators who are already producing films with
            LensAI. Your next masterpiece is one prompt away.
          </p>

          <div
            style={{ perspective: "400px" }}
            className="preserve-3d inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotateX: -8 }}
              whileTap={{ scale: 0.98, rotateX: 5, z: -4 }}
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => navigate("/login")}
              className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-500 flex items-center gap-3 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              data-ocid="cta.start_creating_button"
            >
              <Sparkles className="w-6 h-6" />
              Start Creating
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
