"use client";

import { allProducts } from "@/data/productsData";

type AdminUser = { id: string; email: string; name: string };

const STORAGE_TOKEN = "knex_admin_token";

// Demo admin credential
const DEMO_ADMIN = { email: "admin@knex.test", password: "admin123", name: "Site Admin", id: "admin-1" };

// Mock orders/customers/roles/settings
let orders = [
  { id: "o1", total: 1299, status: "processing", customer: "Alice" },
  { id: "o2", total: 6449, status: "shipped", customer: "Bob" },
];

let customers = [
  { id: "c1", name: "Alice", email: "alice@example.com" },
  { id: "c2", name: "Bob", email: "bob@example.com" },
];

let roles = [
  { id: "r1", name: "Super Admin", permissions: ["all"] },
  { id: "r2", name: "Editor", permissions: ["products","orders"] },
];

let settings = { siteName: "KNEX Store", currency: "Tk" };

export const adminApi = {
  loginAdmin(email: string, password: string) {
    return new Promise<{ token: string; user: AdminUser }>((resolve, reject) => {
      setTimeout(() => {
        if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
          const token = btoa(`${DEMO_ADMIN.email}:${Date.now()}`);
          localStorage.setItem(STORAGE_TOKEN, token);
          resolve({ token, user: { id: DEMO_ADMIN.id, email: DEMO_ADMIN.email, name: DEMO_ADMIN.name } });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 400);
    });
  },
  logout() {
    localStorage.removeItem(STORAGE_TOKEN);
  },
  isAuthenticated() {
    return !!localStorage.getItem(STORAGE_TOKEN);
  },
  getCurrentUser(): AdminUser | null {
    if (!this.isAuthenticated()) return null;
    return { id: DEMO_ADMIN.id, email: DEMO_ADMIN.email, name: DEMO_ADMIN.name };
  },
  // Products (use existing allProducts as read data)
  async listProducts() {
    return new Promise((res) => setTimeout(() => res(allProducts), 200));
  },
  async getProduct(id: string) {
    return new Promise((res) => setTimeout(() => res(allProducts.find((p) => p.id === id)), 200));
  },
  async updateProduct(id: string, patch: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo we don't mutate source file; return merged object
        const p: any = allProducts.find((x) => x.id === id) || { id };
        resolve({ ...p, ...patch });
      }, 250);
    });
  },
  // Orders / customers / roles / settings
  async listOrders() {
    return new Promise((res) => setTimeout(() => res(orders), 200));
  },
  async listCustomers() {
    return new Promise((res) => setTimeout(() => res(customers), 200));
  },
  async listRoles() {
    return new Promise((res) => setTimeout(() => res(roles), 200));
  },
  async addRole(role: { name: string; permissions?: string[] }) {
    const newRole = { id: `r${Date.now()}`, name: role.name, permissions: role.permissions || [] };
    roles.push(newRole);
    return new Promise((res) => setTimeout(() => res(newRole), 200));
  },
  async getSettings() {
    return new Promise((res) => setTimeout(() => res(settings), 150));
  },
  async updateSettings(patch: any) {
    settings = { ...settings, ...patch };
    return new Promise((res) => setTimeout(() => res(settings), 150));
  },
};

export default adminApi;
