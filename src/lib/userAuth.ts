"use client";

// User authentication utilities for regular customers
const USER_KEY = "knex_user";
const TOKEN_KEY = "knex_token";

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
}

export const userAuth = {
    // Login
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password.length >= 6) {
                    const user: User = {
                        id: "1",
                        name: email.split("@")[0],
                        email: email,
                        phone: "+880 1711-000000",
                    };
                    const token = "demo_user_token_" + Date.now();
                    if (typeof window !== "undefined") {
                        localStorage.setItem(TOKEN_KEY, token);
                        localStorage.setItem(USER_KEY, JSON.stringify(user));
                    }
                    resolve({ user, token });
                } else {
                    reject(new Error("Invalid email or password"));
                }
            }, 500);
        });
    },

    // Register
    async register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && password.length >= 6) {
                    const user: User = {
                        id: Date.now().toString(),
                        name: name,
                        email: email,
                    };
                    const token = "demo_user_token_" + Date.now();
                    if (typeof window !== "undefined") {
                        localStorage.setItem(TOKEN_KEY, token);
                        localStorage.setItem(USER_KEY, JSON.stringify(user));
                    }
                    resolve({ user, token });
                } else {
                    reject(new Error("All fields are required"));
                }
            }, 500);
        });
    },

    // Logout
    logout(): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    },

    // Check if authenticated
    isAuthenticated(): boolean {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem(TOKEN_KEY);
    },

    // Get current user
    getCurrentUser(): User | null {
        if (typeof window === "undefined") return null;
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },
};
