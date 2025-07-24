"use client";

import { useState, useEffect } from "react";
import { Eye, TrendingUp, Users } from "lucide-react";

export default function ClickCounter({ productId, className = "" }) {
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load click count from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`clicks_${productId}`);
    if (stored) {
      setClickCount(parseInt(stored));
    }
  }, [productId]);

  // Increment click count
  const incrementClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    localStorage.setItem(`clicks_${productId}`, newCount.toString());

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    // Update total clicks
    const totalClicks = localStorage.getItem("total_clicks") || "0";
    const newTotal = parseInt(totalClicks) + 1;
    localStorage.setItem("total_clicks", newTotal.toString());
  };

  // Format number for display
  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Get random base views to make it look more realistic
  const getBaseViews = () => {
    return Math.floor(Math.random() * 500) + 100;
  };

  const totalViews = clickCount + getBaseViews();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Click Counter Display */}
      <div className="flex items-center space-x-4">
        {/* Views Counter */}
        <div className="flex items-center space-x-1 text-gray-600">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">{formatCount(totalViews)}</span>
        </div>

        {/* Clicks Counter */}
        <div
          className={`
          flex items-center space-x-1 transition-all duration-300
          ${isAnimating ? "scale-110 text-purple-600" : "text-blue-600"}
        `}
        >
          <TrendingUp
            className={`w-4 h-4 ${isAnimating ? "animate-bounce" : ""}`}
          />
          <span className="text-sm font-bold">
            {formatCount(clickCount)} klik
          </span>
        </div>
      </div>

      {/* Hidden increment function - called by parent component */}
      <button
        onClick={incrementClick}
        className="hidden"
        data-testid="increment-click"
      >
        Increment
      </button>
    </div>
  );
}

// Export the increment function for use by parent components
export function useClickCounter(productId) {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(`clicks_${productId}`);
    if (stored) {
      setClickCount(parseInt(stored));
    }
  }, [productId]);

  const incrementClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    localStorage.setItem(`clicks_${productId}`, newCount.toString());

    // Update total clicks
    const totalClicks = localStorage.getItem("total_clicks") || "0";
    const newTotal = parseInt(totalClicks) + 1;
    localStorage.setItem("total_clicks", newTotal.toString());

    return newCount;
  };

  return { clickCount, incrementClick };
}
