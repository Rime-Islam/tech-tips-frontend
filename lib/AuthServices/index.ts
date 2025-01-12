"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"

interface DecodedToken {
    email: string;
    role: string;
}

export const getCurrentUser = async () => {
    const token = cookies().get("refreshToken")?.value;

    let decordedToken = null;

    if(token) {
        try {
            decordedToken = jwtDecode<DecodedToken>(token);
            return {
                user: {
                    email: decordedToken.email,
                    role: decordedToken.role
                },
            };
        } catch (error) {
            console.error("Failed to Get token")
        }
    }

    return null;
};

export const logout = async () => {
    cookies().delete("refreshToken");
  };