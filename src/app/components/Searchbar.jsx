"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Menu, X, TrendingUp, Users, Search } from "lucide-react";
import CategoryFilter from "./CategoryFilter"; // Pastikan ini diimpor jika masih digunakan

export default function Header({
  onSearch,
  onCategoryChange,
  totalClicks = 0,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const popularSearches = [
    "iPhone",
    "Sepatu Nike",
    "Skincare",
    "Gaming",
    "Fashion",
  ];

  const handlePopularSearchClick = (term) => {
    setSearchTerm(term);
    inputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
          {" "}
          {/* Adjusted padding */}
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">🔥</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BarangFYP
              </h1>
              <p className="text-xs text-gray-500 font-medium">.store</p>
            </div>
          </div>
          {/* Desktop Search Bar & Category Filter */}
          <div className="hidden md:flex flex-grow mx-8 space-x-4 items-center">
            {/* Search Input for Desktop */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Cari produk viral... 🔥"
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium text-base sm:text-lg"
                aria-label="Cari produk"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {/* Category Filter for Desktop */}
            <div className="flex-shrink-0">
              <CategoryFilter onCategoryChange={onCategoryChange} />
            </div>
          </div>
          {/* Desktop Stats */}
          <div className="hidden md:flex items-center space-x-6 text-sm flex-shrink-0">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">2.1k online</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-medium">
                {totalClicks.toLocaleString()} klik hari ini
              </span>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar & Category Filter (Always visible on mobile below main header) */}
        <div className="md:hidden pb-3 space-y-3">
          {" "}
          {/* Changed py-3 to pb-3 */}
          {/* Search Input for Mobile */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Cari produk viral... 🔥"
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium text-base"
              aria-label="Cari produk"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Hapus pencarian"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {/* Popular Searches / Search Results Status for Mobile */}
          {!searchTerm ? (
            <div className="mt-2 flex flex-wrap gap-2 items-center justify-center">
              <span className="text-sm text-gray-500 font-medium flex-shrink-0">
                Populer:
              </span>
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearchClick(term)}
                  className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 font-medium whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2 text-center text-sm text-gray-600 font-medium">
              Mencari "{searchTerm}"...
            </div>
          )}
          <CategoryFilter onCategoryChange={onCategoryChange} />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg py-4">
          <div className="px-4 sm:px-6">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 text-sm">Users Online</span>
                  <span className="font-bold text-green-600">2.1k</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 text-sm">
                    Total Klik Hari Ini
                  </span>
                  <span className="font-bold text-blue-600">
                    {totalClicks.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
