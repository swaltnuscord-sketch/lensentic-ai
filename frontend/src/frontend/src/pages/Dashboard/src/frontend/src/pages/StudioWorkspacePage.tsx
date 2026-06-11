import {
  ArrowLeft,
  Captions,
  ChevronDown,
  Clapperboard,
  Download,
  Film,
  ImageIcon,
  Layers,
  Pause,
  Play,
  RefreshCcw,
  RotateCcw,
  Settings,
  Share2,
  SkipBack,
  SkipForward,
  Sparkles,
  StepBack,
  StepForward,
  Type,
  User,
  Wand2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ConversationEntry {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  storyTitle: string;
  conversationHistory: ConversationEntry[];
  onBack: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const TRACK_LABELS = ["Video", "Audio", "VFX", "Dialogue"] as const;

const TRACK_COLORS = {
  Video: {
    seg: "oklch(0.5 0.22 255 / 0.65)",
    border: "oklch(0.7 0.22 255 / 0.8)",
  },
  Audio: {
    seg: "oklch(0.5 0.18 168 / 0.65)",
    border: "oklch(0.7 0.18 168 / 0.8)",
  },
  VFX: {
    seg: "oklch(0.5 0.22 285 / 0.65)",
    border: "oklch(0.7 0.22 285 / 0.8)",
  },
  Dialogue: {
    seg: "oklch(0.55 0.22 65 / 0.65)",
    border: "oklch(0.75 0.22 65 / 0.8)",
  },
} as const;

const TRACK_SEGMENTS: Record<
  string,
  Array<{ start: number; width: number }>
> = {
  Video: [
    { start: 0, width: 14 },
    { start: 16, width: 18 },
    { start: 36, width: 12 },
    { start: 50, width: 20 },
  ],
  Audio: [
    { start: 0, width: 24 },
    { start: 26, width: 28 },
    { start: 56, width: 14 },
  ],
  VFX: [
    { start: 4, width: 10 },
    { start: 20, width: 8 },
    { start: 36, width: 16 },
    { start: 58, width: 12 },
  ],
  Dialogue: [
    { start: 0, width: 18 },
    { start: 22, width: 12 },
    { start: 40, width: 22 },
  ],
};

const SCENE_THUMBNAILS = [
  { label: "SC 01", active: true },
  { label: "SC 02", active: false },
  { label: "SC 03", active: false },
  { label: "SC 04", active: false },
  { label: "SC 05", active: false },
  { label: "SC 06", active: false },
];

const MEDIA_ASSETS = [
  { label: "Scene 1", type: "VIDEO" as const, duration: "0:24" },
  { label: "Scene 2", type: "VIDEO" as const, duration: "0:18" },
  { label: "Character Portrait", type: "IMAGE" as const, duration: null },
  { label: "Establishing Shot", type: "IMAGE" as const, duration: null },
  { label: "Score — Main Theme", type: "AUDIO" as const, duration: "1:04" },
  { label: "Ambient Drone", type: "AUDIO" as const, duration: "0:42" },
];

const LEFT_NAV_ITEMS = [
  { icon: Film, label: "All Media" },
  { icon: User, label: "Characters" },
  { icon: ImageIcon, label: "Stock" },
  { icon: Zap, label: "Transitions" },
  { icon: Wand2, label: "Effects" },
  { icon: Type, label: "Text" },
  { icon: Captions, label: "Captions" },
] as const;

const TIME_RULER = ["0s", "10s", "20s", "30s", "40s", "50s", "60s"];

const WAVEFORM_BARS: Array<{ id: string; h: number }> = [
  { id: "wb-0", h: 3 },
  { id: "wb-1", h: 7 },
  { id: "wb-2", h: 5 },
  { id: "wb-3", h: 10 },
  { id: "wb-4", h: 8 },
  { id: "wb-5", h: 4 },
  { id: "wb-6", h: 12 },
  { id: "wb-7", h: 9 },
  { id: "wb-8", h: 6 },
  { id: "wb-9", h: 11 },
  { id: "wb-10", h: 7 },
  { id: "wb-11", h: 5 },
  { id: "wb-12", h: 14 },
  { id: "wb-13", h: 10 },
  { id: "wb-14", h: 8 },
  { id: "wb-15", h: 6 },
  { id: "wb-16", h: 13 },
  { id: "wb-17", h: 9 },
  { id: "wb-18", h: 5 },
  { id: "wb-19", h: 11 },
  { id: "wb-20", h: 8 },
  { id: "wb-21", h: 4 },
  { id: "wb-22", h: 7 },
  { id: "wb-23", h: 12 },
  { id: "wb-24", h: 6 },
  { id: "wb-25", h: 10 },
  { id: "wb-26", h: 8 },
  { id: "wb-27", h: 3 },
  { id: "wb-28", h: 9 },
  { id: "wb-29", h: 7 },
  { id: "wb-30", h: 5 },
  { id: "wb-31", h: 11 },
];

const CITY_BARS: Array<{ id: string; h: number }> = [
  { id: "cb-0", h: 12 },
  { id: "cb-1", h: 28 },
  { id: "cb-2", h: 18 },
  { id: "cb-3", h: 44 },
  { id: "cb-4", h: 22 },
  { id: "cb-5", h: 36 },
  { id: "cb-6", h: 16 },
  { id: "cb-7", h: 52 },
  { id: "cb-8", h: 20 },
  { id: "cb-9", h: 32 },
  { id: "cb-10", h: 14 },
  { id: "cb-11", h: 40 },
  { id: "cb-12", h: 26 },
  { id: "cb-13", h: 18 },
  { id: "cb-14", h: 30 },
  { id: "cb-15", h: 46 },
  { id: "cb-16", h: 24 },
  { id: "cb-17", h: 16 },
  { id: "cb-18", h: 38 },
  { id: "cb-19", h: 22 },
];

const RULER_TICKS: Array<{ id: string; major: boolean }> = Array.from(
  { length: 60 },
  (_, i) => ({ id: `rtick-${i * 10}`, major: i % 10 === 0 }),
);

// ─── Sub-components ──────────────────────────────────────────────────────────
function WaveformViz() {
  return (
    <div className="flex items-center gap-[1.5px] h-5 mt-1.5">
      {WAVEFORM_BARS.map(({ id, h }, i) => (
        <motion.div
          key={id}
          className="w-[3px] rounded-full"
          style={{
            height: `${h}px`,
            background: "oklch(0.6 0.18 168 / 0.7)",
          }}
          animate={{ scaleY: [1, 0.5 + (i % 3) * 0.25, 1] }}
          transition={{
            duration: 1.2 + (i % 5) * 0.15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}

function MediaAssetCard({
  asset,
  index,
}: {
  asset: (typeof MEDIA_ASSETS)[number];
  index: number;
}) {
  const badgeColor =
    asset.type === "VIDEO"
      ? "oklch(0.5 0.22 255 / 0.6)"
      : asset.type === "AUDIO"
        ? "oklch(0.5 0.18 168 / 0.6)"
        : "oklch(0.5 0.22 285 / 0.6)";
  const badgeBorder =
    asset.type === "VIDEO"
      ? "oklch(0.7 0.22 255 / 0.5)"
      : asset.type === "AUDIO"
        ? "oklch(0.7 0.18 168 / 0.5)"
        : "oklch(0.7 0.22 285 / 0.5)";

  return (
    <motion.div
      data-ocid={`studio.media_asset.${index + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 + 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.03 260 / 0.8), oklch(0.09 0.02 250 / 0.7))",
        border: "1px solid oklch(var(--border) / 0.25)",
      }}
    >
      {/* Thumbnail area */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: "60px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              asset.type === "VIDEO"
                ? "linear-gradient(135deg, oklch(0.15 0.06 255 / 0.8), oklch(0.12 0.04 285 / 0.9))"
                : asset.type === "AUDIO"
                  ? "linear-gradient(135deg, oklch(0.12 0.04 168 / 0.7), oklch(0.1 0.02 200 / 0.9))"
                  : "linear-gradient(135deg, oklch(0.14 0.05 285 / 0.8), oklch(0.12 0.03 260 / 0.9))",
          }}
        />
        {asset.type === "VIDEO" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.6 0.22 255 / 0.3)",
                border: "1px solid oklch(0.7 0.22 255 / 0.5)",
              }}
            >
              <Play size={10} style={{ color: "oklch(0.85 0.1 240)" }} />
            </div>
          </div>
        )}
        {asset.type === "IMAGE" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Layers size={16} style={{ color: "oklch(0.65 0.15 285 / 0.7)" }} />
          </div>
        )}
        {asset.type === "AUDIO" && (
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <WaveformViz />
          </div>
        )}
        {/* Badge */}
        <div
          className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider"
          style={{
            background: badgeColor,
            border: `1px solid ${badgeBorder}`,
            color: "oklch(0.92 0.01 240)",
          }}
        >
          {asset.type}
        </div>
        {asset.duration && (
          <div
            className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono"
            style={{
              background: "oklch(0.08 0.01 240 / 0.8)",
              color: "oklch(0.65 0.02 240)",
            }}
          >
            {asset.duration}
          </div>
        )}
      </div>
      <div className="px-2 py-1.5">
        <p
          className="text-[10px] font-medium truncate"
          style={{ color: "oklch(0.72 0.03 240)" }}
        >
          {asset.label}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function StudioWorkspacePage({
  storyTitle,
  conversationHistory,
  onBack,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [playheadPos, setPlayheadPos] = useState(8);
  const playheadRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const displayTitle =
    storyTitle.length > 48 ? `${storyTitle.slice(0, 48)}\u2026` : storyTitle;

  // Animate playhead when playing
  useEffect(() => {
    if (isPlaying) {
      playheadRef.current = setInterval(() => {
        setPlayheadPos((p) => {
          if (p >= 94) {
            setIsPlaying(false);
            return 8;
          }
          return p + 0.15;
        });
      }, 100);
    } else if (playheadRef.current) {
      clearInterval(playheadRef.current);
    }
    return () => {
      if (playheadRef.current) clearInterval(playheadRef.current);
    };
  }, [isPlaying]);

  // Current time based on playhead
  const totalSeconds = 84;
  const currentSec = Math.round(((playheadPos - 8) / 86) * totalSeconds);
  const currentTime = `${Math.floor(currentSec / 60)}:${String(currentSec % 60).padStart(2, "0")}`;

  return (
    <motion.div
      data-ocid="studio.page"
      className="flex flex-col"
      style={{ height: "100vh", overflow: "hidden" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ── TOP BAR ──────────────────────────────────────────────────── */}
      <motion.header
        data-ocid="studio.topbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 px-4 py-2.5 shrink-0 z-20"
        style={{
          background:
            "linear-gradient(to right, oklch(0.09 0.025 255 / 0.95), oklch(0.08 0.02 265 / 0.95))",
          borderBottom: "1px solid oklch(0.6 0.22 255 / 0.15)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 20px oklch(0.6 0.22 255 / 0.06)",
        }}
      >
        {/* Back */}
        <motion.button
          type="button"
          data-ocid="studio.back_button"
          onClick={onBack}
          whileHover={{ x: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors"
          style={{
            background: "oklch(0.13 0.025 255 / 0.5)",
            border: "1px solid oklch(var(--border) / 0.3)",
            color: "oklch(0.72 0.04 240)",
          }}
          aria-label="Back to conversation"
        >
          <ArrowLeft size={13} />
          <span>Back</span>
        </motion.button>

        {/* Title — center */}
        <div className="flex-1 flex justify-center">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "oklch(0.13 0.03 260 / 0.7)",
              border: "1px solid oklch(var(--border) / 0.3)",
              maxWidth: "440px",
            }}
          >
            <Clapperboard
              size={12}
              style={{ color: "oklch(0.7 0.22 255 / 0.8)", flexShrink: 0 }}
            />
            <span
              className="text-xs font-medium truncate"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.88 0.04 240), oklch(0.7 0.22 255), oklch(0.65 0.2 285))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayTitle || "Untitled Project"}
            </span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            data-ocid="studio.export_button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              background: "oklch(0.13 0.025 255 / 0.6)",
              border: "1px solid oklch(var(--border) / 0.3)",
              color: "oklch(0.72 0.04 240)",
            }}
          >
            <Download size={12} />
            Export
          </motion.button>
          <motion.button
            type="button"
            data-ocid="studio.share_button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              background: "oklch(0.13 0.025 255 / 0.6)",
              border: "1px solid oklch(var(--border) / 0.3)",
              color: "oklch(0.72 0.04 240)",
            }}
          >
            <Share2 size={12} />
            Share
          </motion.button>
          <motion.button
            type="button"
            data-ocid="studio.render_button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 28px oklch(0.6 0.22 255 / 0.7)",
            }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
              boxShadow: "0 0 16px oklch(0.6 0.22 255 / 0.45)",
            }}
          >
            <Sparkles size={12} />
            Render
          </motion.button>
        </div>
      </motion.header>

      {/* ── MAIN ROW ─────────────────────────────────────────────────── */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ minHeight: 0, paddingBottom: "120px" }}
      >
        {/* ── LEFT MEDIA PANEL ────────────────────────────────────── */}
        <motion.div
          data-ocid="studio.media_panel"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center py-3 gap-1 shrink-0 z-10"
          style={{
            width: "64px",
            background: "oklch(0.09 0.02 255 / 0.92)",
            borderRight: "1px solid oklch(0.6 0.22 255 / 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          {LEFT_NAV_ITEMS.map(({ icon: Icon, label }, i) => (
            <motion.button
              key={label}
              type="button"
              data-ocid={`studio.media_nav.${i + 1}`}
              title={label}
              onClick={() => setActiveNavItem(i)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.2 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 14px oklch(0.6 0.22 255 / 0.5)",
              }}
              whileTap={{ scale: 0.92 }}
              className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background:
                  activeNavItem === i
                    ? "oklch(0.5 0.22 255 / 0.18)"
                    : "oklch(0.12 0.025 260 / 0.5)",
                border:
                  activeNavItem === i
                    ? "1px solid oklch(0.6 0.22 255 / 0.5)"
                    : "1px solid transparent",
                color:
                  activeNavItem === i
                    ? "oklch(0.75 0.22 255)"
                    : "oklch(0.55 0.04 240)",
                boxShadow:
                  activeNavItem === i
                    ? "0 0 12px oklch(0.6 0.22 255 / 0.3)"
                    : "none",
              }}
              aria-label={label}
            >
              {activeNavItem === i && (
                <span
                  className="absolute left-0 top-2 bottom-2 rounded-r w-[2.5px]"
                  style={{
                    background: "oklch(0.7 0.22 255)",
                    boxShadow: "0 0 8px oklch(0.7 0.22 255 / 0.8)",
                  }}
                />
              )}
              <Icon size={17} />
            </motion.button>
          ))}

          <div className="flex-1" />

          <motion.button
            type="button"
            data-ocid="studio.media_settings_button"
            title="Settings"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 14px oklch(0.6 0.22 255 / 0.4)",
            }}
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: "oklch(0.12 0.025 260 / 0.5)",
              border: "1px solid transparent",
              color: "oklch(0.5 0.04 240)",
            }}
            aria-label="Settings"
          >
            <Settings size={17} />
          </motion.button>
        </motion.div>

        {/* ── CHAT / HISTORY PANEL ────────────────────────────────── */}
        <motion.div
          data-ocid="studio.history_panel"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col shrink-0 overflow-hidden"
          style={{
            width: "380px",
            background: "oklch(0.095 0.022 258 / 0.92)",
            borderRight: "1px solid oklch(0.6 0.22 255 / 0.1)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center gap-2 px-4 py-3 shrink-0"
            style={{
              borderBottom: "1px solid oklch(0.6 0.22 255 / 0.1)",
            }}
          >
            <Film size={13} style={{ color: "oklch(0.65 0.22 255 / 0.8)" }} />
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: "oklch(0.75 0.04 240)" }}
            >
              Story Brief
            </span>
            <ChevronDown
              size={12}
              className="ml-auto"
              style={{ color: "oklch(0.45 0.03 240)" }}
            />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
            {/* Conversation history */}
            <div className="px-3 py-3 space-y-2">
              {conversationHistory.length === 0 ? (
                <div
                  className="text-center py-4 text-xs"
                  style={{ color: "oklch(0.45 0.03 240)" }}
                >
                  No conversation yet
                </div>
              ) : (
                conversationHistory.map((entry, i) => (
                  <motion.div
                    key={`${entry.role}-${i}-${entry.content.slice(0, 20)}`}
                    data-ocid={`studio.history_item.${i + 1}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    className={`flex ${
                      entry.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {entry.role === "assistant" && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold mr-1.5 mt-0.5 shrink-0"
                        style={{
                          background:
                            "radial-gradient(circle, oklch(0.75 0.2 60), oklch(0.55 0.2 50))",
                          boxShadow: "0 0 6px oklch(0.65 0.2 60 / 0.5)",
                          color: "#0d1117",
                        }}
                      >
                        L
                      </div>
                    )}
                    <div
                      className="max-w-[82%] px-2.5 py-2 rounded-xl text-[11px] leading-relaxed"
                      style={{
                        background:
                          entry.role === "user"
                            ? "linear-gradient(135deg, oklch(0.42 0.2 255 / 0.5), oklch(0.4 0.18 285 / 0.45))"
                            : "oklch(0.13 0.03 260 / 0.7)",
                        border:
                          entry.role === "user"
                            ? "1px solid oklch(0.6 0.22 255 / 0.35)"
                            : "1px solid oklch(var(--border) / 0.2)",
                        color:
                          entry.role === "user"
                            ? "oklch(0.88 0.02 240)"
                            : "oklch(0.72 0.03 240)",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {entry.content}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Asset grid */}
            <div
              className="px-3 pb-3"
              style={{
                borderTop: "1px solid oklch(0.6 0.22 255 / 0.08)",
                paddingTop: "10px",
              }}
            >
              <p
                className="text-[10px] font-semibold tracking-wider uppercase mb-2"
                style={{ color: "oklch(0.45 0.05 255)" }}
              >
                Generated Assets
              </p>
              <div className="grid grid-cols-2 gap-2">
                {MEDIA_ASSETS.map((asset, i) => (
                  <MediaAssetCard key={asset.label} asset={asset} index={i} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CENTRAL PREVIEW AREA ────────────────────────────────── */}
        <motion.div
          data-ocid="studio.preview_area"
          className="flex-1 flex flex-col gap-3 p-4 overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ minWidth: 0 }}
        >
          {/* Canvas */}
          <div
            className="relative rounded-2xl overflow-hidden flex-1"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.07 0.02 255), oklch(0.06 0.015 270))",
              border: "1px solid oklch(0.6 0.22 255 / 0.2)",
              boxShadow:
                "0 0 40px oklch(0.6 0.22 255 / 0.08), 0 0 80px oklch(0.55 0.2 285 / 0.06)",
              minHeight: 0,
            }}
          >
            {/* Aurora nebula background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 40% 60%, oklch(0.4 0.18 255 / 0.35) 0%, transparent 65%)",
                }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 45% at 65% 30%, oklch(0.38 0.2 285 / 0.3) 0%, transparent 60%)",
                }}
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.06, 1] }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 40% 35% at 20% 20%, oklch(0.35 0.15 220 / 0.25) 0%, transparent 55%)",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 3,
                }}
              />
              {/* Horizon line */}
              <div
                className="absolute bottom-[28%] left-0 right-0"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, oklch(0.6 0.22 255 / 0.15), oklch(0.55 0.2 285 / 0.2), oklch(0.6 0.22 255 / 0.15), transparent)",
                }}
              />
              {/* City silhouette */}
              <div className="absolute bottom-[14%] left-0 right-0 flex items-end justify-center gap-0.5 pointer-events-none">
                {CITY_BARS.map(({ id, h }, i) => (
                  <div
                    key={id}
                    className="shrink-0"
                    style={{
                      width: "18px",
                      height: `${h}px`,
                      background: `oklch(0.12 0.04 ${255 + i * 2} / ${0.6 + i * 0.01})`,
                      borderTop: `1px solid oklch(0.35 0.1 ${255 + i * 2} / 0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Overlay badges */}
            <div className="absolute top-3 left-3">
              <span
                className="px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: "oklch(0.6 0.22 255 / 0.18)",
                  border: "1px solid oklch(0.6 0.22 255 / 0.4)",
                  color: "oklch(0.82 0.18 255)",
                  boxShadow: "0 0 12px oklch(0.6 0.22 255 / 0.2)",
                }}
              >
                SCENE 01
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span
                className="px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: "oklch(0.55 0.2 285 / 0.18)",
                  border: "1px solid oklch(0.65 0.2 285 / 0.4)",
                  color: "oklch(0.8 0.18 285)",
                }}
              >
                4K · HDR
              </span>
            </div>
            <div className="absolute bottom-16 right-3">
              <span
                className="px-2 py-1 rounded text-[10px] font-semibold"
                style={{
                  background: "oklch(0.65 0.22 65 / 0.18)",
                  border: "1px solid oklch(0.65 0.22 65 / 0.4)",
                  color: "oklch(0.78 0.2 65)",
                }}
              >
                AI Score: 94%
              </span>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                type="button"
                data-ocid="studio.play_preview_button"
                onClick={() => setIsPlaying((p) => !p)}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 48px oklch(0.6 0.22 255 / 0.8)",
                }}
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.6 0.22 255 / 0.15)",
                  border: "2px solid oklch(0.6 0.22 255 / 0.7)",
                  boxShadow:
                    "0 0 32px oklch(0.6 0.22 255 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.1)",
                  backdropFilter: "blur(8px)",
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.span
                      key="pause"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Pause
                        size={22}
                        style={{ color: "oklch(0.88 0.15 255)" }}
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="play"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Play
                        size={22}
                        style={{
                          color: "oklch(0.88 0.15 255)",
                          marginLeft: "2px",
                        }}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Frame info */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-mono"
                style={{
                  background: "oklch(0.08 0.02 250 / 0.75)",
                  border: "1px solid oklch(0.6 0.22 255 / 0.2)",
                  color: "oklch(0.55 0.05 255)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Scene 01 · {currentTime} / 1:24 · 1920×1080
              </span>
            </div>
          </div>

          {/* Scene strip */}
          <div className="flex items-center gap-2 shrink-0">
            {SCENE_THUMBNAILS.map((scene, i) => (
              <motion.button
                key={scene.label}
                type="button"
                data-ocid={`studio.scene_thumb.${i + 1}`}
                onClick={() => setActiveScene(i)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 + 0.5 }}
                whileHover={{ scale: 1.07 }}
                className="relative rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                style={{
                  width: "72px",
                  height: "44px",
                  background:
                    "linear-gradient(135deg, oklch(0.12 0.04 255 / 0.7), oklch(0.1 0.03 285 / 0.8))",
                  border:
                    activeScene === i
                      ? "1.5px solid oklch(0.6 0.22 255 / 0.8)"
                      : "1px solid oklch(var(--border) / 0.25)",
                  boxShadow:
                    activeScene === i
                      ? "0 0 12px oklch(0.6 0.22 255 / 0.4)"
                      : "none",
                }}
                aria-label={scene.label}
              >
                <span
                  className="text-[9px] font-mono"
                  style={{
                    color:
                      activeScene === i
                        ? "oklch(0.8 0.18 255)"
                        : "oklch(0.45 0.04 240)",
                  }}
                >
                  {scene.label}
                </span>
                {activeScene === i && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                      background: "oklch(0.7 0.22 255)",
                      boxShadow: "0 0 6px oklch(0.7 0.22 255)",
                    }}
                    layoutId="scene-indicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── TIMELINE EDITOR ──────────────────────────────────────────── */}
      <motion.div
        data-ocid="studio.timeline"
        className="fixed bottom-0 z-20 flex flex-col"
        style={{
          left: "240px",
          right: 0,
          height: "120px",
          background:
            "linear-gradient(to top, oklch(0.07 0.02 255 / 0.98), oklch(0.085 0.022 260 / 0.97))",
          borderTop: "1px solid oklch(0.6 0.22 255 / 0.18)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 32px oklch(0.6 0.22 255 / 0.05)",
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Playback controls row */}
        <div className="flex items-center justify-between px-4 py-1.5 shrink-0">
          {/* Time display left */}
          <div
            className="flex items-center gap-1.5 font-mono text-xs min-w-[80px]"
            style={{ color: "oklch(0.55 0.06 255)" }}
          >
            <span style={{ color: "oklch(0.75 0.15 255)" }}>{currentTime}</span>
            <span style={{ color: "oklch(0.35 0.04 240)" }}>/</span>
            <span>1:24</span>
          </div>

          {/* Centered playback controls */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              data-ocid="studio.skip_back_button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{
                color: "oklch(0.55 0.04 240)",
                background: "oklch(0.12 0.02 255 / 0.5)",
                border: "1px solid oklch(var(--border) / 0.2)",
              }}
              aria-label="Skip back"
            >
              <SkipBack size={13} />
            </motion.button>
            <motion.button
              type="button"
              data-ocid="studio.step_back_button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{
                color: "oklch(0.6 0.06 240)",
                background: "oklch(0.12 0.02 255 / 0.5)",
                border: "1px solid oklch(var(--border) / 0.2)",
              }}
              aria-label="Step back"
            >
              <StepBack size={13} />
            </motion.button>
            <motion.button
              type="button"
              data-ocid="studio.play_pause_button"
              onClick={() => setIsPlaying((p) => !p)}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 0 22px oklch(0.6 0.22 255 / 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
                boxShadow: "0 0 16px oklch(0.6 0.22 255 / 0.5)",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={16} style={{ color: "#fff" }} />
              ) : (
                <Play size={16} style={{ color: "#fff", marginLeft: "1px" }} />
              )}
            </motion.button>
            <motion.button
              type="button"
              data-ocid="studio.step_forward_button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{
                color: "oklch(0.6 0.06 240)",
                background: "oklch(0.12 0.02 255 / 0.5)",
                border: "1px solid oklch(var(--border) / 0.2)",
              }}
              aria-label="Step forward"
            >
              <StepForward size={13} />
            </motion.button>
            <motion.button
              type="button"
              data-ocid="studio.skip_forward_button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{
                color: "oklch(0.55 0.04 240)",
                background: "oklch(0.12 0.02 255 / 0.5)",
                border: "1px solid oklch(var(--border) / 0.2)",
              }}
              aria-label="Skip forward"
            >
              <SkipForward size={13} />
            </motion.button>
            <motion.button
              type="button"
              data-ocid="studio.loop_toggle"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{
                color: "oklch(0.55 0.04 240)",
                background: "oklch(0.12 0.02 255 / 0.5)",
                border: "1px solid oklch(var(--border) / 0.2)",
              }}
              aria-label="Loop"
            >
              <RefreshCcw size={12} />
            </motion.button>
          </div>

          {/* Right spacer */}
          <div className="min-w-[80px] flex justify-end">
            <motion.button
              type="button"
              data-ocid="studio.reset_button"
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setIsPlaying(false);
                setPlayheadPos(8);
              }}
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded"
              style={{
                color: "oklch(0.45 0.04 240)",
                border: "1px solid oklch(var(--border) / 0.2)",
                background: "oklch(0.12 0.02 255 / 0.4)",
              }}
              aria-label="Reset playhead"
            >
              <RotateCcw size={9} /> Reset
            </motion.button>
          </div>
        </div>

        {/* Timeline tracks */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          {/* Track labels */}
          <div
            className="flex flex-col shrink-0 py-1"
            style={{
              width: "70px",
              borderRight: "1px solid oklch(0.6 0.22 255 / 0.1)",
            }}
          >
            {/* Ruler spacer */}
            <div className="h-4 shrink-0" />
            {TRACK_LABELS.map((label) => (
              <div
                key={label}
                className="flex-1 flex items-center px-2"
                style={{ minHeight: "16px" }}
              >
                <span
                  className="text-[9px] font-semibold tracking-wide uppercase truncate"
                  style={{ color: TRACK_COLORS[label].border }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Tracks scrollable area */}
          <div
            className="flex-1 relative overflow-x-auto overflow-y-hidden"
            style={{ minWidth: 0 }}
          >
            {/* Time ruler */}
            <div
              className="h-4 flex items-end shrink-0 sticky top-0 z-10"
              style={{
                background: "oklch(0.075 0.02 255 / 0.98)",
                borderBottom: "1px solid oklch(0.6 0.22 255 / 0.08)",
              }}
            >
              {TIME_RULER.map((t, i) => (
                <div
                  key={t}
                  className="flex flex-col items-start shrink-0"
                  style={{ width: "12%", paddingLeft: i === 0 ? "4px" : "2px" }}
                >
                  <span
                    className="text-[8px] font-mono pb-0.5"
                    style={{ color: "oklch(0.38 0.04 255)" }}
                  >
                    {t}
                  </span>
                </div>
              ))}
              {/* Ruler ticks */}
              <div className="absolute inset-x-0 bottom-0 flex">
                {RULER_TICKS.map(({ id, major }) => (
                  <div
                    key={id}
                    className="flex-1"
                    style={{
                      borderLeft: major
                        ? "1px solid oklch(0.45 0.08 255 / 0.5)"
                        : "1px solid oklch(0.25 0.04 255 / 0.2)",
                      height: major ? "6px" : "3px",
                      alignSelf: "flex-end",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Track rows */}
            <div
              className="relative"
              style={{ minWidth: "600px", height: "100%" }}
            >
              {TRACK_LABELS.map((label) => (
                <div
                  key={label}
                  className="relative flex items-center"
                  style={{
                    height: "calc((100% - 16px) / 4)",
                    minHeight: "16px",
                    borderBottom: "1px solid oklch(0.6 0.22 255 / 0.05)",
                  }}
                >
                  {/* Track BG */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "oklch(0.08 0.015 255 / 0.4)",
                    }}
                  />

                  {/* Segments */}
                  {TRACK_SEGMENTS[label].map((seg, j) => (
                    <motion.div
                      key={`${label}-s${seg.start}`}
                      data-ocid={`studio.track_segment.${label.toLowerCase()}.${j + 1}`}
                      className="absolute rounded-md cursor-pointer"
                      style={{
                        left: `${seg.start}%`,
                        width: `${seg.width}%`,
                        top: "3px",
                        bottom: "3px",
                        background: TRACK_COLORS[label].seg,
                        borderLeft: `2.5px solid ${TRACK_COLORS[label].border}`,
                        boxShadow: `0 0 6px ${TRACK_COLORS[label].border.replace("0.8)", "0.25)")}`,
                      }}
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: j * 0.1 + 0.5, duration: 0.4 }}
                      whileHover={{ opacity: 0.85, scale: 1.005 }}
                    />
                  ))}
                </div>
              ))}

              {/* Playhead */}
              <motion.div
                data-ocid="studio.playhead"
                className="absolute top-0 bottom-0 z-10 pointer-events-none"
                style={{ left: `${playheadPos}%`, width: "2px" }}
                animate={{ left: `${playheadPos}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, oklch(0.8 0.05 20), oklch(0.65 0.08 20 / 0.8))",
                    boxShadow: "0 0 6px oklch(0.7 0.1 20 / 0.6)",
                  }}
                />
                {/* Playhead head diamond */}
                <div
                  className="absolute -top-1 left-1/2"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "oklch(0.8 0.05 20)",
                    transform: "translateX(-50%) rotate(45deg)",
                    boxShadow: "0 0 6px oklch(0.7 0.1 20 / 0.8)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
