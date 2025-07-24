"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X, TrendingUp, Users } from "lucide-react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function Header({
  onSearch,
  onCategoryChange,
  totalClicks = 0,
  onlineUsers = 2100, // optional: biar bisa dinamis juga
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const formatNumber = (num) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
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

          {/* Desktop Stats */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">
                {formatNumber(onlineUsers)} online
              </span>
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
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search & Filter Bar */}
        {!isMenuOpen && (
          <div className="py-4 space-y-3">
            <SearchBar onSearch={onSearch} />
            <CategoryFilter onCategoryChange={onCategoryChange} />
          </div>
        )}

        {/* Mobile Stats */}
        {!isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                <Users className="w-3 h-3 text-green-600" />
                <span className="text-green-700 font-medium">
                  {formatNumber(onlineUsers)}
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 text-blue-600" />
                <span className="text-blue-700 font-medium">
                  {totalClicks.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="p-4 space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Users Online</span>
                  <span className="font-bold text-green-600">
                    {formatNumber(onlineUsers)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Total Klik</span>
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
