import { getCurrentUser } from "@/lib/AuthServices";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/auth/login", "/auth/register"];

type Role = 'admin' | 'user'; 

const roleBasedRoutes: Record<Role, RegExp[]> = {
    admin: [/^\/admin/],
    user: [] 
};

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userToken = await getCurrentUser();
    const user = userToken?.user;


    if (!user) {
    
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    if (user) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        
        if (user.role && roleBasedRoutes[user.role as Role]) {
            const routes = roleBasedRoutes[user.role as Role];

            if (routes.some((route) => pathname.match(route))) {
                return NextResponse.next(); 
            }
        }
    }

    return NextResponse.redirect(new URL("/", request.url)); 
}

export const config = {
    matcher: ["/admin/users", "/admin/statistics"]
};
