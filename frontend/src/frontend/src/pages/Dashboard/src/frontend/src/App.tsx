import { FilmGrainOverlay } from "@/components/layout/FilmGrainOverlay";
import { Sidebar } from "@/components/layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import GenerationWorkspacePage from "./pages/GenerationWorkspacePage";
import SettingsPage from "./pages/SettingsPage";
import StudioWorkspacePage from "./pages/StudioWorkspacePage";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState<
    "dashboard" | "workspace" | "settings" | "studio"
  >("dashboard");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [studioConversation, setStudioConversation] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);

  function handlePromptSubmit(prompt: string) {
    setSubmittedPrompt(prompt);
    setPage("workspace");
  }

  function handleBackToDashboard() {
    setPage("dashboard");
  }

  function handleOpenStudio(
    conversation: Array<{ role: "user" | "assistant"; content: string }>,
  ) {
    setStudioConversation(conversation);
    setPage("studio");
  }

  function handleBackToWorkspace() {
    setPage("workspace");
  }

  function handleNavigate(id: string) {
    if (id === "settings") {
      setPage("settings");
    } else if (
      id === "home" ||
      id === "recent" ||
      id === "all-projects" ||
      id === "starred" ||
      id === "shared"
    ) {
      setPage("dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient aurora glow — fixed behind all content */}
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
        {/* Orb 1 — top center blue */}
        <motion.div
          className="absolute"
          style={{
            width: "70%",
            height: "60%",
            top: "-20%",
            left: "15%",
            background:
              "radial-gradient(ellipse at center, oklch(0.5 0.22 255 / 0.18) 0%, transparent 65%)",
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* Orb 2 — right violet */}
        <motion.div
          className="absolute"
          style={{
            width: "50%",
            height: "60%",
            top: "10%",
            right: "-5%",
            background:
              "radial-gradient(ellipse at center, oklch(0.45 0.22 285 / 0.14) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 25, -10, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        {/* Orb 3 — left teal */}
        <motion.div
          className="absolute"
          style={{
            width: "45%",
            height: "50%",
            bottom: "5%",
            left: "-5%",
            background:
              "radial-gradient(ellipse at center, oklch(0.48 0.2 265 / 0.12) 0%, transparent 65%)",
          }}
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        {/* Orb 4 — bottom center deep violet */}
        <motion.div
          className="absolute"
          style={{
            width: "55%",
            height: "45%",
            bottom: "-10%",
            left: "22%",
            background:
              "radial-gradient(ellipse at center, oklch(0.4 0.18 285 / 0.12) 0%, transparent 65%)",
          }}
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 20, -15, 0],
            scale: [1, 1.2, 0.85, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
        {/* Orb 5 — mid left aurora pulse */}
        <motion.div
          className="absolute"
          style={{
            width: "35%",
            height: "40%",
            top: "35%",
            left: "5%",
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.25 245 / 0.1) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Scanline sweep effect */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      >
        <motion.div
          className="absolute left-0 right-0 h-16"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(0,212,255,0.025), transparent)",
          }}
          animate={{ y: ["-10%", "110vh"] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatDelay: 4,
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} />

      {/* Main scrollable content — offset for expanded sidebar (240px) */}
      <main
        data-ocid="main.content"
        className="relative z-10 min-h-screen overflow-y-auto transition-all duration-300"
        style={{ marginLeft: "240px" }}
      >
        <AnimatePresence mode="wait">
          {page === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <DashboardPage onPromptSubmit={handlePromptSubmit} />
            </motion.div>
          )}
          {page === "workspace" && (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <GenerationWorkspacePage
                prompt={submittedPrompt}
                onBack={handleBackToDashboard}
                onOpenStudio={handleOpenStudio}
              />
            </motion.div>
          )}
          {page === "studio" && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <StudioWorkspacePage
                storyTitle={submittedPrompt}
                conversationHistory={studioConversation}
                onBack={handleBackToWorkspace}
              />
            </motion.div>
          )}
          {page === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <SettingsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Film grain overlay — always on top, no pointer events */}
      <FilmGrainOverlay />
    </div>
  );
}
