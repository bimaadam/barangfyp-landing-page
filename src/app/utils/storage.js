// src/utils/storage.js

/**
 * Storage utility functions for managing localStorage
 * Can be easily switched to use Supabase or Firebase in the future
 */

// Storage keys
export const STORAGE_KEYS = {
  PRODUCT_CLICKS: "product_clicks",
  TOTAL_CLICKS: "total_clicks",
  LIKED_PRODUCTS: "liked_products",
  USER_PREFERENCES: "user_preferences",
  RECENT_SEARCHES: "recent_searches",
  VISIT_COUNT: "visit_count",
  LAST_VISIT: "last_visit",
};

/**
 * Get item from localStorage with error handling
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Set item to localStorage with error handling
 */
export const setStorageItem = (key, value) => {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 */
export const removeStorageItem = (key) => {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Clear all storage (with confirmation)
 */
export const clearAllStorage = () => {
  if (typeof window === "undefined") return false;

  try {
    const confirm = window.confirm("Are you sure you want to clear all data?");
    if (confirm) {
      localStorage.clear();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

// === Product Click Management ===

/**
 * Get click count for a specific product
 */
export const getProductClickCount = (productId) => {
  const allClicks = getStorageItem(STORAGE_KEYS.PRODUCT_CLICKS, {});
  return allClicks[productId] || 0;
};

/**
 * Increment click count for a product
 */
export const incrementProductClick = (productId) => {
  const allClicks = getStorageItem(STORAGE_KEYS.PRODUCT_CLICKS, {});
  const currentCount = allClicks[productId] || 0;
  const newCount = currentCount + 1;

  allClicks[productId] = newCount;
  setStorageItem(STORAGE_KEYS.PRODUCT_CLICKS, allClicks);

  // Also update total clicks
  const totalClicks = getTotalClicks() + 1;
  setStorageItem(STORAGE_KEYS.TOTAL_CLICKS, totalClicks);

  // Track click event with timestamp
  trackClickEvent(productId);

  return newCount;
};

/**
 * Get total clicks across all products
 */
export const getTotalClicks = () => {
  return getStorageItem(STORAGE_KEYS.TOTAL_CLICKS, 0);
};

/**
 * Get all product click data
 */
export const getAllProductClicks = () => {
  return getStorageItem(STORAGE_KEYS.PRODUCT_CLICKS, {});
};

// === Liked Products Management ===

/**
 * Check if product is liked
 */
export const isProductLiked = (productId) => {
  const likedProducts = getStorageItem(STORAGE_KEYS.LIKED_PRODUCTS, []);
  return likedProducts.includes(productId);
};

/**
 * Toggle product like status
 */
export const toggleProductLike = (productId) => {
  const likedProducts = getStorageItem(STORAGE_KEYS.LIKED_PRODUCTS, []);
  const isLiked = likedProducts.includes(productId);

  if (isLiked) {
    const updatedLikes = likedProducts.filter((id) => id !== productId);
    setStorageItem(STORAGE_KEYS.LIKED_PRODUCTS, updatedLikes);
    return false;
  } else {
    likedProducts.push(productId);
    setStorageItem(STORAGE_KEYS.LIKED_PRODUCTS, likedProducts);
    return true;
  }
};

/**
 * Get all liked products
 */
export const getLikedProducts = () => {
  return getStorageItem(STORAGE_KEYS.LIKED_PRODUCTS, []);
};

// === Search History Management ===

/**
 * Add search term to recent searches
 */
export const addRecentSearch = (searchTerm) => {
  if (!searchTerm || searchTerm.trim().length < 2) return;

  const recentSearches = getStorageItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  const trimmedTerm = searchTerm.trim().toLowerCase();

  // Remove if already exists
  const filteredSearches = recentSearches.filter(
    (term) => term !== trimmedTerm
  );

  // Add to beginning and limit to 10 items
  const updatedSearches = [trimmedTerm, ...filteredSearches].slice(0, 10);

  setStorageItem(STORAGE_KEYS.RECENT_SEARCHES, updatedSearches);
};

/**
 * Get recent searches
 */
export const getRecentSearches = () => {
  return getStorageItem(STORAGE_KEYS.RECENT_SEARCHES, []);
};

/**
 * Clear recent searches
 */
export const clearRecentSearches = () => {
  return setStorageItem(STORAGE_KEYS.RECENT_SEARCHES, []);
};

// === User Preferences Management ===

/**
 * Get user preferences
 */
export const getUserPreferences = () => {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
    theme: "light",
    currency: "IDR",
    notifications: true,
    defaultSort: "trending",
    itemsPerPage: 12,
  });
};

/**
 * Update user preferences
 */
export const updateUserPreferences = (newPreferences) => {
  const currentPreferences = getUserPreferences();
  const updatedPreferences = { ...currentPreferences, ...newPreferences };
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
};

// === Analytics & Tracking ===

/**
 * Track click event with metadata
 */
export const trackClickEvent = (productId) => {
  const clickEvents = getStorageItem("click_events", []);
  const event = {
    productId,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    url: window.location.href,
  };

  clickEvents.push(event);

  // Keep only last 100 events to prevent storage bloat
  const recentEvents = clickEvents.slice(-100);
  setStorageItem("click_events", recentEvents);
};

/**
 * Get click events for analytics
 */
export const getClickEvents = () => {
  return getStorageItem("click_events", []);
};

/**
 * Track user visit
 */
export const trackVisit = () => {
  const visitCount = getStorageItem(STORAGE_KEYS.VISIT_COUNT, 0) + 1;
  const lastVisit = new Date().toISOString();

  setStorageItem(STORAGE_KEYS.VISIT_COUNT, visitCount);
  setStorageItem(STORAGE_KEYS.LAST_VISIT, lastVisit);

  return { visitCount, lastVisit };
};

/**
 * Get visit statistics
 */
export const getVisitStats = () => {
  return {
    visitCount: getStorageItem(STORAGE_KEYS.VISIT_COUNT, 0),
    lastVisit: getStorageItem(STORAGE_KEYS.LAST_VISIT, null),
  };
};

// === Export Data (for backup/migration) ===

/**
 * Export all user data
 */
export const exportUserData = () => {
  const data = {
    productClicks: getAllProductClicks(),
    totalClicks: getTotalClicks(),
    likedProducts: getLikedProducts(),
    recentSearches: getRecentSearches(),
    userPreferences: getUserPreferences(),
    visitStats: getVisitStats(),
    clickEvents: getClickEvents(),
    exportDate: new Date().toISOString(),
  };

  return data;
};

/**
 * Import user data (for restore)
 */
export const importUserData = (data) => {
  try {
    if (data.productClicks)
      setStorageItem(STORAGE_KEYS.PRODUCT_CLICKS, data.productClicks);
    if (data.totalClicks)
      setStorageItem(STORAGE_KEYS.TOTAL_CLICKS, data.totalClicks);
    if (data.likedProducts)
      setStorageItem(STORAGE_KEYS.LIKED_PRODUCTS, data.likedProducts);
    if (data.recentSearches)
      setStorageItem(STORAGE_KEYS.RECENT_SEARCHES, data.recentSearches);
    if (data.userPreferences)
      setStorageItem(STORAGE_KEYS.USER_PREFERENCES, data.userPreferences);
    if (data.visitStats) {
      setStorageItem(STORAGE_KEYS.VISIT_COUNT, data.visitStats.visitCount);
      setStorageItem(STORAGE_KEYS.LAST_VISIT, data.visitStats.lastVisit);
    }
    if (data.clickEvents) setStorageItem("click_events", data.clickEvents);

    return true;
  } catch (error) {
    console.error("Error importing user data:", error);
    return false;
  }
};

// === Future Migration Functions ===

/**
 * Migrate to Supabase (placeholder)
 */
export const migrateToSupabase = async (supabaseClient) => {
  // TODO: Implement Supabase migration
  console.log("Supabase migration not implemented yet");
  return false;
};

/**
 * Migrate to Firebase (placeholder)
 */
export const migrateToFirebase = async (firebaseApp) => {
  // TODO: Implement Firebase migration
  console.log("Firebase migration not implemented yet");
  return false;
};
