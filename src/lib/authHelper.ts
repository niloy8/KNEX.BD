"use client";

import { auth } from "./firebaseClient";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from "firebase/auth";

// Admin email - only this email has admin access
const ADMIN_EMAIL = "admin@knex.bd";

export interface AuthUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
}

// Convert Firebase user to our user format
const toAuthUser = (firebaseUser: FirebaseUser): AuthUser => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
    photoURL: firebaseUser.photoURL || undefined,
});

// Google Sign-In
export const signInWithGoogle = async (): Promise<AuthUser> => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return toAuthUser(result.user);
};

// Email/Password Sign-In
export const signInWithEmail = async (email: string, password: string): Promise<AuthUser> => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return toAuthUser(credential.user);
};

// Email/Password Sign-Up
export const signUpWithEmail = async (email: string, password: string): Promise<AuthUser> => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return toAuthUser(credential.user);
};

// Sign Out
export const logout = async (): Promise<void> => {
    await signOut(auth);
};

// Get current user (synchronous)
export const getCurrentUser = (): AuthUser | null => {
    const user = auth.currentUser;
    return user ? toAuthUser(user) : null;
};

// Wait for auth to initialize and get current user
export const waitForAuthUser = (): Promise<AuthUser | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            unsubscribe();
            resolve(firebaseUser ? toAuthUser(firebaseUser) : null);
        });
    });
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
        callback(firebaseUser ? toAuthUser(firebaseUser) : null);
    });
};

// Check if current user is admin
export const isAdmin = (user: AuthUser | null): boolean => {
    return user?.email === ADMIN_EMAIL;
};

// Get ID token
export const getIdToken = async (forceRefresh = false): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken(forceRefresh);
};
