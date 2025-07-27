"use client";

import { useState } from "react";
import {
  Star,
  ShoppingBag,
  ExternalLink,
  Heart,
  Zap,
  Clock,
} from "lucide-react";
import ClickCounter, { useClickCounter } from "./ClickCounter";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { clickCount, incrementClick } = useClickCounter(product.id);

  const handleProductClick = () => {
    incrementClick();

    // Simulate redirect to affiliate link
    window.open(`/go/${product.slug}`, "_blank");

    // Add some visual feedback
    const element = document.getElementById(`product-${product.id}`);
    if (element) {
      element.classList.add("animate-pulse");
      setTimeout(() => {
        element.classList.remove("animate-pulse");
      }, 1000);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);

    // Save to localStorage
    const likedProducts = JSON.parse(
      localStorage.getItem("liked_products") || "[]"
    );
    if (!isLiked) {
      likedProducts.push(product.id);
    } else {
      const index = likedProducts.indexOf(product.id);
      if (index > -1) likedProducts.splice(index, 1);
    }
    localStorage.setItem("liked_products", JSON.stringify(likedProducts));
  };

  const getPlatformStyle = (platform) => {
    switch (platform) {
      case "TikTok Shop":
        return {
          bg: "from-pink-500 to-red-500",
          text: "TikTok",
          emoji: "🎵",
        };
      case "Shopee":
        return {
          bg: "from-orange-500 to-red-500",
          text: "Shopee",
          emoji: "🛒",
        };
      case "Tokopedia":
        return {
          bg: "from-green-500 to-emerald-500",
          text: "Tokped",
          emoji: "🟢",
        };
      default:
        return {
          bg: "from-gray-500 to-gray-600",
          text: platform,
          emoji: "🛍️",
        };
    }
  };

  const platformStyle = getPlatformStyle(product.platform);
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      id={`product-${product.id}`}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
        {/* Platform Badge */}
        <div
          className={`bg-gradient-to-r ${platformStyle.bg} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg`}
        >
          <span>{platformStyle.emoji}</span>
          <span>{platformStyle.text}</span>
        </div>

        {/* Trending Badge */}
        {product.isTrending && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse shadow-lg">
            <Zap className="w-3 h-3" />
            <span>VIRAL</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isLiked
            ? "bg-red-500 text-white shadow-lg"
            : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
        }`}
      >
        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleProductClick}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold flex items-center space-x-2 transform scale-95 hover:scale-100 transition-transform duration-200 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Lihat Produk</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Flash Sale Timer */}
        {product.flashSale && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{product.flashSale}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-lg sm:text-xl font-bold text-green-600">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {/* Monthly Payment */}
          {product.installment && (
            <p className="text-xs text-blue-600 font-medium">
              Cicilan {product.installment.months}x Rp{" "}
              {product.installment.amount.toLocaleString("id-ID")}/bulan
            </p>
          )}
        </div>

        {/* Sales Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{product.sold.toLocaleString("id-ID")} terjual</span>
          <span className="text-green-600 font-medium">{product.location}</span>
        </div>

        {/* Click Counter */}
        <ClickCounter productId={product.id} className="mb-4" />

        {/* CTA Button */}
        <button
          onClick={handleProductClick}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Gaskeun Beli!</span>
          <span className="text-xs">💸</span>
        </button>

        {/* Additional Info */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>⚡ Pengiriman cepat</span>
          <span>🛡️ Garansi toko</span>
        </div>
      </div>
    </div>
  );
}
