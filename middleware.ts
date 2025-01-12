import { getCurrentUser } from "@/lib/AuthServices";
import { NextRequest, NextResponse } from "next/server";

const roleBasedAccess: { [key: string]: string[] } = {
    "/profile": ["admin", "user"],
    "/admin": ["admin"],
};

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
  
    // Check if the request is for static assets
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
      return NextResponse.next();
    }

    const userToken = await getCurrentUser();
    const user = userToken?.user;
console.log(user )

    if (!user) {
        if (pathname.startsWith("/auth")) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(
              new URL(`/auth/login`, req.url)
            );
          }
    }

    if (user && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }

      const requiredRole = Object.keys(roleBasedAccess).find((route) =>
        pathname.startsWith(route)
      );
    
      if (requiredRole) {
        const allowedRoles = roleBasedAccess[requiredRole];
    
        if (!allowedRoles.includes(user?.role)) {
          return NextResponse.redirect(new URL("/", req.nextUrl));
        }
      }
    
      return NextResponse.next();
    }
    
    // Matcher for middleware to include the home route and protected routes
    export const config = {
      matcher: [
        "/",
        "/profile/:path*",
        "/auth/:path*",
        "/admin/:path*",
      ],
    };