import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  apiKey: string | null;
  hasApiKey: boolean;
  userId: string | null;
  username: string | "";
  email: string | "";
  setAuth: (token: string, userId: string, username: string, email: string, hasApiKey?: boolean) => void;
  setApiKey: (apiKey: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      apiKey: null,
      hasApiKey: false,
      userId: null,
      username: "",
      email: "",
      setAuth: (token, userId, username, email, hasApiKey = false) => set({ token, userId, username, email, hasApiKey }),
      setApiKey: (apiKey) => set({ apiKey, hasApiKey: true }),
      logout: () => set({ token: null, apiKey: null, hasApiKey: false, userId: null, username: "", email: "" }),
    }),
    {
      name: 'conduit-auth',
    }
  )
);