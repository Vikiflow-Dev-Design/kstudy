import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

// Resolve auth once per cold start, then reuse
let cachedHandler: ReturnType<typeof toNextJsHandler> | null = null;

async function handler(req: NextRequest) {
  if (!cachedHandler) {
    const auth    = await getAuth();
    cachedHandler = toNextJsHandler(auth);
  }
  // Route to GET or POST based on method
  const method = req.method.toUpperCase();
  if (method === "POST") return cachedHandler.POST(req);
  return cachedHandler.GET(req);
}

export const GET  = handler;
export const POST = handler;
