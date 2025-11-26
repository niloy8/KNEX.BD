"use client";

import { useState } from "react";
import { User, Package, Heart, MapPin, Shield, LogOut, Camera, Edit2, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+880 1234-567890",
        gender: "Male",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        joinDate: "January 2024"
    });
    const [tempProfile, setTempProfile] = useState(profile);

    const handleEdit = () => {
        setTempProfile(profile);
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfile(tempProfile);
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const handleCancel = () => {
        setTempProfile(profile);
        setIsEditing(false);
    };

    const handleAvatarChange = () => {
        const seeds = ["John", "Jane", "Alex", "Sam", "Chris", "Pat", "Jordan"];
        const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
        const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
        if (isEditing) {
            setTempProfile({ ...tempProfile, avatar: newAvatar });
        } else {
            setProfile({ ...profile, avatar: newAvatar });
        }
    };

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            window.location.href = "/login";
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "orders", label: "My Orders", icon: Package },
        { id: "wishlist", label: "Wishlist", icon: Heart },
        { id: "addresses", label: "Addresses", icon: MapPin },
        { id: "security", label: "Security", icon: Shield },
    ];

    const orders = [
        { id: "#ORD-2024-001", date: "Nov 20, 2024", status: "Delivered", total: 2499, items: 3 },
        { id: "#ORD-2024-002", date: "Nov 18, 2024", status: "Shipped", total: 1299, items: 1 },
        { id: "#ORD-2024-003", date: "Nov 15, 2024", status: "Processing", total: 3999, items: 2 },
    ];

    const addresses = [
        { id: 1, type: "Home", name: "John Doe", address: "123 Main St, Dhaka 1212", phone: "+880 1234-567890", isDefault: true },
        { id: 2, type: "Office", name: "John Doe", address: "456 Office Rd, Dhaka 1215", phone: "+880 1234-567890", isDefault: false },
    ];

    const StatusBadge = ({ status }: { status: string }) => {
        const colors = {
            Delivered: "bg-green-100 text-green-700",
            Shipped: "bg-blue-100 text-blue-700",
            Processing: "bg-yellow-100 text-yellow-700",
        };
        return <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>{status}</span>;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border border-gray-100 p-6 sticky top-4">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100">
                                    <Image src={isEditing ? tempProfile.avatar : profile.avatar} alt={profile.name} width={96} height={96} className="object-cover" unoptimized />
                                </div>
                                <button onClick={handleAvatarChange} className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mt-4">{profile.name}</h3>
                            <p className="text-sm text-gray-500">{profile.email}</p>
                            <p className="text-xs text-gray-400 mt-2">Member since {profile.joinDate}</p>
                        </div>

                        <nav className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                                ? "bg-blue-50 text-blue-600 font-medium"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg border border-gray-100 p-6">
                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={isEditing ? tempProfile.name : profile.name}
                                            onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={isEditing ? tempProfile.email : profile.email}
                                            onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={isEditing ? tempProfile.phone : profile.phone}
                                            onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                        <select
                                            value={isEditing ? tempProfile.gender : profile.gender}
                                            onChange={(e) => setTempProfile({ ...tempProfile, gender: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === "orders" && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                                                    <p className="text-sm text-gray-500">{order.date}</p>
                                                </div>
                                                <StatusBadge status={order.status} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-600">
                                                    {order.items} item{order.items > 1 ? "s" : ""}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-gray-900">Tk {order.total}</span>
                                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                        View Details →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === "wishlist" && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                                <div className="text-center py-12">
                                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Your wishlist is empty</p>
                                    <Link href="/products" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === "addresses" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        + Add New Address
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className="border border-gray-200 rounded-lg p-4 relative">
                                            {addr.isDefault && (
                                                <span className="absolute top-4 right-4 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                                    Default
                                                </span>
                                            )}
                                            <h3 className="font-semibold text-gray-900 mb-2">{addr.type}</h3>
                                            <p className="text-sm text-gray-600 mb-1">{addr.name}</p>
                                            <p className="text-sm text-gray-600 mb-1">{addr.address}</p>
                                            <p className="text-sm text-gray-600 mb-4">{addr.phone}</p>
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                    Edit
                                                </button>
                                                <span className="text-gray-300">|</span>
                                                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === "security" && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                                <div className="space-y-6">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Change Password</h3>
                                        <p className="text-sm text-gray-600 mb-4">Update your password regularly to keep your account secure</p>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Change Password
                                        </button>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                                        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                                            Enable 2FA
                                        </button>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
                                        <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all data</p>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
