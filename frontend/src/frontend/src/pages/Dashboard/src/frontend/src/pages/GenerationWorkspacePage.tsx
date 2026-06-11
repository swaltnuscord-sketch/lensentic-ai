import { useActor } from "@caffeineai/core-infrastructure";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Coins,
  LifeBuoy,
  Lock,
  Plus,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backendClient";

interface ConversationTurn {
  role: string;
  content: string;
}

function LoadingEllipsis() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "oklch(0.7 0.22 255 / 0.8)" }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

interface Props {
  prompt: string;
  onBack: () => void;
  onOpenStudio?: (
    conversation: Array<{ role: "user" | "assistant"; content: string }>,
  ) => void;
}

export default function GenerationWorkspacePage({
  prompt,
  onBack,
  onOpenStudio,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionPage, setQuestionPage] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);

  const [aiResponse, setAiResponse] = useState("");
  const [followUpOptions, setFollowUpOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([{ role: "user", content: prompt }]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const totalQuestionPages = Math.max(1, Math.ceil(followUpOptions.length / 4));

  const { actor, isFetching: isActorFetching } = useActor(createActor);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!actor || isActorFetching || hasInitialized.current) return;
    hasInitialized.current = true;
    async function init() {
      await callAskGemini(prompt, [{ role: "user", content: prompt }]);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actor, isActorFetching, prompt]);

  async function callAskGemini(message: string, history: ConversationTurn[]) {
    if (!actor) return;
    setIsLoading(true);
    setError(null);
    setSelectedOption(null);
    try {
      const result = await actor.askGemini(message, history);
      if (result.__kind__ === "ok") {
        setAiResponse(result.ok.aiResponse);
        setFollowUpOptions(result.ok.followUpOptions);
        setConversationHistory((prev) => [
          ...prev,
          { role: "assistant", content: result.ok.aiResponse },
        ]);
      } else {
        setError(result.err);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "An unexpected error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleContinueWithOption() {
    if (selectedOption === null || followUpOptions.length === 0) return;
    const chosen = followUpOptions[selectedOption];
    const newHistory: ConversationTurn[] = [
      ...conversationHistory,
      { role: "user", content: chosen },
    ];
    setConversationHistory(newHistory);
    // If this feels like confirmation (user chose a direction), open studio
    if (onOpenStudio) {
      const studioHistory = newHistory.map((t) => ({
        role: (t.role === "model" ? "assistant" : t.role) as
          | "user"
          | "assistant",
        content: t.content,
      }));
      onOpenStudio(studioHistory);
      return;
    }
    await callAskGemini(chosen, newHistory);
  }

  async function handleSend() {
    const msg = inputValue.trim();
    if (!msg) return;
    setInputValue("");
    const newHistory: ConversationTurn[] = [
      ...conversationHistory,
      { role: "user", content: msg },
    ];
    setConversationHistory(newHistory);
    await callAskGemini(msg, newHistory);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const truncatedTitle =
    prompt.length > 42 ? `${prompt.slice(0, 42)}\u2026` : prompt;

  return (
    <div
      data-ocid="workspace.page"
      className="flex flex-col min-h-screen relative"
    >
      {/* ── Top bar ────────────────────────────────────────────── */}
      <motion.header
        data-ocid="workspace.topbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 glass-morphism border-b"
        style={{
          borderColor: "oklch(var(--border) / 0.25)",
          backdropFilter: "blur(24px)",
          background:
            "linear-gradient(to right, oklch(0.09 0.02 250 / 0.85), oklch(0.08 0.02 260 / 0.85))",
        }}
      >
        {/* Back button */}
        <motion.button
          type="button"
          data-ocid="workspace.back_button"
          onClick={onBack}
          whileHover={{ x: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60 transition-smooth"
          style={{
            background: "oklch(0.12 0.02 250 / 0.5)",
          }}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline text-xs">Back</span>
        </motion.button>

        {/* Centered project title */}
        <div className="flex-1 flex justify-center">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: "oklch(0.14 0.03 260 / 0.7)",
              border: "1px solid oklch(var(--border) / 0.3)",
              maxWidth: "420px",
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.22 255), oklch(0.65 0.2 285))",
                boxShadow: "0 0 6px oklch(0.7 0.22 255 / 0.7)",
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <span className="text-foreground/90 truncate text-xs sm:text-sm">
              {truncatedTitle}
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: "oklch(0.12 0.02 250 / 0.6)",
              border: "1px solid oklch(var(--border) / 0.25)",
            }}
          >
            <Coins
              size={12}
              style={{
                color: "oklch(0.75 0.22 255)",
                filter: "drop-shadow(0 0 4px oklch(0.75 0.22 255 / 0.8))",
              }}
            />
            <span className="text-muted-foreground font-medium">2,450</span>
          </div>

          <motion.button
            type="button"
            data-ocid="workspace.upgrade_button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
              boxShadow: "0 0 16px oklch(0.6 0.22 255 / 0.35)",
            }}
          >
            Upgrade
          </motion.button>
          <motion.button
            type="button"
            data-ocid="workspace.support_link"
            whileHover={{ scale: 1.08 }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Support"
          >
            <LifeBuoy size={16} />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Chat area ─────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-6 py-8"
        style={{ paddingBottom: "140px" }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* User prompt bubble */}
          <motion.div
            data-ocid="workspace.user_bubble"
            className="flex justify-end"
            initial={{ opacity: 0, y: 24, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="max-w-[75%] px-5 py-3.5 rounded-3xl rounded-tr-md text-sm leading-relaxed text-white font-medium"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.5 0.24 255), oklch(0.48 0.22 285))",
                boxShadow:
                  "0 4px 24px oklch(0.5 0.24 255 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.12)",
              }}
            >
              {prompt}
            </div>
          </motion.div>

          {/* AI response row */}
          <motion.div
            data-ocid="workspace.ai_response"
            className="flex items-start gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
          >
            {/* Avatar orb */}
            <div className="relative shrink-0 mt-1">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, oklch(0.8 0.18 60), oklch(0.65 0.22 50), oklch(0.5 0.2 45))",
                  boxShadow:
                    "0 0 18px oklch(0.7 0.2 60 / 0.5), 0 0 36px oklch(0.7 0.2 60 / 0.2), inset 0 1px 1px oklch(1 0 0 / 0.3)",
                  border: "1.5px solid oklch(0.6 0.22 255 / 0.5)",
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <span style={{ color: "#0d1117" }}>L</span>
              </motion.div>
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-1 rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 60%, oklch(0.7 0.22 255 / 0.6) 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              {/* Name label */}
              <p
                className="text-xs font-semibold tracking-wide"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.82 0.01 240), oklch(0.7 0.22 255))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Lensentic AI
              </p>
              {/* Response card */}
              <motion.div
                className="glass-morphism rounded-2xl p-5 text-sm leading-relaxed"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.12 0.03 265 / 0.7), oklch(0.1 0.02 250 / 0.6))",
                  border: error
                    ? "1px solid oklch(0.55 0.2 20 / 0.5)"
                    : "1px solid oklch(var(--border) / 0.3)",
                  boxShadow:
                    "0 4px 32px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.05)",
                }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      data-ocid="workspace.loading_state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-3"
                    >
                      {["w-full", "w-5/6", "w-4/5", "w-3/4"].map((w, i) => (
                        <motion.div
                          key={w}
                          className={`h-3 rounded-full ${w}`}
                          style={{
                            background:
                              "linear-gradient(90deg, oklch(0.2 0.02 260 / 0.6) 0%, oklch(0.3 0.05 255 / 0.5) 50%, oklch(0.2 0.02 260 / 0.6) 100%)",
                            backgroundSize: "200% 100%",
                          }}
                          animate={{
                            backgroundPosition: ["200% 0", "-200% 0"],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 0.12,
                          }}
                        />
                      ))}
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.55 0.05 260)" }}
                        >
                          Generating your vision
                        </span>
                        <LoadingEllipsis />
                      </div>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      data-ocid="workspace.error_state"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: "oklch(0.55 0.2 20 / 0.2)",
                          border: "1px solid oklch(0.55 0.2 20 / 0.5)",
                        }}
                      >
                        <X size={10} style={{ color: "oklch(0.7 0.2 20)" }} />
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "oklch(0.7 0.2 20)" }}
                        >
                          Generation failed
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "oklch(0.65 0.06 20)" }}
                        >
                          {error}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="response"
                      data-ocid="workspace.ai_text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-foreground/85"
                    >
                      {aiResponse}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Answer-to-continue card — only show when loaded and options exist */}
          <AnimatePresence>
            {!isLoading && !error && followUpOptions.length > 0 && (
              <motion.div
                data-ocid="workspace.answer_card"
                className="flex items-start gap-4 ml-14"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className="rounded-2xl p-5 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.13 0.04 60 / 0.35), oklch(0.1 0.03 250 / 0.55))",
                      border: "1px solid oklch(0.65 0.22 65 / 0.4)",
                      boxShadow:
                        "0 0 32px oklch(0.65 0.22 65 / 0.12), inset 0 1px 0 oklch(0.65 0.22 65 / 0.1)",
                    }}
                  >
                    {/* Ambient gold glow */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.65 0.22 65 / 0.08) 0%, transparent 100%)",
                      }}
                    />

                    {/* Card header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.65 0.22 65 / 0.25), oklch(0.55 0.2 60 / 0.15))",
                            border: "1px solid oklch(0.65 0.22 65 / 0.5)",
                            boxShadow: "0 0 10px oklch(0.65 0.22 65 / 0.3)",
                          }}
                        >
                          <Lock
                            size={12}
                            style={{ color: "oklch(0.75 0.22 65)" }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold tracking-wider uppercase"
                          style={{ color: "oklch(0.75 0.22 65)" }}
                        >
                          Answer to continue
                        </span>
                      </div>
                      {/* Pagination — only show if more than 4 options */}
                      {followUpOptions.length > 4 && (
                        <div className="flex items-center gap-2">
                          <motion.button
                            type="button"
                            data-ocid="workspace.question_prev"
                            onClick={() =>
                              setQuestionPage((p) => Math.max(0, p - 1))
                            }
                            disabled={questionPage === 0}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 rounded-md flex items-center justify-center transition-smooth disabled:opacity-30"
                            style={{
                              border: "1px solid oklch(0.65 0.22 65 / 0.4)",
                              background: "oklch(0.12 0.03 60 / 0.4)",
                              color: "oklch(0.75 0.22 65)",
                            }}
                          >
                            <ChevronLeft size={12} />
                          </motion.button>
                          <span
                            className="text-xs font-medium tabular-nums"
                            style={{ color: "oklch(0.65 0.1 240)" }}
                          >
                            {questionPage + 1} / {totalQuestionPages}
                          </span>
                          <motion.button
                            type="button"
                            data-ocid="workspace.question_next"
                            onClick={() =>
                              setQuestionPage((p) =>
                                Math.min(totalQuestionPages - 1, p + 1),
                              )
                            }
                            disabled={questionPage === totalQuestionPages - 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 rounded-md flex items-center justify-center transition-smooth disabled:opacity-30"
                            style={{
                              border: "1px solid oklch(0.65 0.22 65 / 0.4)",
                              background: "oklch(0.12 0.03 60 / 0.4)",
                              color: "oklch(0.75 0.22 65)",
                            }}
                          >
                            <ChevronRight size={12} />
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={questionPage}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-sm font-medium text-foreground/90 mb-4">
                          How should we develop this scene?
                        </p>

                        {/* Radio options */}
                        <div className="space-y-2.5">
                          {followUpOptions
                            .slice(questionPage * 4, questionPage * 4 + 4)
                            .map((option, idx) => (
                              <motion.button
                                key={option}
                                type="button"
                                data-ocid={`workspace.scene_option.${idx + 1}`}
                                onClick={() =>
                                  setSelectedOption(questionPage * 4 + idx)
                                }
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.07 }}
                                whileHover={{ x: 3 }}
                                className="w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left text-sm transition-smooth"
                                style={{
                                  background:
                                    selectedOption === questionPage * 4 + idx
                                      ? "oklch(0.65 0.22 65 / 0.12)"
                                      : "oklch(0.1 0.02 250 / 0.4)",
                                  border:
                                    selectedOption === questionPage * 4 + idx
                                      ? "1px solid oklch(0.65 0.22 65 / 0.6)"
                                      : "1px solid oklch(var(--border) / 0.25)",
                                  boxShadow:
                                    selectedOption === questionPage * 4 + idx
                                      ? "0 0 12px oklch(0.65 0.22 65 / 0.15)"
                                      : "none",
                                }}
                              >
                                {/* Radio indicator */}
                                <span
                                  className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center border-2"
                                  style={{
                                    borderColor:
                                      selectedOption === questionPage * 4 + idx
                                        ? "oklch(0.75 0.22 65)"
                                        : "oklch(0.35 0.04 270)",
                                    background:
                                      selectedOption === questionPage * 4 + idx
                                        ? "oklch(0.65 0.22 65 / 0.25)"
                                        : "transparent",
                                  }}
                                >
                                  {selectedOption ===
                                    questionPage * 4 + idx && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-2 h-2 rounded-full"
                                      style={{
                                        background: "oklch(0.75 0.22 65)",
                                        boxShadow:
                                          "0 0 6px oklch(0.75 0.22 65 / 0.8)",
                                      }}
                                    />
                                  )}
                                </span>
                                <span
                                  className="leading-snug"
                                  style={{
                                    color:
                                      selectedOption === questionPage * 4 + idx
                                        ? "oklch(0.9 0.01 240)"
                                        : "oklch(0.7 0.02 240)",
                                  }}
                                >
                                  {option}
                                </span>
                              </motion.button>
                            ))}
                        </div>

                        {/* Continue button */}
                        {selectedOption !== null && (
                          <motion.button
                            type="button"
                            data-ocid="workspace.continue_button"
                            onClick={handleContinueWithOption}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold"
                            style={{
                              background:
                                "linear-gradient(135deg, oklch(0.65 0.22 65), oklch(0.55 0.2 55))",
                              boxShadow: "0 0 24px oklch(0.65 0.22 65 / 0.4)",
                              color: "oklch(0.08 0.01 240)",
                            }}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <Sparkles size={14} />
                              Continue Generation
                            </span>
                          </motion.button>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ── Bottom input bar ──────────────────────────────────── */}
      <motion.div
        data-ocid="workspace.input_bar"
        className="fixed bottom-0 z-30 px-6 pb-5 pt-3"
        style={{ left: "240px", right: 0 }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Gradient fade above input */}
          <div
            aria-hidden="true"
            className="h-8 -mb-3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, oklch(0.055 0.02 240 / 0.85), transparent)",
            }}
          />
          <div
            className="glass-morphism rounded-2xl px-4 py-3 flex items-end gap-3"
            style={{
              border: inputFocused
                ? "1px solid oklch(0.6 0.22 255 / 0.5)"
                : "1px solid oklch(var(--border) / 0.3)",
              background:
                "linear-gradient(135deg, oklch(0.1 0.025 260 / 0.9), oklch(0.09 0.02 250 / 0.9))",
              boxShadow: inputFocused
                ? "0 0 24px oklch(0.6 0.22 255 / 0.2), 0 8px 32px oklch(0 0 0 / 0.3)"
                : "0 8px 32px oklch(0 0 0 / 0.25)",
              backdropFilter: "blur(24px)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* Plus button */}
            <motion.button
              type="button"
              data-ocid="workspace.attach_button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                border: "1.5px solid oklch(0.6 0.22 255 / 0.55)",
                background: "oklch(0.12 0.03 255 / 0.5)",
                boxShadow: "0 0 10px oklch(0.6 0.22 255 / 0.2)",
                color: "oklch(0.7 0.22 255)",
              }}
              aria-label="Attach file"
            >
              <Plus size={16} />
            </motion.button>

            {/* Textarea */}
            <textarea
              data-ocid="workspace.continue_input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              rows={1}
              placeholder="Continue your vision..."
              className="flex-1 min-w-0 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none leading-relaxed"
              style={{ maxHeight: "120px" }}
            />

            {/* Send button */}
            <motion.button
              type="button"
              data-ocid="workspace.send_button"
              onClick={handleSend}
              disabled={isLoading}
              whileHover={
                !isLoading
                  ? {
                      scale: 1.1,
                      boxShadow:
                        "0 0 28px oklch(0.6 0.22 255 / 0.8), 0 0 56px oklch(0.6 0.22 255 / 0.25)",
                    }
                  : {}
              }
              whileTap={!isLoading ? { scale: 0.92 } : {}}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
                boxShadow:
                  "0 0 18px oklch(0.6 0.22 255 / 0.5), 0 0 36px oklch(0.6 0.22 255 / 0.2)",
              }}
              aria-label="Send message"
            >
              {isLoading ? <LoadingEllipsis /> : <Send size={15} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
