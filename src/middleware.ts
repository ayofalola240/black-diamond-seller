import { NextRequest, NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "./lib/utils";

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const isLoggedIn = request.cookies.get("jwt"); // Retrieve the JWT cookie

  console.log("JWT Cookie:", isLoggedIn);

  // Detect route types
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Allow API routes without redirects
  if (isApiRoute) {
    return NextResponse.next(); // Skip middleware for API routes
  }

  // Redirect logged-in users away from authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next(); // Allow access to authentication routes if not logged in
  }

  // Redirect non-logged-in users trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    console.log("Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
