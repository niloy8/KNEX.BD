"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface Props {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function AuthCard({ title, subtitle, children }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
            <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
                        <Image
                            src="https://knex.com.bd/wp-content/uploads/2025/07/3d-png.png"
                            alt="KNEX"
                            fill
                            sizes="80px"
                            className="object-contain"
                        />
                    </div>

                    <h1 className="mt-4 text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center max-w-[18rem]">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
}
