import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import SectionHeader from "@/components/SectionHeader";
import DealsSection from "@/components/DealsSection";
import FashionPromo from "@/components/FashionPromo";

export default function HomePage() {
    const banners = [
        { title: "Office Chairs", subtitle: "Green Soul, Cell Bell & more", price: "From Tk 2,999", bgColor: "bg-gradient-to-r from-blue-600 to-indigo-600", image: "🪑" },
        { title: "Gaming Laptops", subtitle: "ASUS, MSI & more", price: "From Tk 49,999", bgColor: "bg-gradient-to-r from-purple-600 to-pink-600", image: "💻" },
        { title: "Smart Watches", subtitle: "Apple, Samsung & more", price: "From Tk 1,999", bgColor: "bg-gradient-to-r from-green-600 to-teal-600", image: "⌚" },
    ];

    const categories = [
        { name: "Fashion", icon: "https://knex.com.bd/wp-content/uploads/2025/11/Faison-removebg-preview.png", href: "/category/mobiles" },
        { name: "Beauty", icon: "https://knex.com.bd/wp-content/uploads/2025/11/Beauty-2-1-removebg-preview-1.png", href: "/category/fashion" },
        { name: "Mobiles", icon: "https://knex.com.bd/wp-content/uploads/2025/11/mobiles-2-removebg-preview.png", href: "/category/electronics" },
        { name: "Smart Gadget", icon: "https://knex.com.bd/wp-content/uploads/2025/11/smart-gadget-removebg-preview.png", href: "/category/home" },
        { name: "Electronics", icon: "https://knex.com.bd/wp-content/uploads/2025/11/Home-2-removebg-preview.png", href: "/category/appliances" },
        { name: "Home & Furniture", icon: "https://knex.com.bd/wp-content/uploads/2025/11/Electronicss-removebg-preview.png", href: "/category/beauty" },
        { name: "Stone", icon: "https://knex.com.bd/wp-content/uploads/2025/11/ChatGPT-Image-Nov-2-2025-02_17_01-PM-removebg-preview.png", href: "/flights", badge: "NEW" },
    ];

    const fashionDeals = [
        { title: "Sports Shoes", price: "Min. 70% Off", image: "👟", href: "/products?category=sports-shoes" },
        { title: "Slippers", price: "Min. 70% Off", image: "🩴", href: "/products?category=slippers" },
        { title: "Smart Watch", price: "From Tk 999", image: "⌚", href: "/products?category=smart-watch" },
        { title: "Backpacks", price: "Min. 60% Off", image: "🎒", href: "/products?category=backpacks" },
    ];

    const topDeals = [
        { title: "Projectors", price: "From Tk 6990", image: "📽️", href: "/products?category=projectors" },
        { title: "Speakers", price: "From Tk 499", image: "🔊", href: "/products?category=speakers" },
        { title: "Gaming Monitor", price: "From Tk 6599", image: "🖥️", href: "/products?category=gaming-monitor" },
        { title: "Gaming Chair", price: "From Tk 8279", image: "🪑", href: "/products?category=gaming-chair" },
    ];

    const saleDeals = [
        { title: "Winter Accessories", price: "Min. 50% Off", image: "🧤", href: "/products?category=winter" },
        { title: "Dry Fruits", price: "Min. 50% Off", image: "🥜", href: "/products?category=dry-fruits" },
        { title: "Baby Care", price: "Up to 40% Off", image: "🍼", href: "/products?category=baby-care" },
        { title: "Bike Lights", price: "From Tk 299", image: "💡", href: "/products?category=bike-lights" },
    ];

    const winterEssentials = [
        { label: "Top Sellers", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80" },
        { label: "Most-loved", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80" },
        { label: "Min. 50% Off", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&q=80" },
        { label: "Top Picks", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80" },
    ];

    const topPicksSale = [
        { label: "Min. 50% Off", image: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=400&q=80" },
        { label: "Min. 30% Off", image: "https://images.unsplash.com/photo-1556228578-8fb722d5277a?w=400&q=80" },
        { label: "Min. 50% Off", image: "https://images.unsplash.com/photo-1586201375761-83865001e31b?w=400&q=80" },
        { label: "Min. 50% Off", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Categories */}
            <section className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-3">
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.name} {...category} />
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Hero Banner */}
                <Banner banners={banners} autoSlide={true} interval={5000} />

                {/* Three-column row: two deals sections + promo */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DealsSection title="Winter Essentials for You" items={winterEssentials} viewAllHref="/products?category=winter" />
                    <DealsSection title="Top picks of the sale" items={topPicksSale} viewAllHref="/sale" />
                    <FashionPromo
                        title="Shop your fashion Needs"
                        subtitle="with Latest & Trendy Choices"
                        buttonText="Shop Now"
                        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                    />
                </div>

                {/* Fashion Top Deals */}
                <section>
                    <SectionHeader title="Fashion's Top Deals" href="/deals/fashion" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {fashionDeals.map((deal) => (
                            <ProductCard key={deal.title} {...deal} />
                        ))}
                    </div>
                </section>

                {/* Top Deals */}
                <section>
                    <SectionHeader title="Top Deals" href="/deals" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {topDeals.map((deal) => (
                            <ProductCard key={deal.title} {...deal} />
                        ))}
                    </div>
                </section>

                {/* Top picks of the sale */}
                <section>
                    <SectionHeader title="Top picks of the sale" href="/sale" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {saleDeals.map((deal) => (
                            <ProductCard key={deal.title} {...deal} />
                        ))}
                    </div>
                </section>

                {/* Flight Bookings Banner */}
                <Banner banners={[{ title: "Flight bookings", subtitle: "Lowest fares guaranteed", price: "From Tk 1,499*", bgColor: "bg-gradient-to-r from-orange-500 to-yellow-500", image: "✈️" }]} autoSlide={false} />


            </div>
        </div>
    );
}