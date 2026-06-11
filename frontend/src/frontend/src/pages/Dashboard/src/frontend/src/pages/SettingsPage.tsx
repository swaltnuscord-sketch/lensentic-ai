import { createActor } from "../backendClient";
import { Button } from "../components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Settings,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface ApiKeyConfig {
  id: string;
  name: string;
  placeholder: string;
  statusKey: keyof SettingsState;
  inputKey: keyof SettingsState;
  docUrl: string;
  description: string;
  getStatusFn: (actor: any) => Promise<boolean>;
  setKeyFn: (actor: any, key: string) => Promise<void>;
  color: string;
}

interface SettingsState {
  groqKey: string;
  klingKey: string;
  chatGptKey: string;
  elevenlabsKey: string;
  veoKey: string;
  geminiKey: string;
  seedanceKey: string;
  groqConfigured: boolean | null;
  klingConfigured: boolean | null;
  chatGptConfigured: boolean | null;
  elevenlabsConfigured: boolean | null;
  veoConfigured: boolean | null;
  geminiConfigured: boolean | null;
  seedanceConfigured: boolean | null;
  showKey: Record<string, boolean>;
}

const API_KEYS: ApiKeyConfig[] = [
  {
    id: "groq",
    name: "Groq",
    placeholder: "gsk_••••••••••••••••••••••••••••••••",
    statusKey: "groqConfigured",
    inputKey: "groqKey",
    docUrl: "https://console.groq.com",
    description: "Ultra-fast inference engine for AI generation",
    getStatusFn: (actor) => actor.getGroqApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setGroqApiKey(key),
    color: "255",
  },
  {
    id: "kling",
    name: "Kling",
    placeholder: "sk_••••••••••••••••••••••••••••••••",
    statusKey: "klingConfigured",
    inputKey: "klingKey",
    docUrl: "https://klingai.com/api",
    description: "Video generation powered by Kling AI",
    getStatusFn: (actor) => actor.getKlingApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setKlingApiKey(key),
    color: "280",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    placeholder: "sk-••••••••••••••••••••••••••••••••",
    statusKey: "chatGptConfigured",
    inputKey: "chatGptKey",
    docUrl: "https://platform.openai.com/api-keys",
    description: "OpenAI's GPT models for text generation",
    getStatusFn: (actor) => actor.getChatGptApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setChatGptApiKey(key),
    color: "90",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    placeholder: "xxxxxxxxxxxxxxxxxxxx",
    statusKey: "elevenlabsConfigured",
    inputKey: "elevenlabsKey",
    docUrl: "https://elevenlabs.io/api",
    description: "Premium text-to-speech and voice generation",
    getStatusFn: (actor) => actor.getElevenlabsApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setElevenlabsApiKey(key),
    color: "40",
  },
  {
    id: "veo",
    name: "Veo",
    placeholder: "veo_••••••••••••••••••••••••••••••",
    statusKey: "veoConfigured",
    inputKey: "veoKey",
    docUrl: "https://veo.ai/api",
    description: "Advanced video generation capabilities",
    getStatusFn: (actor) => actor.getVeoApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setVeoApiKey(key),
    color: "200",
  },
  {
    id: "gemini",
    name: "Gemini",
    placeholder: "AIza••••••••••••••••••••••••••••••",
    statusKey: "geminiConfigured",
    inputKey: "geminiKey",
    docUrl: "https://makersuite.google.com/app/apikey",
    description: "Google's multimodal AI model",
    getStatusFn: (actor) => actor.getGeminiApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setGeminiApiKey(key),
    color: "150",
  },
  {
    id: "seedance",
    name: "Seedance",
    placeholder: "seed_••••••••••••••••••••••••••••••",
    statusKey: "seedanceConfigured",
    inputKey: "seedanceKey",
    docUrl: "https://seedance.ai/api",
    description: "Dance generation and motion synthesis",
    getStatusFn: (actor) => actor.getSeedanceApiKeyStatus(),
    setKeyFn: (actor, key) => actor.setSeedanceApiKey(key),
    color: "120",
  },
];

export default function SettingsPage() {
  const { actor, isFetching } = useActor(createActor);
  const [state, setState] = useState<SettingsState>({
    groqKey: "",
    klingKey: "",
    chatGptKey: "",
    elevenlabsKey: "",
    veoKey: "",
    geminiKey: "",
    seedanceKey: "",
    groqConfigured: null,
    klingConfigured: null,
    chatGptConfigured: null,
    elevenlabsConfigured: null,
    veoConfigured: null,
    geminiConfigured: null,
    seedanceConfigured: null,
    showKey: {},
  });
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const checkAllApiKeyStatuses = useCallback(async () => {
    if (!actor) return;
    setIsCheckingStatus(true);
    try {
      const statuses = await Promise.all(
        API_KEYS.map((config) =>
          config.getStatusFn(actor).catch(() => false)
        )
      );
      setState((prev) => ({
        ...prev,
        groqConfigured: statuses[0],
        klingConfigured: statuses[1],
        chatGptConfigured: statuses[2],
        elevenlabsConfigured: statuses[3],
        veoConfigured: statuses[4],
        geminiConfigured: statuses[5],
        seedanceConfigured: statuses[6],
      }));
    } catch {
      // Handle error silently
    } finally {
      setIsCheckingStatus(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) {
      checkAllApiKeyStatuses();
    }
  }, [actor, isFetching, checkAllApiKeyStatuses]);

  async function handleSaveKey(config: ApiKeyConfig) {
    if (!actor) return;
    const key = state[config.inputKey] as string;
    if (!key.trim()) {
      toast.error(`Please enter ${config.name} API key before saving.`);
      return;
    }
    setSavingKey(config.id);
    try {
      await config.setKeyFn(actor, key.trim());
      setState((prev) => ({ ...prev, [config.inputKey]: "" }));
      await checkAllApiKeyStatuses();
      toast.success(`${config.name} API key saved successfully.`);
    } catch (err) {
      toast.error(`Failed to save ${config.name} API key. Please try again.`);
      console.error(err);
    } finally {
      setSavingKey(null);
    }
  }

  const isLoading = isFetching || isCheckingStatus;

  return (
    <div className="min-h-screen px-8 py-12" data-ocid="settings.page">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="p-2 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 255 / 0.2), oklch(0.5 0.2 285 / 0.2))",
              border: "1px solid oklch(0.55 0.22 255 / 0.3)",
              boxShadow: "0 0 16px oklch(0.55 0.22 255 / 0.15)",
            }}
            animate={{
              boxShadow: [
                "0 0 16px oklch(0.55 0.22 255 / 0.15)",
                "0 0 28px oklch(0.55 0.22 255 / 0.3)",
                "0 0 16px oklch(0.55 0.22 255 / 0.15)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Settings size={20} className="text-primary" />
          </motion.div>
          <h1
            className="text-3xl font-display font-bold"
            style={{
              background:
                "linear-gradient(90deg, #e2e8f0 0%, #00d4ff 40%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            API Configuration
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-11">
          Configure API keys for AI services and content generation tools.
        </p>
      </motion.div>

      {/* API Key cards grid */}
      <div className="grid gap-6 max-w-6xl">
        {API_KEYS.map((config, index) => {
          const isConfigured = state[config.statusKey];
          const inputValue = state[config.inputKey] as string;
          const showPassword = state.showKey[config.id];
          const isSaving = savingKey === config.id;

          return (
            <motion.div
              key={config.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.1 0.03 255 / 0.85), oklch(0.08 0.02 285 / 0.9))",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(0.55 0.22 255 / 0.18)",
                boxShadow:
                  "0 8px 48px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.05)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{
                      background: `linear-gradient(135deg, oklch(0.5 0.2 ${config.color} / 0.25), oklch(0.45 0.18 ${config.color} / 0.25))`,
                      border: `1px solid oklch(0.5 0.2 ${config.color} / 0.4)`,
                    }}
                  >
                    <Key size={16} style={{ color: `oklch(0.7 0.22 ${config.color})` }} />
                  </div>
                  <div>
                    <h2 className="text-base font-display font-semibold text-foreground">
                      {config.name}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {config.description}
                    </p>
                  </div>
                </div>

                {/* Status badge */}
                {isLoading ? (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                    style={{
                      background: "oklch(0.55 0.22 255 / 0.1)",
                      border: "1px solid oklch(0.55 0.22 255 / 0.2)",
                    }}
                  >
                    <Loader2 size={11} className="text-primary animate-spin" />
                    <span className="text-muted-foreground">Checking…</span>
                  </div>
                ) : isConfigured === true ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "oklch(0.5 0.18 145 / 0.18)",
                      border: "1px solid oklch(0.55 0.2 145 / 0.4)",
                      color: "oklch(0.75 0.18 145)",
                    }}
                  >
                    <CheckCircle size={11} />
                    Configured
                  </motion.div>
                ) : isConfigured === false ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "oklch(0.6 0.18 60 / 0.18)",
                      border: "1px solid oklch(0.65 0.2 60 / 0.4)",
                      color: "oklch(0.78 0.18 60)",
                    }}
                  >
                    <TriangleAlert size={11} />
                    Not set
                  </motion.div>
                ) : null}
              </div>

              {/* Security info */}
              <div
                className="flex items-start gap-2.5 mb-5 p-3 rounded-xl"
                style={{
                  background: "oklch(0.55 0.22 255 / 0.06)",
                  border: "1px solid oklch(0.55 0.22 255 / 0.1)",
                }}
              >
                <ShieldCheck size={15} className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your {config.name} API key is stored securely in the backend.
                </p>
              </div>

              {/* Input and button */}
              <div className="space-y-3">
                <label
                  htmlFor={`${config.id}-api-key`}
                  className="block text-xs font-semibold text-foreground uppercase"
                >
                  {config.name} API Key
                </label>
                <div className="relative">
                  <input
                    id={`${config.id}-api-key`}
                    type={showPassword ? "text" : "password"}
                    value={inputValue}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        [config.inputKey]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSaving) {
                        handleSaveKey(config);
                      }
                    }}
                    placeholder={config.placeholder}
                    autoComplete="off"
                    className="w-full pr-10 pl-4 py-3 rounded-xl text-sm font-mono text-foreground outline-none"
                    style={{
                      background: "oklch(0.08 0.02 255 / 0.8)",
                      border: "1px solid oklch(0.55 0.22 255 / 0.25)",
                      boxShadow: "inset 0 1px 3px oklch(0 0 0 / 0.3)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border =
                        "1px solid oklch(0.55 0.22 255 / 0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px oklch(0.55 0.22 255 / 0.12), inset 0 1px 3px oklch(0 0 0 / 0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border =
                        "1px solid oklch(0.55 0.22 255 / 0.25)";
                      e.currentTarget.style.boxShadow =
                        "inset 0 1px 3px oklch(0 0 0 / 0.3)";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        showKey: {
                          ...prev.showKey,
                          [config.id]: !prev.showKey[config.id],
                        },
                      }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    disabled={isSaving || !inputValue.trim()}
                    onClick={() => handleSaveKey(config)}
                    className="w-full py-3 h-auto text-sm font-semibold rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, oklch(0.6 0.22 ${config.color}), oklch(0.55 0.2 ${parseInt(config.color) + 10}))`,
                      boxShadow: `0 4px 20px oklch(0.6 0.22 ${config.color} / 0.35)`,
                      color: "oklch(1 0 0)",
                    }}
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Loader2 size={14} className="animate-spin" />
                        Saving…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Key size={14} />
                        Save Key
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Help link */}
              <p className="mt-4 text-[11px] text-muted-foreground/60 text-center">
                Get your key at{" "}
                <a
                  href={config.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline underline-offset-2"
                >
                  {config.docUrl.replace("https://", "")}
                </a>
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
