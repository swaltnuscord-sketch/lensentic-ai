import { Clock, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const films = [
  {
    title: "Neon Dreams",
    genre: "Sci-Fi",
    duration: "94 min",
    rating: "4.8",
    gradient: "from-primary/30 to-secondary/20",
  },
  {
    title: "The Last Algorithm",
    genre: "Thriller",
    duration: "102 min",
    rating: "4.9",
    gradient: "from-secondary/30 to-primary/20",
  },
  {
    title: "Echoes of Tomorrow",
    genre: "Drama",
    duration: "88 min",
    rating: "4.7",
    gradient: "from-primary/25 to-secondary/25",
  },
  {
    title: "Synthetic Souls",
    genre: "Romance",
    duration: "96 min",
    rating: "4.6",
    gradient: "from-secondary/25 to-primary/30",
  },
  {
    title: "Quantum Horizon",
    genre: "Action",
    duration: "110 min",
    rating: "4.9",
    gradient: "from-primary/30 to-secondary/15",
  },
  {
    title: "Digital Ghosts",
    genre: "Horror",
    duration: "85 min",
    rating: "4.5",
    gradient: "from-secondary/30 to-primary/20",
  },
  {
    title: "The Architect",
    genre: "Mystery",
    duration: "98 min",
    rating: "4.8",
    gradient: "from-primary/20 to-secondary/30",
  },
  {
    title: "Silicon Hearts",
    genre: "Comedy",
    duration: "92 min",
    rating: "4.7",
    gradient: "from-secondary/20 to-primary/25",
  },
];

type FilmTilt = { rotateX: number; rotateY: number };
const FLAT_FILM: FilmTilt = { rotateX: 0, rotateY: 0 };

function FilmCard({
  film,
  index,
}: {
  film: (typeof films)[0];
  index: number;
}) {
  const [tilt, setTilt] = useState<FilmTilt>(FLAT_FILM);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 20, // ±10 deg
      rotateY: (x - 0.5) * 20,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setTilt(FLAT_FILM);
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative flex-shrink-0 w-64 snap-start tilt-card"
      data-ocid={`showcase.film.${index + 1}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: !isHovered
          ? "transform 0.45s cubic-bezier(0.23,1,0.32,1)"
          : "transform 0.08s ease-out",
      }}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden glass border-border/40 group-hover:border-primary/50 transition-all duration-500 preserve-3d">
        {/* Gradient poster with parallax shift */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${film.gradient} transition-all duration-200`}
          style={{
            transform: `translateZ(0px) translateX(${-tilt.rotateY * 0.4}px) translateY(${tilt.rotateX * 0.4}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

        {/* AI badge — slightly elevated */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/20 border border-primary/30 backdrop-blur-sm"
          style={{ transform: "translateZ(10px)" }}
        >
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
            AI-Generated
          </span>
        </div>

        {/* Play overlay — pops out in 3D */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-glow cursor-pointer"
            style={{
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
            data-ocid={`showcase.play_button.${index + 1}`}
          >
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </motion.div>
        </div>

        {/* Film info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-base font-semibold text-foreground mb-1 truncate">
            {film.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{film.genre}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {film.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-primary fill-primary" />
              {film.rating}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="relative py-24 bg-muted/20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Film Library
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            AI-Generated Films
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse films created entirely by LensAI's autonomous production
            pipeline.
          </p>
        </motion.div>

        <div
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {films.map((film, i) => (
            <FilmCard key={film.title} film={film} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
