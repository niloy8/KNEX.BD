import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export interface DealCardItem {
    image: string;
    label: string;
    href?: string;
    meta?: string;
}

interface DealsSectionProps {
    title: string;
    items: DealCardItem[];
    viewAllHref?: string;
}

export default function DealsSection({ title, items, viewAllHref = "/products" }: DealsSectionProps) {
    return (
        <section className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
                <Link href={viewAllHref} aria-label="See all" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {items.slice(0, 4).map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href || viewAllHref}
                        className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                    >
                        <div className="aspect-[4/3] bg-gray-50 relative">
                            <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                        </div>
                        <div className="p-2">
                            <p className="text-[11px] sm:text-xs text-gray-500 truncate">{item.meta ?? "Quality • Fast shipping • Best price"}</p>
                            <p className="mt-1 text-xs sm:text-sm font-semibold text-green-600 group-hover:text-green-700">{item.label}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
