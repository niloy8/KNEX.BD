import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface FashionPromoProps {
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
}

export default function FashionPromo({ title, subtitle, buttonText, image }: FashionPromoProps) {
    return (
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="flex items-center p-6 md:p-8 lg:p-10">
                <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        {title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        {subtitle}
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        {buttonText}
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="flex-1 hidden md:block">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto max-w-md ml-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
