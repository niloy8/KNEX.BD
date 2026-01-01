"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Type definitions
export interface Order {
    id: string;
    orderId: string;
    customer: string;
    product: string;
    productImage: string;
    quantity: number;
    total: number;
    status: "Pending" | "Processing" | "Delivered" | "Cancelled";
    date: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    totalSpent: number;
    status: "Active" | "Inactive";
}

export interface Activity {
    id: string;
    type: "order" | "customer" | "product";
    message: string;
    time: string;
    icon: string;
}

// Empty placeholders - will be replaced with real API calls
// These return empty arrays since we don't have orders/customers tables yet
export const adminData = {
    getOrders: async (): Promise<Order[]> => {
        // TODO: Implement when orders API is available
        return [];
    },
    
    getCustomers: async (): Promise<Customer[]> => {
        // TODO: Implement when customers API is available
        return [];
    },
    
    getActivities: async (): Promise<Activity[]> => {
        // TODO: Implement when activities API is available
        return [];
    },
    
    getProducts: async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            return data.products || [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    },

    getProduct: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`);
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    },
};

// Analytics data - will be calculated from real data when available
export const analyticsData = {
    totalRevenue: 0,
    revenueChange: "+0%",
    totalSales: 0,
    salesChange: "+0%",
    totalVisitors: 0,
    visitorsChange: "+0%",
    monthlyTarget: 0,
    targetAchieved: 0,
    conversionRate: {
        current: 0,
        previous: 0,
        goal: 0,
        failed: 0,
        low: 0,
    },
    trafficSources: [] as { source: string; percentage: number }[],
    topCategories: [] as { name: string; value: number }[],
};

// Revenue chart data - empty until real data is available
export const revenueChartData = [] as { day: string; revenue: number }[];

