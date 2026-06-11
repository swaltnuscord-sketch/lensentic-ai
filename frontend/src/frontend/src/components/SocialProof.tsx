import { Award, Film, Quote, Trophy, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function useTiltCard(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * maxDeg * -2, y: px * maxDeg * 2 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return { ref, tilt, onMouseMove, onMouseLeave };
}

const testimonials = [
  {
    quote:
      "LensAI produced our festival short in 72 hours. The quality rivals what our team used to deliver in three months.",
    name: "Rohini Kumari",
    role: "Independent Filmmaker",
  },
  {
    quote:
      "The multi-agent collaboration is unlike anything I've seen. It's like having a full studio crew that never sleeps.",
    name: "Aarav Kumar",
    role: "Creative Director, Toonartz",
  },
  {
    quote:
      "We cut our production costs by 80% while maintaining theatrical quality. LensAI is the future of filmmaking.",
    name: "Deepak Kumar",
    role: "Content Creator",
  },
];

const stats = [
  { icon: Film, value: 8, label: "Films Created", suffix: "" },
  { icon: Users, value: 10, label: "Creators", suffix: "+" },
  { icon: Trophy, value: 0, label: "Awards Won", suffix: "" },
  { icon: Award, value: 99, label: "Satisfaction", suffix: "%" },
];

const partners = [
  "Sundance AI",
  "Cannes XR",
  "StreamVault",
  "Nexus Studios",
  "FilmCore",
  "CineTech",
];

function AnimatedCounter({
  target,
  suffix,
  index,
}: { target: number; suffix: string; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      style={
        isInView
          ? {
              animation: "number-flip 0.5s ease-out forwards",
              animationDelay: `${index * 0.15}s`,
            }
          : {}
      }
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: { quote: string; name: string; role: string };
  index: number;
}) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useTiltCard(8);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: tilt.x === 0 && tilt.y === 0 ? 0 : -4,
      }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className="p-8 rounded-2xl glass relative"
      data-ocid={`testimonial.card.${index + 1}`}
    >
      <div className="preserve-3d" style={{ transform: "translateZ(10px)" }}>
        <Quote className="w-8 h-8 text-primary/40 mb-4" />
      </div>
      <p className="text-foreground/90 leading-relaxed mb-6 text-sm">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative py-24 bg-muted/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
                data-ocid={`stats.item.${i + 1}`}
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    index={i}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Trusted by Filmmakers Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {partners.map((partner, i) => (
            <div
              key={partner}
              className="px-6 py-3 rounded-lg glass opacity-60 hover:opacity-100 transition-opacity duration-300"
              data-ocid={`partner.logo.${i + 1}`}
            >
              <span className="text-sm font-display font-semibold text-muted-foreground tracking-wide">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            These visuals are mock-ups only and are intended as abstract
            representations. They do not depict real customers or actual
            results.
          </p>
        </div>
      </div>
    </section>
  );
}
