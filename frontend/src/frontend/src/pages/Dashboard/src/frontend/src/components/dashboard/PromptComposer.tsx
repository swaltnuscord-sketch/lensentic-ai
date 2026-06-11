import { aiModels } from "@/data/mockData";
import { ChevronDown, Globe, Paperclip, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MODEL_DOT_COLORS: Record<string, string> = {
  "ai-plus": "#00d4ff",
  "ai-base": "#a855f7",
  mks: "#10b981",
  "ai-v2": "#f59e0b",
  nfpo: "#ec4899",
};

const PARTICLE_DOTS = [
  {
    id: "dot-1",
    left: "12%",
    bottom: "10%",
    delay: "0s",
    size: 2.5,
    anim: "float-dot",
    dur: "2.8s",
    blue: true,
  },
  {
    id: "dot-2",
    left: "25%",
    bottom: "5%",
    delay: "0.8s",
    size: 2,
    anim: "float-dot-2",
    dur: "3.5s",
    blue: false,
  },
  {
    id: "dot-3",
    left: "40%",
    bottom: "15%",
    delay: "1.6s",
    size: 3,
    anim: "float-dot",
    dur: "3.15s",
    blue: true,
  },
  {
    id: "dot-4",
    left: "55%",
    bottom: "8%",
    delay: "0.4s",
    size: 2,
    anim: "float-dot-3",
    dur: "4.2s",
    blue: false,
  },
  {
    id: "dot-5",
    left: "68%",
    bottom: "12%",
    delay: "1.2s",
    size: 2.5,
    anim: "float-dot-2",
    dur: "2.66s",
    blue: true,
  },
  {
    id: "dot-6",
    left: "80%",
    bottom: "6%",
    delay: "2s",
    size: 2,
    anim: "float-dot",
    dur: "3.64s",
    blue: false,
  },
  {
    id: "dot-7",
    left: "90%",
    bottom: "18%",
    delay: "0.6s",
    size: 3,
    anim: "float-dot-3",
    dur: "2.94s",
    blue: true,
  },
  {
    id: "dot-8",
    left: "5%",
    bottom: "20%",
    delay: "1.8s",
    size: 2,
    anim: "float-dot-2",
    dur: "4.06s",
    blue: false,
  },
];

export function PromptComposer({
  onSubmit,
}: { onSubmit?: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");
  const [activeModel, setActiveModel] = useState("ai-plus");
  const [focused, setFocused] = useState(false);

  function handleSubmit() {
    const trimmed = prompt.trim();
    if (!trimmed || !onSubmit) return;
    onSubmit(trimmed);
    setPrompt("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <section
      className="px-8 pb-2 relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.18; }
          33% { transform: translate(8%, -12%) scale(1.15); opacity: 0.25; }
          66% { transform: translate(-6%, 10%) scale(0.9); opacity: 0.15; }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.2; }
          40% { transform: translate(-10%, 8%) scale(1.2); opacity: 0.3; }
          70% { transform: translate(12%, -6%) scale(0.85); opacity: 0.14; }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.12; }
          50% { transform: translate(6%, 14%) scale(1.1); opacity: 0.22; }
        }
        @keyframes float-dot {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-60px) translateX(8px); opacity: 0; }
        }
        @keyframes float-dot-2 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.4; }
          100% { transform: translateY(-45px) translateX(-10px); opacity: 0; }
        }
        @keyframes float-dot-3 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          25% { opacity: 0.6; }
          75% { opacity: 0.3; }
          100% { transform: translateY(-70px) translateX(4px); opacity: 0; }
        }
      `}</style>

      {/* Animated background layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ zIndex: 0, overflow: "hidden" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 20%, oklch(0.06 0.02 260 / 0.75) 100%)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "55%",
            height: "200%",
            top: "-50%",
            left: "5%",
            background:
              "radial-gradient(ellipse at center, oklch(0.5 0.25 255 / 0.22) 0%, transparent 65%)",
            animation: "aurora-drift-1 6.3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "50%",
            height: "200%",
            top: "-40%",
            right: "5%",
            background:
              "radial-gradient(ellipse at center, oklch(0.45 0.22 285 / 0.22) 0%, transparent 65%)",
            animation: "aurora-drift-2 8.4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "40%",
            height: "160%",
            top: "-30%",
            left: "30%",
            background:
              "radial-gradient(ellipse at center, oklch(0.48 0.2 265 / 0.16) 0%, transparent 60%)",
            animation: "aurora-drift-3 9.8s ease-in-out infinite",
          }}
        />
        {/* Blob 4 — cyan/blue */}
        <div
          className="absolute"
          style={{
            width: "45%",
            height: "180%",
            top: "-20%",
            left: "55%",
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.28 220 / 0.18) 0%, transparent 60%)",
            animation: "aurora-drift-1 7.2s ease-in-out infinite",
            animationDelay: "1.4s",
          }}
        />
        {PARTICLE_DOTS.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              bottom: dot.bottom,
              width: dot.size,
              height: dot.size,
              background: dot.blue
                ? "oklch(0.7 0.22 255)"
                : "oklch(0.65 0.2 285)",
              boxShadow: dot.blue
                ? "0 0 4px oklch(0.7 0.22 255 / 0.8)"
                : "0 0 4px oklch(0.65 0.2 285 / 0.8)",
              animation: `${dot.anim} ${dot.dur} ${dot.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Glassmorphism card */}
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          data-ocid="composer.card"
          className="glass-morphism rounded-[2rem] p-4 neon-glow relative"
          style={{
            zIndex: 1,
            boxShadow: focused
              ? "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.15)"
              : "0 0 0px transparent",
            transition: "box-shadow 0.35s ease",
          }}
        >
          <textarea
            data-ocid="composer.textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={2}
            placeholder="Create a dystopian cyberpunk thriller about memory extraction"
            className="w-full resize-none bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none leading-relaxed rounded-[1.5rem]"
          />

          <div className="border-t border-border/30 my-2.5" />

          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              type="button"
              data-ocid="composer.upload_button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.0, duration: 0.3 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60 transition-smooth hover:bg-muted/30"
            >
              <Paperclip className="w-3 h-3" />
              Add
            </motion.button>
            <motion.button
              type="button"
              data-ocid="composer.workflow_select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.3 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60 transition-smooth hover:bg-muted/30"
            >
              From an idea
              <ChevronDown className="w-3 h-3" />
            </motion.button>
            <motion.button
              type="button"
              data-ocid="composer.mode_select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.3 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60 transition-smooth hover:bg-muted/30"
            >
              <Zap className="w-3 h-3 text-primary" />
              Auto
              <ChevronDown className="w-3 h-3" />
            </motion.button>
            <div className="w-px h-4 bg-border/40" />
            <div className="flex items-center gap-1">
              {aiModels.slice(0, 3).map((model, idx) => (
                <motion.button
                  key={model.id}
                  type="button"
                  data-ocid={`composer.model_chip.${model.id}`}
                  onClick={() => setActiveModel(model.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (3 + idx) * 0.06, duration: 0.3 }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth"
                  style={{
                    borderColor:
                      activeModel === model.id
                        ? MODEL_DOT_COLORS[model.id]
                        : "oklch(0.25 0.03 270 / 0.6)",
                    background:
                      activeModel === model.id
                        ? `${MODEL_DOT_COLORS[model.id]}15`
                        : "transparent",
                    color:
                      activeModel === model.id
                        ? MODEL_DOT_COLORS[model.id]
                        : "oklch(0.65 0.02 240)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: MODEL_DOT_COLORS[model.id] }}
                  />
                  {model.label === "ai-plus"
                    ? "Lumina 3"
                    : model.label === "ai-base"
                      ? "Nexus Pro"
                      : model.label === "mks"
                        ? "Prism Ultra"
                        : model.label}
                </motion.button>
              ))}
            </div>
            <div className="w-px h-4 bg-border/40" />
            <motion.button
              type="button"
              data-ocid="composer.render_select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.3 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60 transition-smooth hover:bg-muted/30"
            >
              Photon v2
              <ChevronDown className="w-3 h-3" />
            </motion.button>
            <motion.button
              type="button"
              data-ocid="composer.language_select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.3 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60 transition-smooth hover:bg-muted/30"
            >
              <Globe className="w-3 h-3" />
              EN
            </motion.button>
            <div className="flex-1" />
            <motion.button
              type="button"
              data-ocid="composer.generate_button"
              onClick={handleSubmit}
              whileHover={{
                scale: 1.08,
                boxShadow:
                  "0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-full text-white shrink-0"
              style={{
                width: 52,
                height: 52,
                background:
                  "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
                boxShadow:
                  "0 0 30px oklch(0.6 0.22 255 / 0.5), 0 0 60px oklch(0.6 0.22 255 / 0.2)",
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
