import type {
  backendInterface,
  CreateActorOptions,
  ConversationTurn,
  GeminiResponse,
} from "./backend";
import { createActor as createIcpActor } from "./backend";

type ApiService =
  | "groq"
  | "kling"
  | "chatGpt"
  | "elevenlabs"
  | "veo"
  | "gemini"
  | "seedance";

const MOCK_STORAGE_KEY = "lensentic-dashboard-mock-backend-status";
const DEFAULT_STATUS: Record<ApiService, boolean> = {
  groq: false,
  kling: false,
  chatGpt: false,
  elevenlabs: false,
  veo: false,
  gemini: false,
  seedance: false,
};

function loadMockStatus(): Record<ApiService, boolean> {
  if (typeof window === "undefined") {
    return { ...DEFAULT_STATUS };
  }

  try {
    const raw = window.localStorage.getItem(MOCK_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATUS };
    const parsed = JSON.parse(raw) as Partial<Record<ApiService, boolean>>;
    return { ...DEFAULT_STATUS, ...parsed };
  } catch {
    return { ...DEFAULT_STATUS };
  }
}

function saveMockStatus(status: Record<ApiService, boolean>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(status));
  } catch {
    // ignore serialization errors
  }
}

class MockBackend implements backendInterface {
  private status = loadMockStatus();

  async askGemini(
    prompt: string,
    history: Array<ConversationTurn>,
  ): Promise<
    | {
        __kind__: "ok";
        ok: GeminiResponse;
      }
    | {
        __kind__: "err";
        err: string;
      }
  > {
    const aiResponse = `Mock Gemini answer for: ${prompt}`;
    const followUpOptions = [
      "Generate a video prompt",
      "Refine the concept",
      "Start over with new input",
    ];

    return {
      __kind__: "ok",
      ok: {
        aiResponse,
        followUpOptions,
      },
    };
  }

  async getGroqApiKeyStatus() {
    return this.status.groq;
  }
  async setGroqApiKey(key: string) {
    this.setStatus("groq", key.trim().length > 0);
  }

  async getKlingApiKeyStatus() {
    return this.status.kling;
  }
  async setKlingApiKey(key: string) {
    this.setStatus("kling", key.trim().length > 0);
  }

  async getChatGptApiKeyStatus() {
    return this.status.chatGpt;
  }
  async setChatGptApiKey(key: string) {
    this.setStatus("chatGpt", key.trim().length > 0);
  }

  async getElevenlabsApiKeyStatus() {
    return this.status.elevenlabs;
  }
  async setElevenlabsApiKey(key: string) {
    this.setStatus("elevenlabs", key.trim().length > 0);
  }

  async getVeoApiKeyStatus() {
    return this.status.veo;
  }
  async setVeoApiKey(key: string) {
    this.setStatus("veo", key.trim().length > 0);
  }

  async getGeminiApiKeyStatus() {
    return this.status.gemini;
  }
  async setGeminiApiKey(key: string) {
    this.setStatus("gemini", key.trim().length > 0);
  }

  async getSeedanceApiKeyStatus() {
    return this.status.seedance;
  }
  async setSeedanceApiKey(key: string) {
    this.setStatus("seedance", key.trim().length > 0);
  }

  private setStatus(service: ApiService, value: boolean) {
    this.status = {
      ...this.status,
      [service]: value,
    };
    saveMockStatus(this.status);
  }
}

class RestBackend implements backendInterface {
  constructor(private apiUrl: string) {}

  private buildUrl(path: string) {
    return `${this.apiUrl.replace(/\/+$/, "")}${path}`;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(this.buildUrl(path), {
      headers,
      ...init,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend request failed: ${response.status} ${text}`);
    }

    return response.json();
  }

  async askGemini(
    prompt: string,
    history: Array<ConversationTurn>,
  ): Promise<
    | {
        __kind__: "ok";
        ok: GeminiResponse;
      }
    | {
        __kind__: "err";
        err: string;
      }
  > {
    return this.request("/askGemini", {
      method: "POST",
      body: JSON.stringify({ prompt, history }),
    });
  }

  async getGroqApiKeyStatus() {
    return (await this.request<{ status: boolean }>(
      "/status/groq",
    )).status;
  }
  async setGroqApiKey(key: string) {
    await this.request("/set/groq", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }

  async getKlingApiKeyStatus() {
    return (await this.request<{ status: boolean }>(
      "/status/kling",
    )).status;
  }
  async setKlingApiKey(key: string) {
    await this.request("/set/kling", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }

  async getChatGptApiKeyStatus() {
    return (await this.request<{ status: boolean }>(
      "/status/chatGpt",
    )).status;
  }
  async setChatGptApiKey(key: string) {
    await this.request("/set/chatGpt", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }

  async getElevenlabsApiKeyStatus() {
    return (await this.request<{ status: boolean }>(
      "/status/elevenlabs",
    )).status;
  }
  async setElevenlabsApiKey(key: string) {
    await this.request("/set/elevenlabs", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }

  async getVeoApiKeyStatus() {
    return (await this.request<{ status: boolean }>("/status/veo")).status;
  }
  async setVeoApiKey(key: string) {
    await this.request("/set/veo", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }

  async getGeminiApiKeyStatus() {
    return (await this.request<{ status: boolean }>(
      "/status/gemini",
    )).status;
  }
  async setGeminiApiKey(key: string) {
    await this.request("/set/gemini", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }

  async getSeedanceApiKeyStatus() {
    return (await this.request<{ status: boolean }>(
      "/status/seedance",
    )).status;
  }
  async setSeedanceApiKey(key: string) {
    await this.request("/set/seedance", {
      method: "POST",
      body: JSON.stringify({ key }),
    });
  }
}

const backendMode = import.meta.env.VITE_BACKEND_MODE ?? "rest";
const backendUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

export function createActor(
  canisterId: string,
  _uploadFile: (file: unknown) => Promise<Uint8Array>,
  _downloadFile: (file: Uint8Array) => Promise<unknown>,
  options: CreateActorOptions = {},
): backendInterface {
  if (backendMode === "mock") {
    return new MockBackend();
  }

  if (backendMode === "rest") {
    return new RestBackend(backendUrl);
  }

  return createIcpActor(canisterId, _uploadFile, _downloadFile, options);
}
