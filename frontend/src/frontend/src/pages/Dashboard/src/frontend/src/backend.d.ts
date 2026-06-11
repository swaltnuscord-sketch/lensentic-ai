import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GeminiResponse {
    aiResponse: string;
    followUpOptions: Array<string>;
}
export interface ConversationTurn {
    content: string;
    role: string;
}
export interface backendInterface {
    askGemini(prompt: string, history: Array<ConversationTurn>): Promise<{
        __kind__: "ok";
        ok: GeminiResponse;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getGroqApiKeyStatus(): Promise<boolean>;
    setGroqApiKey(key: string): Promise<void>;
    getKlingApiKeyStatus(): Promise<boolean>;
    setKlingApiKey(key: string): Promise<void>;
    getChatGptApiKeyStatus(): Promise<boolean>;
    setChatGptApiKey(key: string): Promise<void>;
    getElevenlabsApiKeyStatus(): Promise<boolean>;
    setElevenlabsApiKey(key: string): Promise<void>;
    getVeoApiKeyStatus(): Promise<boolean>;
    setVeoApiKey(key: string): Promise<void>;
    getGeminiApiKeyStatus(): Promise<boolean>;
    setGeminiApiKey(key: string): Promise<void>;
    getSeedanceApiKeyStatus(): Promise<boolean>;
    setSeedanceApiKey(key: string): Promise<void>;
}
