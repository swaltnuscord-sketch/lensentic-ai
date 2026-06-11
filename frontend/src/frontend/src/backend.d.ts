import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface UserProfile {
    id: UserId;
    displayName: string;
    avatarInitials: string;
    createdAt: Timestamp;
    email: string;
}
export interface backendInterface {
    getMyProfile(): Promise<UserProfile | null>;
    upsertMyProfile(email: string, displayName: string): Promise<UserProfile>;
}
