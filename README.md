# 🔥 BarangFYP.store - Viral Product Landing Page

> **Landing page untuk produk viral dari TikTok Shop, Shopee, dan Tokopedia dengan Gen Z vibes yang tinggi CTR!**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)

## 🚀 Demo & Features

### ✨ Key Features

- **🔥 Gen Z Aesthetic** - Modern gradients, animations, dan micro-interactions
- **📱 Mobile-First Design** - Responsive untuk semua device
- **📊 Click Counter** - Track klik per produk dengan localStorage
- **🔍 Smart Search** - Pencarian produk dengan auto-suggestions
- **🏷️ Category Filter** - Filter berdasarkan kategori produk
- **💫 Smooth Animations** - Hover effects dan transitions yang smooth
- **⚡ Performance Optimized** - Image optimization, lazy loading
- **🛍️ Multi-Platform** - Support TikTok Shop, Shopee, Tokopedia

### 🎯 High CTR Optimizations

- **FOMO Elements** - Flash sale timers, limited stock badges
- **Social Proof** - Review ratings, sold counts, online users
- **Viral Badges** - Trending, hot, most popular indicators
- **Compelling CTAs** - "Gaskeun Beli!", "Jangan Sampai Kehabisan!"
- **Visual Hierarchy** - Strategic color usage dan typography
- **Psychological Triggers** - Scarcity, urgency, social validation

## 📁 Project Structure

```
barangfyp-store/
├── 📄 package.json
├── ⚙️ next.config.js
├── 🎨 tailwind.config.js
├── 📝 README.md
├── 🌐 public/
│   ├── favicon.ico
│   └── images/
├── 📂 src/
│   ├── 🎯 app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/clicks/route.ts
│   ├── 🧩 components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Website footer
│   │   ├── ProductCard.jsx     # Individual product card
│   │   ├── ProductList.jsx     # Product grid container
│   │   ├── ClickCounter.jsx    # Click tracking component
│   │   ├── SearchBar.jsx       # Search functionality
│   │   └── CategoryFilter.jsx  # Category filtering
│   ├── 📊 data/
│   │   └── products.js         # Sample product data
│   ├── 🪝 hooks/
│   │   └── useClickCounter.js  # Click management hooks
│   └── 🔧 utils/
│       └── storage.js          # LocalStorage utilities
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18.0 atau lebih baru
- npm atau yarn
- Git

### Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/yourusername/barangfyp-store.git
   cd barangfyp-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:

   ```env
   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id

   # Storage mode
   STORAGE_MODE=localStorage

   # Future integrations (optional)
   # NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run development server**

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 🎨 Customization
