"use client";

import React from "react";
import ProtectedAdmin from "@/components/admin/ProtectAdmin";
import { Users } from "lucide-react";

export default function AdminCustomers() {
    return (
        <ProtectedAdmin>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage customers who have placed orders</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border border-gray-100 p-6">
                        <p className="text-sm text-gray-500 mb-1">Total Customers</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-400 mt-2">No customers yet</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 p-6">
                        <p className="text-sm text-gray-500 mb-1">Active Customers</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-400 mt-2">Currently shopping</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 p-6">
                        <p className="text-sm text-gray-500 mb-1">Average Spend</p>
                        <p className="text-2xl font-bold text-gray-900">Tk 0</p>
                        <p className="text-sm text-gray-400 mt-2">Per customer</p>
                    </div>
                </div>

                {/* Empty State */}
                <div className="bg-white rounded-lg border border-gray-100 p-12">
                    <div className="text-center">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            Customers will appear here once they register on your store 
                            or place their first order.
                        </p>
                    </div>
                </div>
            </div>
        </ProtectedAdmin>
    );
}
