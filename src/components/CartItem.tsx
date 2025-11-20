"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    onQuantityChange: (id: string, qty: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({
    id,
    title,
    price,
    image,
    quantity,
    onQuantityChange,
    onRemove,
}: CartItemProps) {
    return (
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-0">
            {/* Product Image */}
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
                {image}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase mb-1">Shirt</p>
                <h4 className="font-medium text-gray-900">{title}</h4>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onQuantityChange(id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                >
                    <Minus size={14} />
                </button>
                <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
                <button
                    onClick={() => onQuantityChange(id, quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                    <Plus size={14} />
                </button>
            </div>

            {/* Price */}
            <p className="font-semibold text-gray-900 w-24 text-right">৳ {(price * quantity).toLocaleString()}</p>

            {/* Remove Button */}
            <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <Trash2 size={16} />
            </button>
        </div>
    );
}
