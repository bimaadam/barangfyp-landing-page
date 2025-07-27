// src/app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Barangnya Gak Ketemu</h1>
            <p className="text-lg text-gray-500 mb-6">Coba cari yang lain, kali aja masih bisa FYP </p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Balik ke Home
            </Link>
        </div>
    )
}
