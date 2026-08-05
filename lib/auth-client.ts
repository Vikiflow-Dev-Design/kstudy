import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

// Named exports for convenience — use these in all client components
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
