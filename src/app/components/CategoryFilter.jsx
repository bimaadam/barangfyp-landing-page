"use client";

import { useState } from "react";
import {
  Smartphone,
  Shirt,
  Gamepad2,
  Heart,
  Home,
  Sparkles,
} from "lucide-react";

export default function CategoryFilter({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      name: "Semua",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "elektronik",
      name: "Elektronik",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: Gamepad2,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "kecantikan",
      name: "Beauty",
      icon: Heart,
      color: "from-red-500 to-pink-500",
    },
    {
      id: "rumah",
      name: "Home",
      icon: Home,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden sm:flex justify-center">
        <div className="flex space-x-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-gray-200/50">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105
                  ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="sm:hidden">
        <div className="flex space-x-3 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  flex-shrink-0 flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 min-w-[70px]
                  ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-white/60 text-gray-600 hover:bg-white/80"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium leading-tight text-center">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Indicator */}
      {activeCategory !== "all" && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
            <span className="text-sm text-purple-700 font-medium">
              Menampilkan:{" "}
              {categories.find((cat) => cat.id === activeCategory)?.name}
            </span>
            <button
              onClick={() => handleCategoryClick("all")}
              className="text-purple-500 hover:text-purple-700 transition-colors"
            >
              <span className="text-xs">✖</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this CSS to your globals.css for mobile scroll
// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }
