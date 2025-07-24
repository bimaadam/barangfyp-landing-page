"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  const popularSearches = [
    "iPhone",
    "Sepatu Nike",
    "Skincare",
    "Gaming",
    "Fashion",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Cari produk viral... 🔥"
          className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium"
        />

        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Popular Searches */}
      {!searchTerm && (
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-gray-500 font-medium px-2 py-1">
            Populer:
          </span>
          {popularSearches.map((term, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchTerm(term);
                onSearch?.(term);
              }}
              className="text-sm bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 font-medium"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Count */}
      {searchTerm && (
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600 font-medium">
            Mencari "{searchTerm}"...
          </span>
        </div>
      )}
    </div>
  );
}
