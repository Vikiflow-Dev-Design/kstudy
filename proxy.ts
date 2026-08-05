import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes requiring authentication
const PROTECTED = ["/setup", "/dashboard"];

// Routes logged-in users should skip (redirect to /setup)
const AUTH_ONLY = ["/sign-in", "/sign-up"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through API and static asset requests
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED.some((r) => pathname.startsWith(r));
  const isAuthOnly  = AUTH_ONLY.some((r) => pathname.startsWith(r));

  if (!isProtected && !isAuthOnly) return NextResponse.next();

  // Check the Better Auth session cookie via internal API call
  let isLoggedIn = false;
  try {
    const baseUrl  = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
    });
    if (response.ok) {
      const data = await response.json();
      isLoggedIn = !!data?.user;
    }
  } catch {
    // Treat any error as unauthenticated
  }

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthOnly && isLoggedIn) {
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
