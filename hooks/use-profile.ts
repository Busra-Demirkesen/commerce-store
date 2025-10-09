"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Profile = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  deliveryNotes?: string;
  backendUserId?: string; // optional unique id from backend
};

type ProfileStore = {
  profiles: Record<string, Profile>; // keyed by userId
  get: (userId: string | null | undefined) => Profile | null;
  upsert: (userId: string, data: Partial<Profile>) => void;
  clear: (userId: string) => void;
};

const DEFAULT_PROFILE: Profile = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  deliveryNotes: "",
  backendUserId: "",
};

const useProfile = create(
  persist<ProfileStore>(
    (set, get) => ({
      profiles: {},
      get: (userId) => {
        if (!userId) return null;
        const map = get().profiles;
        return map[userId] ?? null;
      },
      upsert: (userId, data) => {
        if (!userId) return;
        const existing = get().profiles[userId] ?? DEFAULT_PROFILE;
        const next = { ...existing, ...data } as Profile;
        set((state) => ({ profiles: { ...state.profiles, [userId]: next } }));
      },
      clear: (userId) => {
        if (!userId) return;
        set((state) => {
          const map = { ...state.profiles } as Record<string, Profile>;
          delete map[userId];
          return { profiles: map } as any;
        });
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export default useProfile;
