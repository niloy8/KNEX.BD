"use client";

import { useState, useMemo } from "react";
import { Grid3x3, List, ChevronRight, X } from "lucide-react";
import ProductListCard from "@/components/ProductListCard";
import ProductGridCard from "@/components/ProductGridCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const allProducts = [
    {
        id: "1",
        title: "DELL SE-Series 55.88 cm (22 inch) Full HD LED Backlit VA Panel with Contrast 3000:1, Tilt Adjustment",
        price: 6449,
        originalPrice: 10618,
        discount: 39,
        rating: 4.3,
        totalRatings: 830,
        totalReviews: 81,
        image: "🖥️",
        features: ["Panel Type: VA Panel", "Screen Resolution Type: Full HD", "Response Time: 5 ms | Refresh Rate: 100 Hz", "HDMI Ports - 1", "3 Year Domestic Warranty"],
        assured: true,
        badge: "3 Year Warranty",
        href: "/product/dell-monitor-22",
        category: "gaming-monitor",
        brand: "DELL",
    },
    {
        id: "2",
        title: "DELL S Series 68.58 cm (27 inch) Full HD IPS Panel Monitor with AMD FreeSync, 75Hz Refresh Rate",
        price: 11499,
        originalPrice: 18999,
        discount: 39,
        rating: 4.5,
        totalRatings: 1240,
        totalReviews: 156,
        image: "🖥️",
        features: ["Panel Type: IPS Panel", "Screen Resolution: 1920 x 1080 Full HD", "Response Time: 4 ms | Refresh Rate: 75 Hz", "AMD FreeSync Technology", "3 Year Warranty"],
        assured: true,
        href: "/product/dell-monitor-27",
        category: "gaming-monitor",
        brand: "DELL",
    },
    {
        id: "3",
        title: "Premium Sports Shoes - Lightweight Running Sneakers",
        price: 2499,
        originalPrice: 8333,
        discount: 70,
        rating: 4.4,
        totalRatings: 5268,
        totalReviews: 652,
        image: "👟",
        features: ["Breathable Mesh Upper", "Cushioned Sole for Comfort", "Anti-Slip Rubber Outsole", "Perfect for Running & Training", "Available in Multiple Colors"],
        assured: true,
        href: "/product/sports-shoes",
        category: "sports-shoes",
        brand: "Nike",
    },
    {
        id: "4",
        title: "Comfortable Flip Flops - Daily Wear Slippers",
        price: 299,
        originalPrice: 999,
        discount: 70,
        rating: 4.1,
        totalRatings: 3608,
        totalReviews: 284,
        image: "🩴",
        features: ["Soft Rubber Material", "Non-Slip Sole", "Lightweight & Durable", "Perfect for Indoor & Outdoor", "Easy to Clean"],
        assured: true,
        href: "/product/slippers",
        category: "slippers",
        brand: "Adidas",
    },
    {
        id: "5",
        title: "Smart Watch Pro - Fitness Tracker with Heart Rate Monitor",
        price: 999,
        originalPrice: 4999,
        discount: 80,
        rating: 4.2,
        totalRatings: 8920,
        totalReviews: 1120,
        image: "⌚",
        features: ["1.4 inch AMOLED Display", "Heart Rate & SpO2 Monitoring", "100+ Sports Modes", "7 Days Battery Life", "IP68 Water Resistant"],
        assured: true,
        href: "/product/smart-watch",
        category: "smart-watch",
        brand: "Samsung",
    },
    {
        id: "6",
        title: "Travel Backpack - 30L Waterproof Laptop Bag",
        price: 799,
        originalPrice: 1999,
        discount: 60,
        rating: 4.3,
        totalRatings: 4520,
        totalReviews: 445,
        image: "🎒",
        features: ["30L Capacity", "Waterproof Material", "Laptop Compartment up to 15.6 inch", "USB Charging Port", "Ergonomic Design"],
        assured: true,
        href: "/product/backpack",
        category: "backpacks",
        brand: "HP",
    },
    {
        id: "7",
        title: "HD Projector - 1080P Home Theater Projector",
        price: 6990,
        originalPrice: 14999,
        discount: 53,
        rating: 4.4,
        totalRatings: 2150,
        totalReviews: 320,
        image: "📽️",
        features: ["Full HD 1080P Resolution", "5000 Lumens Brightness", "200 inch Display", "Built-in Speakers", "HDMI, USB, VGA Connectivity"],
        assured: true,
        href: "/product/projector",
        category: "projectors",
        brand: "BenQ",
    },
    {
        id: "8",
        title: "Bluetooth Speaker - Portable Wireless Speaker with Bass",
        price: 499,
        originalPrice: 1999,
        discount: 75,
        rating: 4.0,
        totalRatings: 6789,
        totalReviews: 892,
        image: "🔊",
        features: ["10W Output Power", "12 Hours Playtime", "Bluetooth 5.0", "IPX7 Waterproof", "Built-in Microphone"],
        assured: true,
        href: "/product/speaker",
        category: "speakers",
        brand: "JBL",
    },
];

const categories = [
    { name: "All Products", href: "/products" },
    { name: "Electronics", href: "/products?category=electronics" },
    { name: "Fashion", href: "/products?category=fashion", active: false },
];

const filters = {
    brands: ["DELL", "HP", "LG", "Samsung", "Acer", "ASUS", "BenQ", "Nike", "Adidas", "JBL"],
    priceRanges: [
        { label: "Under Tk 1,000", min: 0, max: 1000 },
        { label: "Tk 1,000 - Tk 5,000", min: 1000, max: 5000 },
        { label: "Tk 5,000 - Tk 10,000", min: 5000, max: 10000 },
        { label: "Above Tk 10,000", min: 10000, max: 999999 },
    ],
};

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [sortBy, setSortBy] = useState("popularity");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 8;

    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Filter by category from URL
        if (categoryParam) {
            filtered = filtered.filter(p => p.category === categoryParam);
        }

        // Filter by selected brands
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        }

        // Filter by price range
        if (selectedPriceRange.length > 0) {
            filtered = filtered.filter(p => {
                const range = filters.priceRanges[selectedPriceRange[0]];
                return p.price >= range.min && p.price <= range.max;
            });
        }

        // Sort products
        switch (sortBy) {
            case "price -- low to high":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price -- high to low":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "newest first":
                filtered.reverse();
                break;
            default:
                // popularity - keep original order
                break;
        }

        return filtered;
    }, [categoryParam, selectedBrands, selectedPriceRange, sortBy]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const togglePriceRange = (index: number) => {
        setSelectedPriceRange((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [index]
        );
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setSelectedPriceRange([]);
    };

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const getCategoryTitle = () => {
        if (!categoryParam) return "All Products";
        return categoryParam.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Filters Sidebar */}
                    <aside className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-lg p-4 lg:sticky lg:top-20 mb-4 lg:mb-0">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Filters</h2>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                                >
                                    CLEAR ALL
                                </button>
                            </div>

                            {/* Selected Filters */}
                            {(selectedBrands.length > 0 || selectedPriceRange.length > 0) && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {selectedBrands.map((brand) => (
                                        <button
                                            key={brand}
                                            onClick={() => toggleBrand(brand)}
                                            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                                        >
                                            <X size={14} />
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Categories */}
                            <div className="border-b pb-4 mb-4">
                                <h3 className="font-bold mb-3 text-sm">CATEGORIES</h3>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={cat.href}
                                        className="text-sm block py-1 text-gray-600 hover:text-blue-600 cursor-pointer"
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Price Range */}
                            <div className="border-b pb-4 mb-4">
                                <h3 className="font-bold mb-3 text-sm">PRICE</h3>
                                <div className="space-y-2">
                                    {filters.priceRanges.map((range, index) => (
                                        <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 cursor-pointer"
                                                checked={selectedPriceRange.includes(index)}
                                                onChange={() => togglePriceRange(index)}
                                            />
                                            <span className="text-sm text-gray-700">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div className="pb-4">
                                <h3 className="font-bold mb-3 text-sm">BRAND</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {filters.brands.map((brand) => (
                                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span className="text-sm text-gray-700">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4 overflow-x-auto">
                            <Link href="/" className="hover:text-blue-600 cursor-pointer whitespace-nowrap">Home</Link>
                            <ChevronRight size={16} className="flex-shrink-0" />
                            <span className="text-gray-900 font-medium whitespace-nowrap">{getCategoryTitle()}</span>
                        </nav>

                        {/* Header */}
                        <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{getCategoryTitle()}</h1>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {filteredProducts.length} products found
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        Filters
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded cursor-pointer ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <List size={18} className="sm:w-5 sm:h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded cursor-pointer ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <Grid3x3 size={18} className="sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="flex items-center gap-2 sm:gap-4 text-sm flex-wrap">
                                <span className="font-semibold whitespace-nowrap">Sort By</span>
                                {["Popularity", "Price -- Low to High", "Price -- High to Low", "Newest First"].map(
                                    (option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSortBy(option.toLowerCase())}
                                            className={`px-2 sm:px-3 py-1 rounded cursor-pointer whitespace-nowrap text-xs sm:text-sm ${sortBy === option.toLowerCase()
                                                ? "text-blue-600 font-semibold underline"
                                                : "text-gray-700 hover:text-blue-600"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Products */}
                        {paginatedProducts.length > 0 ? (
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                                        : "space-y-4"
                                }
                            >
                                {paginatedProducts.map((product) =>
                                    viewMode === "list" ? (
                                        <ProductListCard key={product.id} {...product} />
                                    ) : (
                                        <ProductGridCard key={product.id} {...product} />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
                                <div className="text-4xl sm:text-6xl mb-4">😔</div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-6">Try adjusting your filters</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition cursor-pointer text-sm sm:text-base"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 flex-wrap">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm"
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <div className="flex gap-1 sm:gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3 sm:px-4 py-2 rounded font-semibold cursor-pointer text-xs sm:text-sm ${currentPage === i + 1
                                                ? "bg-blue-600 text-white"
                                                : "border border-gray-300 hover:bg-gray-100"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm"
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
