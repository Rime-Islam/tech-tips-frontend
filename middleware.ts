import { getCurrentUser } from "@/lib/AuthServices";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userToken = await getCurrentUser();
  const user = userToken?.user;

  if (!user) {
    // User is not authenticated
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      console.log(`Redirecting to login from ${pathname} due to no user.`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if the user has the right role for the requested route
  if (user.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];
    const hasAccess = routes.some((route) => pathname.match(route));
    console.log("hasAccess", hasAccess);
    if (!hasAccess) {
      console.log(
        `Redirecting from ${pathname} to home due to insufficient role.`
      );
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: ["/user/:page*", "/admin/:page*", "/login", "/register"],
};