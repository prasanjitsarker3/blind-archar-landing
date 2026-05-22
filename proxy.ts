// Next.js 16: "middleware" is deprecated — this file is now "proxy.ts"
// and the exported function must be named "proxy".

import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

// ── Route classification ──────────────────────────────────────
const PROTECTED_PATTERNS = [
  /^\/[a-z]{2}\/dashboard/,
  /^\/[a-z]{2}\/admin/,
  /^\/[a-z]{2}\/author/,
];

const AUTH_ROUTES = [/^\/[a-z]{2}\/(login|register|auth)/];

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

function isProtected(pathname: string) {
  return PROTECTED_PATTERNS.some((re) => re.test(pathname));
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((re) => re.test(pathname));
}

// ── next-intl handles all locale detection and redirects ──────
const handleI18n = createMiddleware(routing);

// ── Main proxy function ───────────────────────────────────────
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // 1. Run locale middleware first (adds/normalises locale prefix)
  const i18nResponse = handleI18n(request);

  // If next-intl already issued a redirect, respect it immediately
  if (i18nResponse.status !== 200) return i18nResponse as NextResponse;

  // 2. Derive locale from the pathname (App Router — nextUrl.locale doesn't exist)
  const locale = pathname.split("/")[1] || routing.defaultLocale;

  // 3. Auth-gate protected routes
  if (isProtected(pathname)) {
    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    // Only redirect when BOTH tokens are absent.
    // If access token is expired but refresh token is still valid, let the
    // request through — RTK Query's reauth logic will silently refresh it.
    if (!accessToken && !refreshToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${locale}/login`;
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Redirect authenticated users away from auth pages
  if (isAuthRoute(pathname)) {
    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    if (accessToken || refreshToken) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = `/${locale}/dashboard`;
      dashboardUrl.search = "";
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return i18nResponse as NextResponse;
}

// ── Matcher: skip Next.js internals and static assets ─────────
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
