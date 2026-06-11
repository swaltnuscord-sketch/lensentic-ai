import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getMyProfile: async () => ({
    id: { toText: () => "user-123" } as any,
    displayName: "Alex Filmmaker",
    avatarInitials: "AF",
    createdAt: BigInt(1716000000000000000),
    email: "alex@lensai.studio",
  }),
  upsertMyProfile: async (email: string, displayName: string) => ({
    id: { toText: () => "user-123" } as any,
    displayName: displayName || "Alex Filmmaker",
    avatarInitials: displayName ? displayName.slice(0, 2).toUpperCase() : "AF",
    createdAt: BigInt(1716000000000000000),
    email: email || "alex@lensai.studio",
  }),
};
