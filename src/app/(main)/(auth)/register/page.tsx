"use client";

import AuthCard from "@/components/Authcard";
import { Mail, UserPlus, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpWithEmail, signInWithGoogle, isAdmin } from "@/lib/authHelper";
import { auth } from "@/lib/firebaseClient";
import { updateProfile } from "firebase/auth";

export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signUpWithEmail(email, password);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: name });
            }
            router.push("/account");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setError("");
        setLoading(true);
        try {
            const user = await signInWithGoogle();
            if (isAdmin(user)) {
                setError("Please use admin login page");
                const { logout } = await import("@/lib/authHelper");
                await logout();
            } else {
                router.push("/account");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Google sign-up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard title="Create Account" subtitle="Join KNEX — it only takes a minute">
            <form className="space-y-4" onSubmit={handleRegister}>
                {error && (
                    <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}
                <label className="block">
                    <div className="flex items-center gap-3 px-3 py-2 border rounded-2xl focus-within:ring-2 focus-within:ring-blue-300 transition">
                        <UserPlus size={18} className="text-gray-500" />
                        <input
                            aria-label="Full-Name"
                            type="text"
                            placeholder="Full name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            className="w-full bg-transparent outline-none text-sm sm:text-base"
                        />
                    </div>
                </label>
                <label className="block">
                    <div className="flex items-center gap-3 px-3 py-2 border rounded-2xl focus-within:ring-2 focus-within:ring-blue-300 transition">
                        <Mail size={18} className="text-gray-500" />
                        <input
                            aria-label="Email"
                            type="email"
                            placeholder="Email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
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
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm sm:text-base active:scale-[0.99] transition disabled:opacity-50"
                >
                    <UserPlus size={18} /> {loading ? "Creating account..." : "Create account"}
                </button>

                <div className="flex items-center gap-3 mt-1">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    disabled={loading}
                    className="w-full mt-1 py-3 rounded-2xl border bg-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 transition disabled:opacity-50"
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
