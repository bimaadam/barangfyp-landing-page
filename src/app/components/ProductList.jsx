"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";

export default function ProductList({
  searchTerm = "",
  selectedCategory = "all",
  onSearch,
  onCategoryChange,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("trending"); // trending, price-low, price-high, popular

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => b.sold - a.sold);
        break;
      case "trending":
      default:
        // Trending items first, then by sold count
        filtered.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return b.sold - a.sold;
        });
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const sortOptions = [
    { value: "trending", label: "🔥 Trending", icon: TrendingUp },
    { value: "popular", label: "👑 Terpopuler", icon: Sparkles },
    { value: "price-low", label: "💰 Harga Terendah", icon: null },
    { value: "price-high", label: "💎 Harga Tertinggi", icon: null },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 sm:h-56 bg-gray-200"></div>
              <div className="p-4 sm:p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        {/* Results Count */}
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-bold text-gray-900">
            {filteredProducts.length > 0 ? (
              <>
                Ditemukan{" "}
                <span className="text-purple-600">
                  {filteredProducts.length}
                </span>{" "}
                produk viral
                {searchTerm && (
                  <span className="text-gray-600"> untuk "{searchTerm}"</span>
                )}
              </>
            ) : (
              "Produk Viral Terbaru"
            )}
          </h2>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 font-medium">Urutkan:</span>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                    sortBy === option.value
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">
                    {option.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Produk tidak ditemukan
          </h3>
          <p className="text-gray-600 mb-6">
            Coba ubah kata kunci pencarian atau kategori yang dipilih
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Saran pencarian:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["iPhone", "Samsung", "Nike", "Skincare", "Gaming"].map(
                (suggestion) => (
                  <span
                    key={suggestion}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {suggestion}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <>
          {/* Trending Banner */}
          {sortBy === "trending" && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl mb-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-lg font-bold">Produk Lagi Viral Nih! 🔥</h3>
              </div>
              <p className="text-purple-100">
                Yang lagi hits di TikTok, Shopee, sama Tokped. Buruan sebelum
                kehabisan!
              </p>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Load More CTA (for future pagination) */}
          {filteredProducts.length >= 12 && (
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Masih ada produk viral lainnya! 🚀
                </h3>
                <p className="text-gray-600 mb-4">
                  Update terus koleksi produk trending terbaru
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                  Lihat Lebih Banyak
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Add this CSS to your globals.css for fade-in animation
// @keyframes fade-in {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// .animate-fade-in {
//   animation: fade-in 0.6s ease-out;
// }
