// src/hooks/useClickCounter.js

import { useState, useEffect, useCallback } from "react";
import {
  getProductClickCount,
  incrementProductClick,
  getTotalClicks,
} from "../utils/storage";

/**
 * Custom hook for managing product click counters
 * @param {string|number} productId - Unique product identifier
 * @returns {object} - Click counter state and actions
 */
export function useClickCounter(productId) {
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(null);

  // Load initial click count
  useEffect(() => {
    if (productId) {
      const initialCount = getProductClickCount(productId);
      setClickCount(initialCount);
    }
  }, [productId]);

  // Increment click count with animation
  const incrementClick = useCallback(() => {
    if (!productId) return 0;

    const newCount = incrementProductClick(productId);
    setClickCount(newCount);
    setLastClickTime(new Date());

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    // Dispatch custom event for global listeners
    window.dispatchEvent(
      new CustomEvent("productClick", {
        detail: { productId, clickCount: newCount },
      })
    );

    return newCount;
  }, [productId]);

  // Format click count for display
  const formatClickCount = useCallback((count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  }, []);

  return {
    clickCount,
    formattedClickCount: formatClickCount(clickCount),
    incrementClick,
    isAnimating,
    lastClickTime,
  };
}

/**
 * Hook for managing total clicks across all products
 * @returns {object} - Total clicks state and utilities
 */
export function useTotalClicks() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [dailyClicks, setDailyClicks] = useState(0);

  // Load initial total clicks
  useEffect(() => {
    const total = getTotalClicks();
    setTotalClicks(total);

    // Simulate daily clicks (you can implement actual daily tracking)
    const daily = Math.floor(total * 0.1) + Math.floor(Math.random() * 100);
    setDailyClicks(daily);
  }, []);

  // Listen for product click events
  useEffect(() => {
    const handleProductClick = () => {
      const newTotal = getTotalClicks();
      setTotalClicks(newTotal);
      setDailyClicks((prev) => prev + 1);
    };

    window.addEventListener("productClick", handleProductClick);
    return () => window.removeEventListener("productClick", handleProductClick);
  }, []);

  // Format numbers for display
  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  }, []);

  return {
    totalClicks,
    dailyClicks,
    formattedTotalClicks: formatNumber(totalClicks),
    formattedDailyClicks: formatNumber(dailyClicks),
  };
}

/**
 * Hook for tracking click analytics
 * @returns {object} - Analytics data and utilities
 */
export function useClickAnalytics() {
  const [topProducts, setTopProducts] = useState([]);
  const [clickTrends, setClickTrends] = useState([]);

  useEffect(() => {
    // Get all product clicks and sort by count
    const allClicks = JSON.parse(
      localStorage.getItem("product_clicks") || "{}"
    );
    const sortedProducts = Object.entries(allClicks)
      .map(([productId, clicks]) => ({ productId, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    setTopProducts(sortedProducts);

    // Generate click trends (simplified - you can implement actual time-based tracking)
    const trends = sortedProducts.map((product) => ({
      productId: product.productId,
      clicks: product.clicks,
      trend: Math.random() > 0.5 ? "up" : "down",
      changePercent: Math.floor(Math.random() * 50) + 1,
    }));

    setClickTrends(trends);
  }, []);

  // Listen for product clicks to update analytics
  useEffect(() => {
    const handleProductClick = (event) => {
      const { productId } = event.detail;

      // Update top products
      setTopProducts((prev) => {
        const updated = [...prev];
        const existing = updated.find((p) => p.productId === productId);

        if (existing) {
          existing.clicks += 1;
        } else {
          updated.push({ productId, clicks: 1 });
        }

        return updated.sort((a, b) => b.clicks - a.clicks).slice(0, 10);
      });
    };

    window.addEventListener("productClick", handleProductClick);
    return () => window.removeEventListener("productClick", handleProductClick);
  }, []);

  return {
    topProducts,
    clickTrends,
    getProductRank: (productId) => {
      const index = topProducts.findIndex((p) => p.productId === productId);
      return index !== -1 ? index + 1 : null;
    },
  };
}

/**
 * Hook for managing click rate limiting (prevent spam clicks)
 * @param {number} cooldownMs - Cooldown period in milliseconds
 * @returns {object} - Rate limiting state and utilities
 */
export function useClickRateLimit(cooldownMs = 1000) {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  const canClick = useCallback(() => {
    const now = Date.now();
    return now - lastClickTime >= cooldownMs;
  }, [lastClickTime, cooldownMs]);

  const handleClick = useCallback(
    (callback) => {
      if (!canClick()) {
        return false;
      }

      const now = Date.now();
      setLastClickTime(now);
      setIsOnCooldown(true);

      // Execute callback
      if (callback) {
        callback();
      }

      // Remove cooldown after specified time
      setTimeout(() => {
        setIsOnCooldown(false);
      }, cooldownMs);

      return true;
    },
    [canClick, cooldownMs]
  );

  const remainingCooldown = useCallback(() => {
    if (!isOnCooldown) return 0;
    const elapsed = Date.now() - lastClickTime;
    return Math.max(0, cooldownMs - elapsed);
  }, [isOnCooldown, lastClickTime, cooldownMs]);

  return {
    isOnCooldown,
    canClick: canClick(),
    handleClick,
    remainingCooldown: remainingCooldown(),
  };
}

/**
 * Hook for managing click animations and visual feedback
 * @returns {object} - Animation state and controls
 */
export function useClickAnimation() {
  const [animations, setAnimations] = useState(new Map());

  const triggerAnimation = useCallback((elementId, animationType = "pulse") => {
    setAnimations((prev) => new Map(prev.set(elementId, animationType)));

    // Remove animation after duration
    setTimeout(() => {
      setAnimations((prev) => {
        const newMap = new Map(prev);
        newMap.delete(elementId);
        return newMap;
      });
    }, 1000);
  }, []);

  const getAnimationClass = useCallback(
    (elementId) => {
      const animationType = animations.get(elementId);
      if (!animationType) return "";

      switch (animationType) {
        case "pulse":
          return "animate-pulse";
        case "bounce":
          return "animate-bounce";
        case "wiggle":
          return "animate-wiggle";
        case "scale":
          return "transform scale-110 transition-transform duration-300";
        default:
          return "animate-pulse";
      }
    },
    [animations]
  );

  return {
    triggerAnimation,
    getAnimationClass,
    hasAnimation: (elementId) => animations.has(elementId),
  };
}
