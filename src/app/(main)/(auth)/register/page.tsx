"use client";

import AuthCard from "@/components/Authcard";
import { Mail, UserPlus, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthCard title="Create Account" subtitle="Join KNEX — it only takes a minute">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <label className="block">
                    <div className="flex items-center gap-3 px-3 py-2 border rounded-2xl focus-within:ring-2 focus-within:ring-blue-300 transition">
                        <Mail size={18} className="text-gray-500" />
                        <input
                            aria-label="Email"
                            type="email"
                            placeholder="Email address"
                            required
                            className="w-full bg-transparent outline-none text-sm sm:text-base"
                        />
                    </div>
                </label>

                <label className="block">
                    <div className="flex items-center gap-3 px-3 py-2 border rounded-2xl focus-within:ring-2 focus-within:ring-blue-300 transition">
                        <Lock size={18} className="text-gray-500" />
                        <input
                            aria-label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="w-full bg-transparent outline-none text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </label>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm sm:text-base active:scale-[0.99] transition cursor-pointer"
                >
                    <UserPlus size={18} /> Create account
                </button>

                <div className="flex items-center gap-3 mt-1">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>

                <button
                    type="button"
                    className="w-full mt-1 py-3 rounded-2xl border bg-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                    <FcGoogle size={20} /> Continue with Google
                </button>

                <p className="text-center text-xs sm:text-sm text-gray-500 mt-3">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
}
